const express = require('express');
const router = express.Router();
const { 
  addFarmer, 
  getFarmers, 
  getFarmerById, 
  updateFarmer, 
  deleteFarmer 
} = require('../controller/farmerController');

// Add a new farmer
router.post('/add', addFarmer);

// Get all farmers
router.get('/all', getFarmers);

// Get farmer by ID
router.get('/:id', getFarmerById);

// Update farmer
router.put('/:id', updateFarmer);

// Delete farmer
router.delete('/:id', deleteFarmer);

module.exports = router;

