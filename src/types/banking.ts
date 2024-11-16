export interface Account {
  id: string;
  userId: string;
  type: 'CHECKING' | 'SAVINGS';
  name: string;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description: string;
  category: TransactionCategory;
  date: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export type TransactionCategory = 
  | 'INCOME'
  | 'FOOD'
  | 'SHOPPING'
  | 'ENTERTAINMENT'
  | 'BILLS'
  | 'TRANSPORT'
  | 'HEALTH'
  | 'OTHER';

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: TransactionCategory;
  amount: number;
  spent: number;
  period: 'MONTHLY' | 'YEARLY';
  startDate: string;
  endDate: string;
}