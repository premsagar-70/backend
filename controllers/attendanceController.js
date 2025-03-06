const Attendance = require("../models/Attendance");

const markAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    const attendance = new Attendance({ student: studentId, date, status });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance" });
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("student");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving attendance" });
  }
};

module.exports = { markAttendance, getAttendance };
