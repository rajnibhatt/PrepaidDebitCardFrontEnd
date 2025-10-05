import Cookies from 'js-cookie';
import { STORAGE_KEYS } from '@/utils/constants';

// const TOKEN_EXPIRY_DAYS = 7;
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

export const tokenStorage = {
  // Access Token (stored in memory for security)
  setAccessToken: (token: string): void => {
    // Store in sessionStorage for security (cleared when tab closes)
    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken: (): string | null => {
    return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  removeAccessToken: (): void => {
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Refresh Token (stored in httpOnly cookie via backend)
  setRefreshToken: (token: string): void => {
    // Store in secure cookie
    Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, token, {
      expires: REFRESH_TOKEN_EXPIRY_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: false, // Note: In production, this should be httpOnly and set by backend
    });
  },

  getRefreshToken: (): string | null => {
    return Cookies.get(STORAGE_KEYS.REFRESH_TOKEN) || null;
  },

  removeRefreshToken: (): void => {
    Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // Clear all tokens
  clearTokens: (): void => {
    tokenStorage.removeAccessToken();
    tokenStorage.removeRefreshToken();
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccessToken();
  },
};
