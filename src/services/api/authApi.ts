import { baseApi } from './baseApi';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ChangePasswordData,
  ForgotPasswordData,
  ResetPasswordData,
  User,
  TotpSetup,
} from '@/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => {
        // Backend returns { success: true, data: { accessToken, refreshToken, user } }
        return response.data;
      },
      invalidatesTags: ['User'],
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // Refresh token
    refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
      transformResponse: (response: any) => {
        // Backend returns { success: true, data: { accessToken, refreshToken } }
        return response.data;
      },
    }),

    // Change password
    changePassword: builder.mutation<void, ChangePasswordData>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Forgot password
    forgotPassword: builder.mutation<void, ForgotPasswordData>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<void, ResetPasswordData>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Verify email
    verifyEmail: builder.mutation<void, { token: string }>({
      query: ({ token }) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { token },
      }),
    }),

    // Resend verification email
    resendVerificationEmail: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/resend-verification',
        method: 'POST',
      }),
    }),

    // TOTP setup
    setupTotp: builder.mutation<TotpSetup, void>({
      query: () => ({
        url: '/auth/totp/setup',
        method: 'POST',
      }),
    }),

    // TOTP verify
    verifyTotp: builder.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: '/auth/totp/verify',
        method: 'POST',
        body: { code },
      }),
    }),

    // TOTP disable
    disableTotp: builder.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: '/auth/totp/disable',
        method: 'POST',
        body: { code },
      }),
    }),

    // WebAuthn register
    registerWebAuthn: builder.mutation<any, any>({
      query: (data) => ({
        url: '/auth/webauthn/register',
        method: 'POST',
        body: data,
      }),
    }),

    // WebAuthn authenticate
    authenticateWebAuthn: builder.mutation<any, any>({
      query: (data) => ({
        url: '/auth/webauthn/authenticate',
        method: 'POST',
        body: data,
      }),
    }),

    // Get current user
    getCurrentUser: builder.query<User, void>({
      query: () => '/users/profile',
      transformResponse: (response: any) => {
        // Backend returns { success: true, data: { user } }
        return response.data;
      },
      providesTags: ['User'],
    }),

    // Google OAuth
    googleAuth: builder.mutation<AuthResponse, { code: string }>({
      query: ({ code }) => ({
        url: '/auth/google',
        method: 'POST',
        body: { code },
      }),
      invalidatesTags: ['User'],
    }),

    // Microsoft OAuth
    microsoftAuth: builder.mutation<AuthResponse, { code: string }>({
      query: ({ code }) => ({
        url: '/auth/microsoft',
        method: 'POST',
        body: { code },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useSetupTotpMutation,
  useVerifyTotpMutation,
  useDisableTotpMutation,
  useRegisterWebAuthnMutation,
  useAuthenticateWebAuthnMutation,
  useGetCurrentUserQuery,
  useGoogleAuthMutation,
  useMicrosoftAuthMutation,
} = authApi;
