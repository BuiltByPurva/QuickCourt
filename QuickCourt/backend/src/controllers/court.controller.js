const { Court, Facility } = require('../models');

// Create new court
exports.createCourt = async (req, res) => {
  try {
    const { facility_id, court_name, sport_type, price_per_hour, operating_hours, status } = req.body;

    // Check if facility exists
    const facility = await Facility.findByPk(facility_id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    const court = await Court.create({
      facility_id,
      court_name,
      sport_type,
      price_per_hour,
      operating_hours,
      status
    });

    res.status(201).json({ message: 'Court created successfully', court });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all courts for a facility
exports.getCourtsByFacility = async (req, res) => {
  try {
    const { facility_id } = req.params;

    const courts = await Court.findAll({
      where: { facility_id }
    });

    res.status(200).json(courts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a specific court
exports.deleteCourt = async (req, res) => {
  try {
    const { court_id } = req.params;

    const court = await Court.findByPk(court_id);
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    await court.destroy();
    res.status(200).json({ message: 'Court deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
