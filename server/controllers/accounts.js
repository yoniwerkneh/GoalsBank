import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';
import { AppError } from '../utils/errors.js';

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll({
      where: { userId: req.user.userId },
      order: [['createdAt', 'DESC']],
    });

    res.json(accounts);
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ message: 'Failed to fetch accounts' });
  }
};

export const getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!account) {
      throw new AppError('Account not found', 404);
    }

    res.json(account);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Get account error:', error);
      res.status(500).json({ message: 'Failed to fetch account' });
    }
  }
};

export const createAccount = async (req, res) => {
  try {
    const account = await Account.create({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(account);
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ message: 'Failed to create account' });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!account) {
      throw new AppError('Account not found', 404);
    }

    const updatedAccount = await account.update(req.body);
    res.json(updatedAccount);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Update account error:', error);
      res.status(500).json({ message: 'Failed to update account' });
    }
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!account) {
      throw new AppError('Account not found', 404);
    }

    if (account.balance > 0) {
      throw new AppError('Cannot delete account with positive balance', 400);
    }

    await account.destroy();
    res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Delete account error:', error);
      res.status(500).json({ message: 'Failed to delete account' });
    }
  }
};

export const getAccountTransactions = async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!account) {
      throw new AppError('Account not found', 404);
    }

    const transactions = await Transaction.findAll({
      where: { accountId: account.id },
      order: [['date', 'DESC']],
    });

    res.json(transactions);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Get account transactions error:', error);
      res.status(500).json({ message: 'Failed to fetch transactions' });
    }
  }
};