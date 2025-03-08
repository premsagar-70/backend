const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    year: { type: Number, required: true },
});

module.exports = mongoose.model("Subject", SubjectSchema);
