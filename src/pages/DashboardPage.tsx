import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      name: 'Total Balance',
      value: '$2,450.00',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: BanknotesIcon,
    },
    {
      name: 'Active Cards',
      value: '3',
      change: '+1',
      changeType: 'increase' as const,
      icon: CreditCardIcon,
    },
    {
      name: 'Monthly Spending',
      value: '$1,234.56',
      change: '-5.2%',
      changeType: 'decrease' as const,
      icon: ChartBarIcon,
    },
    {
      name: 'Transactions',
      value: '47',
      change: '+8',
      changeType: 'increase' as const,
      icon: ArrowUpIcon,
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      description: 'Coffee Shop',
      amount: -4.50,
      date: '2024-01-15',
      category: 'Food & Dining',
    },
    {
      id: '2',
      description: 'Gas Station',
      amount: -45.20,
      date: '2024-01-14',
      category: 'Gas & Fuel',
    },
    {
      id: '3',
      description: 'Salary Deposit',
      amount: 2500.00,
      date: '2024-01-14',
      category: 'Deposit',
    },
    {
      id: '4',
      description: 'Online Purchase',
      amount: -89.99,
      date: '2024-01-13',
      category: 'Shopping',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your account.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-foreground">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'increase' ? (
                          <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                        )}
                        <span className="sr-only">
                          {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                        </span>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest account activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          {transaction.category.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-foreground'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <CreditCardIcon className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">View Cards</span>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <BanknotesIcon className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">Add Money</span>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <ChartBarIcon className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">View Reports</span>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <ArrowUpIcon className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">Transfer</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
