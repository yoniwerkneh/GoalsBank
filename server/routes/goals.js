import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goals.js';

const router = Router();

router.use(authenticate);

router.get('/', getGoals);
router.get('/:id', getGoal);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;