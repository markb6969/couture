import products from "./products.js";

// Function to load the cart from localStorage
const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    const totalAmountDiv = document.getElementById('totalAmount');
    
    let totalAmount = 0;
    cartItemsDiv.innerHTML = ''; // Clear any existing items
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            totalAmount += item.quantity * product.price;
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `

            <div class="container-checkout">
                <div class="container-details">
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <div class="info-checkout item-details">
                        <h3>${product.name}</h3>
                        <p class="pixel price-info">Price: ${product.price}</p>
                        <p class="pixel quantity-info">Quantity: ${item.quantity}</p>
                    </div>
                </div>
            </div>
            `;
            cartItemsDiv.appendChild(itemElement);
        }
    });
    
    totalAmountDiv.innerHTML = `<h3 class="checkout-total">Total Amount: ₱${totalAmount}</h3>`;
};

// Confirm the checkout and clear the cart
document.getElementById('confirmCheckout').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty. You cannot checkout.');
        return; // Prevent checkout if the cart is empty
    }
    
    localStorage.removeItem('cart'); // Clear the cart after checkout
    alert('Thank you for your purchase!');
    window.location.href = 'index.html'; // Redirect to the homepage
});

// Load the cart when the page is loaded
loadCart();
