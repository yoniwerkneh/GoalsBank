import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import accountsRoutes from './routes/accounts.js';
import transactionsRoutes from './routes/transactions.js';
import goalsRoutes from './routes/goals.js';
import budgetsRoutes from './routes/budgets.js';
import { errorHandler } from './middleware/error.js';
import { seedDatabase } from './utils/seedData.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/accounts', accountsRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/goals', goalsRoutes);
app.use('/budgets', budgetsRoutes);

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

// Initialize database and start server
const initializeApp = async () => {
  try {
    // First, sync the database
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Then seed the database
    await seedDatabase();
    console.log('Database seeded');

    // Finally, start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`API available at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();