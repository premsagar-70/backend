const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Student.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        // ✅ Compare hashed password with entered password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "3h" });
        res.json({ token, user });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.addStudent = async (req, res) => {
    try {
        const { name, rollNumber, email, password, department, year, semester, subjects } = req.body;

        // ✅ Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            name,
            rollNumber,
            email,
            password: hashedPassword, // 🔥 Store hashed password instead of plain text
            department,
            year,
            semester,
            subjects
        });

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
