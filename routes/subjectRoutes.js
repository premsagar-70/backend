const express = require("express");
const { getSubjects } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Ensure authentication

const router = express.Router();

// ✅ Fix: Require department, year, and semester
router.get("/", authMiddleware, async (req, res) => {
    const { department, year, semester } = req.query;

    if (!department || !year || !semester) {
        return res.status(400).json({ message: "Missing required parameters: department, year, and semester." });
    }

    try {
        const subjects = await getSubjects(department, year, semester);
        res.json(subjects);
    } catch (error) {
        console.error("❌ Error fetching subjects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
