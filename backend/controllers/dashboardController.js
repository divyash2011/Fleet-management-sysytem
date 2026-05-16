const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Expense = require('../models/Expense');
const Fuel = require('../models/Fuel');
const Maintenance = require('../models/Maintenance');

const getDashboard = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const totalDrivers = await Driver.countDocuments();
    const totalTrips = await Trip.countDocuments();
    const activeTrips = await Trip.countDocuments({ status: 'ongoing' });
    const completedTrips = await Trip.countDocuments({ status: 'completed' });
    const totalExpenses = await Expense.aggregate([{ $group: { _id: null, sum: { $sum: '$amount' } } }]);
    const fuelUsage = await Fuel.aggregate([{ $group: { _id: null, totalLiters: { $sum: '$liters' } } }]);
    const maintenanceCount = await Maintenance.countDocuments();

    res.json({
      totalVehicles,
      totalDrivers,
      totalTrips,
      activeTrips,
      completedTrips,
      totalExpenses: totalExpenses[0]?.sum || 0,
      totalFuel: fuelUsage[0]?.totalLiters || 0,
      maintenanceCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };
