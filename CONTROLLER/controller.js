const User=require('../MODELS/usertable.js')
const bcrypt=require('bcrypt')
const Expense=require('../MODELS/expensetable.js')
const jwt=require('jsonwebtoken')
const Razorpay=require('razorpay')
const ForgotPassword=require('../MODELS/forgotpassword')
const {v4:uuidv4}=require('uuid')
const Premium=require('../MODELS/premium.js')
const Op=require('sequelize')

exports.saveDataOfSignUpToBackend=async (req,res,next)=>{

    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    console.log(req.body,'request body')
    
    

    
    const searchUserTable=await User.findAll({where:{email:email}})
    //console.log(searchUserTable,'i am in search table')
    if(searchUserTable.length==0)
    {
        console.log('email is new')
        await bcrypt.hash(password,10,async (err,hash)=>{
          await User.create({email:email,name:name,password:hash})
          res.send({})
       })
        

    }
    else{
        console.log('email is old')
        res.send('User already exists!')
    }

    
}
exports.signInAlreadyPresentUser=async (req,res,next)=>{

    const email=req.body.email
    const password=req.body.password

    const waitForSearchingDatabase=await User.findAll({where:{email:email}})
    //console.log(waitForSearchingDatabase,'i am about to debug my error')
    //console.log('hey i reached here')
    if(waitForSearchingDatabase.length==0)
    {
        // console.log('email is new')
        // await Usertable.create({email:email,name:name,password:password})
        console.log('EmailId doesnt exist')

        res.status(400).send('EmailId doesnt exist')

    }
    else if(waitForSearchingDatabase.length>0){
        
        await bcrypt.compare(password,waitForSearchingDatabase[0].password,async (err,result)=>{
            if(result===true)
            {
                const generateToken= jwt.sign({userId:waitForSearchingDatabase[0].id},'indreshsingh')
                res.status(200).send(generateToken)

            }
            else{
                console.log('Password is incorrect')
                res.status(400).send('Password is incorrect')
            }
        })
    }



}
exports.saveDailyExpensesInDataBase=async (req,res,next)=>{
    const spend=req.body.spend
    const description=req.body.description
    const variety=req.body.variety
    const user=req.user

    const addingDataToBackend=await req.user.createExpense({spend:spend,description:description,variety:variety})
    res.send(addingDataToBackend)

}

exports.deleteUser=async (req,res,next)=>{
    const deleteId=req.params.deleteId

    const waitForDeletionFromTable=await req.user.removeExpense(deleteId)
    res.send({})
}
exports.getAllUserDataFromBackend=async (req,res,next)=>{
    const items_per_page=1
    const page=req.query.page
    //const limit=req.query.limit
    //console.log(limit,'i will give him 10 lakh LIC POLICY')
    console.log(req.user,'hey i am user in DOMCONTENT LOADED')
    //const User=req.user
    console.log(Expense,'get expenses model of user')
    const waitForGettingUserDataFromBackend=await req.user.getExpenses()
    console.log(waitForGettingUserDataFromBackend,'waitForGettingUserDataFromBackend')
    res.json({
        data:waitForGettingUserDataFromBackend,
        key:{
        currentPage:+page,
        nextPage:+page+1,
        hasNextPage:items_per_page*page<waitForGettingUserDataFromBackend,
        hasPreviousPage:page>1,
        previousPage:page-1,
        lastPage:Math.ceil(waitForGettingUserDataFromBackend/items_per_page)}

        
    })
    //res.send(waitForGettingUserDataFromBackend)

   
}
exports.premiumMembership=async (req,res,next)=>{
    const instance = new Razorpay({ key_id:'rzp_test_cDkhQF4p7Khp5w',key_secret:'TZK3f5KaUpccR0aXlvNk0fZX'})

    const waitForOrderIdCreation=await instance.orders.create({amount:req.body.amount,currency:req.body.currency},function (err,order){
        if(!err)
        {
            console.log(order)
            res.status(200).send(order.id)
        }
        else{
            console.log(err)
        }
    })
    


}
exports.resetForgotPassword=async (req,res,next)=>{
    // console.log(req.body.email,'i forgot password')
    // console.log('hey i reached here')
    

   const waitForSearchingEmailInDataBase= await User.findAll({where:{email:req.body.email}})
  
   //console.log(waitForCreationOfTable.id,'waitForCreationOfTable of particular id')


   if(waitForSearchingEmailInDataBase.length===0)
   {
    res.send('No such mailId exists')

   }
   else{

    const waitForCreationOfTable=await ForgotPassword.create({id:uuidv4(),userId:waitForSearchingEmailInDataBase[0].id,isactive:true})
    //const waitForGettingId=await waitForSearchingEmailInDataBase[0].id
   const uuidtobeused=waitForCreationOfTable.id
   console.log(uuidtobeused,'hey babay')
    res.status(200).send(waitForCreationOfTable.id)

   }
}
exports.resetPassword=async (req,res,next)=>{

    const resetId=req.params.resetId
    console.log(resetId)
   const waitForSearchingDataBase= await ForgotPassword.findAll({where:{id:resetId}})
   if(waitForSearchingDataBase[0].isactive===true)
   {
      console.log('i am in resetPassword')
      await ForgotPassword.update({isactive:false},{where:{id:resetId}})
      res.status(200).send({})
   }
   else{
        
        res.status(400).send({})


   }
}

exports.resetPasswordAfterGettingData=async (req,res,next)=>{
    const userId=req.body.email

    bcrypt.hash(req.body.password,10,async (err,result)=>{
        await User.update({password:result},{where:{email:req.body.email}})
        res.status(200).send({})
    })

    

    



    
}

exports.savePremiumDetails=async (req,res,next)=>{
    const order_id=req.body.order_id
    console.log('hey i reached here into saving premium membership')
    await req.user.createPremium({order_id:req.body.order_id})
    res.send({})
}
exports.checkWhetherPremium=async (req,res,next)=>{
    const waitForPremiumMembers=await Premium.findAll({where:{userId:req.user.id}})
    
    console.log(waitForPremiumMembers)

    if(waitForPremiumMembers.length===0)
    {
        res.status(400).send({})
        console.log('i am premium members')
    }
    else{
        res.status(200).send({})
    }


}
exports.getAllUserDetails=async (req,res,next)=>{

    const allUserDetails=await User.findAll()
    res.send(allUserDetails)


}
exports.getDataOfOneParticularPersonFromDataBase=async (req,res,next)=>{
    const emailIdOfParticularPerson=req.params.emailId

    const getDataOfThatParticularPerson=await User.findAll({where:{email:emailIdOfParticularPerson}})
    const expenseOfThatParticularPerson=await Expense.findAll({where:{userId:getDataOfThatParticularPerson[0].id}})
    res.send(expenseOfThatParticularPerson)


}
// exports.getDataOfParticularDuration=async (req,res,next)=>{
//     //const date=new Date().toLocaleDateString()

//     const year=new Date().getFullYear()
//     const date=new Date().getDate()
//     const month=new Date().getMonth()+1

//     const duration=req.params.duration

//      const presentDate=`${year}-${month}-${date}`
//     if(duration===daily)
//     {
//         const daily=await Expense.findAll({where:{usertableId:req.user.id,createdAt:presentDate}})
//         res.send(daily)

//     }
//     // if(duration===weekly)
//     // {
//     //     const daily=await Expense.findAll({where:{usertableId:req.user.id,createdAt:}})


//     // }






// }

exports.getDataOfParticularDuration=async (req,res,next)=>{
    //const date=new Date().toLocaleDateString()

    const year=new Date().getFullYear()
    const date=new Date().getDate()
    const month=new Date().getMonth()+1

    const duration=req.params.duration

     
    if(duration==='weekly')
    {
        
        
        const presentDate=`${year}-${month}-${date}`
        const newpresentDate=`${year}-${month}-${date-6}`
        
        const daily=await req.user.getExpenses({where:{createdAt:{[Op.lte]:presentDate},createdAt:{[Op.gte]:newpresentDate}}})
        res.send(daily)
        console.log(daily,'daily.......')

    }
    // if(duration===weekly)
    // {
    //     const daily=await Expense.findAll({where:{usertableId:req.user.id,createdAt:}})


    // }






}

exports.downloadFileUrl=async (req,res,next)=>{
    try{
        const getUserExpenses=await req.user.getExpenses()
        const JSONstringifieddata=JSON.stringify(getUserExpenses)
    
        const filename=`datatrial${req.user.id}/${new Date()}.txt`
        
    
        const waitForPromiseTogetResolved=await fileToUploadToS3(JSONstringifieddata,filename)
        await req.user.createFileUrl({fileurl:waitForPromiseTogetResolved})
        res.status(200).send(waitForPromiseTogetResolved)

    }
    catch(error){
        res.status(500).send({})

    }

    
}

async function fileToUploadToS3(a,b)
{
    return new Promise((resolve,reject)=>{

        const BUCKET_NAME='expenseofis'
        const IAM_USER_KEY='AKIA5F6EFI4MAQLYJKW2'
         const IAM_USER_SECRET='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'
    
       const s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    })
    const params={
        Bucket:BUCKET_NAME,
        Key:b,
        Body:a,
        ACL:'public-read'
        
    }

    s3bucket.upload(params,(err,s3response)=>{
        if(!err)
        {
            resolve(s3response.Location)
        }
        else{
            reject(err)
        }
    })

    })
    




}

exports.getAllfileUrlOfPast=async (req,res,next)=>{

    const getAllUrlsOfPast=await req.user.getFileUrls()
    res.send(getAllUrlsOfPast)
}






    
