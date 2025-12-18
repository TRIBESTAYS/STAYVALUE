// DOM Elements
const totalRoomsInput = document.getElementById('totalRooms');
const bedsPerRoomInput = document.getElementById('bedsPerRoom');
const pricePerBedInput = document.getElementById('pricePerBed');
const occupancySelect = document.getElementById('occupancy');
const bedOpexInput = document.getElementById('bedOpex');
const annualSalariesInput = document.getElementById('annualSalaries');

const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

// Results Display Elements
const totalBedsEl = document.getElementById('totalBeds');
const occupiedBedsEl = document.getElementById('occupiedBeds');
const monthlyRevenueEl = document.getElementById('monthlyRevenue');
const contributionEl = document.getElementById('contribution');
const totalOpexEl = document.getElementById('totalOpex');
const marketingSpendEl = document.getElementById('marketingSpend');
const ebitdaEl = document.getElementById('ebitda');
const ownerEarningsEl = document.getElementById('ownerEarnings');
const operatorEarningsEl = document.getElementById('operatorEarnings');

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
        bedsPerRoomInput,
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
    const totalRooms = parseFloat(totalRoomsInput.value);
    const bedsPerRoom = parseFloat(bedsPerRoomInput.value);
    const pricePerBed = parseFloat(pricePerBedInput.value);
    const occupancy = parseFloat(occupancySelect.value);
    const bedOpex = parseFloat(bedOpexInput.value);
    const monthlySalaries = parseFloat(annualSalariesInput.value);
    const marketingRate = 0.05;
    const operatorRevenueCut = 0.05;
    const operatorProfitShare = 0.15;
    const ownerProfitShare = 0.85;
    
    // Basic calculations
    const totalBeds = totalRooms * bedsPerRoom;
    const occupiedBeds = totalBeds * occupancy;
    const occupiedRooms = occupiedBeds / bedsPerRoom;
    
    // Display basic metrics
    totalBedsEl.textContent = totalBeds.toFixed(0);
    occupiedBedsEl.textContent = occupiedBeds.toFixed(0);
    
    // Revenue calculations
    const revenue = occupiedBeds * pricePerBed;
    const operatorRevenueCutAmount = revenue * operatorRevenueCut;
    const contribution = revenue - operatorRevenueCutAmount;
    
    // Expense calculations
    const roomOpex = bedOpex * bedsPerRoom;
    const totalOpex = occupiedRooms * roomOpex;
    const marketing = contribution * marketingRate;
    
    // EBITDA calculation
    const ebitda = contribution - totalOpex - monthlySalaries - marketing;
    
    // Profit split calculations
    let operatorProfit, ownerProfit;
    
    if (ebitda > 0) {
        operatorProfit = ebitda * operatorProfitShare;
        ownerProfit = ebitda * ownerProfitShare;
    } else {
        operatorProfit = 0;
        ownerProfit = ebitda; // This will be negative in loss-making scenarios
    }
    
    // Update results display
    monthlyRevenueEl.textContent = formatCurrency(revenue);
    contributionEl.textContent = formatCurrency(contribution);
    totalOpexEl.textContent = formatCurrency(totalOpex);
    marketingSpendEl.textContent = formatCurrency(marketing);
    ebitdaEl.textContent = formatCurrency(ebitda);
    ownerEarningsEl.textContent = formatCurrency(ownerProfit);
    operatorEarningsEl.textContent = formatCurrency(operatorProfit);
    
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
    totalRoomsInput.value = 0;
    bedsPerRoomInput.value = 0;
    pricePerBedInput.value = 0;
    occupancySelect.value = 0;
    bedOpexInput.value = 8000;
    annualSalariesInput.value = 25000;
    
    // Reset results display
    totalBedsEl.textContent = '0';
    occupiedBedsEl.textContent = '0';
    monthlyRevenueEl.textContent = '₹0';
    contributionEl.textContent = '₹0';
    totalOpexEl.textContent = '₹0';
    marketingSpendEl.textContent = '₹0';
    ebitdaEl.textContent = '₹0';
    ownerEarningsEl.textContent = '₹0';
    operatorEarningsEl.textContent = '₹0';
    
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

// Event Listeners
calculateBtn.addEventListener('click', calculateFinancials);

resetBtn.addEventListener('click', resetForm);

// Add input validation on change
const allInputs = document.querySelectorAll('input, select');
allInputs.forEach(input => {
    input.addEventListener('change', validateInputs);
});

// Initialize with default calculation on page load
window.addEventListener('DOMContentLoaded', () => {
    // Set initial profit split visualization
    ownerSplitVisual.style.width = '85%';
    operatorSplitVisual.style.width = '15%';
    
    // Perform initial calculation with default values
    calculateFinancials();
});