
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
    const prods=cart_ar.map(elm=>{return {id:elm}})
    const userdata= JSON.parse(localStorage.getItem("userdata")); 
    console.log(prods)
    axios.post('http://localhost:3000/api/carts/', prods, {
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







