const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, required: true },
  liters: { type: Number, required: true },
  cost: { type: Number, required: true },
  odometer: { type: Number, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Fuel', fuelSchema);
