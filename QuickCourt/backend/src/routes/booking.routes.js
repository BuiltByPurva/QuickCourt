const router = require('express').Router();
const bookingController = require('../controllers/booking.controller');
const auth = require('../middleware/auth.middleware');
const { validateBody } = require('../utils/validator');
const { createBookingSchema } = require('../utils/schemas');

router.post('/', auth, validateBody(createBookingSchema), bookingController.createBooking);

module.exports = router;
