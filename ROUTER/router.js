const express=require('express')
const router=express.Router()
const usertable=require('../CONTROLLER/controller.js')
const authenticate=require('../CONTROLLER/authenticate.js')

router.post('/post-user',usertable.saveDataOfSignUpToBackend)
router.post('/sign-user',usertable.signInAlreadyPresentUser)
router.post('/dailyexpenses-user',authenticate.gettingToken,usertable.saveDailyExpensesInDataBase)
router.delete('/delete-user/:deleteId',authenticate.gettingToken,usertable.deleteUser)
router.get('/get-user',authenticate.gettingToken,usertable.getAllUserDataFromBackend)
//router.post(/premium-member,)
router.post('/buy-premium',authenticate.gettingToken,usertable.premiumMembership)
router.post('/password/forgotpassword',usertable.resetForgotPassword)
router.get('/reset/password/:resetId',usertable.resetPassword)
router.post('/update/password',usertable.resetPasswordAfterGettingData)
router.post('/save/premium',authenticate.gettingToken,usertable.savePremiumDetails)
router.get('/get/premium/details',authenticate.gettingToken,usertable.checkWhetherPremium)
router.get('/get/all/user',authenticate.gettingToken,usertable.getAllUserDetails)
router.get('/one/particular/user/:emailId',authenticate.gettingToken,usertable.getDataOfOneParticularPersonFromDataBase)
//router.get('/particular/data/:duration',authenticate.gettingToken,usertable.getDataOfParticularDuration)


module.exports=router