const express = require("express");
const { getAllSubjects, addSubject } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ GET subjects (requires authentication)
router.get("/", authMiddleware, getAllSubjects);

// ✅ POST subject (only admin can add subjects)
router.post("/add", authMiddleware, addSubject);

module.exports = router;
