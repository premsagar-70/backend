const express = require('express');
const router = express.Router();
const { addTeacher, getAllTeachers, getTeacherById, deleteTeacher } = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware'); // Protect routes

// Add a new teacher (Only Admin can add teachers)
router.post('/add', authMiddleware, addTeacher);

// Get all teachers
router.get('/all', authMiddleware, getAllTeachers);

// Get teacher by ID
router.get('/:id', authMiddleware, getTeacherById);

// Delete teacher
router.delete('/:id', authMiddleware, deleteTeacher);

module.exports = router;
