const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const staffRoutes = require("./routes/staffRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Configure CORS properly
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sretattendance1.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/subjects", subjectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
