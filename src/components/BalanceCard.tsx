import React, { useState } from 'react';
import { Wallet, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { Account } from '../types/banking';

interface BalanceCardProps {
  balance: number;
  spent: number;
  accounts?: Account[];
  isLoading?: boolean;
  onViewAccounts: () => void;
  onSelectAccount?: (accountId: string) => void;
}

export default function BalanceCard({ 
  balance, 
  spent, 
  accounts = [], 
  isLoading = false, 
  onViewAccounts,
  onSelectAccount 
}: BalanceCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const totalBudget = balance + spent;
  const spentPercentage = totalBudget > 0 ? (spent / totalBudget) * 100 : 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 border border-primary-500/20 animate-pulse shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500/10 p-2 rounded-full">
              <Wallet className="w-6 h-6 text-primary-400/50" />
            </div>
            <div className="h-6 w-32 bg-background-700 rounded"></div>
          </div>
          <div className="h-4 w-24 bg-background-700 rounded"></div>
        </div>
        <div className="h-8 w-48 bg-background-700 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-background-700 rounded"></div>
          <div className="h-2 bg-background-700 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-primary-500/20 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500/10 p-2 rounded-full">
            <Wallet className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Total Balance</h2>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors text-sm"
          >
            View Accounts
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-primary-500/20 py-2 z-10">
              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => {
                    onSelectAccount?.(account.id);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-primary-500/5 transition-colors"
                >
                  <p className="font-medium text-gray-800">{account.name}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{account.type}</span>
                    <span className="text-sm font-medium text-primary-500">
                      {formatCurrency(account.balance)}
                    </span>
                  </div>
                </button>
              ))}
              <div className="border-t border-primary-500/10 mt-2 pt-2">
                <button
                  onClick={() => {
                    onViewAccounts();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-primary-500 hover:bg-primary-500/5 transition-colors text-center"
                >
                  View All Accounts →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-3xl font-bold text-gray-900 mb-4">
        {formatCurrency(balance)}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Spent</span>
          <span className="text-primary-500">{formatCurrency(spent)}</span>
        </div>
        <div className="h-2 bg-background-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${spentPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500">
          {spentPercentage.toFixed(1)}% of total budget spent
        </p>
      </div>
    </div>
  );
}