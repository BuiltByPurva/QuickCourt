// facilityApproval.model.js
module.exports = (sequelize, DataTypes) => {
    const FacilityApproval = sequelize.define(
      'FacilityApproval',
      {
        approval_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        facility_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        admin_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true, // Can be null if admin is deleted
        },
        action: {
          type: DataTypes.ENUM('approved', 'rejected'),
          allowNull: false,
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'facility_approvals',
        timestamps: false,
      }
    );
  
    return FacilityApproval;
  };
  