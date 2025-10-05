import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces');

// Auth validation schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  totpCode: z.string().optional(),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phone: phoneSchema.optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Card validation schemas
export const createCardSchema = z.object({
  type: z.enum(['virtual', 'physical']),
  cardholderName: nameSchema.optional(),
  dailyLimit: z.number().min(0).optional(),
  monthlyLimit: z.number().min(0).optional(),
  transactionLimit: z.number().min(0).optional(),
  atmDailyLimit: z.number().min(0).optional(),
  atmMonthlyLimit: z.number().min(0).optional(),
  allowOnlineTransactions: z.boolean().optional(),
  allowAtmTransactions: z.boolean().optional(),
  allowInternationalTransactions: z.boolean().optional(),
  allowGambling: z.boolean().optional(),
  allowCashback: z.boolean().optional(),
});

export const updateCardLimitsSchema = z.object({
  dailyLimit: z.number().min(0).optional(),
  monthlyLimit: z.number().min(0).optional(),
  transactionLimit: z.number().min(0).optional(),
  atmDailyLimit: z.number().min(0).optional(),
  atmMonthlyLimit: z.number().min(0).optional(),
});

export const updateCardControlsSchema = z.object({
  allowOnlineTransactions: z.boolean().optional(),
  allowAtmTransactions: z.boolean().optional(),
  allowInternationalTransactions: z.boolean().optional(),
  allowGambling: z.boolean().optional(),
  allowCashback: z.boolean().optional(),
});

export const updateCardPinSchema = z.object({
  currentPin: z.string().optional(),
  newPin: z.string().length(4, 'PIN must be exactly 4 digits').regex(/^\d{4}$/, 'PIN must contain only numbers'),
});

// Transaction validation schemas
export const createTransactionSchema = z.object({
  cardId: z.string().uuid('Please select a valid card'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  currency: z.string().length(3, 'Currency must be a 3-letter code').optional(),
  type: z.enum(['purchase', 'withdrawal', 'deposit', 'transfer', 'refund', 'fee', 'reversal']),
  description: z.string().optional(),
  merchantName: z.string().optional(),
  merchantCategoryCode: z.string().optional(),
  merchantCity: z.string().optional(),
  merchantCountry: z.string().optional(),
});

// Profile validation schemas
export const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phone: phoneSchema.optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CreateCardFormData = z.infer<typeof createCardSchema>;
export type UpdateCardLimitsFormData = z.infer<typeof updateCardLimitsSchema>;
export type UpdateCardControlsFormData = z.infer<typeof updateCardControlsSchema>;
export type UpdateCardPinFormData = z.infer<typeof updateCardPinSchema>;
export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
