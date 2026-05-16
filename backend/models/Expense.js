const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  type: { type: String, enum: ['fuel', 'repair', 'other'], required: true },
  amount: { type: Number, required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  date: { type: Date, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
