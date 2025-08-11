// backend/src/routes/index.js
const express = require('express');
const authRoutes = require('./auth.routes');
const bookingRoutes = require('./booking.routes');
const facilityRoutes = require('./facility.routes');
const courtRoutes = require('./court.routes');
const router = express.Router();

// Register routes
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/facilities', facilityRoutes);
router.use('/courts', courtRoutes);
// add more routes here

module.exports = router;
