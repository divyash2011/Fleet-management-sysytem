const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { createTrip, getTrips, updateTrip, deleteTrip } = require('../controllers/tripController');
const router = express.Router();

router.use(authMiddleware);
router.post('/', adminMiddleware, createTrip);
router.get('/', getTrips);
router.put('/:id', adminMiddleware, updateTrip);
router.delete('/:id', adminMiddleware, deleteTrip);

module.exports = router;
