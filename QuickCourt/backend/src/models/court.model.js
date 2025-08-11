// src/models/court.model.js
module.exports = (sequelize, DataTypes) => {
  const Court = sequelize.define("Court", {
    court_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    facility_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    court_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sport_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    operating_hours: {
      type: DataTypes.JSON
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'courts',
    timestamps: false
  });

  return Court;
};
