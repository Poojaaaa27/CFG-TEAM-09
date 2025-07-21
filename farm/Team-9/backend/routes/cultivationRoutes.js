const express = require('express');
const router = express.Router();
const { addCultivation, getCultivationsByFarmer, getAllCultivations } = require('../controller/cultivationController');

// Add cultivation to a farmer
router.post('/add/:farmerId', addCultivation);

// Get all cultivations for a farmer
router.get('/:farmerId', getCultivationsByFarmer);

router.get('/get/all', getAllCultivations);

module.exports = router;


module.exports = router;
