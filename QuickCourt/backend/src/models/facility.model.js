module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define("Facility", {
    facility_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    owner_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100)
    },
    state: {
      type: DataTypes.STRING(100)
    },
    zip_code: {
      type: DataTypes.STRING(20)
    },
    sport_types: {
      type: DataTypes.JSON
    },
    amenities: {
      type: DataTypes.JSON
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },
    approved_by: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    approved_at: {
      type: DataTypes.DATE
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "facilities",
    timestamps: false
  });

  return Facility;
};
