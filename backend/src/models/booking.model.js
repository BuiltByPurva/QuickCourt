// src/models/booking.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  courtId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM('pending','confirmed','cancelled'), defaultValue: 'confirmed'}
}, { tableName: 'bookings' });

module.exports = Booking;
