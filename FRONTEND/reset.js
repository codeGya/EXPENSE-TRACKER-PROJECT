document.getElementById('reset').addEventListener('submit',resetPassword)

async function resetPassword(e)
{
    e.preventDefault()
    const password={
        email:document.getElementById('email').value,
        password:document.getElementById('password').value

    }
    const waitForUpdatingPassword=await axios.post('http://54.250.204.251:3000/update/password',password)
    console.log(waitForUpdatingPassword,'hey hello how are you')
    if(waitForUpdatingPassword.status===200)
    {
        window.location.href='./signin.html'
    }

}