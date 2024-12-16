// tests/classroomController.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Classroom = require('../models/Classroom');

beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Classroom Controller Tests', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU2Nob29sIEFkbWluaXN0cmF0b3IiLCJpZCI6InNjaG9vbGFkbWluMTIzIiwiaWF0IjoxNzM0MzYyNDYzLCJleHAiOjE3MzQzNjYwNjN9.aygp4hmnETUdgrt2ZGBM2sg5SfWL_q4nRcWrbAT541c';

    test('Create a new classroom', async () => {
        const response = await request(app)
            .post('/api/classrooms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Classroom',
                capacity: 30,
                school: '63f4bc8e76d2a73172d945bd',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Test Classroom');
    });

    test('Get all classrooms', async () => {
        const response = await request(app)
            .get('/api/classrooms')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Update a classroom', async () => {
        const classroom = await Classroom.create({
            name: 'Old Classroom',
            capacity: 20,
            school: '63f4bc8e76d2a73172d945bd',
        });

        const response = await request(app)
            .put(`/api/classrooms/${classroom._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Classroom',
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Classroom');
    });

    test('Delete a classroom', async () => {
        const classroom = await Classroom.create({
            name: 'Delete Classroom',
            capacity: 25,
            school: '63f4bc8e76d2a73172d945bd',
        });

        const response = await request(app)
            .delete(`/api/classrooms/${classroom._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Classroom deleted successfully');
    });
});
