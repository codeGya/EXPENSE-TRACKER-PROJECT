//const { request } = require("express")
// const pagination=document.getElementById('pagination').value
// console.log(pagination,'hey i am pagination')
// localStorage.setItem('pagination',pagination)



document.getElementById('expense').addEventListener('submit',saveDailyExpensesToBackend)

//axios.defaults.headers.common['header1'] = localStorage.getItem('token')

async function saveDailyExpensesToBackend()
{
    //e.preventDefault()
    const  spend=document.getElementById('spend').value
    const description=document.getElementById('description').value
    const variety=document.getElementById('variety').value
    const expenses={
        spend:spend,
        description:description,
        variety:variety
    }

    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }

    
    
        
      
   // 

    const waitForPostingToBackend=await axios.post('http://54.250.204.251:3000/dailyexpenses-user',expenses,config)
    
    //console.log(waitForPostingToBackend,'i want to get data')
    document.getElementById('expenses').innerHTML=document.getElementById('expenses').innerHTML+`<li id=${waitForPostingToBackend.data.id}>Description-${waitForPostingToBackend.data.description} Rs Spend-${waitForPostingToBackend.data.spend} Details-${waitForPostingToBackend.data.variety}<input type=button onclick=deleteUserFromBackend("${waitForPostingToBackend.data.id}") value=DELETE></li>`
}
    
async function deleteUserFromBackend(a)
{
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }
    
    const waitForDeletion=await axios.delete(`http://54.250.204.251:3000/delete-user/${a}`,config)

    document.getElementById('expenses').removeChild(document.getElementById(a))
    //
}
document.addEventListener('DOMContentLoaded',displayAfterRefreshingPage)
async function displayAfterRefreshingPage(e){

    e.preventDefault()
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }
    
    const page=1

    const pagination=localStorage.getItem('pagination')
    

   const waitForGettingUserDataFromBackend=await axios.get('http://54.250.204.251:3000/get-user/?page=${page}',config)
    console.log(waitForGettingUserDataFromBackend,'after applying query page')
    let output=""

    for(let i=0;i<waitForGettingUserDataFromBackend.data.length;i=i+1)
    {
        output=output+`<li id=${waitForGettingUserDataFromBackend.data[i].id}>Description-${waitForGettingUserDataFromBackend.data[i].description} Rs Spend-${waitForGettingUserDataFromBackend.data[i].spend} Details-${waitForGettingUserDataFromBackend.data[i].variety}
        <input type=button onclick=deleteUserFromBackendAfterRefreshingPage("${waitForGettingUserDataFromBackend.data[i].id}") value=DELETE></li>`


    }
    document.getElementById('oldexpenses').innerHTML=output




}
async function deleteUserFromBackendAfterRefreshingPage(a)
{
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }
    const waitForDeletion=await axios.delete(`http://54.250.204.251:3000/delete-user/${a}`,config)

    document.getElementById('oldexpenses').removeChild(document.getElementById(a))

}
//document.getElementById('hey').addEventListener('click',sendPremiumAccountDetails)


async function sendPremiumAccountDetails()
{

  // e.preventDefault()
    const options = {
        amount: 50000,  
        currency: "INR",
    }
    console.log('hey')
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }
        

   const waitForId=await axios.post('http://54.250.204.251:3000/buy-premium',options,config)
   console.log(waitForId.data,waitForId.status,'wait for order id creation')
   if(waitForId.status===200)
   {
       console.log(waitForId.data,'wait for creation of order id')
       localStorage.setItem('id',waitForId.data)
    //document.getElementById('premium').innerHTML=`<input type=button id=payforpremium onclick="payforpremiummembershipplan()" value=PAY NOW FOR PREMIUM MEMBERSHIP>`

    
   }
     const information={
         order_id:localStorage.getItem('id')

     }
   const newoptions={
    key:'rzp_test_cDkhQF4p7Khp5w',
    amount: 50000,  
    currency: "INR",
    order_id:`${localStorage.getItem('id')}`,
    handler: async function (response){
        console.log(response,'i am response')
        await axios.post('http://54.250.204.251:3000/save/premium',information,config)
        document.body.style.backgroundColor = "red";
        alert('Transaction Successful')
        

        
        
    },
    
    theme: {
        color: "#3399cc"
    }
    // config: {
    //     display: {
    //       blocks: {
    //         hdfc: { //name for HDFC block
    //           name: "Pay using HDFC Bank",
    //           instruments: [
    //             {
    //               method: "card",
    //               issuers: ["HDFC"]
    //             },
    //             {
    //               method: "netbanking",
    //               banks: ["HDFC"]
    //             },
    //           ]
    //         },
    //         other: { //  name for other block
    //           name: "Other Payment modes",
    //           instruments: [
    //             {
    //               method: "card",
    //               issuers: ["ICIC"]
    //             },
    //             {
    //               method: 'netbanking',
    //             }
    //           ]
    //         }
    //       },
    //       hide: [
    //         {
    //         method: "upi"
    //         }
    //       ],
    //       sequence: ["block.hdfc", "block.other"],
    //       preferences: {
    //         show_default_blocks: false // Should Checkout show its default blocks?
    //       }
    //     }
    //   }

    

}
//const instance=new Razorpay()
  const rzp1 = new Razorpay(newoptions)
    rzp1.on('payment.failed', function (response){
        alert('TRANSACTION FAILED');
       // document.getElementById('premium').innerHTML=`<input type=button onclick=sendPremiumAccountDetails() value=RETRY>`

        //<input type=button onclick=sendPremiumAccountDetails() value=RETRY>
    
  });


 
   //console.log('hey i reached here')
    rzp1.open();
    

    

}

// async function payforpremiummembershipplan(){
//     const options={
//         key:'rez_test_cDkhQF4p7khp5w',
//         amount: 50000,  
//         currency: "INR",
//         order_id:`${localStorage.getItem('id')}`,
//         handler: function (response){
//             alert(response.razorpay_payment_id);
//             alert(response.razorpay_order_id);
//             alert(response.razorpay_signature)
//         },

        

//     }
//     //const instance=new Razorpay()
//     const rzp1 = new Razorpay(options);
//        rzp1.on('payment.failed', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
//     });


     
//     console.log('hey i reached here')
//     rzp1.open();
    

// }

document.addEventListener('DOMContentLoaded',checkWhetherPremiumOrNot)

async function checkWhetherPremiumOrNot()
{
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }
    const waitForGettingPremiumDetails=await axios.get('http://54.250.204.251:3000/get/premium/details',config)
    console.log(waitForGettingPremiumDetails)

    if(waitForGettingPremiumDetails.status===200)
    {
        document.body.style.backgroundColor = "red";
        document.getElementById('premium').innerHTML=`<input type="button"  value="LEADERBOARD" onclick="getLeaderBoard()">`
        document.getElementById('getOneUserData').innerHTML=`<li><input type=button onclick=getDataOfPremiumMemberForParticularDuration("daily") value=DAILY></li>  <li><input type=button onclick=getDataOfPremiumMemberForParticularDuration("weekly") value=WEEKLY></li><li><input type=button onclick=getDataOfPremiumMemberForParticularDuration("monthly") value=MONTHLY></li>`


    }
    if(waitForGettingPremiumDetails.status===400){
        console.log(' i am not a premium members')
        document.body.style.backgroundColor="green"
    }
    
    

}


async function getLeaderBoard()
{

    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }
    // const waitForGettingPremiumDetails=await axios.get('http://localhost:3000/get/premium/details',config)
    // console.log(waitForGettingPremiumDetails)

    // if(waitForGettingPremiumDetails.status===200)
    // {

        const waitForGettingAllUserDetails=await axios.get('http://54.250.204.251:3000/get/all/user',config)
        let output=""
        for(let i=0;i<waitForGettingAllUserDetails.data.length;i=i+1)
        {
            output=output+`<li>${waitForGettingAllUserDetails.data[i].email}  <input type=button onClick=getDataOfThatParticularPerson("${waitForGettingAllUserDetails.data[i].email}") value=GETDETAILS></li>`

        }

       document.getElementById('leaderboard').innerHTML=output
       

    



}

async function getDataOfThatParticularPerson(a)
{
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }


    const getDataOfThatParticularPerson=await axios.get(`http://54.250.204.251:3000/one/particular/user/${a}`,config)
    console.log(getDataOfThatParticularPerson)
    let output=""
    for(let i=0;i<getDataOfThatParticularPerson.data.length;i=i+1)
    {
        
        output=output+`<li>Rs Spend-${getDataOfThatParticularPerson.data[i].spend} Description-${getDataOfThatParticularPerson.data[i].description} Variety=${getDataOfThatParticularPerson.data[i].variety}</li>`
        

    }

    document.getElementById('particular').innerHTML=output
}

async function getDataOfPremiumMemberForParticularDuration(a)
{
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }


    const userDataForParticularDuration=await axios.get(`http://54.250.204.251:3000/particular/data/${a}`,config)


}