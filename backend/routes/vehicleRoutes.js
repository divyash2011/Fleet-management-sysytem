const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { addVehicle, getVehicles, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const router = express.Router();

router.use(authMiddleware);
router.post('/', adminMiddleware, addVehicle);
router.get('/', getVehicles);
router.put('/:id', adminMiddleware, updateVehicle);
router.delete('/:id', adminMiddleware, deleteVehicle);

module.exports = router;
