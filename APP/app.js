const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const cors=require('cors')
const router=require('../ROUTER/router.js')
const app=express()
const sequelize=require('../MODELS/database')
const User=require('../MODELS/usertable')
const Expense=require('../MODELS/expensetable')
const Premium=require('../MODELS/premium.js')
const ForgotPassword=require('../MODELS/forgotpassword')
const path=require('path')

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User)

User.hasMany(Premium)
Premium.belongsTo(User)



synchronizing()
async function synchronizing()
{


    sequelize.sync()


}


app.use(express.json())
app.use(cors())

app.use(router)

app.use((req,res,next)=>{
    //console.log(`FRONTEND/${req.url}`,'req.url...................')
    res.sendFile(path.join(__dirname,'..',`FRONTEND`,`${req.url}`))
})

app.listen(3000)