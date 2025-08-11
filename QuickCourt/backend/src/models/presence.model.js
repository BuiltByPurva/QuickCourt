// presence.model.js
module.exports = (sequelize, DataTypes) => {
    const Presence = sequelize.define(
      'Presence',
      {
        presence_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.ENUM('online', 'offline', 'away'),
          defaultValue: 'offline',
        },
        last_changed: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        user_agent: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ip_address: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        tableName: 'presence',
        timestamps: false,
      }
    );
  
    return Presence;
  };
  