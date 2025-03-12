const express = require("express");
const { getStudentProfile, addStudent, getStudents, login } = require("../controllers/studentController"); // ✅ Import login function
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", addStudent); // Ensure it's a POST request, not GET
router.get("/all", authMiddleware, getStudents);
router.get("/me", authMiddleware, getStudentProfile);
router.post("/login", login); // ✅ Add this line to define the login route

module.exports = router;
