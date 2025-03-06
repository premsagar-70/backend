const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Register User (Admin/Teacher)
router.post("/register", register);

// Login User
router.post("/login", login);

// Get Current User Details
router.get("/user", authMiddleware, getUser);

module.exports = router;
