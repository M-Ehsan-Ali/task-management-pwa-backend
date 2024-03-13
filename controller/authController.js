const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

// Sign up
exports.signUp = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, password, email } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const jwtSecret =
      process.env.JWT_SECRET || "7ccd963f-1610-48e5-85bc-8ab10f29f926";

    // Generate JWT token without expiration
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1d",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const jwtSecret =
      process.env.JWT_SECRET || "7ccd963f-1610-48e5-85bc-8ab10f29f926";

    // Generate JWT token without expiration
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "365d",
    });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // Logic for logging out (optional)
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
