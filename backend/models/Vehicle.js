const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  capacity: { type: String, required: true },
  status: { type: String, enum: ['available', 'assigned', 'maintenance'], default: 'available' },
  mileage: { type: Number, default: 0 },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
