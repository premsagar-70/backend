const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
    try {
        console.log("📩 Received student data:", req.body); // ✅ Log request data

        const { name, rollNumber, email, password, department, year, semester, subjects } = req.body;

        if (!name || !rollNumber || !password || !department || !year || !semester || !subjects.length) {
            console.error("❌ Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log("✅ All fields are present, proceeding to create student...");

        const newStudent = new Student({
            name,
            rollNumber,
            email,
            password,
            department,
            year,
            semester,
            subjects
        });

        await newStudent.save();
        console.log("🎉 Student created successfully:", newStudent);

        res.status(201).json({ message: "Student added successfully", student: newStudent });

    } catch (error) {
        console.error("🔥 Error adding student:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
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
