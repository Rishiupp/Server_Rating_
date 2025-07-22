// routes/rating.js
const express = require('express');
const router  = express.Router();
const ratingController = require('../controllers/ratingController');

// POST → append a row
router.post('/', ratingController.generateExcel);

// GET  → download the current sheet
router.get('/download', ratingController.downloadExcel);

module.exports = router;
