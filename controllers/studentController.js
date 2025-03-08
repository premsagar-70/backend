const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
    try {
        const { name, rollNumber, email, password, year, semester, department, subjects } = req.body;

        // Check if required fields are provided
        if (!name || !rollNumber || !email || !password || !year || !semester || !department || !subjects) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash password before saving (optional, if backend hashes passwords)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create student
        const newStudent = new Student({
            name,
            rollNumber,
            email,
            password: hashedPassword, // Save hashed password
            year,
            semester,
            department,
            subjects,
        });

        await newStudent.save();
        res.status(201).json({ message: "Student added successfully" });

    } catch (error) {
        console.error("❌ Error adding student:", error);
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
