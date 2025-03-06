const bcrypt = require('bcryptjs');
const Staff = require('../models/Staff');

/**
 * Add a new teacher
 */
exports.addTeacher = async (req, res) => {
    try {
        const { name, email, password, subjects } = req.body;

        // Check if the email is already registered
        const existingUser = await Staff.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new Staff({
            name,
            email,
            password: hashedPassword,
            role: 'teacher',
            subjects
        });

        await newTeacher.save();
        res.status(201).json({ message: 'Teacher added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get all teachers
 */
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Staff.find({ role: 'teacher' }).select('-password');
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get teacher by ID
 */
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Staff.findById(req.params.id).select('-password');
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Delete a teacher
 */
exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Staff.findByIdAndDelete(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
