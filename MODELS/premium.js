const sequelize=require('./database.js')
const Sequelize=require('sequelize')

const premium=sequelize.define('premium',{
    id:
    {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
       
        autoIncrement:true

        
    },
    number:{
        type:Sequelize.STRING

    }
})
module.exports=premium