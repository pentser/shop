
window.onload= ()=>{
  getAllProduct();
  document.getElementById('signinButton').style.display = 'none';
  document.getElementById('signoutButton').style.display = 'inline-block';
  const retrievedData = JSON.parse(localStorage.getItem("userdata"));
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

  function filterCategory(category) {
    alert(`Filtering by ${category}`);
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
  const result = buildUserProducts(userdata.id, cart_ar);
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
  products: [ { "1": 3 }, { "2": 1 }, { "3": 2 } ]
}
*/
function buildUserProducts(userId, arr) {
  // Create a map of item -> frequency
  const frequencyMap = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  // Convert the frequency map to the desired array of objects
  const productsArray = Object.keys(frequencyMap)
    .sort((a, b) => Number(a) - Number(b)) // optional sort step by numeric value
    .map(key => ({ [key]: frequencyMap[key] }));

  // Return the final object
  return {
    userId: userId,
    products: productsArray
  };
}







