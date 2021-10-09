const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    rollNumber: { type: Number, required: true },
    name: { type: String, required: true, trim: true, minlength: 2 },
    standard: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dob: { type: Date },
}, { timestamps: true });

module.exports = new mongoose.model('Student', studentSchema);