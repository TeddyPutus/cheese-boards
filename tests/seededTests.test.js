const db = require('../db/db');
const { User, Board, Cheese} = require('../models');
const seed = require('../db/seed');


beforeAll(async () => await seed());

describe("Do the tables appear in the database after seeding?", () => {

    test('User table exists', async () => {
        const data = await db.getQueryInterface().showAllSchemas();
        expect(data[0].name).toBe('Users');
    })

    test('Board table exists', async () => {
        const data = await db.getQueryInterface().showAllSchemas();
        expect(data[1].name).toBe('Boards');
    })

    test('Cheese table exists', async () => {
        const data = await db.getQueryInterface().showAllSchemas();
        expect(data[2].name).toBe('Cheeses');
    })
})