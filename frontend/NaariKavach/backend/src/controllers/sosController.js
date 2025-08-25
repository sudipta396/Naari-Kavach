// backend/src/controllers/sosController.js
const SOS = require("../models/SOS");
const User = require("../models/User");

// ✅ Trigger SOS
exports.sendSOS = async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;

    // Save SOS
    const sos = new SOS({
      userId,
      location: { lat, lng },
      status: "triggered",
    });

    await sos.save();

    // Fetch emergency contacts
    const user = await User.findById(userId);
    const contacts = user ? user.emergencyContacts : [];

    res.status(201).json({
      msg: "🚨 SOS Triggered!",
      sos,
      notifyContacts: contacts,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// ✅ Resolve SOS
exports.resolveSOS = async (req, res) => {
  try {
    const { sosId } = req.body;
    const sos = await SOS.findByIdAndUpdate(
      sosId,
      { status: "resolved" },
      { new: true }
    );
    res.json({ msg: "✅ SOS Resolved", sos });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
