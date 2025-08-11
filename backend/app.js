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

const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

const facilityRoutes = require("./src/routes/facility.routes");
app.use("/api/facilities", facilityRoutes);

const facilityPhotoRoutes = require("./src/routes/facilityPhoto.routes");
app.use("/api/facility-photos", facilityPhotoRoutes);



// Error handler
app.use(errorMiddleware);
module.exports = app;
