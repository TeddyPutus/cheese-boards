const { DataTypes, Model } = require("sequelize");
const db = require('../db/db');

class Cheese extends Model{}

Cheese.init({
    title:{
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
    }

}, {sequelize:db});

module.exports = Cheese;