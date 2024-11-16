import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Account, Goal, Transaction } from '../types/banking';
import { getAccounts, getGoals, getTransactions } from '../services/banking';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BalanceCard from '../components/BalanceCard';
import GoalPreview from '../components/GoalPreview';
import RecentTransactions from '../components/RecentTransactions';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [accountsData, goalsData, transactionsData] = await Promise.all([
          getAccounts(),
          getGoals(),
          getTransactions()
        ]);
        setAccounts(accountsData);
        setGoals(goalsData);
        setTransactions(transactionsData);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalSpent = transactions
    .filter(t => t.type === 'WITHDRAWAL' && t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0);
  const topGoal = goals[0];
  const recentTransactions = transactions.slice(0, 5);

  const handleSelectAccount = (accountId: string) => {
    navigate(`/accounts/${accountId}`);
  };

  return (
    <div className="min-h-screen bg-background-900 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Here's your financial overview
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BalanceCard 
              balance={totalBalance}
              spent={totalSpent}
              accounts={accounts}
              isLoading={isLoading}
              onViewAccounts={() => navigate('/accounts')}
              onSelectAccount={handleSelectAccount}
            />

            {topGoal && (
              <GoalPreview 
                goal={topGoal}
                onViewAll={() => navigate('/goals')}
              />
            )}
          </div>

          <RecentTransactions 
            transactions={recentTransactions}
            isLoading={isLoading}
            onViewAll={() => navigate('/transactions')}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}