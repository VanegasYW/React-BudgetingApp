import {Router} from 'express';
import RateLimit from 'express-rate-limit';
import {
  getExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  deleteExpense
} from '../controllers/expense.controllers.js';

const router = Router();

// Configure rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// Apply rate limiter to all expense routes
router.use(limiter);

// Get all expenses
router.get('/', getExpenses);

// Get expenses by id
router.get('/:id', getExpensesById);

// Create a new expense
router.post('/', createExpense);

// Update an expense by id
router.put('/:id', updateExpense);

// Delete an expense by id
router.delete('/:id', deleteExpense);

export default router;
