import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactions.js';

const router = Router();

router.use(authenticate);

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;