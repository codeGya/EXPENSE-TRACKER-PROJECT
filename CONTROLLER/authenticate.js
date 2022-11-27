const jwt=require('jsonwebtoken')
const User=require('../MODELS/usertable.js')

exports.gettingToken=async (req,res,next)=>{
   const tokenRecover=await jwt.verify(req.headers.header1,'indreshsingh')
  
   
   const findParticularUser=await User.findAll({where:{id:tokenRecover.userId}})
   if(findParticularUser.length!=0)
   {
      //console.log(findParticularUser[0])
      req.user=findParticularUser[0]
      
      next()

   }
   else{
      res.status(400).send({})
   }
   

   
}