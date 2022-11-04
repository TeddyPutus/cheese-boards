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

describe("Board model CRUD operations work", () => {
    test('Seeded board exists and contains correct information', async () => {
        const [data, meta] = await db.query('SELECT * FROM Boards WHERE type = "Gourmet Board"');
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('Gourmet Board');
        expect(data[0].description).toBe('Gourmet cheese');
        expect(data[0].rating).toBe(10);
    })

    test('New board is created successfully', async () => {
        
        await Board.create({type:"Teds custom board", description:"Confused cheese", rating:29})

        const [data, meta] = await db.query('SELECT * FROM Boards WHERE type="Teds custom board"');
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('Teds custom board');
        expect(data[0].description).toBe('Confused cheese');
        expect(data[0].rating).toBe(29);
    })

    test('Board can be updated and contains the information we expect', async () => {

        await Board.update({type:"Updated custom board", description:"Updated cheese", rating:1}, {where:{type:"Teds custom board"}})

        const [data, meta] = await db.query('SELECT * FROM Boards WHERE type = "Updated custom board"');

        expect(data[0].type).toBe('Updated custom board');
        expect(data[0].description).toBe('Updated cheese');
        expect(data[0].rating).toBe(1);
    })


    test('Board is deleted', async () => {
        await Board.destroy({where : {type:"Updated custom board"}});

        const [data, meta] = await db.query('SELECT * FROM Boards');

        expect(data.length).toBe(5);
    })

})

describe("Cheese model CRUD operations work", () => {
    test('Seeded Cheese exists and contains correct information', async () => {
        const [data, meta] = await db.query('SELECT * FROM Cheeses WHERE title = "Feta"');
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Feta');
        expect(data[0].description).toBe('Fetid, more like');
    })

    test('New cheese is created successfully', async () => {
        
        await Cheese.create({title:"Vintage Cheddar", description:"The best of the best"})

        const [data, meta] = await db.query('SELECT * FROM Cheeses WHERE title = "Vintage Cheddar"');
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Vintage Cheddar');
        expect(data[0].description).toBe('The best of the best');
    })

    test('Cheese can be updated and contains the information we expect', async () => {

        await Cheese.update({title:"Smoked Cheddar", description:"A variation of the best"}, {where:{title:"Vintage Cheddar"}})

        const [data, meta] = await db.query('SELECT * FROM Cheeses WHERE title = "Smoked Cheddar"');

        expect(data[0].title).toBe('Smoked Cheddar');
        expect(data[0].description).toBe('A variation of the best');
    })


    test('Cheese is deleted', async () => {
        await Cheese.destroy({where : {title:"Smoked Cheddar"}});

        const [data, meta] = await db.query('SELECT * FROM Cheeses');

        expect(data.length).toBe(7);
    })

})

describe("One-to-many association test: User and Board", () => {

    test('Adding many boards to one user works', async () => {
        
        const user =  await User.findByPk(6); //this is user Millie
        

        const boardList = await Board.findAll();
        await user.addBoards(boardList); //add all the cheese boards (it's what she would want)

        let BoardsRetrieved = [];
        (await user.getBoards()).map(b => BoardsRetrieved.push(b.toJSON()))

        expect(BoardsRetrieved.length).toBe(5);
    })

    test('Eager loading returns boards associated with the User', async () => {

        const userEagerLoaded = await User.findByPk(6, {include: Board});

        expect(userEagerLoaded.Boards.length).toBe(5);
        
    });
});

describe("Many-to-many association test: Board and Cheese", () => {

    test('Adding many cheeses to one board works', async () => {
        
        const cheeseList = await Cheese.findAll()
        

        const boardList = await Board.findAll();
        await boardList[0].addCheeses(cheeseList);

        let cheeseRetrieved = [];
        (await boardList[0].getCheeses()).map(b => cheeseRetrieved.push(b.toJSON()))

        expect(cheeseRetrieved.length).toBe(7);
    })

    test('Adding many boards to one cheese works', async () => {
        const cheeseList = await Cheese.findAll()
        

        const boardList = await Board.findAll();
        await boardList[0].addCheeses(cheeseList);

        await cheeseList[0].addBoards(boardList);

        let boardRetrieved = [];
        (await cheeseList[0].getBoards()).map(b => boardRetrieved.push(b.toJSON()))

        expect(boardRetrieved.length).toBe(5);
    })


    test('Eager loading with the Gourmet Board, will give every cheese in the cheese table', async () => {
        const boardEagerLoaded = await Board.findAll({include: Cheese});

        expect(boardEagerLoaded[0].Cheeses.length).toBe(7);
    });

    test('Eager loading with the Cheddar cheese, will give every board in the board table', async () => {
        const cheeseEagerLoaded = await Cheese.findAll({include: Board});

        expect(cheeseEagerLoaded[0].Boards.length).toBe(5);
  });
});
