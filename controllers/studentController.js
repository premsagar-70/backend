const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

// ✅ Student Login
exports.login = async (req, res) => {
    try {
        console.log("🚀 Incoming Request: POST /api/students/login");
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

        const token = jwt.sign(
            { id: user._id, role: user.role || "student" }, // ✅ Use stored role
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        console.log("✅ Token Generated:", token);
        res.json({ token, user });
    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Add Student
exports.addStudent = async (req, res) => {
    try {
        const { name, rollNumber, email, password, department, year, semester, subjects, role } = req.body;

        if (!name || !rollNumber || !email || !password || !department || !year || !semester || !subjects) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Check if student already exists
        const existingStudent = await Student.findOne({ rollNumber });
        if (existingStudent) {
            return res.status(400).json({ error: "Student already exists" });
        }

        // ✅ Make sure to properly declare `hashedPassword`
        console.log("🔑 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("✅ Password hashed successfully.");

        // ✅ Store role correctly, default to "student"
        const newStudent = new Student({
            name,
            rollNumber,
            email,
            password: hashedPassword,  // 🛠️ Use the correctly declared `hashedPassword`
            department,
            year,
            semester,
            subjects,
            role: role || "student"  // ✅ Store role as "student" if not provided
        });

        await newStudent.save();
        res.status(201).json({ message: "✅ Student added successfully", student: newStudent });
    } catch (error) {
        console.error("❌ Error adding student:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Get All Students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Logged-in Student Profile
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select("-password"); // ✅ Exclude password for security
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
