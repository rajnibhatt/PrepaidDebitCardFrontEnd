import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetCurrentUserQuery } from '@/services/api';
import { setUser, clearUser, setLoading, setError, setTokens, clearTokens, selectIsAuthenticated } from '@/store/authSlice';
import { tokenStorage, userStorage } from '@/services/storage';
import { LoginCredentials, RegisterData, User } from '@/types';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegistering }] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  
  // Get current user query
  const { data: currentUser, isLoading: isLoadingUser, error: userError } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !tokenStorage.isAuthenticated(),
    }
  );

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch(setLoading(true));
      
      try {
        const storedUser = userStorage.getUser();
        const accessToken = tokenStorage.getAccessToken();
        const refreshToken = tokenStorage.getRefreshToken();
        
        if (storedUser && accessToken) {
          // Both user and token exist - user is authenticated
          dispatch(setTokens({ accessToken, refreshToken: refreshToken || '' }));
          dispatch(setUser(storedUser));
        } else if (storedUser && !accessToken && refreshToken) {
          // User exists but access token is missing - try to refresh
          console.log('Access token missing, attempting to refresh...');
          // The getCurrentUserQuery will handle token refresh automatically
          dispatch(setTokens({ accessToken: '', refreshToken }));
          dispatch(setUser(storedUser));
        } else {
          // No valid authentication state - clear everything
          console.log('No valid authentication state, clearing...');
          tokenStorage.clearTokens();
          userStorage.removeUser();
          dispatch(clearUser());
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch(setError('Failed to initialize authentication'));
        // Clear invalid state on error
        tokenStorage.clearTokens();
        userStorage.removeUser();
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Update user when current user query succeeds
  useEffect(() => {
    if (currentUser) {
      dispatch(setUser(currentUser));
      userStorage.setUser(currentUser);
    }
  }, [currentUser, dispatch]);

  // Handle user query error
  useEffect(() => {
    if (userError) {
      console.error('User query error:', userError);
      // If we get an error fetching user, clear auth state
      tokenStorage.clearTokens();
      userStorage.removeUser();
      dispatch(clearUser());
    }
  }, [userError, dispatch]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await loginMutation(credentials).unwrap();
      
      // Store tokens and user data
      tokenStorage.setAccessToken(response.accessToken);
      tokenStorage.setRefreshToken(response.refreshToken);
      userStorage.setUser(response.user);
      
      // Update Redux state with tokens and user
      dispatch(setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      }));
      dispatch(setUser(response.user));
      
      toast.success('Login successful!');
      return true;
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Login failed. Please try again.';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, loginMutation]);

  const register = useCallback(async (userData: RegisterData): Promise<boolean> => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await registerMutation(userData).unwrap();
      
      // Store tokens and user data
      tokenStorage.setAccessToken(response.accessToken);
      tokenStorage.setRefreshToken(response.refreshToken);
      userStorage.setUser(response.user);
      
      dispatch(setUser(response.user));
      
      toast.success('Registration successful!');
      return true;
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Registration failed. Please try again.';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, registerMutation]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data regardless of API call result
      tokenStorage.clearTokens();
      userStorage.removeUser();
      dispatch(clearTokens());
      dispatch(clearUser());
      toast.success('Logged out successfully');
    }
  }, [dispatch, logoutMutation]);

  const updateUser = useCallback((userUpdates: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userUpdates };
      dispatch(setUser(updatedUser));
      userStorage.setUser(updatedUser);
    }
  }, [dispatch, user]);

  const clearError = useCallback((): void => {
    dispatch(setError(null));
  }, [dispatch]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoading || isLoggingIn || isRegistering || isLoadingUser,
    error,
    
    // Actions
    login,
    register,
    logout,
    updateUser,
    clearError,
  };
};
