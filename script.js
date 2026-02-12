// ===== DARK/LIGHT MODE TOGGLE =====
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark 
            ? '🌙 Dark Mode' 
            : '☀️ Light Mode';
    });
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '🌙 Dark Mode';
    }
}

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu button to navbar
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu && !document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert before nav menu
        navContainer.insertBefore(mobileToggle, navMenu);
        
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ===== CURRENCY CONVERTER =====
let currentCurrency = localStorage.getItem('currency') || 'ZAR';

function showCurrencyModal() {
    const modal = document.getElementById('currencyModal');
    if (modal) modal.style.display = 'flex';
}

function closeCurrencyModal() {
    const modal = document.getElementById('currencyModal');
    if (modal) modal.style.display = 'none';
}

function selectCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem('currency', currency);
    closeCurrencyModal();
    updatePrices();
    
    // Update top bar button
    const currencyBtn = document.querySelector('.currency-toggle');
    if (currencyBtn) {
        currencyBtn.innerHTML = currency === 'ZAR' 
            ? '🌐 View USD' 
            : '🌐 View ZAR';
    }
}

function updatePrices() {
    const exchangeRate = 0.054; // 1 ZAR = 0.054 USD
    
    document.querySelectorAll('.price').forEach(element => {
        const priceText = element.textContent;
        const zarMatch = priceText.match(/R([0-9,]+)/);
        const usdMatch = priceText.match(/\$([0-9.]+)/);
        
        let zarPrice = 0;
        if (zarMatch) {
            zarPrice = parseFloat(zarMatch[1].replace(/,/g, ''));
        } else if (usdMatch) {
            zarPrice = parseFloat(usdMatch[1]) / exchangeRate;
        }
        
        if (zarPrice > 0) {
            if (currentCurrency === 'USD') {
                const usdPrice = (zarPrice * exchangeRate).toFixed(2);
                element.textContent = `$${usdPrice}`;
            } else {
                element.textContent = `R${zarPrice.toLocaleString()}`;
            }
        }
    });
}

// Initialize prices on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add price data attributes if not present
    document.querySelectorAll('.price').forEach((element, index) => {
        if (!element.dataset.priceZar) {
            if (element.textContent.includes('R2,500') || element.textContent.includes('R2500')) {
                element.dataset.priceZar = '2500';
            } else if (element.textContent.includes('R3,500') || element.textContent.includes('R3500')) {
                element.dataset.priceZar = '3500';
            } else if (element.textContent.includes('R5,000') || element.textContent.includes('R5000')) {
                element.dataset.priceZar = '5000';
            }
        }
    });
    
    updatePrices();
    
    // Close modal on outside click
    const modal = document.getElementById('currencyModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCurrencyModal();
        });
    }
});

// ===== FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('form[action*="formsubmit.co"]');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Don't prevent default - FormSubmit needs to submit normally
            // But we can show a loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⏳ Sending...';
            }
        });
    });
});

// ===== URL PARAMETERS FOR PRE-FILLED FORMS =====
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const package = urlParams.get('package');
    const service = urlParams.get('service');
    
    if (package || service) {
        const serviceSelect = document.getElementById('service');
        const messageField = document.getElementById('message');
        
        if (serviceSelect) {
            if (package === 'standard' || package === 'pro' || package === 'ecommerce') {
                serviceSelect.value = 'web-design';
            }
        }
        
        if (messageField) {
            if (package === 'standard') {
                messageField.value = "I'm interested in the Standard Business Website package (R2,500). Please contact me with more information.";
            } else if (package === 'pro') {
                messageField.value = "I'm interested in the Pro Business Website package (R3,500). Please contact me with more information.";
            } else if (package === 'ecommerce') {
                messageField.value = "I'm interested in the E-Commerce Website package (R5,000). Please contact me with more information.";
            }
        }
    }
});