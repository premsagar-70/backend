const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'teacher'] },
    subjects: { type: [String], default: [] }
});

module.exports = mongoose.model('Staff', StaffSchema);
