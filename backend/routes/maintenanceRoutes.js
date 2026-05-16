const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { addMaintenance, getMaintenance, deleteMaintenance } = require('../controllers/maintenanceController');
const router = express.Router();

router.use(authMiddleware);
router.post('/', adminMiddleware, addMaintenance);
router.get('/', getMaintenance);
router.delete('/:id', adminMiddleware, deleteMaintenance);

module.exports = router;
