import Goal from '../models/Goal.js';
import { AppError } from '../utils/errors.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { userId: req.user.userId },
      order: [['deadline', 'ASC']]
    });

    res.json(goals);
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
};

export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!goal) {
      throw new AppError('Goal not found', 404);
    }

    res.json(goal);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Get goal error:', error);
      res.status(500).json({ message: 'Failed to fetch goal' });
    }
  }
};

export const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      userId: req.user.userId,
      currentAmount: 0,
      status: 'ACTIVE'
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({ message: 'Failed to create goal' });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!goal) {
      throw new AppError('Goal not found', 404);
    }

    // Check if goal is completed when updating currentAmount
    if (req.body.currentAmount && req.body.currentAmount >= goal.targetAmount) {
      req.body.status = 'COMPLETED';
    }

    const updatedGoal = await goal.update(req.body);
    res.json(updatedGoal);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Update goal error:', error);
      res.status(500).json({ message: 'Failed to update goal' });
    }
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!goal) {
      throw new AppError('Goal not found', 404);
    }

    await goal.destroy();
    res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Delete goal error:', error);
      res.status(500).json({ message: 'Failed to delete goal' });
    }
  }
};