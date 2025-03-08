const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");

exports.addTeacher = async (req, res) => {
    try {
        const { name, email, subjects, password } = req.body;

        // 🔴 Check if email exists to prevent duplicates
        const existingTeacher = await Staff.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // ✅ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Ensure "subjects" is an array (important)
        const newTeacher = new Staff({ 
            name, 
            email, 
            subjects: subjects || [], 
            role: "teacher",
            password: hashedPassword  // ✅ Store hashed password
        });

        await newTeacher.save();
        res.status(201).json({ message: "Teacher added successfully" });
    } catch (error) {
        console.error("Error adding teacher:", error);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get only teachers with their name and ID
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Staff.find({ role: "teacher" }).select("name _id");
        res.json(teachers);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ message: "Server error" });
    }
};
