const express = require("express");
const router = express.Router();
const facilityPhotoController = require("../controllers/facilityPhoto.controller");

// Add photo to facility
router.post("/", facilityPhotoController.addPhoto);

// Get all photos for a facility
router.get("/:facility_id", facilityPhotoController.getPhotosByFacility);

module.exports = router;
