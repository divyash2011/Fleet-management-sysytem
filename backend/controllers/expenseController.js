const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('vehicle').sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpenseSummary = async (req, res) => {
  try {
    const total = await Expense.aggregate([{ $group: { _id: null, totalAmount: { $sum: '$amount' } } }]);
    const byType = await Expense.aggregate([{ $group: { _id: '$type', amount: { $sum: '$amount' } } }]);
    res.json({ total: total[0]?.totalAmount || 0, byType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addExpense, getExpenses, getExpenseSummary, deleteExpense };
