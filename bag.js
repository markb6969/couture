


import products from '/products.js';

// Function to render cart items
const renderCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    
    // If cart is empty, display a message
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    // Clear the previous cart items before appending new ones
    cartContainer.innerHTML = '';

    cart.forEach(products => {
        console.log(products); // Check if image, name, and price are defined
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${products.image}" alt="${products.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3 class="cart-item-name">${products.name}</h3>
                <p class="cart-item-price">${products.price}</p>
                <p class="cart-item-quantity">Quantity: ${products.quantity}</p>
            </div>
            <button class="remove-item" data-id="${products.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    
        // Add event listener for removing items from cart
        const removeButton = cartItem.querySelector('.remove-item');
        removeButton.addEventListener('click', () => {
            removeFromCart(products.id);
        });
    });
    
};

// Function to remove an item from the cart
const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCart(); // Re-render the cart after removal
};

// Initialize the cart when the page loads
document.addEventListener('DOMContentLoaded', renderCart);
