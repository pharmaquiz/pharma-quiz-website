"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserProfile, CapsuleTransaction, CAPSULE_PRICES, toMinorUnits } from "@/lib/capsules";

interface SignUpData {
  fullName: string;
  phone: string;
  qualification: string;
  isStudent: boolean;
  institution?: string;
  isWorking?: boolean;
  workingInstitution?: string;
  isPreparingExam?: boolean;
  examTarget?: string;
  country?: string;
  state?: string;
  district?: string;
  referralCode?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  capsules: number;
  capsuleUnits: number;
  transactions: CapsuleTransaction[];
  loading: boolean;
  isEmailVerified: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; unverified?: boolean; error?: string }>;
  signUpWithEmail: (email: string, pass: string, data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  resendVerification: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate deterministic PQID from UID
function generatePqid(uid: string): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    hash = (hash * 31 + uid.charCodeAt(i)) >>> 0;
  }
  let code = "PQ";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt((hash + i * 7) % chars.length);
  }
  return code;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [capsules, setCapsules] = useState<number>(0);
  const [capsuleUnits, setCapsuleUnits] = useState<number>(0);
  const [transactions, setTransactions] = useState<CapsuleTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setCapsules(0);
        setCapsuleUnits(0);
        setTransactions([]);
        setLoading(false);
        return;
      }

      // Check user profile document in Firestore
      const userRef = doc(db, "users", currentUser.uid);

      try {
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          const capVal = typeof data.capsules === "number" ? data.capsules : 50.0;
          const unitsVal = typeof data.capsuleUnits === "number" ? data.capsuleUnits : toMinorUnits(capVal);

          setProfile({
            uid: currentUser.uid,
            name: data.name || data.fullName || currentUser.displayName || "Pharmacist",
            fullName: data.fullName || data.name || currentUser.displayName || "Pharmacist",
            email: currentUser.email || data.email || "",
            photoUrl: data.photoUrl || currentUser.photoURL || "",
            phone: data.phone || "",
            profession: data.profession || "",
            country: data.country || "India",
            state: data.state || "",
            district: data.district || "",
            qualification: data.qualification || "",
            profileCompleted: data.profileCompleted ?? false,
            pqid: data.pqid || generatePqid(currentUser.uid),
            referralCode: data.referralCode || "",
            role: data.role || "USER",
            isBanned: data.isBanned ?? false,
            capsules: capVal,
            capsuleUnits: unitsVal,
            initialGrantClaimed: data.initialGrantClaimed ?? true,
            welcomeBonusClaimed: data.welcomeBonusClaimed ?? false,
            dailyRewardStreak: data.dailyRewardStreak ?? 0,
            lastDailyRewardDate: data.lastDailyRewardDate || "",
            createdAt: typeof data.createdAt === "number" ? data.createdAt : Date.now(),
            updatedAt: typeof data.updatedAt === "number" ? data.updatedAt : Date.now()
          });
          setCapsules(capVal);
          setCapsuleUnits(unitsVal);
        }
      } catch (err) {
        console.error("Error fetching initial user profile:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Real-time listener for user document & capsule transactions
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribeDoc = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const capVal = typeof data.capsules === "number" ? data.capsules : 0.0;
        const unitsVal = typeof data.capsuleUnits === "number" ? data.capsuleUnits : toMinorUnits(capVal);

        setCapsules(capVal);
        setCapsuleUnits(unitsVal);
        setProfile((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            capsules: capVal,
            capsuleUnits: unitsVal,
            name: data.name || prev.name,
            fullName: data.fullName || prev.fullName,
            role: data.role || prev.role,
            isBanned: data.isBanned ?? prev.isBanned,
            dailyRewardStreak: data.dailyRewardStreak ?? prev.dailyRewardStreak,
            lastDailyRewardDate: data.lastDailyRewardDate || prev.lastDailyRewardDate
          };
        });
      }
    });

    // Subcollection: capsule_transactions
    const txQuery = query(
      collection(db, "users", user.uid, "capsule_transactions"),
      orderBy("timestamp", "desc"),
      limit(25)
    );

    const unsubscribeTx = onSnapshot(txQuery, (snapshot) => {
      const items: CapsuleTransaction[] = [];
      snapshot.forEach((d) => {
        const t = d.data();
        items.push({
          transactionId: d.id,
          userId: user.uid,
          type: t.type || "CREDIT",
          amount: typeof t.amount === "number" ? t.amount : 0,
          balanceBefore: typeof t.balanceBefore === "number" ? t.balanceBefore : 0,
          balanceAfter: typeof t.balanceAfter === "number" ? t.balanceAfter : 0,
          description: t.description || t.reason || "Capsule Transaction",
          reason: t.reason,
          source: t.source,
          referenceId: t.referenceId,
          categoryId: t.categoryId,
          subcategoryId: t.subcategoryId,
          subcategoryName: t.subcategoryName,
          timestamp: typeof t.timestamp === "number" ? t.timestamp : (t.createdAt?.toMillis?.() || Date.now())
        });
      });
      setTransactions(items);
    });

    return () => {
      unsubscribeDoc();
      unsubscribeTx();
    };
  }, [user]);

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, pass: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const firebaseUser = cred.user;

      if (!firebaseUser.emailVerified) {
        return { success: false, unverified: true, error: "Please verify your email address to continue." };
      }

      // Record non-destructive login activity
      const userRef = doc(db, "users", firebaseUser.uid);
      try {
        await setDoc(
          userRef,
          {
            lastLoginAt: serverTimestamp(),
            lastLogin: Date.now(),
            isOnline: true,
            updatedAt: Date.now()
          },
          { merge: true }
        );
      } catch (e) {
        console.warn("Failed recording login timestamp:", e);
      }

      return { success: true };
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      let msg = "Failed to sign in. Please check your credentials.";
      if (e.code === "auth/invalid-credential" || e.code === "auth/wrong-password" || e.code === "auth/user-not-found") {
        msg = "Invalid email or password. Please try again.";
      } else if (e.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Please try again later or reset your password.";
      }
      return { success: false, error: msg };
    }
  };

  // Sign Up with Email & Password
  const signUpWithEmail = async (email: string, pass: string, data: SignUpData) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const firebaseUser = cred.user;

      // Send Email Verification
      await sendEmailVerification(firebaseUser);

      const uid = firebaseUser.uid;
      const pqid = generatePqid(uid);
      const startingCaps = CAPSULE_PRICES.STARTING_GRANT; // 50.0
      const startingUnits = toMinorUnits(startingCaps);   // 5000

      // 1. Create User Document with Initial 50 Capsules Grant
      const userRef = doc(db, "users", uid);
      const initialProfile = {
        uid,
        name: data.fullName.trim(),
        fullName: data.fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: data.phone.trim(),
        profession: data.isStudent ? "Student" : (data.isWorking ? "Working Professional" : "Aspirant"),
        qualification: data.qualification,
        country: data.country || "India",
        state: data.state || "",
        district: data.district || "",
        isStudent: data.isStudent,
        studentInstitution: data.institution || "",
        isWorking: data.isWorking ?? false,
        workingInstitution: data.workingInstitution || "",
        isPreparingExam: data.isPreparingExam ?? false,
        examTarget: data.examTarget || "",
        profileCompleted: true,
        pqid,
        referralCode: pqid,
        referredBy: data.referralCode?.trim() || "",
        role: "USER",
        isBanned: false,
        mutedUntil: 0,
        capsules: startingCaps,
        capsuleUnits: startingUnits,
        initialGrantClaimed: true,
        welcomeBonusClaimed: false,
        dailyRewardStreak: 0,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      await setDoc(userRef, initialProfile, { merge: true });

      // 2. Write initial_grant transaction log
      const txRef = doc(db, "users", uid, "capsule_transactions", "initial_grant");
      await setDoc(txRef, {
        transactionId: "initial_grant",
        userId: uid,
        type: "INITIAL_GRANT",
        amount: startingCaps,
        balanceBefore: 0.0,
        balanceAfter: startingCaps,
        description: `Welcome Starting Balance (+${startingCaps} Capsules)`,
        reason: "Initial Registration Grant",
        source: "SYSTEM_INITIAL",
        createdAt: serverTimestamp(),
        timestamp: Date.now()
      });

      // 3. Mirror to public_profiles (strictly excluding phone, email, password)
      const pubRef = doc(db, "public_profiles", uid);
      await setDoc(
        pubRef,
        {
          uid,
          pqid,
          name: data.fullName.trim(),
          nameLowercase: data.fullName.trim().toLowerCase(),
          fullName: data.fullName.trim(),
          profession: initialProfile.profession,
          qualification: data.qualification,
          country: initialProfile.country,
          state: initialProfile.state,
          district: initialProfile.district,
          isDiscoverable: true,
          isActive: true,
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        { merge: true }
      );

      // Sign out to require email verification before active session
      await signOut(auth);

      return { success: true };
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      let msg = "Registration failed. Please try again.";
      if (e.code === "auth/email-already-in-use") {
        msg = "An account with this email already exists. Please log in instead.";
      } else if (e.code === "auth/weak-password") {
        msg = "Password is too weak. Please use at least 6 characters.";
      }
      return { success: false, error: msg };
    }
  };

  // Sign In with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const firebaseUser = cred.user;
      const uid = firebaseUser.uid;

      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        // Existing User: Preserve exact balance and profile, do not grant bonus
        await setDoc(
          userRef,
          {
            lastLoginAt: serverTimestamp(),
            lastLogin: Date.now(),
            isOnline: true,
            updatedAt: Date.now()
          },
          { merge: true }
        );
      } else {
        // New Google User: Provision initial 50 Capsules profile
        const displayName = firebaseUser.displayName || "Pharma Student";
        const pqid = generatePqid(uid);
        const startingCaps = CAPSULE_PRICES.STARTING_GRANT;
        const startingUnits = toMinorUnits(startingCaps);

        await setDoc(
          userRef,
          {
            uid,
            name: displayName,
            fullName: displayName,
            email: firebaseUser.email || "",
            photoUrl: firebaseUser.photoURL || "",
            pqid,
            referralCode: pqid,
            role: "USER",
            isBanned: false,
            capsules: startingCaps,
            capsuleUnits: startingUnits,
            initialGrantClaimed: true,
            welcomeBonusClaimed: false,
            dailyRewardStreak: 0,
            profileCompleted: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            lastLogin: Date.now(),
            lastLoginAt: serverTimestamp(),
            isOnline: true
          },
          { merge: true }
        );

        // Transaction log
        const txRef = doc(db, "users", uid, "capsule_transactions", "initial_grant");
        await setDoc(txRef, {
          transactionId: "initial_grant",
          userId: uid,
          type: "INITIAL_GRANT",
          amount: startingCaps,
          balanceBefore: 0.0,
          balanceAfter: startingCaps,
          description: `Welcome Starting Balance (+${startingCaps} Capsules)`,
          reason: "Initial Registration Grant",
          source: "SYSTEM_INITIAL",
          createdAt: serverTimestamp(),
          timestamp: Date.now()
        });

        // Public profile mirror
        const pubRef = doc(db, "public_profiles", uid);
        await setDoc(
          pubRef,
          {
            uid,
            pqid,
            name: displayName,
            nameLowercase: displayName.toLowerCase(),
            fullName: displayName,
            photoUrl: firebaseUser.photoURL || "",
            profession: "Student",
            isDiscoverable: true,
            isActive: true,
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          { merge: true }
        );
      }

      return { success: true };
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      let msg = "Google sign in failed.";
      if (e.code === "auth/popup-closed-by-user") {
        msg = "Sign in popup closed before finishing.";
      } else if (e.code === "auth/account-exists-with-different-credential") {
        msg = "An account already exists with this email using password. Please sign in with email/password.";
      }
      return { success: false, error: msg };
    }
  };

  // Password reset email
  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err: unknown) {
      const e = err as { message?: string };
      return { success: false, error: e.message || "Failed to send reset email." };
    }
  };

  // Resend verification email
  const resendVerification = async () => {
    if (!auth.currentUser) return { success: false, error: "No user signed in." };
    try {
      await sendEmailVerification(auth.currentUser);
      return { success: true };
    } catch (err: unknown) {
      const e = err as { message?: string };
      return { success: false, error: e.message || "Failed to resend verification email." };
    }
  };

  // Sign out
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
    setCapsules(0);
    setCapsuleUnits(0);
    setTransactions([]);
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (!user) return;
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();
      const capVal = typeof data.capsules === "number" ? data.capsules : 0.0;
      setCapsules(capVal);
      setCapsuleUnits(typeof data.capsuleUnits === "number" ? data.capsuleUnits : toMinorUnits(capVal));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        capsules,
        capsuleUnits,
        transactions,
        loading,
        isEmailVerified: user?.emailVerified ?? false,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        sendPasswordReset,
        resendVerification,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
