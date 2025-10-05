import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const CardsPage: React.FC = () => {
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
        return 'text-green-600 bg-green-100';
      case 'blocked':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cards</h1>
          <p className="text-gray-600">Manage your prepaid debit cards</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Create New Card
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
                  <CardTitle className="text-lg">{card.network}</CardTitle>
                  <CardDescription>
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
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${card.balance.toFixed(2)}
                </p>
              </div>

              {/* Expiry */}
              <div>
                <p className="text-sm text-gray-500">Expires</p>
                <p className="text-sm font-medium text-gray-900">
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
            <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cards yet</h3>
            <p className="text-gray-500 mb-6">
              Create your first prepaid debit card to start managing your finances.
            </p>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Your First Card
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CardsPage;
