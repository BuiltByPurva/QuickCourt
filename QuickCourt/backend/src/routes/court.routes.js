const express = require('express');
const router = express.Router();
const courtController = require('../controllers/court.controller');

router.post('/', courtController.createCourt); // Add new court
router.get('/facility/:facility_id', courtController.getCourtsByFacility); // Get all courts for a facility
router.delete('/:court_id', courtController.deleteCourt); // Delete court

module.exports = router;
