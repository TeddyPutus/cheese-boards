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