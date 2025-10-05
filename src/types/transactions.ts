export interface Transaction {
  id: string;
  userId: string;
  cardId: string;
  externalId?: string;
  amount: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  category?: TransactionCategory;
  description?: string;
  merchantName?: string;
  merchantCategoryCode?: string;
  merchantCity?: string;
  merchantCountry?: string;
  authorizationCode?: string;
  referenceNumber?: string;
  processorTransactionId?: string;
  networkTransactionId?: string;
  feeAmount?: number;
  exchangeRate?: number;
  originalAmount?: number;
  originalCurrency?: string;
  declinedReason?: string;
  declinedCode?: string;
  metadata?: Record<string, any>;
  providerData?: Record<string, any>;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum TransactionType {
  PURCHASE = 'purchase',
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
  REFUND = 'refund',
  FEE = 'fee',
  REVERSAL = 'reversal',
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  DECLINED = 'declined',
  REFUNDED = 'refunded',
}

export enum TransactionCategory {
  FOOD_AND_DINING = 'food_and_dining',
  TRANSPORTATION = 'transportation',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  HEALTHCARE = 'healthcare',
  TRAVEL = 'travel',
  BILLS_AND_UTILITIES = 'bills_and_utilities',
  EDUCATION = 'education',
  GAS_AND_FUEL = 'gas_and_fuel',
  GROCERIES = 'groceries',
  SUBSCRIPTIONS = 'subscriptions',
  UTILITIES = 'utilities',
  OTHER = 'other',
}

export interface CreateTransactionRequest {
  cardId: string;
  amount: number;
  currency?: string;
  type: TransactionType;
  description?: string;
  merchantName?: string;
  merchantCategoryCode?: string;
  merchantCity?: string;
  merchantCountry?: string;
  metadata?: Record<string, any>;
}

export interface TransactionFilters {
  status?: TransactionStatus[];
  type?: TransactionType[];
  category?: TransactionCategory[];
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
  merchantName?: string;
  search?: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  pendingAmount: number;
  completedAmount: number;
  failedAmount: number;
  monthlySpent: number;
  dailySpent: number;
  topCategories: Array<{
    category: TransactionCategory;
    amount: number;
    count: number;
  }>;
  topMerchants: Array<{
    merchantName: string;
    amount: number;
    count: number;
  }>;
}
