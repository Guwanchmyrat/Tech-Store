// Product Page JavaScript - TAMAMEN YENİ
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Product Filtering - GÜNCELLENMİŞ
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Filter products with animation
            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add to Cart Functionality - YENİ EKLENDİ
    const addToCartButtons = document.querySelectorAll('.product-card button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;
            
            // Add to cart animation
            this.textContent = 'Sebede Goşuldy ✓';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Show notification
            showNotification(`${productName} sebediňize goşuldy!`, 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'Sebede goş';
                this.style.background = 'linear-gradient(135deg, #2563eb, #8b5cf6)';
            }, 2000);
            
            // Here you would normally add to cart storage
            addToCartStorage({
                name: productName,
                price: productPrice,
                image: productCard.querySelector('img').src
            });
        });
    });

    // Notification System
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else {
            notification.style.background = '#ef4444';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Cart Storage (LocalStorage)
    function addToCartStorage(product) {
        let cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];
        cart.push(product);
        localStorage.setItem('techstore_cart', JSON.stringify(cart));
        
        // Update cart count in header if exists
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];
        let cartCount = document.querySelector('.cart-count');
        
        if (!cartCount) {
            // Create cart count element if it doesn't exist
            cartCount = document.createElement('span');
            cartCount.className = 'cart-count';
            cartCount.style.cssText = `
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                position: absolute;
                top: -5px;
                right: -5px;
            `;
            
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.position = 'relative';
                cartIcon.appendChild(cartCount);
            }
        }
        
        cartCount.textContent = cart.length;
    }

    // Initialize cart count on page load
    updateCartCount();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}