const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");
const Student = require("../models/Student");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Staff({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        console.log("Incoming login request:", req.body); // ✅ Debugging
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Staff.findOne({ email });
        console.log("User found in DB:", user); // ✅ Debugging

        if (!user) {
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch); // ✅ Debugging

        if (!isMatch) {
            return res.status(400).json({ message: "❌ Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "3h" });
        console.log("Generated Token:", token); // ✅ Debugging

        res.json({ token, user });

    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { register, login }; // ✅ Ensure both functions are exported
