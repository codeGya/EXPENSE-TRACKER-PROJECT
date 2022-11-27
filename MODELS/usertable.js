const Sequelize=require('sequelize')
const sequelize=require('./database.js')

const User=sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false

    },
    name:{
        type:Sequelize.STRING,
        unique:true,
        
        allowNull:false

    },
    password:{
        type:Sequelize.STRING,
        
        allowNull:false

    }

})

module.exports=User