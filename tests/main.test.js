const request = require('supertest');
const { connectToDatabase, app } = require('../main');
const User = require('../models/user');
const Cost = require('../models/cost');

let connection

beforeAll(async () => {
    connection = await connectToDatabase('cm-test');
});

// Clear the database before each test
beforeEach(async () => {
    await User.deleteMany({});
    await Cost.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
    await connection.connection.close();
});

describe('Cost API', () => {
    // Rest of the test code...
});


describe('Cost API', () => {
    describe('POST /addcost/', () => {
        it('should add a cost and return the added cost', async () => {
            const newCost = {
                user_id: 'user123',
                year: 2023,
                month: 5,
                day: 15,
                id: 1,
                description: 'Groceries',
                category: 'Food',
                sum: 50,
            };

            const response = await request(app).post('/addcost/').send(newCost);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(newCost);
        });

        it('should return an error if any required field is missing', async () => {
            const incompleteCost = {
                user_id: 'user123',
                year: 2023,
                month: 5,
                day: 15,
                id: 1,
                description: 'Groceries',
                category: 'Food',
            };

            const response = await request(app).post('/addcost/').send(incompleteCost);

            expect(response.status).toBe(400);
            expect(response.text).toBe('Missing required fields');
        });

        // Add more test cases for edge cases and validation logic
    });

    describe('GET /report/', () => {
        it('should generate a report for a given user, year, and month', async () => {
            // Create some example costs in the test database
            await Cost.create([
                {
                    user_id: 'user123',
                    year: 2023,
                    month: 5,
                    day: 15,
                    id: 1,
                    description: 'Groceries',
                    category: 'Food',
                    sum: 50,
                },
                {
                    user_id: 'user123',
                    year: 2023,
                    month: 5,
                    day: 16,
                    id: 2,
                    description: 'Gym',
                    category: 'Sport',
                    sum: 30,
                },
            ]);

            const response = await request(app).get('/report/?user_id=user123&year=2023&month=5')
            console.log(response.body)
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                Education: [],
                Food: [
                    {
                        "__v": expect.any(Number),
                        "_id": expect.any(String),
                        user_id: 'user123',
                        year: 2023,
                        month: 5,
                        day: 15,
                        id: 1,
                        description: 'Groceries',
                        category: 'Food',
                        sum: 50,
                    },
                ],
                Groceries: [],
                Health: [],
                Housing: [],
                Other: [],
                Sport: [
                    {
                        "__v": expect.any(Number),
                        "_id": expect.any(String),
                        user_id: 'user123',
                        year: 2023,
                        month: 5,
                        day: 16,
                        id: 2,
                        description: 'Gym',
                        category: 'Sport',
                        sum: 30,
                    },
                ],
                Transportation: []
            });

        });

        // Add more test cases for different scenarios and edge cases
    });

    describe('GET /about/', () => {
        it('should retrieve user information', async () => {
            const response = await request(app).get('/about/');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(      [{ 'firstname': 'Yael', 'lastname': 'Gonikman', 'id': 206752396, 'email': 'yaelgonikman@gmail.com' },
            { 'firstname': 'Shay', 'lastname': 'Peretz', 'id': 319126405, 'email': 'shay28561@gmail.com' }]);
        });
    });
});
