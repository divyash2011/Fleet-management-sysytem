const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { addDriver, getDrivers, updateDriver, deleteDriver, assignDriver } = require('../controllers/driverController');
const router = express.Router();

router.use(authMiddleware);
router.post('/', adminMiddleware, addDriver);
router.get('/', getDrivers);
router.put('/:id', adminMiddleware, updateDriver);
router.delete('/:id', adminMiddleware, deleteDriver);
router.post('/assign', adminMiddleware, assignDriver);

module.exports = router;
