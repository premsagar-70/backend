const Student = require("../models/Student");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving students" });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, rollNumber, course, year, section, password } = req.body;
    const student = new Student({ name, rollNumber, course, year, section, password });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding student" });
  }
};

module.exports = { getStudents, addStudent };
