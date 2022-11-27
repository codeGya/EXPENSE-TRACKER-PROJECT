const Sequelize=require('sequelize')
const sequelize=require('./database.js')



const ForgotPassword=sequelize.define('ForgotPassword',{
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

module.exports=ForgotPassword