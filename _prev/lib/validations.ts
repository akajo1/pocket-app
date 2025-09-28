import { z } from "zod";

// Auth validations
export const loginSchema = z.object({
  phone: z.string().min(9),
  password: z.string().min(1, "Mot de passe requis"),
});

export const registerSchema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  phone: z.string(),
  email: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(1, "Confirmation requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// Child validations
export const createChildSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  age: z.number().min(3, "Âge minimum 3 ans").max(18, "Âge maximum 18 ans"),
  avatar: z.string().optional(),
  initialAmount: z.number().min(0, "Montant doit être positif").optional(),
  weeklyLimit: z.number().min(0, "Limite doit être positive").optional(),
  dailyLimit: z.number().min(0, "Limite doit être positive").optional(),
});

// Transaction validations
export const createTransactionSchema = z.object({
  walletId: z.number().min(1, "Portefeuille requis"),
  childId: z.number().optional(),
  type: z.enum(["income", "expense", "transfer", "reward"]),
  amount: z.number().min(0.01, "Montant doit être supérieur à 0"),
  title: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  categoryId: z.number().optional(),
  merchant: z.string().optional(),
  location: z.string().optional(),
  paymentMethod: z.enum(["card", "nfc", "qr", "transfer", "cash"]).optional(),
});

export const sendMoneySchema = z.object({
  amount: z.number().min(0.01, "Montant doit être supérieur à 0"),
  message: z.string().optional(),
  walletId: z.number().min(1, "Portefeuille requis"),
});

export const giveRewardSchema = z.object({
  amount: z.number().min(0.01, "Montant doit être supérieur à 0"),
  reason: z.string().min(1, "Raison requise"),
  rewardType: z.enum(["achievement", "behavior", "chores", "special"]),
});

// NFC validations
export const linkNFCDeviceSchema = z.object({
  nfcId: z.string().min(1, "ID NFC requis"),
  deviceType: z.enum(["bracelet", "tag"]),
  deviceName: z.string().optional(),
});

export const processNFCPaymentSchema = z.object({
  nfcId: z.string().min(1, "ID NFC requis"),
  amount: z.number().min(0.01, "Montant doit être supérieur à 0"),
  merchant: z.string().optional(),
  location: z.string().optional(),
});

// QR Code validations
export const generateQRCodeSchema = z.object({
  walletId: z.number().min(1, "Portefeuille requis"),
  amount: z.number().min(0.01).optional(),
  merchant: z.string().optional(),
  description: z.string().optional(),
  expiresIn: z.number().min(60).optional(), // minimum 1 minute
});

export const processQRPaymentSchema = z.object({
  qrCodeData: z.string().min(1, "Données QR requises"),
  payerWalletId: z.number().min(1, "Portefeuille payeur requis"),
  amount: z.number().min(0.01).optional(),
});

// Wallet validations
export const createWalletSchema = z.object({
  name: z.string().min(1, "Nom du portefeuille requis"),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

export const topUpWalletSchema = z.object({
  walletId: z.number().min(1, "Portefeuille requis"),
  amount: z.number().min(0.01, "Montant doit être supérieur à 0"),
  paymentMethod: z.string().min(1, "Méthode de paiement requise"),
});

// Spending limits validations
export const updateSpendingLimitsSchema = z.object({
  weeklyLimit: z.number().min(0).optional(),
  dailyLimit: z.number().min(0).optional(),
  categoryLimits: z
    .array(
      z.object({
        categoryId: z.number().min(1),
        limitType: z.enum(["daily", "weekly", "monthly", "category"]),
        amount: z.number().min(0),
      })
    )
    .optional(),
});

// Profile validations
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthDate: z.string().optional(),
  profession: z.string().optional(),
  nationality: z.string().optional(),
});

// Network credit validations
export const purchaseNetworkCreditSchema = z.object({
  phoneNumber: z.string().min(9, "Numéro de téléphone invalide"),
  operator: z.string().min(1, "Opérateur requis"),
  amount: z.number().min(1000, "Montant minimum 1000 FC"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type CreateChildFormData = z.infer<typeof createChildSchema>;
export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type SendMoneyFormData = z.infer<typeof sendMoneySchema>;
export type GiveRewardFormData = z.infer<typeof giveRewardSchema>;
export type LinkNFCDeviceFormData = z.infer<typeof linkNFCDeviceSchema>;
export type ProcessNFCPaymentFormData = z.infer<typeof processNFCPaymentSchema>;
export type GenerateQRCodeFormData = z.infer<typeof generateQRCodeSchema>;
export type ProcessQRPaymentFormData = z.infer<typeof processQRPaymentSchema>;
export type CreateWalletFormData = z.infer<typeof createWalletSchema>;
export type TopUpWalletFormData = z.infer<typeof topUpWalletSchema>;
export type UpdateSpendingLimitsFormData = z.infer<
  typeof updateSpendingLimitsSchema
>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type PurchaseNetworkCreditFormData = z.infer<
  typeof purchaseNetworkCreditSchema
>;
