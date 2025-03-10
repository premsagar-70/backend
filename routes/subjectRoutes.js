const express = require("express");
const { addSubject, getAllSubjects } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addSubject); // ✅ This must exist!
router.get("/", authMiddleware, getAllSubjects); // ✅ Get all subjects

module.exports = router;
