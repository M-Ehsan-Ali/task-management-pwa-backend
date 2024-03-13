// routes/auth.js

const express = require("express");
const router = express.Router();
const { signUp, login, logout } = require("../controller/authController");

// Sign up
router.post("/signup", signUp);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

module.exports = router;
