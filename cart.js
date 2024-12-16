import products from "./products.js";

const cart = () => {
    const iconCart = document.querySelector('.icon-cart'); 
    const closeCart = document.querySelector('.close'); 
    const body = document.querySelector('body');
    let carts = []; 

    if (!iconCart || !closeCart) {
        console.error('Required elements are missing in the DOM!');
        return;
    }
    // Toggle cart visibility
    iconCart.addEventListener('click', () => {
        body.classList.add('showCart'); 
    });

    closeCart.addEventListener('click', () => {
        body.classList.remove('showCart');
    });

    const setProductInCart = (idProduct, quantity, position) => {
        if (quantity > 0) {
            if (position < 0) {
                carts.push({
                    product_id: idProduct,
                    quantity: quantity
                });
            } else {
                carts[position].quantity = quantity;
            }
        } else if (position >= 0) {
            carts.splice(position, 1);
        }
        localStorage.setItem('cart', JSON.stringify(carts));
        refreshCartHTML();
    };


    // Refresh cart HTML
    const refreshCartHTML = () => {
        const listHTML = document.querySelector('.listCart');
        const totalHTML = document.querySelector('.icon-cart span');
        if (!listHTML || !totalHTML) {
            console.error('Cart DOM elements not found!');
            return;
        }
    
        let totalQuantity = 0;
        listHTML.innerHTML = ""; 
    
        carts.forEach(item => {
            const product = products.find(p => p.id === Number(item.product_id)); // Fixed comparison
            if (!product) {
                console.error(`Product with ID ${item.product_id} not found!`);
                console.log('Available products:', products); // Debugging log
                return;
            }
            totalQuantity += item.quantity;
    
            const newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
                <div class="bag-nav-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="item-name">${product.name}</div>
                <div class="total-price">${product.price}</div>
                <div class="quantity">
                    <span class="minus" data-id="${item.product_id}">-</span>
                    <span class="quantity-value">${item.quantity}</span>
                    <span class="plus" data-id="${item.product_id}">+</span>
                </div>
            `;
            listHTML.appendChild(newItem);
        });
        totalHTML.innerText = totalQuantity;
    
        /* PLUS BUTTON */
        listHTML.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', () => {
                const idProduct = button.dataset.id;
                const position = carts.findIndex(item => item.product_id == idProduct);
                const quantity = position >= 0 ? carts[position].quantity - 1 : 1;
                setProductInCart(idProduct, quantity, position);
            });
        });

        /* PLUS BUTTON */
        listHTML.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', () => {
                const idProduct = button.dataset.id;
                const position = carts.findIndex(item => item.product_id == idProduct);
                const quantity = position >= 0 ? carts[position].quantity + 1 : 1;
                setProductInCart(idProduct, quantity, position);
            });
        });
    };


    document.addEventListener('click', (event) => {
        const button = event.target;
        if (button.classList.contains('addCart')) {
            const idProduct = button.dataset.id;
            const position = carts.findIndex(item => item.product_id == idProduct);
            const quantity = position >= 0 ? carts[position].quantity + 1 : 1;
            setProductInCart(idProduct, quantity, position);
        }
    });


    const initApp = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                carts = JSON.parse(storedCart);
            } catch (error) {
                console.error('Error parsing cart data from localStorage:', error);
                carts = [];
            }
        }
        refreshCartHTML();
    };
    initApp();
};

export default cart;


