const sequelize=require('./database.js')
const Sequelize=require('sequelize')

const Premium=sequelize.define('Premium',{
    id:
    {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
       
        autoIncrement:true

        
    },
    order_id:{
        type:Sequelize.STRING

    }
})
module.exports=Premium