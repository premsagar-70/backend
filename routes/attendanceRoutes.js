const express = require("express");
const { markAttendance, getAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/mark", authMiddleware, markAttendance);
router.get("/report", authMiddleware, getAttendance);

module.exports = router;
