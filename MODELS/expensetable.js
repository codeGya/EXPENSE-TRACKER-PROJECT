const sequelize=require('./database.js')
const Sequelize=require('sequelize')

const Expense=sequelize.define('Expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    spend:{
        type:Sequelize.INTEGER
    },
    description:Sequelize.STRING,
    variety:Sequelize.STRING
})
module.exports=Expense