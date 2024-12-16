import cart from "./cart.js";
import products from "./products.js";

let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');

const loadTemplate = () => {
    fetch('/template.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            temporaryContent.innerHTML = null;
            cart(); // Initialize shared cart logic
            initApp(); // Initialize explore page logic
        });
};
loadTemplate();

const initApp = () => {
    // Load list of products
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = null;

    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
        <a href="details.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
        </a>
        <h2>${product.name}</h2>
        <div class="price pixel">${product.price}</div>
        <button class="addCart pixel" data-id='${product.id}'>
            Add To Cart
        </button>`;
        listProductHTML.appendChild(newProduct);
    });

    // Attach event listeners to "Add To Cart" buttons
    attachAddToCartListeners();
};

const addToCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: 1
            });
        } else {
            console.error(`Product with ID ${productId} not found.`);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};


const attachAddToCartListeners = () => {
    const buttons = document.querySelectorAll('.addCart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id, 10);
            addToCart(productId);
        });
    });
};



const productContainer = document.getElementById('product-container');
const filterButtons = document.querySelectorAll('.explore-btn');

// Function to render products
function renderProducts(items) {
    productContainer.innerHTML = ''; // Clear previous results

    if (items.length === 0) {
        productContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    items.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h2>${product.name}</h2>
                <p>${product.price}</p>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Filter function
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    }
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterProducts(category);
    });
});

// Render all products on initial load
renderProducts(products);