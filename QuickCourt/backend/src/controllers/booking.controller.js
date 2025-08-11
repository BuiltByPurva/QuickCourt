const { Booking, Court, sequelize } = require('../models');

exports.createBooking = async (req, res, next) => {
  const { courtId, date, startTime, endTime } = req.body;
  const userId = req.user.id;
  const io = req.app.get('io');

  try {
    const result = await sequelize.transaction(async (t) => {
      // Lock bookings for the court on that date to avoid race conditions
      const overlapping = await Booking.findOne({
        where: {
          courtId,
          date,
          // simple overlap check: (start < existing_end) && (end > existing_start)
          // Sequelize literal or raw query may be easier for times; keeps example simple
        },
        transaction: t,
        lock: t.LOCK.UPDATE
      });

      if (overlapping) throw { status: 409, message: 'Time slot already booked' };

      // Create booking
      const booking = await Booking.create({ courtId, userId, date, startTime, endTime, status: 'confirmed' }, { transaction: t });
      return booking;
    });

    // emit socket event to all clients to update availability
    io.emit('court_booked', { courtId, date, startTime, endTime, bookingId: result.id });

    res.status(201).json(result);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
};
