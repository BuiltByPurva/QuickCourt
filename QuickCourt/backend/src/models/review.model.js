// review.model.js
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
      'Review',
      {
        review_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        facility_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
        },
        review_text: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'reviews',
        timestamps: false, // Using created_at manually
      }
    );
  
    return Review;
  };
  