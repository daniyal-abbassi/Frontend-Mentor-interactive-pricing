// ===== CONFIGURATION & CONSTANTS =====
const PRICING_DATA = {
    1: { views: '10K', price: 8 },
    2: { views: '50K', price: 12 },
    3: { views: '100K', price: 16 },
    4: { views: '500K', price: 24 },
    5: { views: '1M', price: 36 }
};

const YEARLY_DISCOUNT = 0.25; // 25% discount
const DEFAULT_RANGE_VALUE = 3; // 100K views

// ===== DOM ELEMENTS =====
const viewCount = document.getElementById('view-count');
const monthPrice = document.getElementById('month-price');
const rangeInput = document.getElementById('range-input');
const discountBtn = document.getElementById('discount-btn');

// ===== STATE MANAGEMENT =====
let isYearlyBilling = false;

// ===== CORE BUSINESS LOGIC =====
const updatePricing = () => {
    const rangeValue = rangeInput.value;
    const pricingInfo = PRICING_DATA[rangeValue];
    
    if (pricingInfo) {
        // Update pageviews
        viewCount.textContent = pricingInfo.views;
        
        // Calculate price with discount if yearly billing is active
        let finalPrice = pricingInfo.price;
        if (isYearlyBilling) {
            finalPrice = pricingInfo.price * (1 - YEARLY_DISCOUNT);
        }
        
        // Update price display
        monthPrice.textContent = `$${finalPrice}`;
    }
};

// ===== EVENT HANDLERS =====
const handleRangeChange = () => {
    updatePricing();
};

const handleDiscountToggle = () => {
    isYearlyBilling = !isYearlyBilling;
    
    // Toggle button visual state
    if (isYearlyBilling) {
        discountBtn.classList.add('active');
    } else {
        discountBtn.classList.remove('active');
    }
    
    // Update pricing immediately
    updatePricing();
};

// ===== INITIALIZATION & STARTUP =====
const initializeComponent = () => {
    // Set default range value (100K views)
    rangeInput.value = DEFAULT_RANGE_VALUE;
    
    // Set initial pricing
    updatePricing();
    
    // Add event listeners
    rangeInput.addEventListener('input', handleRangeChange);
    discountBtn.addEventListener('click', handleDiscountToggle);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeComponent);