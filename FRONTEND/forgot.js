document.getElementById('form').addEventListener('submit',resetForgotPassword)

async function resetForgotPassword(e)
{
        e.preventDefault()
    let config = {
        headers: {
            header1:localStorage.getItem('token'),
          }

    }
    console.log(config)
    //const e
    const email={
        email:document.getElementById('email').value
    }

    const waitForSendingToBackend=await axios.post('http://localhost:3000/password/forgotpassword',email)
    console.log(waitForSendingToBackend,'hey i want to find unique id')
    if(waitForSendingToBackend.status===200)
    {
        console.log(waitForSendingToBackend.data,'hey hello')
        console.log('hehe hello')
        const waitForResetingPassword=await axios.get(`http://localhost:3000/reset/password/${waitForSendingToBackend.data}`)
        if(waitForResetingPassword.status===200)
        {
            window.location.href='./reset.html'
        }
    }
  // console.log(waitForSendingToBackend)
}