const Sequelize=require('sequelize')
console.log(process.env,'hey i want to debug my error')

const sequelize=new Sequelize(process.env.DB_SEQUELIZE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{host:process.env.DB_HOST,dialect:'mysql'
})

module.exports=sequelize