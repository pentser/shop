
window.onload= ()=>{
  displayProducts() ;
  document.getElementById('signinButton').style.display = 'none';
  document.getElementById('signoutButton').style.display = 'inline-block';
}

 
 const products = [
    { id: 1, name: "item 1", price: 699, image: "./images/pic1.jpg" },
    { id: 2, name: "item 2", price: 199, image: "/images/pic2.jpg" },
    { id: 3, name: "item 3", price: 299, image: "/images/pic3.jpg" }
  ];



 function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsContainer.appendChild(productDiv);
    });
  }
  function searchProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
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




