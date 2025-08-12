// moderationReport.model.js
module.exports = (sequelize, DataTypes) => {
    const ModerationReport = sequelize.define(
      'ModerationReport',
      {
        report_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        reported_by: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        reported_user: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        chat_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        message_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
        },
        reason: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        details: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        status: {
          type: DataTypes.ENUM('open', 'in_review', 'resolved'),
          defaultValue: 'open',
        },
      },
      {
        tableName: 'moderation_reports',
        timestamps: false,
      }
    );
  
    return ModerationReport;
  };
  