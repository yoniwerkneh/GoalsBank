import User from '../models/User.js';
import { AppError } from '../utils/errors.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json(user);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { password, roles, ...updateData } = req.body;
    await user.update(updateData);

    res.json({
      message: 'Profile updated successfully',
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
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};