const express = require("express");
const { getSubjects } = require("../controllers/subjectController"); // ✅ Make sure this path is correct
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getSubjects); // ✅ Ensure function name matches

module.exports = router;
