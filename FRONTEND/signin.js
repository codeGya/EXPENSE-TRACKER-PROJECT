document.getElementById('signin').addEventListener('submit',signInPageForUsers)

async function signInPageForUsers(e)
{
    

    e.preventDefault()
    console.log('i am in sinin page')
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    const userTable={
        email:email,
        password:password
    }
    const waitForLoggingIn=await axios.post('http://18.181.246.36:3000/sign-user',userTable)
    //console.log(waitForLoggingIn,'i want to generate token')
    //if()
    console.log(waitForLoggingIn)
    if(waitForLoggingIn.status===200)
    {
        localStorage.setItem('token',waitForLoggingIn.data)
        //window.location.href='./expense.html'
    }
    if(waitForLoggingIn.status===200)
    {
        //localStorage.setItem('token',waitForLoggingIn.data)
        window.location.href='./expense.html'
    }
    
    
    if(waitForLoggingIn.status===204){
        
        window.alert('password is incorrect')

        //document.getElementById('old').innerHTML=`<li>${waitForLoggingIn.data}</li>`
    }
    if(waitForLoggingIn.status===205)
    {
        window.alert('No such Email Id')
    }

    

   // 
}
// document.getElementById('pay').addEventListener('click',sendPaymentRelatedData)

// async function sendPaymentRelatedData()
// {
//     const waitForSendingDataToBackend=await axios.post()
// }