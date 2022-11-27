const sequelize=require('./database.js')
const Sequelize=require('sequelize')

const FileUrl=sequelize.define('FileUrl',{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fileurl:
    {
        type:Sequelize.STRING
    }

})
module.exports=FileUrl