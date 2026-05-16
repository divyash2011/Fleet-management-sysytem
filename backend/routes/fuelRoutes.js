const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { addFuel, getFuelHistory, deleteFuel } = require('../controllers/fuelController');
const router = express.Router();

router.use(authMiddleware);
router.post('/', adminMiddleware, addFuel);
router.get('/', getFuelHistory);
router.delete('/:id', adminMiddleware, deleteFuel);

module.exports = router;
