const express = require("express");
const { addTeacher, getAllTeachers } = require("../controllers/staffController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addTeacher);
router.get("/all", authMiddleware, getAllTeachers);

module.exports = router;
