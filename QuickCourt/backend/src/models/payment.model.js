// payment.model.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
      'Payment',
      {
        payment_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        booking_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        payer_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true, // SET NULL when user is deleted
        },
        facility_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true, // SET NULL when facility is deleted
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        method: {
          type: DataTypes.ENUM('card', 'upi', 'cash', 'wallet'),
          defaultValue: 'card',
        },
        status: {
          type: DataTypes.ENUM('success', 'failed', 'pending'),
          defaultValue: 'pending',
        },
        paid_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'payments',
        timestamps: false,
      }
    );
  
    return Payment;
  };
  