const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./users.routes'));
router.use('/facilities', require('./facilities.routes'));
router.use('/courts', require('./courts.routes'));
router.use('/bookings', require('./bookings.routes'));
router.use('/reviews', require('./reviews.routes'));
router.use('/payments', require('./payments.routes'));
router.use('/chats', require('./chats.routes'));
router.use('/messages', require('./messages.routes'));
router.use('/attachments', require('./attachments.routes'));
// router.use('/participants', require('./participants.routes'));
router.use('/presence', require('./presence.routes'));
router.use('/typing', require('./typing.routes'));
router.use('/moderation', require('./moderation.routes'));

module.exports = router;
