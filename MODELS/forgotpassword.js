const Sequelize=require('sequelize')
const sequelize=require('./database.js')



const forgotp=sequelize.define('forgotp',{
    id:
    {
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true

    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    isactive:
    {
        type:Sequelize.BOOLEAN
    }
})

module.exports=forgotp