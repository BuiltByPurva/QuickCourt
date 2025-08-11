// attachment.model.js
module.exports = (sequelize, DataTypes) => {
    const Attachment = sequelize.define(
      'Attachment',
      {
        attachment_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        message_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        file_url: {
          type: DataTypes.STRING(1024),
          allowNull: false,
        },
        file_type: {
          type: DataTypes.STRING(80),
          allowNull: true,
        },
        file_size: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        thumb_url: {
          type: DataTypes.STRING(1024),
          allowNull: true,
        },
        uploaded_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'attachments',
        timestamps: false,
      }
    );
  
    return Attachment;
  };
  