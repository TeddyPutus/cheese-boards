const db = require('../db/db');
const { User, Board, Cheese} = require('../models');


describe("One-to-many association test: User and Board", () => {

    test('Adding many cheeses to one user works', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await db.query('DROP TABLE IF EXISTS Users');
        await User.sync();
        await Board.sync();
        
        const user =  await User.create({name:"Teddy", email:"teddyputus1@gmail.com"})
        

        const boardList = await Board.bulkCreate([
            {type:"Cheese platter", description:"Various cheese", rating:10},
            {type:"Cheese platypus", description:"Various cheese in the shape of a platypus", rating:10000}
        ])

        await user.addBoards(boardList);

        let BoardsRetrieved = [];
        (await user.getBoards()).map(b => BoardsRetrieved.push(b.toJSON()))

        expect(BoardsRetrieved.length).toBe(2);
    })

    test('Eager loading returns two boards associated with the User', async () => {
        await db.query('DROP TABLE IF EXISTS Boards');
        await db.query('DROP TABLE IF EXISTS Cheeses');
        await db.query('DROP TABLE IF EXISTS Users');
        await User.sync();
        await Board.sync();
        
        const user =  await User.create({name:"Teddy", email:"teddyputus1@gmail.com"})
        

        const boardList = await Board.bulkCreate([
            {type:"Cheese platter", description:"Various cheese", rating:10},
            {type:"Cheese platypus", description:"Various cheese in the shape of a platypus", rating:10000}
        ])

        await user.addBoards(boardList);

        const userEagerLoaded = await User.findAll({include: Board});
        console.log(userEagerLoaded)

        expect(userEagerLoaded[0].Boards.length).toBe(2);
        
    });
});
