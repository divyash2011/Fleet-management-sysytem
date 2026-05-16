const Maintenance = require('../models/Maintenance');

const addMaintenance = async (req, res) => {
  try {
    const record = await Maintenance.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaintenance = async (req, res) => {
  try {
    const records = await Maintenance.find().populate('vehicle').sort({ scheduledDate: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Maintenance record removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMaintenance, getMaintenance, deleteMaintenance };
