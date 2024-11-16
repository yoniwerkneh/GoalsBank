import { z } from 'zod';

const registrationSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  roles: z.array(z.string()).optional()
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const profileUpdateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
});

export const validateRegistration = (req, res, next) => {
  try {
    registrationSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        message: 'Validation failed',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        message: 'Validation failed',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const validateProfileUpdate = (req, res, next) => {
  try {
    profileUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        message: 'Validation failed',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};