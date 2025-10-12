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

  const balance = balanceData?.balance || 0;
  const currency = balanceData?.currency || 'USD';

  return (
    <div className={className}>
      <p className="text-2xl font-bold text-card-foreground">
        ${balance.toFixed(2)}
      </p>
    </div>
  );
};

export default CardBalance;
