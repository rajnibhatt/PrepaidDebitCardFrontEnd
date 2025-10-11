import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ArrowDownTrayIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const TransactionsPage: React.FC = () => {
  // Mock data - in real app, this would come from API
  const transactions = [
    {
      id: '1',
      description: 'Coffee Shop',
      amount: -4.50,
      date: '2024-01-15T10:30:00Z',
      category: 'Food & Dining',
      status: 'Completed',
      cardLast4: '1234',
    },
    {
      id: '2',
      description: 'Gas Station',
      amount: -45.20,
      date: '2024-01-14T14:15:00Z',
      category: 'Gas & Fuel',
      status: 'Completed',
      cardLast4: '5678',
    },
    {
      id: '3',
      description: 'Salary Deposit',
      amount: 2500.00,
      date: '2024-01-14T09:00:00Z',
      category: 'Deposit',
      status: 'Completed',
      cardLast4: '1234',
    },
    {
      id: '4',
      description: 'Online Purchase',
      amount: -89.99,
      date: '2024-01-13T16:45:00Z',
      category: 'Shopping',
      status: 'Completed',
      cardLast4: '5678',
    },
    {
      id: '5',
      description: 'ATM Withdrawal',
      amount: -100.00,
      date: '2024-01-12T11:20:00Z',
      category: 'ATM',
      status: 'Completed',
      cardLast4: '1234',
    },
    {
      id: '6',
      description: 'Restaurant',
      amount: -32.75,
      date: '2024-01-11T19:30:00Z',
      category: 'Food & Dining',
      status: 'Completed',
      cardLast4: '5678',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food & dining':
        return '🍽️';
      case 'gas & fuel':
        return '⛽';
      case 'shopping':
        return '🛍️';
      case 'deposit':
        return '💰';
      case 'atm':
        return '🏧';
      default:
        return '📦';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search transactions..."
                leftIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>All Categories</option>
                <option>Food & Dining</option>
                <option>Gas & Fuel</option>
                <option>Shopping</option>
                <option>Deposit</option>
                <option>ATM</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>All Cards</option>
                <option>**** 1234</option>
                <option>**** 5678</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {transactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">
                          {getCategoryIcon(transaction.category)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>**** {transaction.cardLast4}</span>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                    <div className={`text-right ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      <p className="text-sm font-medium">
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {transactions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BanknotesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-500">
              Your transaction history will appear here once you start using your cards.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransactionsPage;
