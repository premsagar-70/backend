const Staff = require("../models/Staff");

exports.addTeacher = async (req, res) => {
    try {
        const { name, email, subject } = req.body;
        const newTeacher = new Staff({ name, email, subject, role: "teacher" });
        await newTeacher.save();
        res.status(201).json({ message: "Teacher added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Staff.find({ role: "teacher" });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
