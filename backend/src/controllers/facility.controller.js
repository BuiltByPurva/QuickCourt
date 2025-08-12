const { Facility } = require("../models"); // Make sure Facility is exported in models/index.js

// GET all facilities (public)
exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll();
    res.status(200).json(facilities);
  } catch (error) {
    console.error("Error fetching facilities:", error);
    res.status(500).json({ message: "Failed to fetch facilities" });
  }
};

// GET facility by ID (public)
exports.getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.facility_id);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.status(200).json(facility);
  } catch (error) {
    console.error("Error fetching facility:", error);
    res.status(500).json({ message: "Failed to fetch facility" });
  }
};

// CREATE facility (protected: owner/admin)
exports.createFacility = async (req, res) => {
  try {
    const { name, description, address, city, state, zip_code, sport_types, amenities } = req.body;

    const newFacility = await Facility.create({
      owner_id: req.user.id, // Assuming auth middleware attaches user to req
      name,
      description,
      address,
      city,
      state,
      zip_code,
      sport_types,
      amenities
    });

    res.status(201).json(newFacility);
  } catch (error) {
    console.error("Error creating facility:", error);
    res.status(500).json({ message: "Failed to create facility" });
  }
};

// UPDATE facility (protected: owner/admin)
exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.facility_id);

    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    // Check if current user is owner or admin
    if (facility.owner_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized to update this facility" });
    }

    await facility.update(req.body);
    res.status(200).json(facility);
  } catch (error) {
    console.error("Error updating facility:", error);
    res.status(500).json({ message: "Failed to update facility" });
  }
};

// DELETE facility (protected: owner/admin)
exports.deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.facility_id);

    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    // Check if current user is owner or admin
    if (facility.owner_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized to delete this facility" });
    }

    await facility.destroy();
    res.status(200).json({ message: "Facility deleted successfully" });
  } catch (error) {
    console.error("Error deleting facility:", error);
    res.status(500).json({ message: "Failed to delete facility" });
  }
};

// ADMIN: Update facility status
exports.adminUpdateFacilityStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can update facility status" });
    }

    const { status } = req.body;
    const facility = await Facility.findByPk(req.params.facility_id);

    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    await facility.update({
      status,
      approved_by: req.user.id,
      approved_at: new Date()
    });

    res.status(200).json({ message: "Facility status updated successfully", facility });
  } catch (error) {
    console.error("Error updating facility status:", error);
    res.status(500).json({ message: "Failed to update facility status" });
  }
};
