const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true, enum: ["Present", "Absent"] },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
