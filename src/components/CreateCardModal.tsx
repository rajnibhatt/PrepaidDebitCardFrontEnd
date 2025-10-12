import React, { useState, useEffect } from 'react';
import { XMarkIcon, QrCodeIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';
import { StripeService } from '@/services/stripe';
import { tokenStorage } from '@/services/storage';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentData: any) => void;
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [step, setStep] = useState<'amount' | 'qr' | 'processing' | 'success'>('amount');
  const [amount, setAmount] = useState(50);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('amount');
      setAmount(50);
      setQrCodeDataURL('');
      setPaymentId('');
    }
  }, [isOpen]);

  // Check for payment completion when component mounts (when user returns from Stripe)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');
    
    if (payment === 'success' && sessionId) {
      // User returned from successful Stripe payment
      setPaymentId(sessionId);
      setIsCheckingPayment(true);
      checkPaymentCompletion();
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (payment === 'cancelled') {
      // User cancelled the payment
      toast.error('Payment was cancelled');
      setIsCheckingPayment(false);
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleAmountSubmit = async () => {
    if (amount < 50) {
      toast.error('Minimum amount is $50 for card creation');
      return;
    }

    try {
      toast('Creating payment session...', { icon: '⏳' });
      
      // Create a real Stripe checkout session
      const checkoutSession = await StripeService.createCheckoutSession(amount, 'USD', 'VIRTUAL');
      
      // Store the session info for tracking
      setPaymentId(checkoutSession.sessionId);
      
      // Generate QR code with the actual Stripe checkout URL
      const qrDataURL = await QRCode.toDataURL(checkoutSession.url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      setQrCodeDataURL(qrDataURL);
      setStep('qr');
      
      toast.success('Payment session created! Scan QR code or use manual payment.');
    } catch (error) {
      console.error('Payment session creation error:', error);
      toast.error('Failed to create payment session. Please try again.');
    }
  };

  const checkPaymentCompletion = async () => {
    if (!paymentId) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/payments/status/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${tokenStorage.getAccessToken()}`,
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        const status = result.data.status;
        
        if (status === 'succeeded') {
          handlePaymentComplete();
        } else if (status === 'failed' || status === 'cancelled') {
          toast.error('Payment was declined or cancelled');
          setIsCheckingPayment(false);
        } else if (status === 'pending' || status === 'processing') {
          // Payment is still being processed, check again in a few seconds
          setTimeout(checkPaymentCompletion, 2000);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      // Retry after a delay
      setTimeout(checkPaymentCompletion, 5000);
    }
  };

  const handlePaymentComplete = () => {
    setStep('processing');
    setIsCheckingPayment(false);
    
    // Simulate processing time
    setTimeout(() => {
      const paymentData = {
        id: paymentId,
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        status: 'succeeded',
        card: {
          last4: Math.floor(Math.random() * 9000) + 1000,
          brand: 'visa',
          exp_month: 12,
          exp_year: 2026
        }
      };
      
      setStep('success');
      toast.success('Payment successful!');
      
      setTimeout(() => {
        onPaymentSuccess(paymentData);
        onClose();
      }, 2000);
    }, 2000);
  };

  const handleManualPayment = () => {
    // In a real app, this would open Stripe Checkout or redirect to payment gateway
    toast.success('Redirecting to payment gateway...');
    
    // Simulate opening payment gateway
    setTimeout(() => {
      // Simulate successful payment after 3 seconds
      toast.success('Payment completed successfully!');
      handlePaymentComplete();
    }, 3000);
  };

  const handleStripePayment = async () => {
    try {
      toast('Creating checkout session...', { icon: '⏳' });
      
      // Create checkout session
      const checkoutSession = await StripeService.createCheckoutSession(amount, 'USD', 'VIRTUAL');
      
      toast('Redirecting to Stripe Checkout...', { icon: '💳' });
      
      // Store the amount and session info for when user returns
      // Set payment ID for status checking
      setPaymentId(checkoutSession.sessionId);
      
      // Initialize Stripe Checkout - this will redirect the user
      await StripeService.initializeCheckout(
        checkoutSession,
        () => {
          // This callback won't be called immediately since we're redirecting
          // The actual completion will be handled when user returns
        },
        (error) => {
          // Payment failed
          console.error('Payment failed:', error);
          toast.error(error.message || 'Payment failed. Please try again.');
        }
      );
    } catch (error: any) {
      console.error('Stripe payment error:', error);
      toast.error(error.message || 'Failed to process payment. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="modal-content rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Create New Card</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-card-foreground transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Step 1: Amount Input */}
        {step === 'amount' && (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCardIcon className="h-16 w-16 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-medium text-card-foreground mb-2">Add Funds to Your Card</h4>
              <p className="text-muted-foreground">Enter the amount you want to add to your new prepaid card. You can pay via QR code or manually with your debit/credit card.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  min="50"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                  placeholder="50.00"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minimum amount: $50.00</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="font-medium text-card-foreground mb-2">What happens next?</h5>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. A QR code will be generated for payment</li>
                <li>2. Scan the QR code with your phone</li>
                <li>3. Complete payment via Stripe</li>
                <li>4. Your new card will be created instantly</li>
              </ol>
            </div>

            <Button
              onClick={handleAmountSubmit}
              disabled={amount < 50}
              className="w-full"
            >
              <QrCodeIcon className="h-4 w-4 mr-2" />
              Continue to Payment Options
            </Button>
          </div>
        )}

        {/* Step 2: Payment Options */}
        {step === 'qr' && (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-lg font-medium text-card-foreground mb-2">Complete Payment</h4>
              <p className="text-muted-foreground">Choose your preferred payment method</p>
            </div>

            {/* Payment Amount Display */}
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Payment Amount</p>
              <p className="text-2xl font-bold text-card-foreground">${amount.toFixed(2)}</p>
            </div>

            {/* QR Code Option */}
            <div className="space-y-4">
              <div className="text-center">
                <h5 className="text-md font-medium text-card-foreground mb-2">Option 1: Scan QR Code</h5>
                <p className="text-sm text-muted-foreground mb-4">Scan with your phone's camera or payment app</p>
              </div>

              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg border border-border">
                  <img src={qrCodeDataURL} alt="Payment QR Code" className="w-48 h-48" />
                </div>
              </div>

              {isCheckingPayment && (
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>Waiting for payment...</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Manual Payment Options */}
            <div className="space-y-3">
              <div className="text-center">
                <h5 className="text-md font-medium text-card-foreground mb-2">Option 2: Manual Payment</h5>
                <p className="text-sm text-muted-foreground mb-4">Pay with your debit or credit card</p>
              </div>

              <Button
                onClick={handleStripePayment}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <CreditCardIcon className="h-4 w-4 mr-2" />
                Pay with Stripe (Credit/Debit Card)
              </Button>

              <Button
                variant="outline"
                onClick={handleManualPayment}
                className="w-full"
              >
                <QrCodeIcon className="h-4 w-4 mr-2" />
                Alternative Payment Gateway
              </Button>
            </div>

            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => setStep('amount')}
              className="w-full"
            >
              Change Amount
            </Button>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h4 className="text-lg font-medium text-card-foreground mb-2">Processing Payment</h4>
            <p className="text-muted-foreground">Creating your new prepaid card...</p>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="text-center py-8">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-card-foreground mb-2">Payment Successful!</h4>
            <p className="text-muted-foreground">Your new prepaid card is being created...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCardModal;
