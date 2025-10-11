import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CreditCardIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import CreateCardModal from '@/components/CreateCardModal';
import GeneratedCard from '@/components/GeneratedCard';

const CardsPage: React.FC = () => {
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [newCard, setNewCard] = useState<any>(null);

  // Mock data - in real app, this would come from API
  const cards = [
    {
      id: '1',
      last4: '1234',
      network: 'Visa',
      type: 'Virtual',
      status: 'Active',
      balance: 1250.50,
      expiryMonth: 12,
      expiryYear: 2026,
    },
    {
      id: '2',
      last4: '5678',
      network: 'Mastercard',
      type: 'Physical',
      status: 'Active',
      balance: 850.25,
      expiryMonth: 8,
      expiryYear: 2025,
    },
    {
      id: '3',
      last4: '9012',
      network: 'Visa',
      type: 'Virtual',
      status: 'Blocked',
      balance: 0.00,
      expiryMonth: 3,
      expiryYear: 2027,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'blocked':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getNetworkColor = (network: string) => {
    switch (network.toLowerCase()) {
      case 'visa':
        return 'bg-blue-600';
      case 'mastercard':
        return 'bg-red-600';
      case 'amex':
        return 'bg-blue-500';
      default:
        return 'bg-gray-600';
    }
  };

  const handleCreateCard = () => {
    setShowCreateCardModal(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    // Generate new card data
    const generatedCard = {
      id: `card_${Math.random().toString(36).substr(2, 9)}`,
      last4: paymentData.card.last4.toString(),
      network: paymentData.card.brand.charAt(0).toUpperCase() + paymentData.card.brand.slice(1),
      type: 'Virtual',
      status: 'Active',
      balance: paymentData.amount / 100, // Convert from cents
      expiryMonth: paymentData.card.exp_month,
      expiryYear: paymentData.card.exp_year,
    };
    
    setNewCard(generatedCard);
    setShowCreateCardModal(false);
  };

  const handleCloseGeneratedCard = () => {
    setNewCard(null);
    // In a real app, you would refresh the cards list here
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Cards</h1>
          <p className="text-text-secondary">Manage your prepaid debit cards</p>
        </div>
        <Button 
          onClick={handleCreateCard}
          className="flex items-center space-x-2"
        >
          <QrCodeIcon className="h-4 w-4" />
          <span>Create New Card</span>
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.id} className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-20 h-20 ${getNetworkColor(card.network)} rounded-bl-full opacity-20`} />
            
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-card-foreground">{card.network}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {card.type} Card • **** {card.last4}
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(card.status)}`}>
                  {card.status}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Balance */}
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-card-foreground">
                  ${card.balance.toFixed(2)}
                </p>
              </div>

              {/* Expiry */}
              <div>
                <p className="text-sm text-muted-foreground">Expires</p>
                <p className="text-sm font-medium text-card-foreground">
                  {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  {card.status === 'Active' ? 'Block' : 'Unblock'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {cards.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CreditCardIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">No cards yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first prepaid debit card to start managing your finances.
            </p>
            <Button onClick={handleCreateCard}>
              <QrCodeIcon className="h-4 w-4 mr-2" />
              Create Your First Card
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Card Modal */}
      <CreateCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Generated Card Modal */}
      {newCard && (
        <GeneratedCard
          cardData={newCard}
          onClose={handleCloseGeneratedCard}
        />
      )}
    </div>
  );
};

export default CardsPage;
