const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");

/**
 * User Registration (Admin & Teacher)
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await Staff.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Staff({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
};

/**
 * User Login (Admin & Teacher)
 */
exports.login = async (req, res) => {
    try {
        console.log("🚀 Incoming Request: POST /api/auth/login");
        console.log("🔹 Request Body:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await Staff.findOne({ email });
        console.log("🔍 User found:", user);

        if (!user) {
            console.log("❌ User not found");
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔑 Entered password:", password);
        console.log("🔒 Stored hash:", user.password);
        console.log("✅ Password match:", isMatch);

        if (!isMatch) {
            console.log("❌ Invalid password");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("🔑 Token Generated:", token);

        res.json({ token, user });
    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};

/**
 * Get Current User Details (Protected)
 */
exports.getUser = async (req, res) => {
    try {
        const user = await Staff.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
