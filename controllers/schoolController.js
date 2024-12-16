const School = require('../models/School');

const createSchool = async (req, res) => {
    try {
        const school = new School(req.body);
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getSchools = async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json(schools);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateSchool = async (req, res) => {
    try {
        const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!school) return res.status(404).json({ message: 'School not found' });
        res.status(200).json(school);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteSchool = async (req, res) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);
        if (!school) return res.status(404).json({ message: 'School not found' });
        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createSchool, getSchools, updateSchool, deleteSchool };