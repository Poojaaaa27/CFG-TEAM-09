const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const cultivationRoutes = require('./routes/cultivationRoutes');

dotenv.config({ path: './config.env' });

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/cultivations', cultivationRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

module.exports = app;