export interface Card {
  id: string;
  userId: string;
  cardToken: string;
  last4: string;
  network: CardNetwork;
  type: CardType;
  expiryMonth: number;
  expiryYear: number;
  status: CardStatus;
  cardholderName?: string;
  dailyLimit: number;
  monthlyLimit: number;
  transactionLimit: number;
  atmDailyLimit: number;
  atmMonthlyLimit: number;
  allowOnlineTransactions: boolean;
  allowAtmTransactions: boolean;
  allowInternationalTransactions: boolean;
  allowGambling: boolean;
  allowCashback: boolean;
  providerCardId?: string;
  providerToken?: string;
  providerData?: Record<string, any>;
  activatedAt?: string;
  lastUsedAt?: string;
  blockedAt?: string;
  blockedReason?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export enum CardType {
  VIRTUAL = 'virtual',
  PHYSICAL = 'physical',
}

export enum CardStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export enum CardNetwork {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex',
  DISCOVER = 'discover',
}

export interface CreateCardRequest {
  type: CardType;
  cardholderName?: string;
  dailyLimit?: number;
  monthlyLimit?: number;
  transactionLimit?: number;
  atmDailyLimit?: number;
  atmMonthlyLimit?: number;
  allowOnlineTransactions?: boolean;
  allowAtmTransactions?: boolean;
  allowInternationalTransactions?: boolean;
  allowGambling?: boolean;
  allowCashback?: boolean;
}

export interface UpdateCardLimitsRequest {
  dailyLimit?: number;
  monthlyLimit?: number;
  transactionLimit?: number;
  atmDailyLimit?: number;
  atmMonthlyLimit?: number;
}

export interface UpdateCardControlsRequest {
  allowOnlineTransactions?: boolean;
  allowAtmTransactions?: boolean;
  allowInternationalTransactions?: boolean;
  allowGambling?: boolean;
  allowCashback?: boolean;
}

export interface UpdateCardPinRequest {
  currentPin?: string;
  newPin: string;
}

export interface CardBalance {
  availableBalance: number;
  pendingBalance: number;
  totalBalance: number;
  currency: string;
}

export interface CardStats {
  totalTransactions: number;
  totalSpent: number;
  averageTransaction: number;
  lastTransactionDate?: string;
  monthlySpent: number;
  dailySpent: number;
}
