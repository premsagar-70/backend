const Subject = require("../models/Subject");

const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const addSubject = async (req, res) => {
    try {
        const { name, department, year, semester, teacher } = req.body;
        if (!name || !department || !year || !semester) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const subject = new Subject({ name, department, year, semester, teacher });
        await subject.save();
        res.status(201).json({ message: "Subject created successfully", subject });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getSubjects, addSubject };
