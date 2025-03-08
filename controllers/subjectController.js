const Subject = require("../models/Subject");

exports.addSubject = async (req, res) => {
    try {
        const { name, department, year, semester, teacher } = req.body;

        if (!name || !department || !year || !semester || !teacher) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubject = new Subject({
            name,
            department,
            year,
            semester,
            teacher
        });

        await newSubject.save();
        res.status(201).json({ message: "Subject created successfully", subject: newSubject });
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getSubjects = async (req, res) => {
    try {
        const { department, year, semester } = req.query;

        if (!department || !year || !semester) {
            return res.status(400).json({ message: "Department, Year, and Semester are required" });
        }

        const subjects = await Subject.find({ department, year, semester });

        res.json(subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ message: "Server error" });
    }
};