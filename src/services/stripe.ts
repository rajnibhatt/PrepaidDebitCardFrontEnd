import { loadStripe, Stripe } from '@stripe/stripe-js';
import { tokenStorage, userStorage } from '@/services/storage';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

export class StripeService {
  private static stripe: Promise<Stripe | null> = stripePromise;

  /**
   * Handle 401 Unauthorized errors by clearing auth state
   */
  private static handleUnauthorized() {
    console.log('StripeService: Token expired, clearing auth state');
    tokenStorage.clearTokens();
    userStorage.removeUser();
    
    // Dispatch logout action to Redux store
    // We need to access the store to dispatch the action
    if (typeof window !== 'undefined' && (window as any).__REDUX_STORE__) {
      (window as any).__REDUX_STORE__.dispatch({ type: 'auth/clearUser' });
    }
    
    // Redirect to login page
    window.location.href = '/login';
  }

  /**
   * Initialize Stripe Checkout for card funding
   */
  static async initializeCheckout(
    checkoutData: { sessionId: string; url: string },
    onSuccess?: (session: any) => void,
    onError?: (error: any) => void
  ) {
    try {
      // In Stripe.js v8+ (Clover), redirectToCheckout is deprecated
      // We redirect directly to the checkout URL provided by the backend
      const { url } = checkoutData;
      
      if (!url) {
        throw new Error('No checkout URL provided');
      }
      
      // Redirect to Stripe Checkout
      window.location.href = url;
      
      // Call success callback immediately since redirect is happening
      onSuccess?.(null);
    } catch (error) {
      console.error('Stripe checkout error:', error);
      onError?.(error);
    }
  }

  /**
   * Create a checkout session for card funding
   */
  static async createCheckoutSession(amount: number, currency: string = 'USD', cardType: string = 'VIRTUAL') {
    try {
      const accessToken = tokenStorage.getAccessToken();
      console.log('StripeService: Access token found:', !!accessToken);
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch('http://localhost:8000/api/v1/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          cardType,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, handle unauthorized
          this.handleUnauthorized();
          throw new Error('Session expired. Please log in again.');
        }
        
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Backend returns nested data structure: { success: true, data: { success: true, data: { ... } } }
      return result.data.data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  /**
   * Create a payment intent for card funding (legacy)
   */
  static async createPaymentIntent(amount: number, currency: string = 'USD', cardType: string = 'VIRTUAL') {
    try {
      const accessToken = tokenStorage.getAccessToken();
      console.log('StripeService: Access token found:', !!accessToken);
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch('http://localhost:8000/api/v1/payments/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          cardType,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, handle unauthorized
          this.handleUnauthorized();
          throw new Error('Session expired. Please log in again.');
        }
        
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Backend returns nested data structure: { success: true, data: { success: true, data: { ... } } }
      return result.data.data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Get payment intent status
   */
  static async getPaymentIntentStatus(paymentIntentId: string) {
    try {
      const accessToken = tokenStorage.getAccessToken();
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch(`http://localhost:8000/api/v1/payments/intent/${paymentIntentId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, handle unauthorized
          this.handleUnauthorized();
          throw new Error('Session expired. Please log in again.');
        }
        
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Backend returns nested data structure: { success: true, data: { success: true, data: { ... } } }
      return result.data.data;
    } catch (error) {
      console.error('Error getting payment intent status:', error);
      throw error;
    }
  }
}
