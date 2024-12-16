const Classroom = require('../models/Classroom');

const createClassroom = async (req, res) => {
    try {
        const classroom = new Classroom(req.body);
        await classroom.save();
        res.status(201).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
        res.status(200).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createClassroom, getClassrooms, updateClassroom, deleteClassroom };