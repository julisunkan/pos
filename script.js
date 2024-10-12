let products = [];
let cart = [];

// Load products from JSON
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProductList();
    });

function renderProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `${product.name} - $${product.price.toFixed(2)} <button onclick="addToCart(${product.id})">Add to Cart</button>`;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    cartItems.innerHTML = '';
    let sum = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('li');
        itemDiv.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(itemDiv);
        sum += item.price;
    });
    total.innerText = sum.toFixed(2);
}

// Admin panel functionality
document.getElementById('product-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    renderAdminProductList();
    this.reset();
});

function renderAdminProductList() {
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `${product.name} - $${product.price.toFixed(2)}`;
        adminProductList.appendChild(productDiv);
    });
}

if (document.getElementById('admin-product-list')) {
    renderAdminProductList();
}

// User login functionality
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                alert('Login successful!');
                window.location.href = 'admin.html'; // Redirect to admin panel
            } else {
                alert('Invalid credentials');
            }
        });
});
