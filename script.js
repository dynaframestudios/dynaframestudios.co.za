// Dark/Light Mode Toggle
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

// Currency Converter Modal
let currentCurrency = 'ZAR';

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
    closeCurrencyModal();
    updatePrices();
    
    // Update top bar button
    const currencyBtn = document.querySelector('.currency-toggle');
    if (currencyBtn) {
        currencyBtn.textContent = currency === 'ZAR' ? '🌐 View USD' : '🌐 View ZAR';
    }
}

function updatePrices() {
    const exchangeRate = 0.054; // 1 ZAR = 0.054 USD (approx)
    
    document.querySelectorAll('[data-price-zar]').forEach(element => {
        const zarPrice = parseFloat(element.dataset.priceZar);
        let displayPrice;
        
        if (currentCurrency === 'USD') {
            const usdPrice = (zarPrice * exchangeRate).toFixed(2);
            displayPrice = `$${usdPrice}`;
        } else {
            displayPrice = `R${zarPrice.toLocaleString()}`;
        }
        
        element.textContent = displayPrice;
    });
}

// Initialize prices on page load
document.addEventListener('DOMContentLoaded', () => {
    updatePrices();
    
    // Close modal on outside click
    const modal = document.getElementById('currencyModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCurrencyModal();
        });
    }
    
    // Add price data attributes to web design page
    if (window.location.pathname.includes('web-design')) {
        const standardPrice = document.querySelector('.pricing-card:first-child .price');
        const proPrice = document.querySelector('.pricing-card:last-child .price');
        
        if (standardPrice) {
            standardPrice.dataset.priceZar = '2500';
        }
        if (proPrice) {
            proPrice.dataset.priceZar = '3500';
        }
    }
});