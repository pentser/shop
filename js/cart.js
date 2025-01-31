

   // Event listener for the "Load Cart" button
   const cartTableBody = document.querySelector('#cartTable tbody');


   window.addEventListener('load',  () => {
    
  const result= JSON.parse(localStorage.getItem("result")); 
  console.log(result);
  renderCart(result.products);
  getQuantity(result.products);
  fetchProductsAndCulculateTotalAmount();  

  
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

  
   async function fetchProductsAndCulculateTotalAmount() {
     try {
       const response = await fetch(`http://localhost:3000/api/products`);
       if (!response.ok) {
         throw new Error(`Server error: ${response.status}`);
       }
       const productData = await response.json();
      console.log(productData);
        const result= JSON.parse(localStorage.getItem("result")); 
        let totalAmount = 0;
        result.products.forEach((item) => {
          const product = productData.find((p) => p.id == item.productId);
         totalAmount += product.price * item.quantity;
        
        });
        document.querySelector('#totalAmount').textContent = totalAmount;
       
     } catch (error) {
       console.error('Error fetching products:', error);
       alert('Could not load product data.');
     }
   }

   function getQuantity(products) {
      let total = 0;
      products.forEach((item) => {
        total += item.quantity;
      });
      document.querySelector('#totalQuantity').textContent = total;


   }

  
  function signOut() {
    window.location.href="../index.html";
    document.getElementById('signinButton').style.display = 'inline-block';
    document.getElementById('signoutButton').style.display = 'none';
  }

