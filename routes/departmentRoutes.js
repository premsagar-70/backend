const express = require("express");
const router = express.Router();
const { createDepartment, getDepartments } = require("../controllers/departmentController");

// Route to create a department
router.post("/", createDepartment);

// Route to get all departments
router.get("/", getDepartments);

module.exports = router;
