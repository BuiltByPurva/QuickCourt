// backend/src/routes/index.js
const express = require('express');
const authRoutes = require('./auth.routes');
const bookingRoutes = require('./booking.routes');

const router = express.Router();

// Register routes
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
// add more routes here

module.exports = router;
