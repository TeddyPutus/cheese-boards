const { DataTypes, Model } = require("sequelize");
const db = require('../db/db');

class Board extends Model{}

Board.init({
    type:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
            notNull: true
        }
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
            notNull: true
        }
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            notNull: true
        }
    }

}, {sequelize:db});

module.exports = Board;