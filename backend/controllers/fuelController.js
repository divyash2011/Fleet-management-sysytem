const Fuel = require('../models/Fuel');

const addFuel = async (req, res) => {
  try {
    const fuel = await Fuel.create(req.body);
    res.status(201).json(fuel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFuelHistory = async (req, res) => {
  try {
    const fuelEntries = await Fuel.find().populate('vehicle').sort({ date: -1 });
    res.json(fuelEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFuel = async (req, res) => {
  try {
    await Fuel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fuel entry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFuel, getFuelHistory, deleteFuel };
