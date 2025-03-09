const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

exports.login = async (req, res) => {
    try {
        console.log("🚀 Incoming Request: POST /api/students/login"); // Debugging log
        console.log("🔹 Request Body:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "❌ Email and password are required" });
        }

        const user = await Student.findOne({ email });
        console.log("👤 User found:", user);

        if (!user) {
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔑 Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "3h" });
        console.log("✅ Token Generated:", token);

        res.json({ token, user });
    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.addStudent = async (req, res) => {
    try {
        const { name, rollNumber, email, password, department, year, semester, subjects } = req.body;
        
        if (!name || !rollNumber || !email || !password || !department || !year || !semester) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            name,
            rollNumber,
            email,
            password: hashedPassword,  // ✅ Save hashed password
            department,
            year,
            semester,
            subjects,
        });

        await newStudent.save();
        res.status(201).json({ message: "Student added successfully" });

    } catch (error) {
        console.error("🔥 Error adding student:", error);
        res.status(500).json({ message: "Server error" });
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
