import api from './api';
import { Account, Transaction, Goal, Budget } from '../types/banking';

// Accounts
export const getAccounts = async (): Promise<Account[]> => {
  const response = await api.get('/accounts');
  return response.data;
};

export const getAccount = async (id: string): Promise<Account> => {
  const response = await api.get(`/accounts/${id}`);
  return response.data;
};

export const createAccount = async (data: Partial<Account>): Promise<Account> => {
  const response = await api.post('/accounts', data);
  return response.data;
};

export const updateAccount = async (id: string, data: Partial<Account>): Promise<Account> => {
  const response = await api.put(`/accounts/${id}`, data);
  return response.data;
};

export const deleteAccount = async (id: string): Promise<void> => {
  await api.delete(`/accounts/${id}`);
};

// Transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data;
};

export const getRecentTransactions = async (limit: number = 5): Promise<Transaction[]> => {
  const response = await api.get(`/transactions?limit=${limit}`);
  return response.data;
};

export const getTransaction = async (id: string): Promise<Transaction> => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (data: Partial<Transaction>): Promise<Transaction> => {
  const response = await api.post('/transactions', data);
  return response.data;
};

export const updateTransaction = async (id: string, data: Partial<Transaction>): Promise<Transaction> => {
  const response = await api.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

// Goals
export const getGoals = async (): Promise<Goal[]> => {
  const response = await api.get('/goals');
  return response.data;
};

export const getGoal = async (id: string): Promise<Goal> => {
  const response = await api.get(`/goals/${id}`);
  return response.data;
};

export const createGoal = async (data: Partial<Goal>): Promise<Goal> => {
  const response = await api.post('/goals', data);
  return response.data;
};

export const updateGoal = async (id: string, data: Partial<Goal>): Promise<Goal> => {
  const response = await api.put(`/goals/${id}`, data);
  return response.data;
};

export const deleteGoal = async (id: string): Promise<void> => {
  await api.delete(`/goals/${id}`);
};

// Budgets
export const getBudgets = async (): Promise<Budget[]> => {
  const response = await api.get('/budgets');
  return response.data;
};

export const getBudget = async (id: string): Promise<Budget> => {
  const response = await api.get(`/budgets/${id}`);
  return response.data;
};

export const createBudget = async (data: Partial<Budget>): Promise<Budget> => {
  const response = await api.post('/budgets', data);
  return response.data;
};

export const updateBudget = async (id: string, data: Partial<Budget>): Promise<Budget> => {
  const response = await api.put(`/budgets/${id}`, data);
  return response.data;
};

export const deleteBudget = async (id: string): Promise<void> => {
  await api.delete(`/budgets/${id}`);
};