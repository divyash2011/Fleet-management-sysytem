const PDFDocument = require('pdfkit');
const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
const Expense = require('../models/Expense');

const generateReport = async (req, res) => {
  try {
    const { type } = req.query;
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${type}-report.pdf"`);

    doc.fontSize(18).text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, { underline: true });
    doc.moveDown();

    if (type === 'vehicle') {
      const vehicles = await Vehicle.find();
      vehicles.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.number} | ${item.model} | ${item.capacity} | ${item.status}`);
      });
    }

    if (type === 'trip') {
      const trips = await Trip.find().populate('vehicle driver');
      trips.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.title} | ${item.status} | ${item.vehicle?.number || ''} | ${item.driver?.name || ''}`);
      });
    }

    if (type === 'expense') {
      const expenses = await Expense.find().populate('vehicle');
      expenses.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.type} | ${item.amount} | ${item.vehicle?.number || 'N/A'} | ${item.date.toDateString()}`);
      });
    }

    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateReport };
