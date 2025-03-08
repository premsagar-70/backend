const Department = require("../models/Department");

// Create a new department
const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Department name is required" });
        }

        const newDepartment = new Department({ name });
        await newDepartment.save();
        res.status(201).json({ message: "Department created successfully", department: newDepartment });
    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createDepartment, getDepartments };
