const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers
} = require('../controller/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Route without authentication
router.get('/users', getAllUsers);
//localhost:3000/
module.exports = router;