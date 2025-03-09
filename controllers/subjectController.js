const Subject = require("../models/Subject");
const mongoose = require("mongoose");

exports.getSubjects = async (req, res) => {
    try {
        console.log("📡 Incoming Request:", req.query);

        const { department, year, semester } = req.query;

        if (!department || !year || !semester) {
            return res.status(400).json({ message: "Missing department, year, or semester" });
        }

        const subjects = await Subject.find({
            department: new mongoose.Types.ObjectId(department), // ✅ Convert department to ObjectId
            year,
            semester,
        });

        console.log("📜 Subjects Found:", subjects);
        res.json(subjects);
    } catch (error) {
        console.error("🔥 Error fetching subjects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.addSubject = async (req, res) => {
    try {
        const { name, department, year, semester, teacher } = req.body;
        if (!name || !department || !year || !semester || !teacher) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubject = new Subject({ name, department, year, semester, teacher });
        await newSubject.save();

        res.status(201).json({ message: "Subject added successfully", subject: newSubject });
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({ message: "Server error" });
    }
};
