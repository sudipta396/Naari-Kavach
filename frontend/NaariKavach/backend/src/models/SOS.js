// backend/src/models/SOS.js
const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ["triggered", "resolved"], default: "triggered" },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SOS", sosSchema);
