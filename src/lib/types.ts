// User types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  profession?: string;
  nationality?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdentityVerified: boolean;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  loginNotifications: boolean;
  autoLock: boolean;
  createdAt: string;
  updatedAt: string;
}

// Wallet types
export interface Wallet {
  id: number;
  userId: number;
  name: string;
  balance: number;
  currency: string;
  cardNumber?: string;
  cardExpiry?: string;
  isActive: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

// Child types
export interface Child {
  id: number;
  parentId: number;
  name: string;
  age: number;
  avatar: string;
  balance: number;
  weeklyLimit: number;
  dailyLimit: number;
  weeklySpent: number;
  dailySpent: number;
  isActive: boolean;
  lastActivity?: string;
  createdAt: string;
  updatedAt: string;
}

// Transaction types
export interface Transaction {
  id: number;
  userId: number;
  childId?: number;
  walletId: number;
  type: "income" | "expense" | "transfer" | "reward";
  amount: number;
  title: string;
  description?: string;
  categoryName?: string;
  categoryIcon?: string;
  categoryColor?: string;
  merchant?: string;
  location?: string;
  cardUsed?: string;
  referenceNumber: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  paymentMethod: "card" | "nfc" | "qr" | "transfer" | "cash";
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  childName?: string;
}

// Category types
export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
  createdAt: string;
}

// NFC Device types
export interface NFCDevice {
  id: number;
  childId: number;
  nfcId: string;
  deviceType: "bracelet" | "tag";
  name: string;
  isActive: boolean;
  lastUsed?: string;
  linkedAt: string;
  createdAt: string;
  updatedAt: string;
}

// Notification types
export interface Notification {
  id: number;
  userId: number;
  type: "transaction" | "security" | "reward" | "system";
  title: string;
  message: string;
  isRead: boolean;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

// QR Code types
export interface QRCode {
  id: number;
  userId: number;
  walletId: number;
  amount?: number;
  merchant?: string;
  description?: string;
  isSingleUse: boolean;
  isActive: boolean;
  expiresAt?: string;
  usedAt?: string;
  createdAt: string;
}

// Reward types
export interface Reward {
  id: number;
  parentId: number;
  childId: number;
  amount: number;
  reason: string;
  rewardType: "achievement" | "behavior" | "chores" | "special";
  status: "pending" | "given" | "cancelled";
  givenAt?: string;
  createdAt: string;
}

// Spending Limit types
export interface SpendingLimit {
  id: number;
  childId: number;
  categoryId?: number;
  limitType: "daily" | "weekly" | "monthly" | "category";
  amount: number;
  currentSpent: number;
  resetDate?: string;
  isActive: boolean;
  categoryName?: string;
  createdAt: string;
  updatedAt: string;
}

// Security Log types
export interface SecurityLog {
  id: number;
  userId: number;
  actionType:
    | "login"
    | "logout"
    | "password_change"
    | "failed_login"
    | "2fa_enabled"
    | "2fa_disabled";
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  success: boolean;
  metadata?: any;
  createdAt: string;
}

// Analytics types
export interface TransactionAnalytics {
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
    transactionCount: number;
  };
  categoryBreakdown: Record<string, number>;
  dailyTrends: Record<string, { income: number; expenses: number }>;
}

// API Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface CreateChildRequest {
  name: string;
  age: number;
  avatar?: string;
  initialAmount?: number;
  weeklyLimit?: number;
  dailyLimit?: number;
}

export interface CreateTransactionRequest {
  walletId: number;
  childId?: number;
  type: "income" | "expense" | "transfer" | "reward";
  amount: number;
  title: string;
  description?: string;
  categoryId?: number;
  merchant?: string;
  location?: string;
  paymentMethod?: "card" | "nfc" | "qr" | "transfer" | "cash";
}

export interface SendMoneyRequest {
  amount: number;
  message?: string;
  walletId: number;
}

export interface GiveRewardRequest {
  amount: number;
  reason: string;
  rewardType: "achievement" | "behavior" | "chores" | "special";
}

export interface LinkNFCDeviceRequest {
  nfcId: string;
  deviceType: "bracelet" | "tag";
  deviceName?: string;
}

export interface ProcessNFCPaymentRequest {
  nfcId: string;
  amount: number;
  merchant?: string;
  location?: string;
}

export interface GenerateQRCodeRequest {
  walletId: number;
  amount?: number;
  merchant?: string;
  description?: string;
  expiresIn?: number;
}

export interface ProcessQRPaymentRequest {
  qrCodeData: string;
  payerWalletId: number;
  amount?: number;
}

export interface UpdateSpendingLimitsRequest {
  weeklyLimit?: number;
  dailyLimit?: number;
  categoryLimits?: {
    categoryId: number;
    limitType: "daily" | "weekly" | "monthly" | "category";
    amount: number;
  }[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface TopUpWalletRequest {
  walletId: number;
  amount: number;
  paymentMethod: string;
}

export type alertTypeProp = "success" | "error" | "warning" | "info";

export interface QuickAction {
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  onPress: () => void;
}
