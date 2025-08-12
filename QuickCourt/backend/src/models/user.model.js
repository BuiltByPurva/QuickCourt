// src/models/user.model.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    phone: { type: DataTypes.STRING(32) },
    role: { type: DataTypes.ENUM('user', 'owner', 'admin'), defaultValue: 'user' },
    avatar_url: { type: DataTypes.STRING(512) },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    last_active: { type: DataTypes.DATE },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    is_banned: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
};
