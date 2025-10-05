import { baseApi } from './baseApi';
import {
  Transaction,
  CreateTransactionRequest,
  TransactionFilters,
  TransactionStats,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user transactions
    getTransactions: builder.query<PaginatedResponse<Transaction>, PaginationParams & TransactionFilters>({
      query: (params) => ({
        url: '/transactions',
        params,
      }),
      providesTags: ['Transaction'],
    }),

    // Get transaction by ID
    getTransaction: builder.query<Transaction, string>({
      query: (id) => `/transactions/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Transaction', id }],
    }),

    // Create new transaction
    createTransaction: builder.mutation<Transaction, CreateTransactionRequest>({
      query: (transactionData) => ({
        url: '/transactions',
        method: 'POST',
        body: transactionData,
      }),
      invalidatesTags: ['Transaction', 'Card'],
    }),

    // Get transaction stats
    getTransactionStats: builder.query<TransactionStats, TransactionFilters>({
      query: (filters) => ({
        url: '/transactions/stats',
        params: filters,
      }),
      providesTags: ['Transaction'],
    }),

    // Get transactions by card
    getTransactionsByCard: builder.query<PaginatedResponse<Transaction>, { cardId: string; params?: PaginationParams & TransactionFilters }>({
      query: ({ cardId, params }) => ({
        url: `/transactions/card/${cardId}`,
        params,
      }),
      providesTags: (_result, _error, { cardId }) => [{ type: 'Transaction', id: cardId, subType: 'CardTransactions' }],
    }),

    // Get transactions by category
    getTransactionsByCategory: builder.query<PaginatedResponse<Transaction>, { category: string; params?: PaginationParams }>({
      query: ({ category, params }) => ({
        url: `/transactions/category/${category}`,
        params,
      }),
      providesTags: (_result, _error, { category }) => [{ type: 'Transaction', id: category, subType: 'CategoryTransactions' }],
    }),

    // Get transactions by date range
    getTransactionsByDateRange: builder.query<PaginatedResponse<Transaction>, { startDate: string; endDate: string; params?: PaginationParams }>({
      query: ({ startDate, endDate, params }) => ({
        url: '/transactions/date-range',
        params: { startDate, endDate, ...params },
      }),
      providesTags: ['Transaction'],
    }),

    // Search transactions
    searchTransactions: builder.query<PaginatedResponse<Transaction>, { query: string; params?: PaginationParams }>({
      query: ({ query, params }) => ({
        url: '/transactions/search',
        params: { q: query, ...params },
      }),
      providesTags: ['Transaction'],
    }),

    // Export transactions
    exportTransactions: builder.mutation<Blob, { format: 'csv' | 'pdf' | 'excel'; filters?: TransactionFilters }>({
      query: ({ format, filters }) => ({
        url: '/transactions/export',
        method: 'POST',
        body: { format, filters },
        responseHandler: (response: any) => response.blob(),
      }),
    }),

    // Get transaction categories
    getTransactionCategories: builder.query<Array<{ category: string; count: number; totalAmount: number }>, void>({
      query: () => '/transactions/categories',
      providesTags: ['Transaction'],
    }),

    // Get monthly spending
    getMonthlySpending: builder.query<Array<{ month: string; amount: number; count: number }>, { year?: number }>({
      query: ({ year }) => ({
        url: '/transactions/monthly-spending',
        params: { year },
      }),
      providesTags: ['Transaction'],
    }),

    // Get daily spending
    getDailySpending: builder.query<Array<{ date: string; amount: number; count: number }>, { month?: string; year?: number }>({
      query: ({ month, year }) => ({
        url: '/transactions/daily-spending',
        params: { month, year },
      }),
      providesTags: ['Transaction'],
    }),

    // Get spending by merchant
    getSpendingByMerchant: builder.query<Array<{ merchantName: string; amount: number; count: number }>, { limit?: number }>({
      query: ({ limit = 10 }) => ({
        url: '/transactions/spending-by-merchant',
        params: { limit },
      }),
      providesTags: ['Transaction'],
    }),

    // Get spending by category
    getSpendingByCategory: builder.query<Array<{ category: string; amount: number; count: number }>, { limit?: number }>({
      query: ({ limit = 10 }) => ({
        url: '/transactions/spending-by-category',
        params: { limit },
      }),
      providesTags: ['Transaction'],
    }),

    // Refund transaction
    refundTransaction: builder.mutation<Transaction, { id: string; amount?: number; reason?: string }>({
      query: ({ id, amount, reason }) => ({
        url: `/transactions/${id}/refund`,
        method: 'POST',
        body: { amount, reason },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Transaction', id }],
    }),

    // Dispute transaction
    disputeTransaction: builder.mutation<Transaction, { id: string; reason: string; description?: string }>({
      query: ({ id, reason, description }) => ({
        url: `/transactions/${id}/dispute`,
        method: 'POST',
        body: { reason, description },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Transaction', id }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useCreateTransactionMutation,
  useGetTransactionStatsQuery,
  useGetTransactionsByCardQuery,
  useGetTransactionsByCategoryQuery,
  useGetTransactionsByDateRangeQuery,
  useSearchTransactionsQuery,
  useExportTransactionsMutation,
  useGetTransactionCategoriesQuery,
  useGetMonthlySpendingQuery,
  useGetDailySpendingQuery,
  useGetSpendingByMerchantQuery,
  useGetSpendingByCategoryQuery,
  useRefundTransactionMutation,
  useDisputeTransactionMutation,
} = transactionsApi;
