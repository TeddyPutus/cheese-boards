const { User, Board, Cheese} = require('../models');
const db = require('./db');

async function seed(){

    await db.sync({
        force:true
    });

    await Board.bulkCreate([
        {type:"Gourmet Board", description:"Various cheese", rating:10},
        {type:"Aged Board", description:"Various cheese in the shape of a platypus", rating:10000},
        {type:"Pungent Board", description:"Various cheese in the shape of a platypus", rating:10000},
        {type:"Smoked Board", description:"Various cheese in the shape of a platypus", rating:10000},
        {type:"Italian Board", description:"Various cheese in the shape of a platypus", rating:10000}
    ]);

    await User.bulkCreate([
        {name:"Teddy", email:"teddyputus1@gmail.com"},
        {name:"Harry", email:"harry@gmail.com"},
        {name:"Caroline", email:"caroline@gmail.com"},
        {name:"Georgie", email:"georgie@gmail.com"},
        {name:"Badger", email:"badge@gmail.com"},
        {name:"Millie", email:"millie@gmail.com"}
    ]);

    await Cheese.bulkCreate([
        {title:"Cheddar", description:"The best"},
        {title:"Parmesan", description:"Also excellent tbf"},
        {title:"Gorgonzola", description:"Would eat again"},
        {title:"Stinking Bishop", description:"No."},
        {title:"Gouda", description:"Pretty good"},
        {title:"Feta", description:"Fetid, more like"},
        {title:"Halloumi", description:"Squeaky"}
    ]);
}

module.exports = seed;
// seed()