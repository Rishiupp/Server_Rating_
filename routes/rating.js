const express = require('express');
const router  = express.Router();
const ratingController = require('../controllers/ratingController');

// POST /api/rating        → append a row
router.post('/', ratingController.generateExcel);

// GET  /api/rating/download → download the current sheet
router.get('/download', ratingController.downloadExcel);

module.exports = router;
