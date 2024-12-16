// tests/schoolController.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const School = require('../models/School');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('School Controller Tests', () => {
    const superadminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU3VwZXJhZG1pbiIsImlkIjoic3VwZXJhZG1pbjEyMyIsImlhdCI6MTczNDM2MjQ2MywiZXhwIjoxNzM0MzY2MDYzfQ.KfpfBp4BUXLgkNv-qipKHgYYYVH_o4hSSgmuI45COEo';

    test('Create a new school', async () => {
        const response = await request(app)
            .post('/api/schools')
            .set('Authorization', `Bearer ${superadminToken}`)
            .send({
                name: 'Test School',
                address: '123 Test Address',
                contactEmail: 'test@school.com',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Test School');
    });

    test('Get all schools', async () => {
        const response = await request(app)
            .get('/api/schools')
            .set('Authorization', `Bearer ${superadminToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Update a school', async () => {
        const school = await School.create({
            name: 'Old School',
            address: '456 Test Address',
            contactEmail: 'old@school.com',
        });

        const response = await request(app)
            .put(`/api/schools/${school._id}`)
            .set('Authorization', `Bearer ${superadminToken}`)
            .send({
                name: 'Updated School',
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated School');
    });

    test('Delete a school', async () => {
        const school = await School.create({
            name: 'Delete School',
            address: '789 Test Address',
            contactEmail: 'delete@school.com',
        });

        const response = await request(app)
            .delete(`/api/schools/${school._id}`)
            .set('Authorization', `Bearer ${superadminToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('School deleted successfully');
    });
});
