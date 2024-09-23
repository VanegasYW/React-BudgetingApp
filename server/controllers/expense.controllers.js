import Expense from '../models/expense.models.js';

// Get all expenses
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Expenses not found' });
    }
};

// Get expenses by id
export const getExpensesById = async (req, res) => {
    try {
        const {id} = req.params
        const expenses = await Expense.findById(id);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Expense not found' });
    }
};

// Create a new expense
export const createExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an expense by id
export const updateExpense = async (req, res) => {
    try {
        const allowedUpdates = ['field1', 'field2', 'field3']; // replace with actual fields
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates!' });
        }
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an expense by id
export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
