const express = require("express");
const { addStudent, getStudents } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addStudent);
router.get("/all", authMiddleware, getStudents);

module.exports = router;
