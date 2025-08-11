// courtAvailability.model.js
module.exports = (sequelize, DataTypes) => {
    const CourtAvailability = sequelize.define(
      'CourtAvailability',
      {
        availability_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        court_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATEONLY, // Matches DATE in MySQL
          allowNull: false,
        },
        start_time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        end_time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        is_blocked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        reason: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: 'court_availability',
        timestamps: false, // No createdAt/updatedAt in your SQL table
      }
    );
  
    return CourtAvailability;
  };
  