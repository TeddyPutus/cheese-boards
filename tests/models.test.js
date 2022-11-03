//file to test if the models and DB set up is correct
//Are the tables correct, can we do CRUD operations
const db = require('../db/db');
const { User, Board, Cheese} = require('../models');

// beforeAll(async () => {
//     await db.query('DROP TABLE IF EXISTS Users');
//     await db.query('DROP TABLE IF EXISTS Boards');
//     await db.query('DROP TABLE IF EXISTS Cheeses');
// });

describe("Does the User Model work?", () => {

    test('User table exists once we sync User model', async () => {
        await db.query('DROP TABLE IF EXISTS Users');
        await User.sync();
        const data = await db.getQueryInterface().showAllSchemas();
        expect(data[0].name).toBe('Users');
    })

    test('User contains the information we expect', async () => {
        await db.query('DROP TABLE IF EXISTS Users');
        await User.sync();
        
        await User.create({name:"Teddy", email:"teddyputus1@gmail.com"})

        const [data, meta] = await db.query('SELECT * FROM Users WHERE name = "Teddy"');
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Teddy');
        expect(data[0].email).toBe('teddyputus1@gmail.com');
    })

    test('User can be updated and contains the information we expect', async () => {
        await db.query('DROP TABLE IF EXISTS Users');
        await User.sync();

        await User.create({name:"Teddy", email:"teddyputus1@gmail.com"});

        await User.update({name:"Harry", email:"harry@google.com"}, {where:{name:"Teddy"}})

        const [data, meta] = await db.query('SELECT * FROM Users WHERE name = "Harry"');

        expect(data[0].name).toBe('Harry');
        expect(data[0].email).toBe('harry@google.com');
    })

    test('User is deleted', async () => {
        await db.query('DROP TABLE IF EXISTS Users');
        await User.sync();

        await User.create({name:"Teddy", email:"teddyputus1@gmail.com"})
        await User.create({name:"Harry", email:"harry@google.com"})

        await User.destroy({where : {name:"Teddy"}});

        const [data, meta] = await db.query('SELECT * FROM Users');
        expect(data.length).toBe(1);
    })

})