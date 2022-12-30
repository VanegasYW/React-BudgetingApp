import {Router} from 'express';
import {
  getExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  deleteExpense
} from '../controllers/expense.controllers.js';

const router = Router();

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
