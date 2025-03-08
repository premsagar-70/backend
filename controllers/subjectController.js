const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
    try {
        const { name, department, year } = req.body;
        if (!name || !department || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubject = new Subject({ name, department, year });
        await newSubject.save();
        res.status(201).json({ message: "Subject created successfully", subject: newSubject });
    } catch (error) {
        console.error("Error creating subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createSubject, getSubjects };
