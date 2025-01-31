

   // Event listener for the "Load Cart" button
   const cartTableBody = document.querySelector('#cartTable tbody');


   window.addEventListener('load',  () => {
    
  const result= JSON.parse(localStorage.getItem("result")); 
  console.log(result);
  renderCart(result.products);
  //  fetchCart(userdata._id);
  
  });


 
   // Function to clear the table body before re-rendering
   function clearTable() {
     cartTableBody.innerHTML = '';
   }

   // Function to render the cart in the table
   function renderCart(products) {
     clearTable(); // clear old data if any

     if (!products ) {
       alert('No cart data found!');
       return;
     }

     // Loop through products array and populate rows
     products.forEach((item) => {
       const row = document.createElement('tr');

       const productIdCell = document.createElement('td');
       productIdCell.textContent = item.productId;
       row.appendChild(productIdCell);

       const quantityCell = document.createElement('td');
       quantityCell.textContent = item.quantity;
       row.appendChild(quantityCell);

       cartTableBody.appendChild(row);
     });
   }

   // Function to fetch cart data from the server
   async function fetchCart(userId) {
     try {
       const response = await fetch(`http://localhost:3000/api/carts/find/${userId}`);
       if (!response.ok) {
         throw new Error(`Server error: ${response.status}`);
       }
       const cartData = await response.json();
       renderCart(cartData);
     } catch (error) {
       console.error('Error fetching cart:', error);
       alert('Could not load cart data.');
     }
   }

  
  function signOut() {
    window.location.href="../index.html";
    document.getElementById('signinButton').style.display = 'inline-block';
    document.getElementById('signoutButton').style.display = 'none';
  }

