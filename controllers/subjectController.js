const Subject = require("../models/Subject");

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate("teacher", "name"); // ✅ Populate teacher name
        res.json(subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ message: "Server error" });
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
