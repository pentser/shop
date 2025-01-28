
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const username=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const $errorMsg= document.querySelector("span");

    if(username.length>8 || username.length<4) {
        $errorMsg.innerText += `* user : between 4-8 letters [${user}]\n`;
        $errorMsg.style.display="block";
    }
    
    if(email.indexOf('@')==-1) {              
        $errorMsg.innerText += `* email : must be include '@' [${email}]\n`;
        $errorMsg.style.display="block";
    }
    if(password.length<5 || password.length>10 || password.indexOf('$')==-1) {              
        $errorMsg.innerText += `* password : between 5-10 letters and '$' letter [${password}]\n`;
        $errorMsg.style.display="block";
    }
    
    if(password!=confirmPassword) {        
        $errorMsg.innerText += `* confirm : not equal to password [${password},${confirm}]\n`;
        $errorMsg.style.display="block";
    }  

    const isError=($errorMsg.innerText).length;

    //if OK
    if( !isError) {

      const formData = {
        username,
        email,
        password,
        confirmPassword
        }
    

    axios.post('http://localhost:3000/api/auth/register', formData)
    .then(function (response) {
      console.log(response);
      window.location.href="../products.html";
    })
    .catch(function (error) {
      console.log(error);
    });
  }
});



  



