// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');
const facilityRoutes = require('./src/routes/facility.routes');
// Add more routes here as needed...

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/facility', facilityRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//register
app.get('/register', (req, res) => {
  res.send('API is running...');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
