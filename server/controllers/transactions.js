import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';
import { AppError } from '../utils/errors.js';
import sequelize from '../config/database.js';

export const getTransactions = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const transactions = await Transaction.findAll({
      include: [{
        model: Account,
        where: { userId: req.user.userId },
        attributes: ['name', 'type']
      }],
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id },
      include: [{
        model: Account,
        where: { userId: req.user.userId },
        attributes: ['name', 'type']
      }]
    });

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    res.json(transaction);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Get transaction error:', error);
      res.status(500).json({ message: 'Failed to fetch transaction' });
    }
  }
};

export const createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { accountId, type, amount, description, category } = req.body;

    // Verify account ownership
    const account = await Account.findOne({
      where: {
        id: accountId,
        userId: req.user.userId
      },
      transaction: t
    });

    if (!account) {
      throw new AppError('Account not found', 404);
    }

    // Check sufficient funds for withdrawals
    if (type === 'WITHDRAWAL' && account.balance < amount) {
      throw new AppError('Insufficient funds', 400);
    }

    // Create transaction
    const transaction = await Transaction.create({
      accountId,
      type,
      amount,
      description,
      category,
      date: new Date(),
      status: 'COMPLETED'
    }, { transaction: t });

    // Update account balance
    const balanceChange = type === 'DEPOSIT' ? amount : -amount;
    await account.update({
      balance: account.balance + balanceChange
    }, { transaction: t });

    await t.commit();
    res.status(201).json(transaction);
  } catch (error) {
    await t.rollback();
    
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Create transaction error:', error);
      res.status(500).json({ message: 'Failed to create transaction' });
    }
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id },
      include: [{
        model: Account,
        where: { userId: req.user.userId }
      }]
    });

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    if (transaction.status === 'COMPLETED') {
      throw new AppError('Cannot modify completed transaction', 400);
    }

    const updatedTransaction = await transaction.update(req.body);
    res.json(updatedTransaction);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Update transaction error:', error);
      res.status(500).json({ message: 'Failed to update transaction' });
    }
  }
};

export const deleteTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id },
      include: [{
        model: Account,
        where: { userId: req.user.userId }
      }],
      transaction: t
    });

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    if (transaction.status === 'COMPLETED') {
      // Reverse the balance change
      const balanceChange = transaction.type === 'DEPOSIT' ? -transaction.amount : transaction.amount;
      await transaction.Account.update({
        balance: transaction.Account.balance + balanceChange
      }, { transaction: t });
    }

    await transaction.destroy({ transaction: t });
    await t.commit();
    res.status(204).send();
  } catch (error) {
    await t.rollback();
    
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Delete transaction error:', error);
      res.status(500).json({ message: 'Failed to delete transaction' });
    }
  }
};