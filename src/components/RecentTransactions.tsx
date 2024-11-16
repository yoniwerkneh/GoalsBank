import React from 'react';
import { ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Transaction } from '../types/banking';
import { formatCurrency } from '../utils/format';

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onViewAll: () => void;
}

export default function RecentTransactions({ transactions, isLoading = false, onViewAll }: RecentTransactionsProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 border border-primary-500/20 animate-pulse shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500/10 p-2 rounded-full">
              <RefreshCw className="w-6 h-6 text-primary-400/50" />
            </div>
            <div className="h-6 w-32 bg-background-700 rounded"></div>
          </div>
          <div className="h-4 w-24 bg-background-700 rounded"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-primary-500/10 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-background-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-background-700 rounded"></div>
                <div className="h-3 w-16 bg-background-700 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-16 bg-background-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-primary-500/20 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500/10 p-2 rounded-full">
            <RefreshCw className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
        </div>
        <button 
          onClick={onViewAll}
          className="text-primary-500 hover:text-primary-400 transition-colors text-sm"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map(transaction => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-primary-500/10 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'DEPOSIT' 
                  ? 'bg-green-500/10' 
                  : 'bg-red-500/10'
              }`}>
                {transaction.type === 'DEPOSIT' ? (
                  <ArrowDownLeft className={`w-5 h-5 ${
                    transaction.type === 'DEPOSIT'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`} />
                ) : (
                  <ArrowUpRight className={`w-5 h-5 ${
                    transaction.type === 'DEPOSIT'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`} />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className={`font-semibold ${
              transaction.type === 'DEPOSIT'
                ? 'text-green-500'
                : 'text-red-500'
            }`}>
              {transaction.type === 'DEPOSIT' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}