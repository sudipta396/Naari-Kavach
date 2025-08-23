const express = require("express");
const router = express.Router();
const { sendSOS } = require("../controllers/sosController");

// POST /sos/trigger
router.post("/trigger", sendSOS);

module.exports = router;
