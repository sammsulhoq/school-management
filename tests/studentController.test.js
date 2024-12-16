// tests/studentController.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Student = require('../models/Student');

beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Student Controller Tests', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU2Nob29sIEFkbWluaXN0cmF0b3IiLCJpZCI6InNjaG9vbGFkbWluMTIzIiwiaWF0IjoxNzM0MzYyNDYzLCJleHAiOjE3MzQzNjYwNjN9.aygp4hmnETUdgrt2ZGBM2sg5SfWL_q4nRcWrbAT541c';

    test('Create a new student', async () => {
        const response = await request(app)
            .post('/api/students')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                enrolledClassroom: '63f4bc8e76d2a73172d945be',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.firstName).toBe('John');
    });

    test('Get all students', async () => {
        const response = await request(app)
            .get('/api/students')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Update a student', async () => {
        const student = await Student.create({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            enrolledClassroom: '63f4bc8e76d2a73172d945be',
        });

        const response = await request(app)
            .put(`/api/students/${student._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'Updated Jane',
            });

        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Updated Jane');
    });

    test('Delete a student', async () => {
        const student = await Student.create({
            firstName: 'Delete John',
            lastName: 'Doe',
            email: 'delete.john@example.com',
            enrolledClassroom: '63f4bc8e76d2a73172d945be',
        });

        const response = await request(app)
            .delete(`/api/students/${student._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Student deleted successfully');
    });
});
