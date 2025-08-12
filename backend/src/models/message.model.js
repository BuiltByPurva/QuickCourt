// message.model.js
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
      'Message',
      {
        message_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        chat_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        sender_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true, // SET NULL if user deleted
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        message_type: {
          type: DataTypes.ENUM('text', 'image', 'file', 'system', 'link', 'poll'),
          defaultValue: 'text',
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        edited_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        reply_to_message_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('sent', 'delivered', 'read'),
          defaultValue: 'sent',
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        tableName: 'messages',
        timestamps: false,
      }
    );
  
    return Message;
  };
  