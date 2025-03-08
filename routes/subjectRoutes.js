const express = require("express");
const router = express.Router();
const { getSubjects, addSubject } = require("../controllers/subjectController"); // ✅ Ensure correct imports

router.get("/", getSubjects);  // ✅ Ensure function exists
router.post("/", addSubject);  // ✅ Ensure function exists

module.exports = router;
