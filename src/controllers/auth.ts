import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants.js';
import { AppError } from '../utils/errors.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({
      where: { 
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      throw new AppError('Username or email already exists', 400);
    }

    const user = await User.create(req.body);
    
    const token = jwt.sign(
      { userId: user.id, username: user.username, roles: user.roles },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      token,
      type: 'Bearer',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, roles: user.roles },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      type: 'Bearer',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};