const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facility.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Public routes (no authentication required)
router.get("/", facilityController.getAllFacilities);
router.get("/:facility_id", facilityController.getFacilityById);

// Protected routes (authentication required)
router.use(authMiddleware);

// Facility management (owners and admins)
router.post("/", facilityController.createFacility);
router.put("/:facility_id", facilityController.updateFacility);
router.delete("/:facility_id", facilityController.deleteFacility);

// Admin routes (admin role required)
router.put("/:facility_id/status", facilityController.adminUpdateFacilityStatus);

module.exports = router;
