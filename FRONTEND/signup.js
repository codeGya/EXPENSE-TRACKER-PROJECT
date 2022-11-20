document.getElementById('form').addEventListener('submit',submitsignuppage)

async function submitsignuppage(e)
{
   e.preventDefault()
    
       const name=document.getElementById('name').value
       const email=document.getElementById('email').value
        const password=document.getElementById('password').value

        const userTable={
            name:name,
            email:email,
            password:password
        }

    
    //console.log(userTable)
    const waitForPostingDataToBackend=await axios.post('http://localhost:3000/post-user',userTable)
    
    document.getElementById('old').innerHTML=`<li>${waitForPostingDataToBackend.data}</li>`
}