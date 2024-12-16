const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth');
const { createSchool, getSchools, updateSchool, deleteSchool } = require('../controllers/schoolController');
const { createClassroom, getClassrooms, updateClassroom, deleteClassroom } = require('../controllers/classroomController');
const { createStudent, getStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

// School Routes
router.post('/schools', authenticateJWT, authorizeRoles('Superadmin'), createSchool);
router.get('/schools', authenticateJWT, authorizeRoles('Superadmin'), getSchools);
router.put('/schools/:id', authenticateJWT, authorizeRoles('Superadmin'), updateSchool);
router.delete('/schools/:id', authenticateJWT, authorizeRoles('Superadmin'), deleteSchool);

// Classroom Routes
router.post('/classrooms', authenticateJWT, authorizeRoles('School Administrator'), createClassroom);
router.get('/classrooms', authenticateJWT, authorizeRoles('School Administrator'), getClassrooms);
router.put('/classrooms/:id', authenticateJWT, authorizeRoles('School Administrator'), updateClassroom);
router.delete('/classrooms/:id', authenticateJWT, authorizeRoles('School Administrator'), deleteClassroom);

// Student Routes
router.post('/students', authenticateJWT, authorizeRoles('School Administrator'), createStudent);
router.get('/students', authenticateJWT, authorizeRoles('School Administrator'), getStudents);
router.put('/students/:id', authenticateJWT, authorizeRoles('School Administrator'), updateStudent);
router.delete('/students/:id', authenticateJWT, authorizeRoles('School Administrator'), deleteStudent);

module.exports = router;