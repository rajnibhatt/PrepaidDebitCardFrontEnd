// API Configuration
export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const API_TIMEOUT = 30000; // 30 seconds

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Card Networks
export const CARD_NETWORKS = {
  VISA: {
    name: 'Visa',
    color: '#1A1F71',
    logo: '/icons/visa.svg',
  },
  MASTERCARD: {
    name: 'Mastercard',
    color: '#EB001B',
    logo: '/icons/mastercard.svg',
  },
  AMEX: {
    name: 'American Express',
    color: '#006FCF',
    logo: '/icons/amex.svg',
  },
  DISCOVER: {
    name: 'Discover',
    color: '#FF6000',
    logo: '/icons/discover.svg',
  },
} as const;

// Transaction Categories
export const TRANSACTION_CATEGORIES = {
  FOOD_AND_DINING: {
    name: 'Food & Dining',
    icon: '🍽️',
    color: '#F59E0B',
  },
  TRANSPORTATION: {
    name: 'Transportation',
    icon: '🚗',
    color: '#3B82F6',
  },
  ENTERTAINMENT: {
    name: 'Entertainment',
    icon: '🎬',
    color: '#8B5CF6',
  },
  SHOPPING: {
    name: 'Shopping',
    icon: '🛍️',
    color: '#EC4899',
  },
  HEALTHCARE: {
    name: 'Healthcare',
    icon: '🏥',
    color: '#EF4444',
  },
  TRAVEL: {
    name: 'Travel',
    icon: '✈️',
    color: '#06B6D4',
  },
  BILLS_AND_UTILITIES: {
    name: 'Bills & Utilities',
    icon: '💡',
    color: '#10B981',
  },
  EDUCATION: {
    name: 'Education',
    icon: '📚',
    color: '#6366F1',
  },
  GAS_AND_FUEL: {
    name: 'Gas & Fuel',
    icon: '⛽',
    color: '#F97316',
  },
  GROCERIES: {
    name: 'Groceries',
    icon: '🛒',
    color: '#84CC16',
  },
  SUBSCRIPTIONS: {
    name: 'Subscriptions',
    icon: '📱',
    color: '#8B5CF6',
  },
  UTILITIES: {
    name: 'Utilities',
    icon: '⚡',
    color: '#F59E0B',
  },
  OTHER: {
    name: 'Other',
    icon: '📦',
    color: '#6B7280',
  },
} as const;

// Transaction Status Colors
export const TRANSACTION_STATUS_COLORS = {
  PENDING: '#F59E0B',
  PROCESSING: '#3B82F6',
  COMPLETED: '#10B981',
  FAILED: '#EF4444',
  CANCELLED: '#6B7280',
  DECLINED: '#EF4444',
  REFUNDED: '#8B5CF6',
} as const;

// Card Status Colors
export const CARD_STATUS_COLORS = {
  PENDING: '#F59E0B',
  ACTIVE: '#10B981',
  BLOCKED: '#EF4444',
  EXPIRED: '#6B7280',
  CANCELLED: '#6B7280',
} as const;

// User Status Colors
export const USER_STATUS_COLORS = {
  PENDING_VERIFICATION: '#F59E0B',
  ACTIVE: '#10B981',
  SUSPENDED: '#EF4444',
  CLOSED: '#6B7280',
  EXPIRED: '#6B7280',
} as const;

// KYC Status Colors
export const KYC_STATUS_COLORS = {
  NOT_STARTED: '#6B7280',
  PENDING: '#F59E0B',
  APPROVED: '#10B981',
  REJECTED: '#EF4444',
  EXPIRED: '#6B7280',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  DATETIME: 'MMM dd, yyyy HH:mm',
  TIME: 'HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

// Currency
export const CURRENCY = {
  DEFAULT: 'USD',
  SUPPORTED: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
} as const;

// Limits
export const LIMITS = {
  MIN_AMOUNT: 1, // 1 cent
  MAX_AMOUNT: 10000000, // $100,000
  MIN_PIN_LENGTH: 4,
  MAX_PIN_LENGTH: 4,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  CARDS: '/cards',
  TRANSACTIONS: '/transactions',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Toast Durations
export const TOAST_DURATION = {
  SHORT: 3000,
  NORMAL: 5000,
  LONG: 8000,
} as const;
