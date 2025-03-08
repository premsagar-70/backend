const express = require("express");
const { addSubject, getSubjects } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addSubject);
router.get("/", authMiddleware, getSubjects);

module.exports = router;
