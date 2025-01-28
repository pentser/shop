
window.onload= ()=>{
  getAllProduct();
  document.getElementById('signinButton').style.display = 'none';
  document.getElementById('signoutButton').style.display = 'inline-block';
}

 
//  const products = [
//     { id: 1, name: "item 1", price: 699, image: "./images/pic1.jpg" },
//     { id: 2, name: "item 2", price: 199, image: "/images/pic2.jpg" },
//     { id: 3, name: "item 3", price: 299, image: "/images/pic3.jpg" }
//   ];

  let products_ar=[];




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
        <button onclick="addToCart(${product.id})">Add to Cart</button>
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

  function addToCart(productId) {
    alert(`Added product ${productId} to cart.`);
  }
 function viewCart() {
    alert('Viewing cart.');
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







