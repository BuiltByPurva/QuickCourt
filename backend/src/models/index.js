// src/models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Import model definitions
const User = require('./user.model')(sequelize, DataTypes);
const Facility = require('./facility.model')(sequelize, DataTypes);
const FacilityPhoto = require('./facilityPhoto.model')(sequelize, DataTypes);
const Court = require('./court.model')(sequelize, DataTypes);
const CourtAvailability = require('./courtAvailability.model')(sequelize, DataTypes);
const Booking = require('./booking.model')(sequelize, DataTypes);
const Review = require('./review.model')(sequelize, DataTypes);
const FacilitySport = require('./facilitySport.model')(sequelize, DataTypes);
const FacilityApproval = require('./facilityApproval.model')(sequelize, DataTypes);
const Payment = require('./payment.model')(sequelize, DataTypes);
const Chat = require('./chat.model')(sequelize, DataTypes);
const ChatParticipant = require('./chatParticipant.model')(sequelize, DataTypes);
const Message = require('./message.model')(sequelize, DataTypes);
const Attachment = require('./attachment.model')(sequelize, DataTypes);
const ReadReceipt = require('./readReceipt.model')(sequelize, DataTypes);
const Presence = require('./presence.model')(sequelize, DataTypes);
const TypingStatus = require('./typingStatus.model')(sequelize, DataTypes);
const ModerationReport = require('./moderationReport.model')(sequelize, DataTypes);

// ======================
// Associations
// ======================

// User ↔ Facility
User.hasMany(Facility, { foreignKey: 'owner_id', as: 'owned_facilities' });
Facility.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// Facility ↔ Court
Facility.hasMany(Court, { foreignKey: 'facility_id', as: 'courts' });
Court.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Facility ↔ FacilityPhoto
Facility.hasMany(FacilityPhoto, { foreignKey: 'facility_id', as: 'photos' });
FacilityPhoto.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Court ↔ CourtAvailability
Court.hasMany(CourtAvailability, { foreignKey: 'court_id', as: 'availability' });
CourtAvailability.belongsTo(Court, { foreignKey: 'court_id', as: 'court' });

// Court ↔ Booking
Court.hasMany(Booking, { foreignKey: 'court_id', as: 'bookings' });
Booking.belongsTo(Court, { foreignKey: 'court_id', as: 'court' });

// Facility ↔ Booking
Facility.hasMany(Booking, { foreignKey: 'facility_id', as: 'facility_bookings' });
Booking.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// User ↔ Booking
User.hasMany(Booking, { foreignKey: 'user_id', as: 'user_bookings' });
Booking.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User (Owner) ↔ Booking
User.hasMany(Booking, { foreignKey: 'owner_id', as: 'owner_bookings' });
Booking.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// Review ↔ Facility
Facility.hasMany(Review, { foreignKey: 'facility_id', as: 'reviews' });
Review.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Review ↔ User
User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Facility ↔ FacilitySport
Facility.hasMany(FacilitySport, { foreignKey: 'facility_id', as: 'sports' });
FacilitySport.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Facility ↔ FacilityApproval
Facility.hasMany(FacilityApproval, { foreignKey: 'facility_id', as: 'approvals' });
FacilityApproval.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Booking ↔ Payment
Booking.hasMany(Payment, { foreignKey: 'booking_id', as: 'payments' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

// Chat ↔ ChatParticipant
Chat.hasMany(ChatParticipant, { foreignKey: 'chat_id', as: 'participants' });
ChatParticipant.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

// Chat ↔ Message
Chat.hasMany(Message, { foreignKey: 'chat_id', as: 'messages' });
Message.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

// Message ↔ Attachment
Message.hasMany(Attachment, { foreignKey: 'message_id', as: 'attachments' });
Attachment.belongsTo(Message, { foreignKey: 'message_id', as: 'message' });

// Message ↔ ReadReceipt
Message.hasMany(ReadReceipt, { foreignKey: 'message_id', as: 'read_receipts' });
ReadReceipt.belongsTo(Message, { foreignKey: 'message_id', as: 'message' });

// User ↔ Presence
User.hasOne(Presence, { foreignKey: 'user_id', as: 'presence' });
Presence.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Chat ↔ TypingStatus
Chat.hasMany(TypingStatus, { foreignKey: 'chat_id', as: 'typing_statuses' });
TypingStatus.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

module.exports = {
  sequelize,
  User,
  Facility,
  FacilityPhoto,
  Court,
  CourtAvailability,
  Booking,
  Review,
  FacilitySport,
  FacilityApproval,
  Payment,
  Chat,
  ChatParticipant,
  Message,
  Attachment,
  ReadReceipt,
  Presence,
  TypingStatus,
  ModerationReport
};
