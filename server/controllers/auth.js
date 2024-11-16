import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User.js';
import { AppError } from '../utils/errors.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-256-bit-secret-key-here';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const register = async (req, res) => {
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

    const user = await User.create({
      ...req.body,
      roles: ['USER']
    });
    
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
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        roles: user.roles
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const login = async (req, res) => {
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
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        roles: user.roles
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};