module.exports = (sequelize, DataTypes) => {
  const FacilityPhoto = sequelize.define("FacilityPhoto", {
    photo_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    facility_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    photo_url: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "facility_photos",
    timestamps: false
  });

  return FacilityPhoto;
};
