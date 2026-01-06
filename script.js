// DOM Elements
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const searchBtn = document.getElementById('search-btn');
const closeSearch = document.getElementById('close-search');
const searchOverlay = document.getElementById('search-overlay');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const continueShopping = document.getElementById('continue-shopping');
const backToTop = document.getElementById('backToTop');
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-price');
const cartCount = document.querySelector('.cart-count');

// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Earbuds",
        category: "audio",
        price: 79.99,
        oldPrice: 99.99,
        badge: "Sale",
        icon: "fas fa-headphones",
        rating: 4.5
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        category: "wearables",
        price: 199.99,
        oldPrice: null,
        badge: "New",
        icon: "fas fa-clock",
        rating: 4.8
    },
    {
        id: 3,
        name: "Fast Wireless Charger",
        category: "chargers",
        price: 39.99,
        oldPrice: 49.99,
        badge: "Sale",
        icon: "fas fa-bolt",
        rating: 4.3
    },
    {
        id: 4,
        name: "Phone Case - Protective",
        category: "cases",
        price: 24.99,
        oldPrice: null,
        badge: "Bestseller",
        icon: "fas fa-mobile-alt",
        rating: 4.7
    },
    {
        id: 5,
        name: "Noise Cancelling Headphones",
        category: "audio",
        price: 149.99,
        oldPrice: 179.99,
        badge: "Sale",
        icon: "fas fa-headphones-alt",
        rating: 4.6
    },
    {
        id: 6,
        name: "Fitness Tracker Band",
        category: "wearables",
        price: 59.99,
        oldPrice: null,
        badge: "Popular",
        icon: "fas fa-running",
        rating: 4.4
    },
    {
        id: 7,
        name: "Car Phone Mount",
        category: "accessories",
        price: 19.99,
        oldPrice: 24.99,
        badge: "Sale",
        icon: "fas fa-car",
        rating: 4.2
    },
    {
        id: 8,
        name: "Portable Power Bank",
        category: "chargers",
        price: 49.99,
        oldPrice: null,
        badge: "New",
        icon: "fas fa-battery-full",
        rating: 4.5
    }
];

// Cart Data
let cart = [
    {
        id: 1,
        name: "Wireless Bluetooth Earbuds",
        price: 79.99,
        quantity: 1,
        icon: "fas fa-headphones"
    },
    {
        id: 4,
        name: "Phone Case - Protective",
        price: 24.99,
        quantity: 2,
        icon: "fas fa-mobile-alt"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load products
    renderProducts(products);
    
    // Load cart
    updateCart();
    
    // Set up event listeners
    setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Search functionality
    searchBtn.addEventListener('click', openSearch);
    closeSearch.addEventListener('click', closeSearchOverlay);
    
    // Cart functionality
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    continueShopping.addEventListener('click', closeCartSidebar);
    
    // Back to top button
    window.addEventListener('scroll', toggleBackToTop);
    backToTop.addEventListener('click', scrollToTop);
    
    // Product filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', filterProducts);
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target) && cartSidebar.classList.contains('open')) {
            closeCartSidebar();
        }
    });
    
    // Close search overlay when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchOverlay();
            closeCartSidebar();
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Open search overlay
function openSearch() {
    searchOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('search-input').focus();
}

// Close search overlay
function closeSearchOverlay() {
    searchOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open cart sidebar
function openCart() {
    cartSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Toggle back to top button visibility
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Render products to the grid
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        const oldPriceHTML = product.oldPrice ? 
            `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';
        
        const stars = getStarRating(product.rating);
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <i class="${product.icon}"></i>
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${oldPriceHTML}
                </div>
                <div class="product-actions">
                    <div class="product-rating">
                        ${stars}
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Generate star rating HTML
function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Filter products by category
function filterProducts(e) {
    const filter = e.target.dataset.filter;
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    if (filter === 'all') {
        renderProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === filter);
        renderProducts(filteredProducts);
    }
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon
        });
    }
    
    // Update cart UI
    updateCart();
    
    // Show confirmation
    showNotification(`${product.name} added to cart!`);
}

// Update cart UI
function updateCart() {
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    let totalItems = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <i class="${item.icon}"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease-quantity" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Update cart count
    cartCount.textContent = totalItems;
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Decrease item quantity in cart
function decreaseQuantity(e) {
    const productId = parseInt(e.target.closest('button').dataset.id);
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    }
}

// Increase item quantity in cart
function increaseQuantity(e) {
    const productId = parseInt(e.target.closest('button').dataset.id);
    const item = cart.find(item => item.id === productId);
    
    item.quantity += 1;
    updateCart();
}

// Remove item from cart
function removeFromCart(e) {
    const productId = parseInt(e.target.closest('button').dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    
    showNotification('Item removed from cart');
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    console.log('Contact form submitted:', { name, email, message });
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    e.target.reset();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});