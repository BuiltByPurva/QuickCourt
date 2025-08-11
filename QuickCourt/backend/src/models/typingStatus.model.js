// typingStatus.model.js
module.exports = (sequelize, DataTypes) => {
    const TypingStatus = sequelize.define(
      'TypingStatus',
      {
        typing_id: {
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
        is_typing: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        last_updated: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'typing_status',
        timestamps: false,
        indexes: [{ unique: true, fields: ['chat_id', 'user_id'] }],
      }
    );
  
    return TypingStatus;
  };
  