const Vehicle = require('../models/Vehicle');

const addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVehicles = async (req, res) => {
  const { search, status } = req.query;
  const filter = {};
  if (search) filter.$or = [
    { number: new RegExp(search, 'i') },
    { model: new RegExp(search, 'i') },
    { capacity: new RegExp(search, 'i') }
  ];
  if (status) filter.status = status;

  try {
    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addVehicle, getVehicles, updateVehicle, deleteVehicle };
