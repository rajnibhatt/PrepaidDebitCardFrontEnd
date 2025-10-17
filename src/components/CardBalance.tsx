import React from 'react';
import { useGetCardBalanceQuery } from '@/services/api/cardsApi';
import { Loading } from '@/components/ui/Loading';

interface CardBalanceProps {
  cardId: string;
  className?: string;
}

const CardBalance: React.FC<CardBalanceProps> = ({ cardId, className = '' }) => {
  const { data: balanceData, isLoading, error } = useGetCardBalanceQuery(cardId);

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Loading size="sm" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <p className="text-sm text-muted-foreground">Balance unavailable</p>
      </div>
    );
  }

  const balance = balanceData?.availableBalance || 0;
  const currency = balanceData?.currency || 'USD';

  return (
    <div className={className}>
      <p className="text-2xl font-bold text-card-foreground">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
        }).format(balance)}
      </p>
    </div>
  );
};

export default CardBalance;
