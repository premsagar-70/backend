const express = require("express");
const { addStudent, getStudents, login } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addStudent);
router.get("/all", authMiddleware, getStudents);
router.post("/login", login); // ✅ Add this line to handle student login

module.exports = router;
