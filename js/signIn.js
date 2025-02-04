
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const spanError= document.getElementById('errors');

    // Collect form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:3000/api/auth/login', {
      username,
      password
    })
    .then(function (response) {
      console.log(response); 
      localStorage.setItem("userdata", JSON.stringify(response.data));
      window.location.href="../products.html";
    })
    .catch(function (error) {
      spanError.innerHTML = "Invalid username or password"
    });
  });

  function signOut() {
    document.getElementById('signinButton').style.display = 'inline-block';
    document.getElementById('signoutButton').style.display = 'none';
    window.location.href="../index.html";
  }



