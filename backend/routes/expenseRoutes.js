const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { addExpense, getExpenses, getExpenseSummary, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();

router.use(authMiddleware);
router.post('/', adminMiddleware, addExpense);
router.get('/', getExpenses);
router.get('/summary', getExpenseSummary);
router.delete('/:id', adminMiddleware, deleteExpense);

module.exports = router;
