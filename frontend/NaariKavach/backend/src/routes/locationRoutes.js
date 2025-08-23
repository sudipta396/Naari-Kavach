const express = require("express");
const router = express.Router();
const { updateLocation, getLocation } = require("../controllers/locationController");

// POST /location/update
router.post("/update", updateLocation);

// GET /location/get/:userId
router.get("/get/:userId", getLocation);

module.exports = router;
