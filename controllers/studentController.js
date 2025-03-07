const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
    try {
        const { name, rollNumber, department, year, semester } = req.body;
        const newStudent = new Student({ name, rollNumber, department, year, semester });
        await newStudent.save();
        res.status(201).json({ message: "Student added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
