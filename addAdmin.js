require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Staff = require('./models/Staff');  // ✅ Correct path

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new Staff({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
    });

    await admin.save();
    console.log("Admin user created!");
    mongoose.disconnect();
}).catch(err => console.error(err));
