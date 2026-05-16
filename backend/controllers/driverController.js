const Driver = require('../models/Driver');
const Vehicle = require('../models/Vehicle');

const addDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate('assignedVehicle').sort({ createdAt: -1 });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignDriver = async (req, res) => {
  const { driverId, vehicleId } = req.body;
  try {
    const driver = await Driver.findById(driverId);
    const vehicle = await Vehicle.findById(vehicleId);
    if (!driver || !vehicle) return res.status(404).json({ message: 'Driver or vehicle not found' });

    driver.assignedVehicle = vehicle._id;
    driver.status = 'assigned';
    vehicle.status = 'assigned';

    await driver.save();
    await vehicle.save();

    res.json({ driver, vehicle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDriver, getDrivers, updateDriver, deleteDriver, assignDriver };
