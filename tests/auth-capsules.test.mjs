/**
 * Integration & Unit Tests for Shared Firebase Auth & Capsule Economy
 * Tests:
 * 1. Minor units conversion and formatting invariants (1.00 Capsule = 100 units).
 * 2. Idempotency & double-spending prevention logic.
 * 3. Existing user preservation (verifying starter grant is never re-applied).
 * 4. New user starting grant (verifying 50.0 capsules and 5000 units initialization).
 * 5. Transaction classification (credit vs debit identification).
 */

import assert from "node:assert";

// ── Inlined Logic for Testing Invariants ─────────────────────────────────────
const UNITS_PER_CAPSULE = 100;

function toMinorUnits(capsules) {
  return Math.round(Math.max(0, capsules) * UNITS_PER_CAPSULE);
}

function toCapsulesDouble(units) {
  return Math.max(0, units) / UNITS_PER_CAPSULE;
}

function formatCapsules(capsules) {
  const safe = Math.max(0, Number(capsules) || 0);
  const units = toMinorUnits(safe);
  if (units % 100 === 0) {
    return (units / 100).toString();
  } else if (units % 10 === 0) {
    return (units / 100).toFixed(1);
  } else {
    return (units / 100).toFixed(2);
  }
}

function isCreditTransaction(type, amount) {
  switch (type) {
    case "SPENT_UNLOCK":
    case "SUBCATEGORY_UNLOCK":
    case "PART_UNLOCK":
    case "DRUG_SEARCH":
    case "DEBIT":
      return false;
    case "PURCHASE":
    case "EARNED":
    case "CREDIT":
    case "REWARD":
    case "BONUS":
    case "INITIAL_GRANT":
    case "WELCOME_BONUS":
    case "REFERRAL_BONUS":
    case "DAILY_REWARD":
    case "DAILY_LOGIN_REWARD":
    case "REWARDED_AD":
    case "DRUG_SEARCH_REFUND":
      return true;
    default:
      return amount > 0;
  }
}

// Simulated Atomic Transaction Engine
function simulateCapsuleSpend(userDoc, transactionStore, spendRequest) {
  const { transactionId, operation, targetId, amount } = spendRequest;

  // 1. Idempotency check
  if (transactionStore.has(transactionId)) {
    const existing = transactionStore.get(transactionId);
    if (existing.operation === operation && existing.targetId === targetId) {
      return {
        idempotentReplay: true,
        alreadyProcessed: true,
        transactionId,
        balanceBefore: existing.balanceBefore,
        balanceAfter: existing.balanceAfter,
        cost: existing.cost
      };
    } else {
      throw new Error("IDEMPOTENCY_CONFLICT: Key already used for a different payload or operation");
    }
  }

  // 2. Balance check
  const currentCapsules = userDoc.capsules ?? 0.0;
  const currentUnits = userDoc.capsuleUnits ?? toMinorUnits(currentCapsules);

  if (currentCapsules < amount) {
    throw new Error(`INSUFFICIENT_CAPSULES: Available balance (${currentCapsules}) is less than required (${amount})`);
  }

  // 3. Atomically deduct
  const deductUnits = Math.round(amount * 100);
  const newUnits = Math.max(0, currentUnits - deductUnits);
  const newCapsules = newUnits / 100.0;

  userDoc.capsules = newCapsules;
  userDoc.capsuleUnits = newUnits;

  const txRecord = {
    transactionId,
    operation,
    targetId,
    cost: amount,
    balanceBefore: currentCapsules,
    balanceAfter: newCapsules,
    timestamp: Date.now()
  };
  transactionStore.set(transactionId, txRecord);

  return {
    success: true,
    alreadyProcessed: false,
    transactionId,
    balanceBefore: currentCapsules,
    balanceAfter: newCapsules,
    cost: amount
  };
}

// Provisioning logic test
function provisionUser(existingDoc, newUserData) {
  if (existingDoc) {
    // Existing user: PRESERVE EXACT BALANCE AND ENTITLEMENTS
    return {
      isNew: false,
      user: {
        ...existingDoc,
        lastLogin: Date.now()
      }
    };
  }

  // New user: grant starting 50.0 capsules
  return {
    isNew: true,
    user: {
      uid: newUserData.uid,
      email: newUserData.email,
      name: newUserData.name,
      capsules: 50.0,
      capsuleUnits: 5000,
      initialGrantClaimed: true,
      welcomeBonusClaimed: false,
      role: "USER",
      createdAt: Date.now()
    }
  };
}

// ── Test Suites ─────────────────────────────────────────────────────────────

console.log("=== RUNNING AUTH & CAPSULE WALLET TEST SUITE ===\n");

// Test 1: Minor units conversions
{
  assert.strictEqual(toMinorUnits(50.0), 5000, "50.0 capsules must equal 5000 units");
  assert.strictEqual(toMinorUnits(25.5), 2550, "25.5 capsules must equal 2550 units");
  assert.strictEqual(toMinorUnits(0.1), 10, "0.1 capsule must equal 10 units");
  assert.strictEqual(toCapsulesDouble(5000), 50.0, "5000 units must equal 50.0 capsules");
  assert.strictEqual(toCapsulesDouble(2550), 25.5, "2550 units must equal 25.5 capsules");
  assert.strictEqual(formatCapsules(50.0), "50", "50.0 should format as '50'");
  assert.strictEqual(formatCapsules(25.5), "25.5", "25.5 should format as '25.5'");
  assert.strictEqual(formatCapsules(25.25), "25.25", "25.25 should format as '25.25'");
  console.log("✓ Test 1 Passed: Minor units conversion and formatting invariants verified.");
}

// Test 2: Existing User Login Preservation
{
  const existingAndroidUser = {
    uid: "android_user_123",
    email: "student@pharmacy.com",
    name: "Existing Pharmacist",
    capsules: 135.0,
    capsuleUnits: 13500,
    initialGrantClaimed: true,
    welcomeBonusClaimed: true,
    dailyRewardStreak: 5,
    role: "USER"
  };

  const loginResult = provisionUser(existingAndroidUser, { uid: "android_user_123" });
  assert.strictEqual(loginResult.isNew, false, "Should identify user as existing");
  assert.strictEqual(loginResult.user.capsules, 135.0, "Existing balance must remain exactly 135.0");
  assert.strictEqual(loginResult.user.capsuleUnits, 13500, "Existing units must remain exactly 13500");
  assert.strictEqual(loginResult.user.welcomeBonusClaimed, true, "Existing welcomeBonusClaimed must not be reset");
  assert.strictEqual(loginResult.user.dailyRewardStreak, 5, "Daily streak must be preserved");
  console.log("✓ Test 2 Passed: Existing Android user balance, streaks, and roles are 100% preserved.");
}

// Test 3: New User Registration Provisioning
{
  const newWebRegistration = {
    uid: "web_user_999",
    email: "newstudent@pharmacy.com",
    name: "New Student"
  };

  const regResult = provisionUser(null, newWebRegistration);
  assert.strictEqual(regResult.isNew, true, "Should identify user as new");
  assert.strictEqual(regResult.user.capsules, 50.0, "New user must receive exactly 50.0 starter capsules");
  assert.strictEqual(regResult.user.capsuleUnits, 5000, "New user must receive exactly 5000 units");
  assert.strictEqual(regResult.user.initialGrantClaimed, true, "initialGrantClaimed must be set to true");
  assert.strictEqual(regResult.user.welcomeBonusClaimed, false, "welcomeBonusClaimed must be initialized to false");
  console.log("✓ Test 3 Passed: New user registration correctly initialized with starter grant.");
}

// Test 4: Atomic Deduction & Idempotency
{
  const user = { uid: "user_spend_test", capsules: 50.0, capsuleUnits: 5000 };
  const txStore = new Map();

  const spendRequest = {
    transactionId: "tx_req_001",
    operation: "SUBCATEGORY_UNLOCK",
    targetId: "pharmacology_cardio",
    amount: 25.0
  };

  // First execution: successful deduction
  const res1 = simulateCapsuleSpend(user, txStore, spendRequest);
  assert.strictEqual(res1.success, true);
  assert.strictEqual(res1.alreadyProcessed, false);
  assert.strictEqual(user.capsules, 25.0, "Balance after 25 capsule deduction must be 25.0");
  assert.strictEqual(user.capsuleUnits, 2500, "Units after 25 capsule deduction must be 2500");

  // Duplicate retry with same transactionId: must NOT deduct again
  const res2 = simulateCapsuleSpend(user, txStore, spendRequest);
  assert.strictEqual(res2.idempotentReplay, true);
  assert.strictEqual(res2.alreadyProcessed, true);
  assert.strictEqual(user.capsules, 25.0, "Balance must NOT be deducted a second time on retry");
  assert.strictEqual(user.capsuleUnits, 2500, "Units must remain 2500 on retry");

  // Idempotency conflict: attempting to reuse transactionId for a different payload
  assert.throws(
    () => {
      simulateCapsuleSpend(user, txStore, {
        transactionId: "tx_req_001",
        operation: "MOCK_EXAM_PART_UNLOCK",
        targetId: "other_part",
        amount: 25.0
      });
    },
    /IDEMPOTENCY_CONFLICT/,
    "Reusing transaction ID with different operation must throw IDEMPOTENCY_CONFLICT"
  );
  console.log("✓ Test 4 Passed: Capsule deduction idempotency and anti-double-charging verified.");
}

// Test 5: Insufficient Balance Rejection
{
  const user = { uid: "user_low_balance", capsules: 10.0, capsuleUnits: 1000 };
  const txStore = new Map();

  assert.throws(
    () => {
      simulateCapsuleSpend(user, txStore, {
        transactionId: "tx_insufficient",
        operation: "SUBCATEGORY_UNLOCK",
        targetId: "sub_123",
        amount: 25.0
      });
    },
    /INSUFFICIENT_CAPSULES/,
    "Spending more than available balance must throw INSUFFICIENT_CAPSULES"
  );
  assert.strictEqual(user.capsules, 10.0, "Balance must remain unchanged after failed transaction");
  console.log("✓ Test 5 Passed: Insufficient balance safely rejected with zero balance change.");
}

// Test 6: Transaction Type Classification
{
  assert.strictEqual(isCreditTransaction("INITIAL_GRANT", 50), true);
  assert.strictEqual(isCreditTransaction("DAILY_REWARD", 5), true);
  assert.strictEqual(isCreditTransaction("PURCHASE", 100), true);
  assert.strictEqual(isCreditTransaction("SPENT_UNLOCK", -25), false);
  assert.strictEqual(isCreditTransaction("DRUG_SEARCH", -10), false);
  console.log("✓ Test 6 Passed: Credit and Debit transaction classifications verified.");
}

console.log("\nALL TESTS PASSED SUCCESSFULLY! (6/6)");
