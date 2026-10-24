import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { CAPSULE_PRICES } from "@/lib/capsules";

// Authoritative mapping of permitted spend operations to strict prices
const VALID_SPEND_OPERATIONS: Record<string, number> = {
  SUBCATEGORY_UNLOCK: CAPSULE_PRICES.SUBCATEGORY_UNLOCK,
  MOCK_EXAM_PART_UNLOCK: CAPSULE_PRICES.MOCK_EXAM_PART_UNLOCK,
  LIBRARY_UNLOCK_1_HOUR: CAPSULE_PRICES.LIBRARY_UNLOCK_1_HOUR,
  DRUG_SEARCH: CAPSULE_PRICES.DRUG_SEARCH
};

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Authorization Header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid authorization token" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (err: unknown) {
      const e = err as { message?: string };
      return NextResponse.json(
        { error: `Unauthorized: Invalid or expired token (${e.message})` },
        { status: 401 }
      );
    }

    const uid = decodedToken.uid;
    const body = await req.json();
    const { transactionId, operation, targetId, amount, metadata } = body;

    // 2. Validate Parameters
    if (!transactionId || typeof transactionId !== "string" || transactionId.trim().length === 0) {
      return NextResponse.json({ error: "Missing required field: transactionId" }, { status: 400 });
    }
    if (!operation || typeof operation !== "string" || !(operation in VALID_SPEND_OPERATIONS)) {
      return NextResponse.json({ error: `Invalid operation: ${operation}` }, { status: 400 });
    }
    if (!targetId || typeof targetId !== "string" || targetId.trim().length === 0) {
      return NextResponse.json({ error: "Missing required field: targetId" }, { status: 400 });
    }

    const expectedCost = VALID_SPEND_OPERATIONS[operation];
    const requestedAmount = Number(amount);
    if (isNaN(requestedAmount) || Math.abs(requestedAmount - expectedCost) > 0.001) {
      return NextResponse.json(
        { error: `Invalid amount. Operation ${operation} strictly requires ${expectedCost} Capsules` },
        { status: 400 }
      );
    }

    const sanitizedTxId = transactionId.trim();
    const sanitizedTargetId = targetId.trim();

    // References
    const userRef = adminDb.collection("users").doc(uid);
    const txRef = userRef.collection("capsule_transactions").doc(sanitizedTxId);

    // Resolve entitlement reference depending on operation
    let entitlementRef: FirebaseFirestore.DocumentReference;
    if (operation === "SUBCATEGORY_UNLOCK") {
      entitlementRef = userRef.collection("unlocked_subcategories").doc(sanitizedTargetId);
    } else if (operation === "MOCK_EXAM_PART_UNLOCK") {
      entitlementRef = adminDb.collection("mockExamPartUnlocks").doc(`${uid}_${sanitizedTargetId}`);
    } else {
      entitlementRef = userRef.collection("unlocked_features").doc(sanitizedTargetId);
    }

    // 3. Execute Atomic Firestore Transaction: ALL READS BEFORE ALL WRITES
    const result = await adminDb.runTransaction(async (transaction) => {
      // --- READ 1: Check Idempotency Key ---
      const txSnap = await transaction.get(txRef);

      // --- READ 2: Check User Balance ---
      const userSnap = await transaction.get(userRef);

      // --- READ 3: Check Existing Entitlement ---
      const entitlementSnap = await transaction.get(entitlementRef);

      // Validate Idempotency: If transaction was already processed
      if (txSnap.exists) {
        const txData = txSnap.data() || {};
        // Bind idempotency key to exact operation, targetId, and user
        if (
          txData.userId === uid &&
          txData.operation === operation &&
          txData.referenceId === sanitizedTargetId
        ) {
          return {
            idempotentReplay: true,
            alreadyProcessed: true,
            transactionId: sanitizedTxId,
            balanceBefore: txData.balanceBefore,
            balanceAfter: txData.balanceAfter,
            cost: Math.abs(txData.amount || expectedCost)
          };
        } else {
          throw new Error("IDEMPOTENCY_CONFLICT: Key already used for a different payload or operation");
        }
      }

      // Validate User Profile
      if (!userSnap.exists) {
        throw new Error("USER_NOT_FOUND: User document does not exist");
      }

      const userData = userSnap.data() || {};
      const currentCapsules = typeof userData.capsules === "number" ? userData.capsules : 0.0;
      const currentUnits =
        typeof userData.capsuleUnits === "number"
          ? userData.capsuleUnits
          : Math.round(currentCapsules * 100);

      // Validate Existing Entitlement
      if (entitlementSnap.exists && entitlementSnap.data()?.unlocked === true) {
        return {
          alreadyUnlocked: true,
          transactionId: sanitizedTxId,
          balance: currentCapsules
        };
      }

      // Validate Sufficient Balance
      if (currentCapsules < expectedCost) {
        throw new Error(
          `INSUFFICIENT_CAPSULES: Available balance (${currentCapsules}) is less than required (${expectedCost})`
        );
      }

      // --- WRITES: Executed strictly after all reads are complete ---
      const deductUnits = Math.round(expectedCost * 100);
      const newUnits = Math.max(0, currentUnits - deductUnits);
      const newCapsules = newUnits / 100.0;

      // 1. Update User Balance & Units
      transaction.update(userRef, {
        capsules: newCapsules,
        capsuleUnits: newUnits,
        updatedAt: FieldValue.serverTimestamp()
      });

      // 2. Set Canonical Entitlement Document
      transaction.set(
        entitlementRef,
        {
          targetId: sanitizedTargetId,
          userId: uid,
          unlocked: true,
          unlockedBy: "CAPSULES",
          cost: expectedCost,
          unlockedAt: FieldValue.serverTimestamp(),
          timestamp: Date.now()
        },
        { merge: true }
      );

      // 3. Write Immutable Audit Transaction Entry
      transaction.set(txRef, {
        transactionId: sanitizedTxId,
        userId: uid,
        operation,
        type: "SPENT_UNLOCK",
        amount: -expectedCost,
        balanceBefore: currentCapsules,
        balanceAfter: newCapsules,
        description: metadata?.description || `Unlocked ${operation} (-${expectedCost} Capsules)`,
        reason: metadata?.reason || operation,
        source: "WEB_PORTAL",
        referenceId: sanitizedTargetId,
        createdAt: FieldValue.serverTimestamp(),
        timestamp: Date.now()
      });

      return {
        success: true,
        alreadyProcessed: false,
        transactionId: sanitizedTxId,
        balanceBefore: currentCapsules,
        balanceAfter: newCapsules,
        cost: expectedCost
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const e = err as { message?: string };
    const errMsg = e.message || "Failed to process capsule transaction";

    if (errMsg.includes("INSUFFICIENT_CAPSULES")) {
      return NextResponse.json({ error: errMsg }, { status: 400 });
    }
    if (errMsg.includes("IDEMPOTENCY_CONFLICT")) {
      return NextResponse.json({ error: errMsg }, { status: 409 });
    }
    if (errMsg.includes("USER_NOT_FOUND")) {
      return NextResponse.json({ error: errMsg }, { status: 404 });
    }

    console.error("[CAPSULE_SPEND_ERROR]", err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
