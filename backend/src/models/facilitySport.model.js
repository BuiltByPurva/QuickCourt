// facilitySport.model.js
module.exports = (sequelize, DataTypes) => {
    const FacilitySport = sequelize.define(
      'FacilitySport',
      {
        facility_sport_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        facility_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        sport_type: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'facility_sports',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['facility_id', 'sport_type'],
          },
        ],
      }
    );
  
    return FacilitySport;
  };
  