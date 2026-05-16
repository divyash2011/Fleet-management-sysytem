const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    await Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'assigned' });
    await Driver.findByIdAndUpdate(trip.driver, { status: 'assigned' });
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate('vehicle driver').sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (req.body.status === 'completed') {
      await Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'available' });
      await Driver.findByIdAndUpdate(trip.driver, { status: 'available' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTrip, getTrips, updateTrip, deleteTrip };
