import React, { useState } from 'react';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import VisaLogo from '@/assets/images/visa_white_logo.svg';
import ChipLogo from '@/assets/images/chip_golden.svg';

interface CardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: {
    id: string;
    cardToken: string;
    last4: string;
    network: string;
    type: string;
    status: string;
    expiryMonth: number;
    expiryYear: number;
    cardholderName?: string;
    dailyLimit: number;
    monthlyLimit: number;
    transactionLimit: number;
    allowOnlineTransactions: boolean;
    allowAtmTransactions: boolean;
    allowInternationalTransactions: boolean;
    allowGambling: boolean;
    allowCashback: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({ isOpen, onClose, card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  if (!isOpen) return null;

  // Generate a realistic card number (for demo purposes)
  const generateCardNumber = () => {
    const prefixes = {
      visa: '4',
      mastercard: '5',
      amex: '3',
      discover: '6'
    };
    
    const prefix = prefixes[card.network.toLowerCase() as keyof typeof prefixes] || '4';
    const middleDigits = '234 5678 9012';
    return `${prefix}${middleDigits} ${card.last4}`;
  };

  // Generate a realistic CVV
  const generateCVV = () => {
    return card.network.toLowerCase() === 'amex' ? '1234' : '123';
  };

  const getCardGradient = () => {
    // All cards use the same dark charcoal gray design as per Figma
    return 'from-gray-800 to-gray-900';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Card Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Card Display */}
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div 
              className="relative w-[420px] h-60 cursor-pointer transition-transform duration-700 transform-style-preserve-3d"
              // onClick={() => setIsFlipped(!isFlipped)}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Card Front */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)'
                }}
              >
                <Card className={`w-full h-full bg-gradient-to-br ${getCardGradient()} text-white overflow-hidden relative shadow-2xl rounded-2xl`}>
                  {/* Subtle circular gradient as per Figma */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-radial from-gray-700 via-transparent to-transparent opacity-30"></div>
                  </div>
                  
                  <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
                    {/* Top Section - Finaci and VISA */}
                    <div className="flex justify-between items-start">
                      <div className="text-xl font-semibold text-white">
                        <i>PrePay</i>
                      </div>
                      <div className="flex items-center">
                        <img src={VisaLogo} alt="VISA" className="h-6" />
                      </div>
                    </div>

                    {/* Middle Section - Card Number */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div 
                        className="text-2xl font-semibold tracking-[0.15em] mb-2 mt-4 cursor-pointer hover:opacity-80 transition-opacity text-white"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                      >
                        {showCardNumber ? generateCardNumber() : `**** **** **** ${card.last4}`}
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex justify-between items-end">
                      {/* Left side - Chip and Cardholder */}
                      <div className="flex flex-col">
                        {/* EMV Chip */}
                        <div className="mb-4">
                          <img src={ChipLogo} alt="EMV Chip" className="w-12 h-10" />
                        </div>
                        
                        {/* Cardholder Name */}
                        <div>
                          <div className="text-xs text-white opacity-80 mb-1">Card Holder name</div>
                          <div className="text-sm font-semibold text-white">
                            {card.cardholderName || 'Rajni Bhatt'}
                          </div>
                        </div>
                      </div>

                      {/* Right side - Expiry Date */}
                      <div className="text-right">
                        <div className="text-xs text-white opacity-80 mb-1">Expiry Date</div>
                        <div className="text-sm font-semibold text-white">
                          {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear.toString().slice(-2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Card Back */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <Card className={`w-full h-full bg-gradient-to-br ${getCardGradient()} text-white overflow-hidden relative shadow-2xl rounded-2xl`}>
                  {/* Subtle circular gradient as per Figma */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-radial from-gray-700 via-transparent to-transparent opacity-30"></div>
                  </div>

                  {/* Magnetic Strip */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-black"></div>
                  
                  {/* CVV Strip */}
                  <div className="absolute top-20 left-0 right-0 h-12 bg-white flex items-center justify-end pr-6">
                    <div className="text-black font-mono text-xl font-bold">
                      {generateCVV()}
                    </div>
                  </div>
                  
                  <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
                    {/* Signature Panel */}
                    <div className="mt-28 bg-white h-16 rounded-lg flex items-center px-6 shadow-sm">
                      <div className="text-black text-base font-semibold tracking-wide">
                        {card.cardholderName || 'CARDHOLDER SIGNATURE'}
                      </div>
                    </div>
                    
                    {/* Bottom Info */}
                    <div className="text-xs opacity-80 text-center leading-relaxed">
                      This card is property of Finaci Inc. If found, please return to any branch.
                      <br />
                      Authorized signature required for all transactions.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Flip Instructions */}
          <div className="text-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center space-x-2 mx-auto"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>{isFlipped ? 'Show Front' : 'Show Back'}</span>
            </Button>
          </div>

          {/* Card Limits */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Card Limits</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Limit:</span>
                  <span className="font-medium">{formatCurrency(card.dailyLimit)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Limit:</span>
                  <span className="font-medium">{formatCurrency(card.monthlyLimit)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction Limit:</span>
                  <span className="font-medium">{formatCurrency(card.transactionLimit)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {/* <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;
