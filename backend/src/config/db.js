const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 8081,
    dialect: 'mysql',
    logging: false, // enable for debugging
  }
);

module.exports = sequelize;
