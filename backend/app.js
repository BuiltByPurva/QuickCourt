const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./src/routes'); // <-- this is now a router function
const errorMiddleware = require('./src/middleware/error.middleware');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// All API routes
app.use('/api', routes);

// Error handler
app.use(errorMiddleware);

module.exports = app;
