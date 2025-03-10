const express = require("express");
const { addSubject, getAllSubjects } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addSubject); // ✅ Must exist!
router.get("/", authMiddleware, getAllSubjects);

module.exports = router;
