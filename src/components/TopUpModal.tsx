import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTopUpCardMutation } from '@/services/api/cardsApi';
import { toast } from 'react-hot-toast';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: string;
  cardToken: string;
}

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose, cardId, cardToken }) => {
  const [amount, setAmount] = useState('');
  const [topUpCard, { isLoading }] = useTopUpCardMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const result = await topUpCard({
        id: cardId,
        amount: parseFloat(amount),
        currency: 'USD'
      }).unwrap();

      // Redirect to Stripe checkout
      window.location.href = result.url;
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create top-up session');
    }
  };

  const handleClose = () => {
    setAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="modal-content rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Add Money to Card</h3>
            <p className="text-sm text-muted-foreground">
              Add funds to your card ending in {cardToken.slice(-4)}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-card-foreground transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-card-foreground">
              Amount (USD)
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isLoading || !amount}
            >
              {isLoading ? 'Adding...' : 'Add Money'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopUpModal;
