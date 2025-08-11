// chat.model.js
module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define(
      'Chat',
      {
        chat_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        chat_type: {
          type: DataTypes.ENUM('private', 'group', 'booking', 'system'),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        created_by: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        booking_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        facility_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        last_message_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
      },
      {
        tableName: 'chats',
        timestamps: false,
      }
    );
  
    return Chat;
  };
  