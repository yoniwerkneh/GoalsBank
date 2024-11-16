import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountTransactions,
} from '../controllers/accounts.js';

const router = Router();

router.use(authenticate);

router.get('/', getAccounts);
router.get('/:id', getAccount);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.get('/:id/transactions', getAccountTransactions);

export default router;