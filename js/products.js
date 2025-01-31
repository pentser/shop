
window.onload= ()=>{
  getAllProduct();
  document.getElementById('signinButton').style.display = 'none';
  document.getElementById('signoutButton').style.display = 'inline-block';
}

 
  let products_ar=[];
  let cart_ar=[]



 function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products_ar.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsContainer.appendChild(productDiv);
    });
  }
  function searchProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products_ar.filter(product => product.title.toLowerCase().includes(searchInput));
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button onclick="addToCart(${product})">Add to Cart</button>
      `;
      productsContainer.appendChild(productDiv);
    });
  }

  
  function signOut() {
    document.getElementById('signinButton').style.display = 'inline-block';
    document.getElementById('signoutButton').style.display = 'none';
    window.location.href="../index.html";
  }

  function filterBy(filterType) {
    alert(`search by ${filterType}`);
  }

  function sortBy(sortType) {
    alert(`sort by ${sortType}`);
  } 




  async function addToCart(productId) {
    const $cartCounter = document.querySelector('.counter');
    currentCount =parseInt($cartCounter.innerText);
    newCount = currentCount + 1;
    $cartCounter.innerText= newCount;
    cart_ar.push(productId);
    
    
  }
  
 function viewCart() {
  
  const userdata= JSON.parse(localStorage.getItem("userdata")); 
  const result = buildUserProducts(userdata._id, cart_ar);
  localStorage.setItem("result", JSON.stringify(result));
    axios.post('http://localhost:3000/api/carts/', result, {
      headers: {
        'token': "Bearer " + userdata.accessToken
      }
    })
    .then(function (response) {
      console.log(response);

      window.location.href="../cart.html";
    })
    .catch(function (error) {
      console.log(error);
    });
  }



 async  function  getAllProduct() {

  try {
    const response =await axios.get('http://localhost:3000/api/products');
    console.log(response.data)
    products_ar=response.data;
    displayProducts() ;
  }

  catch(err) {
     console.log(err);
  }

  }

// function hendler :
/* Example usage:
const userId = "user123";
const arr = [3, 1, 2, 3, 1, 1];
const result = buildUserProducts(userId, arr);

console.log(result);

Output:
{
  userId: "user123",
  products: [ { "productId": "1" ,quantity:3}, { "productId:"2", quantity:1 }, { "productIs:"3" quantity: 2 } ]
}
*/
function buildUserProducts(userId, arr) {
  // Use an object to keep track of counts for each product ID
  const productCount = {};

  for (const productId of arr) {
    // If we haven't seen this productId yet, initialize it to 0
    // then increment by 1
    if (!productCount[productId]) {
      productCount[productId] = 0;
    }
    productCount[productId]++;
  }

  // Convert the productCount object into the desired array of { productId, quantity } objects
  const products = Object.keys(productCount).map(id => ({
    productId: id,
    quantity: productCount[id]
  }));

  // Return the final object containing userId and products
  return {
    userId,
    products
  };
}








