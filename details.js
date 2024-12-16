import products from "./products.js";
import cart from "./cart.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const product = products.find(p => p.id === parseInt(productId));


if (product) {
    document.querySelector('.name').textContent = product.name;
    document.querySelector('.price').textContent = product.price;

    const detailContainer = document.querySelector('.detail-img-container');
    if (product.details && product.details.length) {
        detailContainer.innerHTML = ''; // Clear old images
        product.details.forEach(detailSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = detailSrc;
            imgElement.className = 'product-detail-img';
            detailContainer.appendChild(imgElement);
        });
    } else {
        detailContainer.innerHTML = '<p>No additional images available for this product.</p>';
    }
} else {
    console.error("Product not found!");
    window.location.href = 'explore.html'; 
}



let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');

const loadTemplate = () => {
    fetch('/template.html')
    .then(response => response.text())
    .then(html => {
        // Create a temporary container to manipulate the HTML before inserting it into the page
        let tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;

        // Remove the product overview section if it exists
        let productOverview = tempContainer.querySelector('.product-overview');
        if (productOverview) {
            productOverview.remove();
        }

        // Insert the modified HTML (without the product overview) into the app container
        app.innerHTML = tempContainer.innerHTML;

        // Initialize app features
        let contentTab = document.getElementById('contentTab');
        cart();
        initApp();
    });
}
loadTemplate();





const initApp = () => {
    let idProduct = new URLSearchParams(window.location.search).get('id');
    idProduct = Number(idProduct); 
    let info = products.find((value) => value.id === idProduct);
    console.log(info)

    if(!info) { 
      window.location.href = '/'; 
    } else {
    }

}



// Select the checkout button
const checkoutButton = document.getElementById('checkoutButton');

// Function to handle the checkout button click
checkoutButton.addEventListener('click', () => {
    // Save the selected product to the cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === product.id);

    if (!productInCart) {
        // Add the product to the cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1 // Set initial quantity to 1
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Redirect to checkout page
    window.location.href = 'bag.html';
});
