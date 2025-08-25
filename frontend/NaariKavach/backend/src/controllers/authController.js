// backend/src/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, emergencyContacts } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    user = new User({
      name,
      email,
      password: hashedPassword,
      emergencyContacts,
    });
    await user.save();

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    // JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });

    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
