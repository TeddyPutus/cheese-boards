const { DataTypes, Model } = require("sequelize");
const db = require('../db/db');

class User extends Model{}

User.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            // isAlpha: true,
            is: /^[A-Za-z ]/i,
            notEmpty: true,
            notNull: true
        }
        
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail: true,
            notEmpty: true,
            notNull: true 
        }
            
    }

}, {sequelize:db});

module.exports = User;