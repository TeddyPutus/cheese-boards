const User = require('./user.model');
const Board = require('./board.model');
const Cheese = require('./cheese.model');

//One to Many association - Multiple boards can be added to a User
Board.belongsTo(User);
User.hasMany(Board);

//Many to Many association - A board can have many cheeses, and a cheese can be on many boards
Board.belongsToMany(Cheese, {through: "Board_Cheese"});
Cheese.belongsToMany(Board, {through: "Board_Cheese"});

module.exports = { User, Board, Cheese};