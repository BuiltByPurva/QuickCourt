// readReceipt.model.js
module.exports = (sequelize, DataTypes) => {
    const ReadReceipt = sequelize.define(
      'ReadReceipt',
      {
        receipt_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        message_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        read_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'read_receipts',
        timestamps: false,
        indexes: [{ unique: true, fields: ['message_id', 'user_id'] }],
      }
    );
  
    return ReadReceipt;
  };
  