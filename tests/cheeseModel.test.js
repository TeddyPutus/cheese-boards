//file to test if the models and DB set up is correct
//Are the tables correct, can we do CRUD operations
const db = require('../db/db');
const { User, Board, Cheese} = require('../models');

// beforeAll(async () => {
//     await db.query('DROP TABLE IF EXISTS Users');
//     await db.query('DROP TABLE IF EXISTS Boards');
//     await db.query('DROP TABLE IF EXISTS Cheeses');
// });

describe("Does the Cheese Model work?", () => {

    test('Cheese table exists once we sync Cheese model', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await db.query('DROP TABLE IF EXISTS Users');
        await Cheese.sync();
        const data = await db.getQueryInterface().showAllSchemas();
        expect(data[0].name).toBe('Cheeses');
    })

    test('Cheeses contains the information we expect', async () => {
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await Cheese.sync();
        
        await Cheese.create({title:"Cheddar", description:"The best"})

        const [data, meta] = await db.query('SELECT * FROM Cheeses WHERE title = "Cheddar"');
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Cheddar');
        expect(data[0].description).toBe('The best');
    })

    test('Cheese can be updated and contains the information we expect', async () => {
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await Cheese.sync();

        await Cheese.create({title:"Cheddar", description:"The best"})

        await Cheese.update({title:"Parmesan", description:"Also excellent tbf"}, {where:{title:"Cheddar"}})

        const [data, meta] = await db.query('SELECT * FROM Cheeses WHERE title = "Parmesan"');

        expect(data[0].title).toBe('Parmesan');
        expect(data[0].description).toBe('Also excellent tbf');
    })

    test('User is deleted', async () => {
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await Cheese.sync();

        await Cheese.create({title:"Cheddar", description:"The best"})
        await Cheese.create({title:"Parmesan", description:"Also excellent tbf"})

        await Cheese.destroy({where : {title:"Cheddar"}});

        const [data, meta] = await db.query('SELECT * FROM Cheeses');

        await db.query('DROP TABLE IF EXISTS Cheeses');

        expect(data.length).toBe(1);
    })

})