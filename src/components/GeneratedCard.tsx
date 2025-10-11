import React from 'react';
import { CheckCircleIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface GeneratedCardProps {
  cardData: {
    id: string;
    last4: string;
    network: string;
    type: string;
    balance: number;
    expiryMonth: number;
    expiryYear: number;
  };
  onClose: () => void;
}

const GeneratedCard: React.FC<GeneratedCardProps> = ({ cardData, onClose }) => {
  const getNetworkColor = (network: string) => {
    switch (network.toLowerCase()) {
      case 'visa':
        return 'from-blue-600 to-blue-800';
      case 'mastercard':
        return 'from-red-600 to-red-800';
      case 'amex':
        return 'from-blue-500 to-blue-700';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="modal-content rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-card-foreground mb-2">Card Created Successfully!</h3>
          <p className="text-muted-foreground">Your new prepaid card is ready to use</p>
        </div>

        {/* Card Display */}
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getNetworkColor(cardData.network)} p-6 text-white mb-6`}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/80 text-sm">Prepaid Card</p>
                <p className="text-lg font-semibold">{cardData.network}</p>
              </div>
              <CreditCardIcon className="h-8 w-8 text-white/80" />
            </div>

            <div className="mb-6">
              <p className="text-white/60 text-sm mb-1">Card Number</p>
              <p className="text-xl font-mono tracking-wider">**** **** **** {cardData.last4}</p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-sm mb-1">Expires</p>
                <p className="text-sm font-semibold">
                  {cardData.expiryMonth.toString().padStart(2, '0')}/{cardData.expiryYear}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm mb-1">Balance</p>
                <p className="text-lg font-bold">${cardData.balance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Details */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Card Type</span>
              <span className="text-card-foreground font-medium">{cardData.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network</span>
              <span className="text-card-foreground font-medium">{cardData.network}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Card ID</span>
              <span className="text-card-foreground font-mono text-sm">{cardData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initial Balance</span>
              <span className="text-card-foreground font-medium">${cardData.balance.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={onClose} className="w-full">
            Continue to Dashboard
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Your card is now active and ready to use for online and in-store purchases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneratedCard;
