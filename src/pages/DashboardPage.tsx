import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useGetCardsQuery } from '@/services/api/cardsApi';
import { useGetTransactionsQuery } from '@/services/api/transactionsApi';
import { useGetCurrentUserQuery } from '@/services/api/authApi';

const DashboardPage: React.FC = () => {
  // Fetch real data from APIs
  const { data: cards, isLoading: cardsLoading, error: cardsError } = useGetCardsQuery();
  const { data: transactionsData, isLoading: transactionsLoading, error: transactionsError } = useGetTransactionsQuery({
    page: 1,
    limit: 5, // Get recent 5 transactions
  });
  const { data: user, isLoading: userLoading, error: userError } = useGetCurrentUserQuery();

  const isLoading = cardsLoading || transactionsLoading || userLoading;
  const hasError = cardsError || transactionsError || userError;
  
  // Ensure we have arrays even if API calls fail
  const safeCards = Array.isArray(cards) ? cards : [];
  const recentTransactions = Array.isArray((transactionsData as any)?.transactions) ? (transactionsData as any).transactions : [];

  // Calculate stats from real data
  const activeCards = safeCards.filter(card => card.status === 'active').length;
  // Note: Balance would need to be fetched separately from card balance API
  const totalBalance = 0; // safeCards.reduce((sum, card) => sum + (card.balance || 0), 0);
  const monthlySpending = recentTransactions
    .filter((t: any) => t.amount < 0)
    .reduce((sum: any, t: any) => sum + Math.abs(t.amount), 0);

  const stats = [
    {
      name: 'Total Balance',
      value: `$${totalBalance.toFixed(2)}`,
      change: '+0%', // This would need historical data to calculate
      changeType: 'increase' as const,
      icon: BanknotesIcon,
    },
    {
      name: 'Active Cards',
      value: activeCards.toString(),
      change: '+0', // This would need historical data to calculate
      changeType: 'increase' as const,
      icon: CreditCardIcon,
    },
    {
      name: 'Recent Spending',
      value: `$${monthlySpending.toFixed(2)}`,
      change: '-0%', // This would need historical data to calculate
      changeType: 'decrease' as const,
      icon: ChartBarIcon,
    },
    {
      name: 'Total Transactions',
      value: transactionsData?.total?.toString() || '0',
      change: '+0', // This would need historical data to calculate
      changeType: 'increase' as const,
      icon: ArrowUpIcon,
    },
  ];


  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your account.</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your account.</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load dashboard data</p>
            <p className="text-sm text-muted-foreground mb-4">
              {cardsError && 'Cards: Failed to load'}
              {transactionsError && 'Transactions: Failed to load'}
              {userError && 'User: Failed to load'}
            </p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back{user?.firstName ? `, ${user.firstName}` : ''}! Here's what's happening with your account.</p>
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
              {recentTransactions.map((transaction: any) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          {(transaction.category || 'U').charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category || 'Unknown'} • {new Date(transaction.createdAt).toLocaleDateString()}
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
