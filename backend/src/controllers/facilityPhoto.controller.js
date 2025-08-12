const db = require("../models");
const FacilityPhoto = db.FacilityPhoto;

exports.addPhoto = async (req, res) => {
  try {
    const { facility_id, photo_url } = req.body;

    if (!facility_id || !photo_url) {
      return res.status(400).json({ message: "Facility ID and Photo URL are required" });
    }

    const newPhoto = await FacilityPhoto.create({
      facility_id,
      photo_url
    });

    res.status(201).json({
      message: "Photo added successfully",
      photo: newPhoto
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getPhotosByFacility = async (req, res) => {
  try {
    const { facility_id } = req.params;

    const photos = await FacilityPhoto.findAll({
      where: { facility_id }
    });

    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
