const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facility.controller");

// Create facility
router.post("/", facilityController.createFacility);

// Get all facilities
router.get("/", facilityController.getAllFacilities);

module.exports = router;
