const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

// ✅ Student Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("📡 Student Login Request:", email);

        // ✅ Find student by email
        const user = await Student.findOne({ email });

        if (!user) {
            console.log("❌ Student Not Found");
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        console.log("🔑 Stored Hashed Password:", user.password);

        // ✅ Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("❌ Password does not match");
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        console.log("✅ Password Matched. Generating Token...");

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: "student" },
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



exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
