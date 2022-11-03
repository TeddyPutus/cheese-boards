//file to test if the models and DB set up is correct
//Are the tables correct, can we do CRUD operations
const db = require('../db/db');
const { User, Board, Cheese} = require('../models');

// beforeAll(async () => {
//     await db.query('DROP TABLE IF EXISTS Users');
//     await db.query('DROP TABLE IF EXISTS Boards');
//     await db.query('DROP TABLE IF EXISTS Cheeses');
// });

describe("Does the Board Model work?", () => {

    test('Board table exists once we sync User model', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await db.query('DROP TABLE IF EXISTS Users');
        await Board.sync();
        const data = await db.getQueryInterface().showAllSchemas();
        expect(data[0].name).toBe('Boards');
    })

    test('Board contains the information we expect', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await Board.sync();
        
        await Board.create({type:"Cheese platter", description:"Various cheese", rating:10});

        const [data, meta] = await db.query('SELECT * FROM Boards WHERE type="Cheese platter"');
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('Cheese platter');
        expect(data[0].description).toBe('Various cheese');
        expect(data[0].rating).toBe(10);
    })

    test('User can be updated and contains the information we expect', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await Board.sync();

        await Board.create({type:"Cheese platter", description:"Various cheese", rating:10});

        await Board.update({type:"Cheese platypus", description:"Various cheese in the shape of a platypus", rating:10000}, {where:{type:"Cheese platter"}})

        const [data, meta] = await db.query('SELECT * FROM Boards WHERE type = "Cheese platypus"');

        expect(data[0].type).toBe('Cheese platypus');
        expect(data[0].description).toBe('Various cheese in the shape of a platypus');
        expect(data[0].rating).toBe(10000);
    })

    test('User is deleted', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await Board.sync();

        await Board.create({type:"Cheese platter", description:"Various cheese", rating:10})
        await Board.create({type:"Cheese platypus", description:"Various cheese in the shape of a platypus", rating:10000})

        await Board.destroy({where : {type:"Cheese platypus"}});

        const [data, meta] = await db.query('SELECT * FROM Boards');

        await db.query('DROP TABLE IF EXISTS Boards');

        expect(data.length).toBe(1);
    })
})