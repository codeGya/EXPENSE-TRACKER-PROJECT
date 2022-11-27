const Sequelize=require('sequelize')
const sequelize=require('./database.js')



const forgotp=sequelize.define('forgotp',{
    id:
    {
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true

    }
    ,
    isactive:
    {
        type:Sequelize.BOOLEAN
    }
})

module.exports=forgotp