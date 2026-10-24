export const UNITS_PER_CAPSULE = 100;

export const CAPSULE_PRICES = {
  STARTING_GRANT: 50.0,
  WELCOME_BONUS: 25.0,
  SUBCATEGORY_UNLOCK: 25.0,
  MOCK_EXAM_PART_UNLOCK: 60.0,
  LIBRARY_UNLOCK_1_HOUR: 60.0,
  DRUG_SEARCH: 10.0,
  POST_TEXT: 10.0,
  POST_IMAGE: 15.0,
  POST_PDF: 15.0,
  POST_LINK: 25.0,
  POST_VIDEO: 35.0,
  REWARDED_AD: 10.0
} as const;

export type CapsuleTransactionType =
  | "INITIAL_GRANT"
  | "WELCOME_BONUS"
  | "REFERRAL_BONUS"
  | "DAILY_REWARD"
  | "DAILY_LOGIN_REWARD"
  | "CREDIT"
  | "DEBIT"
  | "EARNED"
  | "PURCHASE"
  | "SPENT_UNLOCK"
  | "SUBCATEGORY_UNLOCK"
  | "PART_UNLOCK"
  | "DRUG_SEARCH"
  | "DRUG_SEARCH_REFUND"
  | "REWARDED_AD"
  | "ADMIN_CREDIT";

export interface UserProfile {
  uid: string;
  name: string;
  fullName: string;
  email: string;
  photoUrl?: string;
  phone?: string;
  profession?: string;
  gender?: string;
  country?: string;
  state?: string;
  district?: string;
  qualification?: string;
  isWorking?: boolean;
  workingInstitution?: string;
  isStudent?: boolean;
  studentInstitution?: string;
  isPreparingExam?: boolean;
  examTarget?: string;
  profileCompleted: boolean;
  pqid?: string;
  referralCode?: string;
  referredBy?: string;
  role: string; // "USER", "ADMIN", "MODERATOR", "BANNED"
  isBanned: boolean;
  mutedUntil?: number;
  capsules: number;
  capsuleUnits: number;
  initialGrantClaimed: boolean;
  welcomeBonusClaimed: boolean;
  dailyRewardStreak: number;
  lastDailyRewardDate?: string;
  welcomePackPurchased?: boolean;
  adsFreeUntil?: number;
  createdAt: number;
  updatedAt: number;
  lastLogin?: number;
}

export interface CapsuleTransaction {
  transactionId: string;
  userId: string;
  type: CapsuleTransactionType | string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  reason?: string;
  source?: string;
  referenceId?: string;
  categoryId?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  timestamp: number;
  createdAt?: unknown;
}

export function toMinorUnits(capsules: number): number {
  return Math.round(Math.max(0, capsules) * UNITS_PER_CAPSULE);
}

export function toCapsulesDouble(units: number): number {
  return Math.max(0, units) / UNITS_PER_CAPSULE;
}

export function formatCapsules(capsules: number): string {
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

export function isCreditTransaction(type: string, amount: number): boolean {
  switch (type) {
    case "SPENT_UNLOCK":
    case "SUBCATEGORY_UNLOCK":
    case "PART_UNLOCK":
    case "DRUG_SEARCH":
    case "DEBIT":
    case "POST_TEXT":
    case "POST_IMAGE":
    case "POST_PDF":
    case "POST_LINK":
    case "POST_VIDEO":
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
    case "ADMIN_CREDIT":
      return true;
    default:
      return amount > 0;
  }
}
