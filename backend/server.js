require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
require('./src/models');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Import routes
const authRoutes = require('./src/routes/auth.routes');
// You can add other routes here, e.g.:
// const userRoutes = require('./routes/users.routes');
// const facilityRoutes = require('./routes/facilities.routes');

// Middleware
app.use(cors());                 // Enable CORS for all origins
app.use(morgan('dev'));          // Logger middleware
app.use(express.json());         // Parse JSON request bodies

// Routes
app.use('/auth', authRoutes);
// Add other routes:
// app.use('/users', userRoutes);
// app.use('/facilities', facilityRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to QuickCourt API');
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
