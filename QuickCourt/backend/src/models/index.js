// src/models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const OTP = require('./otp.model')(sequelize, DataTypes);


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

// Admin (User) ↔ FacilityApproval
User.hasMany(FacilityApproval, { foreignKey: 'admin_id', as: 'admin_approvals' });
FacilityApproval.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });

// Facility ↔ Court
Facility.hasMany(Court, { foreignKey: 'facility_id', as: 'courts' });
Court.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Facility ↔ FacilityPhoto
Facility.hasMany(FacilityPhoto, { foreignKey: 'facility_id', as: 'photos', onDelete: 'CASCADE'});
FacilityPhoto.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility', onDelete: 'CASCADE'});

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

// Chat ↔ Booking
Booking.hasMany(Chat, { foreignKey: 'booking_id', as: 'booking_chats' });
Chat.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

// Review ↔ Facility
Facility.hasMany(Review, { foreignKey: 'facility_id', as: 'reviews' });
Review.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Chat ↔ User (creator)
User.hasMany(Chat, { foreignKey: 'created_by', as: 'chats_created' });
Chat.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// Review ↔ User
User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Facility ↔ FacilitySport
Facility.hasMany(FacilitySport, { foreignKey: 'facility_id', as: 'sports' });
FacilitySport.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Facility ↔ FacilityApproval
Facility.hasMany(FacilityApproval, { foreignKey: 'facility_id', as: 'approvals' });
FacilityApproval.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Chat ↔ Facility
Facility.hasMany(Chat, { foreignKey: 'facility_id', as: 'facility_chats' });
Chat.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Booking ↔ Payment
Booking.hasMany(Payment, { foreignKey: 'booking_id', as: 'payments' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

// User (Payer) ↔ Payment
User.hasMany(Payment, { foreignKey: 'payer_id', as: 'payments_made' });
Payment.belongsTo(User, { foreignKey: 'payer_id', as: 'payer' });

// Facility ↔ Payment
Facility.hasMany(Payment, { foreignKey: 'facility_id', as: 'facility_payments' });
Payment.belongsTo(Facility, { foreignKey: 'facility_id', as: 'facility' });

// Chat ↔ ChatParticipant
Chat.hasMany(ChatParticipant, { foreignKey: 'chat_id', as: 'participants', onDelete: 'CASCADE' });
ChatParticipant.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

// User ↔ ChatParticipant
User.hasMany(ChatParticipant, { foreignKey: 'user_id', as: 'chat_participations', onDelete: 'CASCADE' });
ChatParticipant.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Chat ↔ Message
Chat.hasMany(Message, { foreignKey: 'chat_id', as: 'messages', onDelete: 'CASCADE' });
Message.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

// User ↔ Message (sender)
User.hasMany(Message, { foreignKey: 'sender_id', as: 'messages_sent' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

// Message ↔ Attachment
Message.hasMany(Attachment, { foreignKey: 'message_id', as: 'attachments' });
Attachment.belongsTo(Message, { foreignKey: 'message_id', as: 'message' });

// Message ↔ ReadReceipt
Message.hasMany(ReadReceipt, { foreignKey: 'message_id', as: 'read_receipts', onDelete: 'CASCADE' });
ReadReceipt.belongsTo(Message, { foreignKey: 'message_id', as: 'message' });

// User ↔ ReadReceipt
User.hasMany(ReadReceipt, { foreignKey: 'user_id', as: 'read_receipts', onDelete: 'CASCADE' });
ReadReceipt.belongsTo(User, { foreignKey: 'user_id', as: 'user' });


// Presence ↔ User
User.hasOne(Presence, { foreignKey: 'user_id', as: 'presence', onDelete: 'CASCADE' });
Presence.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// TypingStatus ↔ Chat
Chat.hasMany(TypingStatus, { foreignKey: 'chat_id', as: 'typing_statuses', onDelete: 'CASCADE' });
TypingStatus.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

// TypingStatus ↔ User
User.hasMany(TypingStatus, { foreignKey: 'user_id', as: 'typing_statuses', onDelete: 'CASCADE' });
TypingStatus.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// ModerationReport ↔ User (reporter)
User.hasMany(ModerationReport, { foreignKey: 'reported_by', as: 'reports_made' });
ModerationReport.belongsTo(User, { foreignKey: 'reported_by', as: 'reporter' });

// ModerationReport ↔ User (reported user)
User.hasMany(ModerationReport, { foreignKey: 'reported_user', as: 'reports_received' });
ModerationReport.belongsTo(User, { foreignKey: 'reported_user', as: 'reported_user_details' });

// ModerationReport ↔ Chat
Chat.hasMany(ModerationReport, { foreignKey: 'chat_id', as: 'chat_reports' });
ModerationReport.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

// ModerationReport ↔ Message
Message.hasMany(ModerationReport, { foreignKey: 'message_id', as: 'message_reports' });
ModerationReport.belongsTo(Message, { foreignKey: 'message_id', as: 'message' });


// Sync database
sequelize.sync({ alter: true }) // or { force: true }
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Error syncing database:", err));

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
  ModerationReport, 
  OTP
};
