import Budget from '../models/Budget.js';
import { AppError } from '../utils/errors.js';

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll({
      where: { userId: req.user.userId },
      order: [['startDate', 'DESC']]
    });

    res.json(budgets);
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ message: 'Failed to fetch budgets' });
  }
};

export const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!budget) {
      throw new AppError('Budget not found', 404);
    }

    res.json(budget);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Get budget error:', error);
      res.status(500).json({ message: 'Failed to fetch budget' });
    }
  }
};

export const createBudget = async (req, res) => {
  try {
    // Check for existing budget in same category and period
    const existingBudget = await Budget.findOne({
      where: {
        userId: req.user.userId,
        category: req.body.category,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      }
    });

    if (existingBudget) {
      throw new AppError('Budget already exists for this category and period', 400);
    }

    const budget = await Budget.create({
      ...req.body,
      userId: req.user.userId,
      spent: 0
    });

    res.status(201).json(budget);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Create budget error:', error);
      res.status(500).json({ message: 'Failed to create budget' });
    }
  }
};

export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!budget) {
      throw new AppError('Budget not found', 404);
    }

    const updatedBudget = await budget.update(req.body);
    res.json(updatedBudget);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Update budget error:', error);
      res.status(500).json({ message: 'Failed to update budget' });
    }
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!budget) {
      throw new AppError('Budget not found', 404);
    }

    await budget.destroy();
    res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Delete budget error:', error);
      res.status(500).json({ message: 'Failed to delete budget' });
    }
  }
};