const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        console.error("🚨 No token provided!");
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }
        console.log("🔍 Received Token:", req.header("Authorization"));
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified:", verified); // Log verified user info

        req.user = verified;
        next();
    } catch (error) {
        console.error("🚨 JWT Error:", error.message);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
