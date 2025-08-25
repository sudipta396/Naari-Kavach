// backend/src/controllers/locationController.js
const Location = require("../models/Location");

// ✅ Update Location
exports.updateLocation = async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;

    const location = new Location({
      userId,
      lat,
      lng,
    });

    await location.save();

    res.status(201).json({ msg: "📍 Location Updated", location });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// ✅ Get Location History
exports.getLocations = async (req, res) => {
  try {
    const { userId } = req.params;
    const locations = await Location.find({ userId }).sort({ timestamp: -1 });
    res.json({ msg: "📍 Location History", locations });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
