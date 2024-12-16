const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    enrolledClassroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);