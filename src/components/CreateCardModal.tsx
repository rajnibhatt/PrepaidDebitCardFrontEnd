import React, { useState, useEffect } from 'react';
import { XMarkIcon, QrCodeIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';

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

  const handleAmountSubmit = async () => {
    if (amount < 50) {
      toast.error('Minimum amount is $50 for card creation');
      return;
    }

    try {
      // Generate a unique payment ID
      const newPaymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setPaymentId(newPaymentId);

      // Create Stripe payment link (in real app, this would be a real Stripe payment link)
      const stripePaymentLink = `https://checkout.stripe.com/pay/${newPaymentId}?amount=${amount * 100}&currency=usd&description=Prepaid+Card+Creation`;
      
      // Generate QR code
      const qrDataURL = await QRCode.toDataURL(stripePaymentLink, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setQrCodeDataURL(qrDataURL);
      setStep('qr');
      
      // Start checking for payment completion
      startPaymentCheck();
    } catch (error) {
      toast.error('Failed to generate QR code. Please try again.');
    }
  };

  const startPaymentCheck = () => {
    setIsCheckingPayment(true);
    
    // Simulate payment checking (in real app, this would poll your backend)
    const checkInterval = setInterval(() => {
      // Simulate payment completion after 10 seconds for demo
      if (Date.now() - parseInt(paymentId.split('_')[1]) > 10000) {
        clearInterval(checkInterval);
        handlePaymentComplete();
      }
    }, 2000);

    // Cleanup interval after 30 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      if (step === 'qr') {
        toast.error('Payment timeout. Please try again.');
        setStep('amount');
        setIsCheckingPayment(false);
      }
    }, 30000);
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
    // For demo purposes, simulate a successful payment
    handlePaymentComplete();
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
              <p className="text-muted-foreground">Enter the amount you want to add to your new prepaid card</p>
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
              Generate Payment QR Code
            </Button>
          </div>
        )}

        {/* Step 2: QR Code Display */}
        {step === 'qr' && (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-lg font-medium text-card-foreground mb-2">Scan to Pay</h4>
              <p className="text-muted-foreground">Scan this QR code with your phone to complete payment</p>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg">
                <img src={qrCodeDataURL} alt="Payment QR Code" className="w-48 h-48" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Amount: <span className="font-semibold text-card-foreground">${amount.toFixed(2)}</span></p>
              {isCheckingPayment && (
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>Waiting for payment...</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={handleManualPayment}
                className="w-full"
              >
                Complete Payment Manually (Demo)
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep('amount')}
                className="w-full"
              >
                Change Amount
              </Button>
            </div>
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
