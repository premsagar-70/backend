const express = require("express");
const { getSubjectsForTeacher, addSubject, getAllSubjects } = require("../controllers/subjectController"); // ✅ Ensure correct imports
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addSubject);
router.get("/", authMiddleware, getAllSubjects); // ✅ This function must exist!
router.get("/teacher", authMiddleware, getSubjectsForTeacher);

module.exports = router;
