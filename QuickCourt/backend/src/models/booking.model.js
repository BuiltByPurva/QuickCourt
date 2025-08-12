// booking.model.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      booking_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      court_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      facility_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true, // Facility might be optional
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'cancelled', 'completed', 'pending'),
        defaultValue: 'confirmed',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'bookings',
      timestamps: false, // Already using created_at manually
    }
  );

  return Booking;
};
