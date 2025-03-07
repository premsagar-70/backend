const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
    try {
        const { studentId, subject, status, date } = req.body;
        const attendance = new Attendance({ studentId, subject, status, date });
        await attendance.save();
        res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        res.json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
