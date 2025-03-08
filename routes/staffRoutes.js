const express = require("express");
const { addTeacher, getAllTeachers } = require("../controllers/staffController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure frontend sends a valid token to access this
router.post("/add", authMiddleware, addTeacher);

// 🔴 Remove authMiddleware temporarily for testing
router.get("/all", getAllTeachers); 

// ✅ Route for frontend dropdown to get teachers
router.get("/", getAllTeachers);

module.exports = router;
