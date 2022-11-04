const db = require('../db/db');
const { User, Board, Cheese} = require('../models');

describe("Many-to-many association test: Board and Cheese", () => {

    // test('Adding many cheeses to one board works', async () => {
    //     // await db.query('DROP TABLE IF EXISTS Boards');
    //     await db.query('DROP TABLE IF EXISTS Cheeses');
    //     await db.query('DROP TABLE IF EXISTS Users');
    //     await Cheese.sync();
    //     await Board.sync();
        
        // const cheeseList = await Cheese.bulkCreate([
        //     {title:"Cheddar", description:"The best"},
        //     {title:"Parmesan", description:"Also excellent tbf"}
        // ]);
        

    //     const boardList = await Board.bulkCreate([
    //         {type:"Cheese platter", description:"Various cheese", rating:10},
    //         {type:"Cheese platypus", description:"Various cheese in the shape of a platypus", rating:10000}
    //     ])

    //     await boardList[0].addCheeses(cheeseList);

    //     let cheeseRetrieved = [];
    //     (await boardList[0].getCheeses()).map(b => cheeseRetrieved.push(b.toJSON()))

    //     expect(cheeseRetrieved.length).toBe(2);
    // })

    test('Adding many cheeses to one user works', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await db.query('DROP TABLE IF EXISTS Users');
        await User.sync();
        await Board.sync();
        await Cheese.sync();
        
        const board =  await Board.create({type:"Cheese platter", description:"Various cheese", rating:10})

        const cheeseList = await Cheese.bulkCreate([
            {title:"Cheddar", description:"The best"},
            {title:"Parmesan", description:"Also excellent tbf"}
        ]);
        

        await board.addCheese(cheeseList[0]);
        // await board.addCheese(cheeseList[1]);

        let cheeseRetrieved = [];
        (await board.getCheeses()).map(b => cheeseRetrieved.push(b.toJSON()))

        expect(cheeseRetrieved.length).toBe(2);
    })

    // test('Adding many boards to one cheese works', async () => {
    //     await db.query('DROP TABLE IF EXISTS Boards');
    //     await db.query('DROP TABLE IF EXISTS Cheeses');
    //     await db.query('DROP TABLE IF EXISTS Users');
    //     await Cheese.sync();
    //     await Board.sync();
        
    //     const cheeseList = await Cheese.bulkCreate([
    //         {title:"Cheddar", description:"The best"},
    //         {title:"Parmesan", description:"Also excellent tbf"}
    //     ]);
        

    //     const boardList = await Board.bulkCreate([
    //         {type:"Cheese platter", description:"Various cheese", rating:10},
    //         {type:"Cheese platypus", description:"Various cheese in the shape of a platypus", rating:10000}
    //     ]);

    //     await cheeseList[0].addCheeses(boardList);

    //     let boardRetrieved = [];
    //     (await cheeseList[0].getCheeses()).map(b => boardRetrieved.push(b.toJSON()))

    //     expect(boardRetrieved.length).toBe(2);
    // })


    // test('Eager loading returns two boards associated with the User', async () => {
    //     await db.query('DROP TABLE IF EXISTS Boards');
    //     await db.query('DROP TABLE IF EXISTS Cheeses');
    //     await db.query('DROP TABLE IF EXISTS Users');
    //     await User.sync();
    //     await Board.sync();
        
    //     const user =  await User.create({name:"Teddy", email:"teddyputus1@gmail.com"})
        

    //     const boardList = await Board.bulkCreate([
    //         {type:"Cheese platter", description:"Various cheese", rating:10},
    //         {type:"Cheese platypus", description:"Various cheese in the shape of a platypus", rating:10000}
    //     ])

    //     await user.addBoards(boardList);

    //     const userEagerLoaded = await User.findAll({include: Board});
    //     console.log(userEagerLoaded)

    //     expect(userEagerLoaded[0].Boards.length).toBe(2);
    // });
});



const db = require('../db/db');
const { User, Board, Cheese} = require('../models');
const seed = require('../db/seed');
const { describe } = require('../models/board.model');


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

describe("User model CRUD operations work", () => {
    test('Seeded user exists and contains correct information', async () => {
        const [data, meta] = await db.query('SELECT * FROM Users WHERE name = "Teddy"');
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Teddy');
        expect(data[0].email).toBe('teddyputus1@gmail.com');
    })

    test('New user is created successfully', async () => {
        
        await User.create({name:"Ollie", email:"ollieThaDog@gmail.com"})

        const [data, meta] = await db.query('SELECT * FROM Users WHERE name = "Ollie"');
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Ollie');
        expect(data[0].email).toBe('ollieThaDog@gmail.com');
    })

    test('User can be updated and contains the information we expect', async () => {

        await User.update({name:"Sak", email:"sakPutus@google.com"}, {where:{name:"Teddy"}})

        const [data, meta] = await db.query('SELECT * FROM Users WHERE name = "Sak"');

        expect(data[0].name).toBe('Sak');
        expect(data[0].email).toBe('sakPutus@google.com');
    })


    test('User is deleted', async () => {
        await User.destroy({where : {name:"Ollie"}});

        const [data, meta] = await db.query('SELECT * FROM Users');

        expect(data.length).toBe(6);
    })

})