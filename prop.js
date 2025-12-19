// DOM Elements
const totalRoomsInput = document.getElementById('totalRooms');
const totalBedsInput = document.getElementById('totalBeds');
const pricePerBedInput = document.getElementById('pricePerBed');
const occupancySelect = document.getElementById('occupancy');
const bedOpexInput = document.getElementById('bedOpex');
const annualSalariesInput = document.getElementById('annualSalaries');

const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

// View selector
const viewSelect = document.getElementById('viewSelect');
const monthlyResults = document.getElementById('monthlyResults');
const yearlyResults = document.getElementById('yearlyResults');

// Results Display Elements
const occupiedBedsEl = document.getElementById('occupiedBeds');
const monthlyRevenueEl = document.getElementById('monthlyRevenue');
const contributionEl = document.getElementById('contribution');
const totalOpexEl = document.getElementById('totalOpex');
const marketingSpendEl = document.getElementById('marketingSpend');
const ebitdaEl = document.getElementById('ebitda');
const ownerEarningsEl = document.getElementById('ownerEarnings');
const operatorEarningsEl = document.getElementById('operatorEarnings');

// Yearly Results Display Elements
const yearlyRevenueEl = document.getElementById('yearlyRevenue');
const yearlyContributionEl = document.getElementById('yearlyContribution');
const yearlyOpexEl = document.getElementById('yearlyOpex');
const yearlyMarketingEl = document.getElementById('yearlyMarketing');
const yearlyEbitdaEl = document.getElementById('yearlyEbitda');
const yearlyOwnerEarningsEl = document.getElementById('yearlyOwnerEarnings');
const yearlyOperatorEarningsEl = document.getElementById('yearlyOperatorEarnings');

const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');

const ownerSplitVisual = document.getElementById('ownerSplitVisual');
const operatorSplitVisual = document.getElementById('operatorSplitVisual');
const ownerShareValue = document.getElementById('ownerShareValue');
const operatorShareValue = document.getElementById('operatorShareValue');

// Format currency in Indian Rupees
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });
}

// Validate inputs to ensure no negative values
function validateInputs() {
    const inputs = [
        totalRoomsInput,
        totalBedsInput,
        pricePerBedInput,
        bedOpexInput,
        annualSalariesInput
    ];
    
    let isValid = true;
    
    inputs.forEach(input => {
        if (parseFloat(input.value) < 0) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Calculate financials based on inputs
function calculateFinancials() {
    // Validate inputs
    if (!validateInputs()) {
        alert('Please ensure all values are positive numbers.');
        return;
    }
    
    // Get input values
    const totalRooms = parseFloat(totalRoomsInput.value) || 0;
    const totalBeds = parseFloat(totalBedsInput.value) || 0;
    const pricePerBed = parseFloat(pricePerBedInput.value) || 0;
    const occupancy = parseFloat(occupancySelect.value) || 0;
    const bedOpex = parseFloat(bedOpexInput.value) || 0;
    const monthlySalaries = parseFloat(annualSalariesInput.value) || 0;
    const marketingRate = 0.05;
    const operatorRevenueCut = 0.05;
    const operatorProfitShare = 0.15;
    const ownerProfitShare = 0.85;
    
    console.log('Inputs:', {totalRooms, totalBeds, pricePerBed, occupancy, bedOpex, monthlySalaries, marketingRate, operatorRevenueCut, operatorProfitShare, ownerProfitShare});
    
    // Basic calculations
    const occupiedBeds = totalBeds * occupancy;
    const occupiedRooms = occupiedBeds / 2; // 2 beds per room
    
    console.log('Basic calculations:', {totalBeds, occupiedBeds, occupiedRooms});
    
    // Display basic metrics
    occupiedBedsEl.textContent = occupiedBeds.toFixed(0);
    
    // Revenue calculations
    const revenue = occupiedBeds * pricePerBed;
    const operatorRevenueCutAmount = revenue * 0.05;
    const contribution = revenue - operatorRevenueCutAmount;
    const marketing = revenue * 0.05;
    
    console.log('Revenue calculations:', {revenue, operatorRevenueCutAmount, contribution, marketing});
    
    // Expense calculations
    const roomOpex = bedOpex * 2; // 2 beds per room
    const totalOpex = occupiedRooms * roomOpex;
    
    console.log('Expense calculations:', {roomOpex, totalOpex, monthlySalaries, marketing});
    
    // EBITDA calculation
    const ebitda = contribution - totalOpex - monthlySalaries - marketing;
    
    console.log('EBITDA:', ebitda);
    
    // Profit split calculations
    let operatorProfit, ownerProfit;
    
    if (ebitda > 0) {
        const operatorProfitShareAmount = ebitda * operatorProfitShare;
        const ownerProfitShareAmount = ebitda * ownerProfitShare;
        operatorProfit = operatorProfitShareAmount + operatorRevenueCutAmount;
        ownerProfit = ownerProfitShareAmount;
    } else {
        operatorProfit = operatorRevenueCutAmount; // upfront cut even in losses
        ownerProfit = ebitda; // This will be negative in loss-making scenarios
    }
    
    console.log('Profit split:', {operatorProfit, ownerProfit, operatorRevenueCutAmount});
    
    // Update results display
    monthlyRevenueEl.textContent = formatCurrency(revenue);
    contributionEl.textContent = formatCurrency(contribution);
    totalOpexEl.textContent = formatCurrency(totalOpex);
    marketingSpendEl.textContent = formatCurrency(marketing);
    ebitdaEl.textContent = formatCurrency(ebitda);
    ownerEarningsEl.textContent = formatCurrency(ownerProfit);
    operatorEarningsEl.textContent = formatCurrency(operatorProfit);
    
    // Yearly calculations
    const yearlyRevenue = revenue * 12;
    const yearlyContribution = contribution * 12;
    const yearlyOpex = totalOpex * 12;
    const yearlyMarketing = marketing * 12;
    const yearlyEbitda = ebitda * 12;
    const yearlyOwnerProfit = ownerProfit * 12;
    const yearlyOperatorProfit = operatorProfit * 12;
    
    // Display yearly results
    yearlyRevenueEl.textContent = formatCurrency(yearlyRevenue);
    yearlyContributionEl.textContent = formatCurrency(yearlyContribution);
    yearlyOpexEl.textContent = formatCurrency(yearlyOpex);
    yearlyMarketingEl.textContent = formatCurrency(yearlyMarketing);
    yearlyEbitdaEl.textContent = formatCurrency(yearlyEbitda);
    yearlyOwnerEarningsEl.textContent = formatCurrency(yearlyOwnerProfit);
    yearlyOperatorEarningsEl.textContent = formatCurrency(yearlyOperatorProfit);
    
    // Update profit split visualization
    const ownerSharePercent = ownerProfitShare * 100;
    const operatorSharePercent = operatorProfitShare * 100;
    
    ownerSplitVisual.style.width = `${ownerSharePercent}%`;
    operatorSplitVisual.style.width = `${operatorSharePercent}%`;
    
    ownerSplitVisual.innerHTML = `<span>Owner: ${ownerSharePercent}%</span>`;
    operatorSplitVisual.innerHTML = `<span>Operator: ${operatorSharePercent}%</span>`;
    
    ownerShareValue.textContent = formatCurrency(ownerProfit);
    operatorShareValue.textContent = formatCurrency(operatorProfit);
    
    // Update status badge
    if (ebitda > 0) {
        statusBadge.className = 'status-badge profitable';
        statusText.textContent = 'Profitable';
    } else {
        statusBadge.className = 'status-badge loss-making';
        statusText.textContent = 'Loss-making';
    }
}

// Reset form to default values
function resetForm() {
    totalRoomsInput.value = '';
    totalBedsInput.value = '';
    pricePerBedInput.value = '';
    occupancySelect.value = '';
    bedOpexInput.value = '';
    annualSalariesInput.value = '';
    
    // Reset results display
    occupiedBedsEl.textContent = '0';
    monthlyRevenueEl.textContent = '₹0';
    contributionEl.textContent = '₹0';
    totalOpexEl.textContent = '₹0';
    marketingSpendEl.textContent = '₹0';
    ebitdaEl.textContent = '₹0';
    ownerEarningsEl.textContent = '₹0';
    operatorEarningsEl.textContent = '₹0';
    
    // Reset yearly results
    yearlyRevenueEl.textContent = '₹0';
    yearlyContributionEl.textContent = '₹0';
    yearlyOpexEl.textContent = '₹0';
    yearlyMarketingEl.textContent = '₹0';
    yearlyEbitdaEl.textContent = '₹0';
    yearlyOwnerEarningsEl.textContent = '₹0';
    yearlyOperatorEarningsEl.textContent = '₹0';
    
    ownerShareValue.textContent = '₹0';
    operatorShareValue.textContent = '₹0';
    
    statusBadge.className = 'status-badge';
    statusText.textContent = 'Enter values to calculate';
    
    // Reset profit split visualization
    ownerSplitVisual.style.width = '85%';
    operatorSplitVisual.style.width = '15%';
    
    // Reset input borders
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = '#d1d5db';
    });
}

// Sync beds and rooms (2 beds per room)
function syncBedsFromRooms() {
    const rooms = parseInt(totalRoomsInput.value) || 0;
    totalBedsInput.value = rooms * 2;
}

function syncRoomsFromBeds() {
    const beds = parseInt(totalBedsInput.value) || 0;
    totalRoomsInput.value = Math.round(beds / 2);
}

// Toggle between monthly and yearly views
function toggleView() {
    if (viewSelect.value === 'monthly') {
        monthlyResults.style.display = 'block';
        yearlyResults.style.display = 'none';
    } else {
        monthlyResults.style.display = 'none';
        yearlyResults.style.display = 'block';
    }
}

// Event Listeners
calculateBtn.addEventListener('click', calculateFinancials);

resetBtn.addEventListener('click', resetForm);

// Initialize form with empty values
document.addEventListener('DOMContentLoaded', function() {
    // Clear all input fields
    totalRoomsInput.value = '';
    totalBedsInput.value = '';
    pricePerBedInput.value = '';
    occupancySelect.value = '';
    bedOpexInput.value = '';
    annualSalariesInput.value = '';
    
    // Reset all displayed values to 0 or empty
    resetForm();
});

// View selector
viewSelect.addEventListener('change', toggleView);

// Sync inputs
totalRoomsInput.addEventListener('input', syncBedsFromRooms);
totalBedsInput.addEventListener('input', syncRoomsFromBeds);

// Add input validation on change
const allInputs = document.querySelectorAll('input, select');
allInputs.forEach(input => {
    input.addEventListener('change', validateInputs);
});

// Initialize UI on page load
window.addEventListener('DOMContentLoaded', () => {
    // Set initial view
    toggleView();
    
    // Set initial profit split visualization
    ownerSplitVisual.style.width = '85%';
    operatorSplitVisual.style.width = '15%';
    
    // Don't perform calculation on page load
    // User needs to click calculate after entering values
});