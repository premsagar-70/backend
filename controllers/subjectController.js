const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
    try {
        console.log("📩 Incoming request to create subject:", req.body);

        const { name, department, year, semester, teacher } = req.body;
        
        if (!name || !department || !year || !semester) {
            console.log("❌ Missing fields:", { name, department, year, semester });
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubject = new Subject({ name, department, year, semester, teacher });
        await newSubject.save();

        console.log("✅ Subject created successfully:", newSubject);
        res.status(201).json({ message: "Subject created successfully", subject: newSubject });

    } catch (error) {
        console.error("🔥 Error creating subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createSubject };
