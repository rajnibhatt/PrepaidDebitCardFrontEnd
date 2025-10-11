import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '@/store';
import { API_BASE_URL, API_TIMEOUT } from '@/utils/constants';
import { /* AuthResponse, */ ApiError } from '@/types';
import { tokenStorage } from '@/services/storage';

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  prepareHeaders: (headers, { /* getState */ }) => {
    // Get token from storage instead of Redux state
    const token = tokenStorage.getAccessToken();
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
    headers.set('content-type', 'application/json');
    headers.set('accept', 'application/json');
    
    return headers;
  },
  responseHandler: async (response) => {
    const data = await response.json();
    
    // Backend returns { success: true, data: ... } format
    if (data.success && data.data !== undefined) {
      return data.data;
    }
    
    // If not the expected format, return as is
    return data;
  },
});

// Base query with re-authentication
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      // No refresh token, logout user
      api.dispatch({ type: 'auth/logout' });
      return result;
    }
    
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );
    
    if (refreshResult.data) {
      // Backend returns { success: true, data: { accessToken, refreshToken } }
      const responseData = (refreshResult.data as any).data;
      const { accessToken, refreshToken: newRefreshToken } = responseData;
      
      // Update tokens in storage
      tokenStorage.setAccessToken(accessToken);
      if (newRefreshToken) {
        tokenStorage.setRefreshToken(newRefreshToken);
      }
      
      // Update the token in the store
      api.dispatch({
        type: 'auth/setTokens',
        payload: { accessToken, refreshToken: newRefreshToken || refreshToken },
      });
      
      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout user
      tokenStorage.clearTokens();
      api.dispatch({ type: 'auth/clearUser' });
    }
  }
  
  return result;
};

// Create the base API
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Card',
    'Transaction',
    'Ledger',
    'Audit',
  ],
  endpoints: () => ({}),
});

// Helper function to handle API errors
export const handleApiError = (error: any): ApiError => {
  if (error.status === 'FETCH_ERROR') {
    return {
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your connection.',
      statusCode: 0,
    };
  }
  
  if (error.status === 'TIMEOUT_ERROR') {
    return {
      code: 'TIMEOUT_ERROR',
      message: 'Request timeout. Please try again.',
      statusCode: 408,
    };
  }
  
  if (error.data) {
    const apiError = error.data as any;
    return {
      code: apiError.code || 'UNKNOWN_ERROR',
      message: apiError.message || 'An unexpected error occurred.',
      details: apiError.details,
      statusCode: error.status,
    };
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred.',
    statusCode: error.status || 500,
  };
};
