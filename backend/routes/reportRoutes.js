const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { generateReport } = require('../controllers/reportController');
const router = express.Router();

router.use(authMiddleware);
router.get('/', generateReport);

module.exports = router;
