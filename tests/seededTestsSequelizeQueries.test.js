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
        const data = await User.findAll({where:{name:"Teddy"}});

        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Teddy');
        expect(data[0].email).toBe('teddyputus1@gmail.com');
    })

    test('New user is created successfully', async () => {
        
        await User.create({name:"Ollie", email:"ollieThaDog@gmail.com"})

        const data = await User.findAll({where:{name:"Ollie"}});
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Ollie');
        expect(data[0].email).toBe('ollieThaDog@gmail.com');
    })

    test('User can be updated and contains the information we expect', async () => {

        await User.update({name:"Sak", email:"sakPutus@google.com"}, {where:{name:"Teddy"}})

        const data = await User.findAll({where:{name:"Sak"}});

        expect(data[0].name).toBe('Sak');
        expect(data[0].email).toBe('sakPutus@google.com');
    })

    test('User is deleted', async () => {
        await User.destroy({where : {name:"Ollie"}});

        const data = await User.findAll();

        expect(data.length).toBe(6);
    })

    test('New user can have first and last name', async () => {
        
        await User.create({name:"Blue Putus", email:"blue@gmail.com"})

        const data = await User.findAll({where:{name:"Blue Putus"}});
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('Blue Putus');
        expect(data[0].email).toBe('blue@gmail.com');
    })

    test('New user must have an email in email field', async () => {
        expect(User.create({name:"Ollie", email:"blah.com"})).rejects.toThrow(Error);
    })

    test('New user must have a name made of alpha characters and spaces', async () => {
        expect(User.create({name:1, email:"blah@blah.com"})).rejects.toThrow(Error);
    })

    test('New user email field cant be empty', async () => {
        expect(User.create({name:"Ollie", email:""})).rejects.toThrow(Error);
    })

    test('New user name field cant be empty', async () => {
        expect(User.create({name:"", email:"blah@blah.com"})).rejects.toThrow(Error);
    })

    test('New user email field cant be null', async () => {
        expect(User.create({name:"Ollie", email:null})).rejects.toThrow(Error);
    })

    test('New user name field cant be null', async () => {
        expect(User.create({name:"", email:null})).rejects.toThrow(Error);
    })
})

describe("Board model CRUD operations work", () => {
    test('Seeded board exists and contains correct information', async () => {
        const data = await Board.findAll({where:{type:"Gourmet Board"}});
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('Gourmet Board');
        expect(data[0].description).toBe('Gourmet cheese');
        expect(data[0].rating).toBe(10);
    })

    test('New board is created successfully', async () => {
        
        await Board.create({type:"Teds custom board", description:"Confused cheese", rating:29})

        const data = await Board.findAll({where:{type:"Teds custom board"}});
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('Teds custom board');
        expect(data[0].description).toBe('Confused cheese');
        expect(data[0].rating).toBe(29);
    })

    test('Board can be updated and contains the information we expect', async () => {

        await Board.update({type:"Updated custom board", description:"Updated cheese", rating:1}, {where:{type:"Teds custom board"}})

        const data = await Board.findAll({where:{type:"Updated custom board"}});

        expect(data[0].type).toBe('Updated custom board');
        expect(data[0].description).toBe('Updated cheese');
        expect(data[0].rating).toBe(1);
    })


    test('Board is deleted', async () => {
        await Board.destroy({where : {type:"Updated custom board"}});

        const data = await Board.findAll();

        expect(data.length).toBe(5);
    })

    test('New board type field cant be empty', async () => {
        expect(Board.create({type:"", description:"Confused cheese", rating:29})).rejects.toThrow(Error);
    })

    test('New board type field cant be null', async () => {
        expect(Board.create({type:null, description:"Confused cheese", rating:29})).rejects.toThrow(Error);
    })

    test('New board description field cant be empty', async () => {
        expect(Board.create({type:"blah", description:"", rating:29})).rejects.toThrow(Error);
    })

    test('New board description field cant be null', async () => {
        expect(Board.create({type:"blah", description:null, rating:29})).rejects.toThrow(Error);
    })

    test('New board rating field cant be empty', async () => {
        expect(Board.create({type:"blah", description:"Confused cheese", rating:""})).rejects.toThrow(Error);
    })

    test('New board rating field cant be null', async () => {
        expect(Board.create({type:"blah", description:"Confused cheese", rating:null})).rejects.toThrow(Error);
    })

    test('New board rating field must be a number', async () => {
        expect(Board.create({type:"blah", description:"Confused cheese", rating:"blah"})).rejects.toThrow(Error);
    })
})

describe("Cheese model CRUD operations work", () => {
    test('Seeded Cheese exists and contains correct information', async () => {
        const data = await Cheese.findAll({where:{title:"Feta"}});
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Feta');
        expect(data[0].description).toBe('Fetid, more like');
    })

    test('New cheese is created successfully', async () => {
        
        await Cheese.create({title:"Vintage Cheddar", description:"The best of the best"})

        const data = await Cheese.findAll({where:{title:"Vintage Cheddar"}});
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Vintage Cheddar');
        expect(data[0].description).toBe('The best of the best');
    })

    test('Cheese can be updated and contains the information we expect', async () => {

        await Cheese.update({title:"Smoked Cheddar", description:"A variation of the best"}, {where:{title:"Vintage Cheddar"}})

        const data = await Cheese.findAll({where:{title:"Smoked Cheddar"}});

        expect(data[0].title).toBe('Smoked Cheddar');
        expect(data[0].description).toBe('A variation of the best');
    })


    test('Cheese is deleted', async () => {
        await Cheese.destroy({where : {title:"Smoked Cheddar"}});

        const data = await Cheese.findAll();

        expect(data.length).toBe(7);
    })

    test('New cheese title field cant be empty', async () => {
        expect(Cheese.create({title:"", description:"The best of the best"})).rejects.toThrow(Error);
    })

    test('New cheese title field cant be null', async () => {
        expect(Cheese.create({title:null, description:"The best of the best"})).rejects.toThrow(Error);
    })

    test('New cheese description field cant be empty', async () => {
        expect(Cheese.create({title:"blah", description:""})).rejects.toThrow(Error);
    })

    test('New cheese description field cant be null', async () => {
        expect(Cheese.create({title:"blah", description:null})).rejects.toThrow(Error);
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
