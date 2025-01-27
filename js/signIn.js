
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:3000/api/auth/login', {
      username,
      password
    })
    .then(function (response) {
      console.log(response);
      window.location.href="../products.html";
    })
    .catch(function (error) {
      console.log(error);
    });
  });

  function signOut() {
    document.getElementById('signinButton').style.display = 'inline-block';
    document.getElementById('signoutButton').style.display = 'none';
    window.location.href="../index.html";
  }



