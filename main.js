    import products from './products.js';

    // Toggle side add to cart
    // Global variables
    let iconCart = document.querySelector('.icon-cart');
    let closeCart = document.querySelector('.close'); 
    let body = document.querySelector('body'); 
    let listProductHTML = document.querySelector('.listProduct');
    let listCartHTML = document.querySelector('.listCart');
    let iconCartSpan = document.querySelector('.icon-cart span');

    let listProducts = [];
    let carts = [];


    function toggleMenu() {
        const dropdownMenu = document.getElementById("dropdown-menu");
        if (dropdownMenu.classList.contains("hidden")) {
            dropdownMenu.classList.remove("hidden");
            dropdownMenu.style.maxHeight = "600px"; // Adjust height as needed
        } else {
            dropdownMenu.classList.add("hidden");
            dropdownMenu.style.maxHeight = "0px";
        }
    }


    /* SEARCH */
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim(); // Get the user's input

        // Hide the search results container if the input is empty
        if (query === '') {
            searchResults.style.display = 'none'; // Hide search results
        } else {
            searchResults.style.display = 'block'; // Show search results
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query)
            ); // Filter products matching the query

            renderSearchResults(filteredProducts);
        }
    });

    // Function to display the search results
    function renderSearchResults(items) {
        // Clear previous results
        searchResults.innerHTML = '';

        if (items.length === 0) {
            searchResults.innerHTML = '<p>No items found.</p>';
            return;
        }

        // Display matching items
        items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('image-container'); // Reusing the image container styles
            resultItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="product-header-container">
                    <h2>${item.name}</h2>
                    <p class="pixel">${item.price}</p>
                </div>
            `;
            searchResults.appendChild(resultItem);
        });
    }










    //   DETAILS ADD TO BAG
    document.addEventListener('DOMContentLoaded', () => {
        listProductHTML = document.querySelector('.listProduct');
        listCartHTML = document.querySelector('.listCart');

        
        // Selectors
        const iconCart = document.querySelector('.icon-cart'); 
        const closeCart = document.querySelector('.close'); 
        const body = document.querySelector('body'); 

        // Check if elements exist to avoid null errors
        if (iconCart && closeCart) {
            // Toggle cart
            iconCart.addEventListener('click', () => {
                body.classList.toggle('showCart'); 
            });

            // Close cart using the close button
            closeCart.addEventListener('click', () => {
                body.classList.remove('showCart'); 
            });
        } else {
            console.error('Required elements are missing in the DOM!');
        }
    });


    document.addEventListener('DOMContentLoaded', () => {
        let listProductHTML = document.querySelector('.listProduct');
        let listCartHTML = document.querySelector('.listCart');
        let iconCartSpan = document.querySelector('.icon-cart span');


        const addDataToHTML = () => {
            listProductHTML.innerHTML = '';
            if (listProducts.length > 0) {
                listProducts.forEach(product => {
                    let newProduct = document.createElement('div');
                    newProduct.classList.add('item');
                    newProduct.dataset.id = product.id;
                    newProduct.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                            <h2>${product.name}</h2>
                            <div class="price">${product.price}</div>
                            <button class="addCart pixel">Add to cart</button>
                    `;
                    listProductHTML.appendChild(newProduct);
                });
            }
        };

        listProductHTML.addEventListener('click', (event) => {
            const positionClick = event.target;
        
            // Check if the clicked element is the addCart button
            if (positionClick.classList.contains('addCart')) {
                // Find the parent container with data-id attribute
                const parentContainer = positionClick.closest('.item');
                if (parentContainer) {
                    let product_id = parentContainer.dataset.id;
                    addToCart(product_id);
                }
            }
        });

        // Attach event listener to the parent container of the products
        const productContainer = document.querySelector('.product-container');

        if (productContainer) {
            productContainer.addEventListener('click', (event) => {
                const target = event.target;
    
                // Check if the clicked element is the "ADD TO BAG" button
                if (target.classList.contains('add-to-bag-btn')) {
                    const productId = target.dataset.id; // Get the product ID
                    if (productId) {
                        addToCart(productId);
                    }
                }
            });
        }

        const addToCart = (product_id) => {
            let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
            if (carts.length <= 0) {
                carts = [{
                    product_id: product_id,
                    quantity: 1
                }];
            } else if (positionThisProductInCart < 0) {
                carts.push({
                    product_id: product_id,
                    quantity: 1
                });
            } else {
                carts[positionThisProductInCart].quantity += 1;
            }
        
            // Update cart in the UI and local storage
            addCartToHTML();
            addCartToMemory();
        };

        const addCartToMemory = () => {
            localStorage.setItem('cart', JSON.stringify(carts));
        }

        const addCartToHTML = () => {
            listCartHTML.innerHTML = '';
            let totalQuantity = 0;
        
            if (carts.length > 0) {
                carts.forEach(cart => {
                    totalQuantity += cart.quantity;
                    let positionProduct = listProducts.findIndex(value => value.id == cart.product_id);
                    if (positionProduct >= 0) {
                        let info = listProducts[positionProduct];
        
                        let newCart = document.createElement('div');
                        newCart.classList.add('item');
                        newCart.dataset.id = cart.product_id; // Ensure data-id is set here
                        newCart.innerHTML = `
                            <div class="bag-nav-image">
                                <img src="${info.image}" alt="Product Image">
                            </div>
                            <div class="item-name">${info.name}</div>
                            <div class="total-price">${info.price}</div>
                            <div class="quantity">
                                <span class="minus">-</span>
                                <span class="quantity-value">${cart.quantity}</span>
                                <span class="plus">+</span>
                            </div>
                        `;
                        listCartHTML.appendChild(newCart);
                    }
                });
        
                // Update cart icon quantity
                iconCartSpan.innerText = totalQuantity;
            } else {
                listCartHTML.innerHTML = `<p class="mr-ml-20">Your cart is empty.</p>`;
                iconCartSpan.innerText = 0;
            }
        };

        listCartHTML.addEventListener('click', (event) => {
            let positionClick = event.target;
        
            if (positionClick.textContent === '-' || positionClick.textContent === '+') {
                // Traverse DOM to find the data-id
                let parentItem = positionClick.closest('.item');
                if (parentItem) {
                    let product_id = parentItem.dataset.id;
                    let type = positionClick.textContent === '+' ? 'plus' : 'minus';
        
                    // Update cart quantity
                    changeQuantityCart(product_id, type);
                }
            }
        });

        const changeQuantityCart = (product_id, type) => {
            let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
            if(positionItemInCart >= 0){
                let info = carts[positionItemInCart];
                switch (type) {
                    case 'plus':
                        carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                        break;
                
                    default:
                        let changeQuantity = carts[positionItemInCart].quantity - 1;
                        if (changeQuantity > 0) {
                            carts[positionItemInCart].quantity = changeQuantity;
                        }else{
                            carts.splice(positionItemInCart, 1);
                        }
                        break;
                }
            }
            addCartToHTML();
            addCartToMemory();
        }

    const initApp = () => {
        fetch('products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                listProducts = data;
                addDataToHTML();
                if (localStorage.getItem('cart')) {
                    carts = JSON.parse(localStorage.getItem('cart'));
                    addCartToHTML();
                }
            })
            .catch(error => {
                console.error("Failed to fetch products:", error);
            });
    };

        initApp();
    });



