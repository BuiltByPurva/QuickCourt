// chatParticipant.model.js
module.exports = (sequelize, DataTypes) => {
    const ChatParticipant = sequelize.define(
      'ChatParticipant',
      {
        participant_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        chat_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        joined_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        is_admin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        last_read_message_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        notifications_muted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        role_in_chat: {
          type: DataTypes.STRING(64),
          allowNull: true,
        },
      },
      {
        tableName: 'chat_participants',
        timestamps: false,
        indexes: [{ unique: true, fields: ['chat_id', 'user_id'] }],
      }
    );
  
    return ChatParticipant;
  };
  