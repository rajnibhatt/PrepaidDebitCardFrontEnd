import { baseApi } from './baseApi';
import {
  Card,
  CreateCardRequest,
  UpdateCardLimitsRequest,
  UpdateCardControlsRequest,
  UpdateCardPinRequest,
  CardBalance,
  CardStats,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

export const cardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user cards
    getCards: builder.query<Card[], void>({
      query: () => '/cards',
      providesTags: ['Card'],
    }),

    // Get card by ID
    getCard: builder.query<Card, string>({
      query: (id) => `/cards/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Card', id }],
    }),

    // Create new card
    createCard: builder.mutation<Card, CreateCardRequest>({
      query: (cardData) => ({
        url: '/cards',
        method: 'POST',
        body: cardData,
      }),
      invalidatesTags: ['Card'],
    }),

    // Update card limits
    updateCardLimits: builder.mutation<Card, { id: string; data: UpdateCardLimitsRequest }>({
      query: ({ id, data }) => ({
        url: `/cards/${id}/limits`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Card', id }],
    }),

    // Update card controls
    updateCardControls: builder.mutation<Card, { id: string; data: UpdateCardControlsRequest }>({
      query: ({ id, data }) => ({
        url: `/cards/${id}/controls`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Card', id }],
    }),

    // Update card PIN
    updateCardPin: builder.mutation<void, { id: string; data: UpdateCardPinRequest }>({
      query: ({ id, data }) => ({
        url: `/cards/${id}/pin`,
        method: 'PUT',
        body: data,
      }),
    }),

    // Activate card
    activateCard: builder.mutation<Card, string>({
      query: (id) => ({
        url: `/cards/${id}/activate`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Card', id }],
    }),

    // Block card
    blockCard: builder.mutation<Card, { id: string; reason?: string }>({
      query: ({ id, reason }) => ({
        url: `/cards/${id}/block`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Card', id }],
    }),

    // Unblock card
    unblockCard: builder.mutation<Card, string>({
      query: (id) => ({
        url: `/cards/${id}/unblock`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Card', id }],
    }),

    // Cancel card
    cancelCard: builder.mutation<Card, { id: string; reason?: string }>({
      query: ({ id, reason }) => ({
        url: `/cards/${id}/cancel`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Card', id }],
    }),

    // Get card balance
    getCardBalance: builder.query<CardBalance, string>({
      query: (id) => `/cards/${id}/balance`,
      providesTags: (_result, _error, id) => [{ type: 'Card', id, subType: 'Balance' }],
    }),

    // Top up card
    topUpCard: builder.mutation<{ sessionId: string; url: string }, { id: string; amount: number; currency?: string }>({
      query: ({ id, amount, currency = 'USD' }) => ({
        url: `/cards/${id}/top-up`,
        method: 'POST',
        body: { amount, currency },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Card', id, subType: 'Balance' },
        { type: 'Card', id }
      ],
    }),

    // Get card stats
    getCardStats: builder.query<CardStats, string>({
      query: (id) => `/cards/${id}/stats`,
      providesTags: (_result, _error, id) => [{ type: 'Card', id, subType: 'Stats' }],
    }),

    // Get card transactions
    getCardTransactions: builder.query<PaginatedResponse<any>, { id: string; params?: PaginationParams }>({
      query: ({ id, params }) => ({
        url: `/cards/${id}/transactions`,
        params,
      }),
      providesTags: (_result, _error, { id }) => [{ type: 'Transaction', id, subType: 'CardTransactions' }],
    }),

    // Request physical card
    requestPhysicalCard: builder.mutation<Card, { id: string; shippingAddress: any }>({
      query: ({ id, shippingAddress }) => ({
        url: `/cards/${id}/request-physical`,
        method: 'POST',
        body: { shippingAddress },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Card', id }],
    }),

    // Update shipping address
    updateShippingAddress: builder.mutation<Card, { id: string; shippingAddress: any }>({
      query: ({ id, shippingAddress }) => ({
        url: `/cards/${id}/shipping-address`,
        method: 'PUT',
        body: { shippingAddress },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Card', id }],
    }),

    // Get card PIN status
    getCardPinStatus: builder.query<{ hasPin: boolean; isLocked: boolean }, string>({
      query: (id) => `/cards/${id}/pin-status`,
      providesTags: (_result, _error, id) => [{ type: 'Card', id, subType: 'PinStatus' }],
    }),

    // Unlock card PIN
    unlockCardPin: builder.mutation<void, { id: string; data: { currentPin: string } }>({
      query: ({ id, data }) => ({
        url: `/cards/${id}/unlock-pin`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardQuery,
  useCreateCardMutation,
  useUpdateCardLimitsMutation,
  useUpdateCardControlsMutation,
  useUpdateCardPinMutation,
  useActivateCardMutation,
  useBlockCardMutation,
  useUnblockCardMutation,
  useCancelCardMutation,
  useGetCardBalanceQuery,
  useTopUpCardMutation,
  useGetCardStatsQuery,
  useGetCardTransactionsQuery,
  useRequestPhysicalCardMutation,
  useUpdateShippingAddressMutation,
  useGetCardPinStatusQuery,
  useUnlockCardPinMutation,
} = cardsApi;
