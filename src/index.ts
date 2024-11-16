import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import { errorHandler } from './middleware/error.js';
import { seedDatabase } from './utils/seedData.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

// Database sync and server start
const isDev = process.env.NODE_ENV !== 'production';

sequelize.sync({ force: isDev }).then(async () => {
  if (isDev) {
    await seedDatabase();
  }
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});