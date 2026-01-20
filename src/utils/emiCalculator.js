/* ============================================
   EMI Calculator - Nambiar District 25 Phase 2
   Loan EMI calculation utilities
   ============================================ */

// Default EMI calculation parameters
export const DEFAULT_EMI_CONFIG = {
  minLoanAmount: 5000000, // 50 Lakhs
  maxLoanAmount: 50000000, // 5 Cr
  defaultLoanAmount: 17000000, // 1.70 Cr
  minInterestRate: 6,
  maxInterestRate: 15,
  defaultInterestRate: 8.5,
  minTenure: 5,
  maxTenure: 30,
  defaultTenure: 30,
  loanToValueRatio: 0.80, // 80% of property value
};

// Bank interest rates (for reference)
export const BANK_RATES = [
  { bank: 'SBI', rate: 8.5, type: 'Floating' },
  { bank: 'HDFC', rate: 8.75, type: 'Floating' },
  { bank: 'ICICI', rate: 8.85, type: 'Floating' },
  { bank: 'Axis Bank', rate: 8.75, type: 'Floating' },
  { bank: 'Bank of Baroda', rate: 8.4, type: 'Floating' },
  { bank: 'PNB', rate: 8.45, type: 'Floating' },
];

/**
 * Calculate Monthly EMI
 * Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
 * P = Principal loan amount
 * R = Monthly interest rate (Annual rate / 12 / 100)
 * N = Loan tenure in months
 *
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate in percentage
 * @param {number} tenureYears - Loan tenure in years
 * @returns {number} - Monthly EMI amount
 */
export const calculateEMI = (principal, annualRate, tenureYears) => {
  // Validate inputs
  if (!principal || principal <= 0) return 0;
  if (!annualRate || annualRate <= 0) return 0;
  if (!tenureYears || tenureYears <= 0) return 0;

  // Convert annual rate to monthly rate
  const monthlyRate = annualRate / 12 / 100;

  // Convert years to months
  const tenureMonths = tenureYears * 12;

  // Calculate EMI using formula
  const emiNumerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
  const emiDenominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;

  const emi = emiNumerator / emiDenominator;

  return Math.round(emi);
};

/**
 * Calculate Total Interest Payable
 *
 * @param {number} emi - Monthly EMI amount
 * @param {number} tenureYears - Loan tenure in years
 * @param {number} principal - Principal loan amount
 * @returns {number} - Total interest amount
 */
export const calculateTotalInterest = (emi, tenureYears, principal) => {
  if (!emi || !tenureYears || !principal) return 0;

  const totalPayment = emi * tenureYears * 12;
  const totalInterest = totalPayment - principal;

  return Math.round(totalInterest);
};

/**
 * Calculate Total Amount Payable
 *
 * @param {number} emi - Monthly EMI amount
 * @param {number} tenureYears - Loan tenure in years
 * @returns {number} - Total amount to be paid
 */
export const calculateTotalAmount = (emi, tenureYears) => {
  if (!emi || !tenureYears) return 0;

  return Math.round(emi * tenureYears * 12);
};

/**
 * Get complete EMI breakdown
 *
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate
 * @param {number} tenureYears - Loan tenure in years
 * @returns {Object} - Complete EMI breakdown
 */
export const getEMIBreakdown = (principal, annualRate, tenureYears) => {
  const emi = calculateEMI(principal, annualRate, tenureYears);
  const totalAmount = calculateTotalAmount(emi, tenureYears);
  const totalInterest = calculateTotalInterest(emi, tenureYears, principal);

  return {
    monthlyEMI: emi,
    principal: principal,
    totalInterest: totalInterest,
    totalAmount: totalAmount,
    tenureMonths: tenureYears * 12,
    tenureYears: tenureYears,
    interestRate: annualRate,
  };
};

/**
 * Format amount to Indian currency display
 *
 * @param {number} amount - Amount in rupees
 * @returns {string} - Formatted string like "1.31 L" or "4.71 Cr"
 */
export const formatEMIAmount = (amount) => {
  if (!amount || amount <= 0) return '₹0';

  if (amount >= 10000000) {
    // Crores
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // Lakhs
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    // Thousands
    return `₹${(amount / 1000).toFixed(2)} K`;
  }

  return `₹${amount}`;
};

/**
 * Format amount for short display
 *
 * @param {number} amount - Amount in rupees
 * @returns {Object} - Object with value and unit
 */
export const formatAmountShort = (amount) => {
  if (!amount || amount <= 0) return { value: '0', unit: '' };

  if (amount >= 10000000) {
    return { value: (amount / 10000000).toFixed(2), unit: 'Cr' };
  } else if (amount >= 100000) {
    return { value: (amount / 100000).toFixed(2), unit: 'L' };
  } else if (amount >= 1000) {
    return { value: (amount / 1000).toFixed(2), unit: 'K' };
  }

  return { value: amount.toString(), unit: '' };
};

/**
 * Calculate eligible loan amount based on property value
 *
 * @param {number} propertyValue - Property value in rupees
 * @param {number} ltvRatio - Loan to value ratio (default 80%)
 * @returns {number} - Eligible loan amount
 */
export const calculateEligibleLoan = (propertyValue, ltvRatio = 0.80) => {
  if (!propertyValue || propertyValue <= 0) return 0;

  return Math.round(propertyValue * ltvRatio);
};

/**
 * Calculate down payment required
 *
 * @param {number} propertyValue - Property value in rupees
 * @param {number} loanAmount - Loan amount
 * @returns {number} - Down payment amount
 */
export const calculateDownPayment = (propertyValue, loanAmount) => {
  if (!propertyValue || !loanAmount) return 0;

  return Math.round(propertyValue - loanAmount);
};

/**
 * Get amortization schedule for first year
 *
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate
 * @param {number} tenureYears - Loan tenure in years
 * @returns {Array} - Array of monthly breakdown for first 12 months
 */
export const getAmortizationSchedule = (principal, annualRate, tenureYears) => {
  const monthlyRate = annualRate / 12 / 100;
  const emi = calculateEMI(principal, annualRate, tenureYears);
  const schedule = [];

  let remainingPrincipal = principal;

  for (let month = 1; month <= 12; month++) {
    const interestComponent = Math.round(remainingPrincipal * monthlyRate);
    const principalComponent = emi - interestComponent;

    schedule.push({
      month,
      emi: emi,
      principal: principalComponent,
      interest: interestComponent,
      balance: Math.round(remainingPrincipal - principalComponent),
    });

    remainingPrincipal -= principalComponent;
  }

  return schedule;
};

/**
 * Validate EMI calculation inputs
 *
 * @param {number} principal - Loan amount
 * @param {number} interestRate - Interest rate
 * @param {number} tenure - Loan tenure
 * @returns {Object} - Validation result
 */
export const validateEMIInputs = (principal, interestRate, tenure) => {
  const errors = {};

  if (!principal || principal < DEFAULT_EMI_CONFIG.minLoanAmount) {
    errors.principal = `Minimum loan amount is ₹${(DEFAULT_EMI_CONFIG.minLoanAmount / 100000).toFixed(0)} Lakhs`;
  }

  if (principal > DEFAULT_EMI_CONFIG.maxLoanAmount) {
    errors.principal = `Maximum loan amount is ₹${(DEFAULT_EMI_CONFIG.maxLoanAmount / 10000000).toFixed(0)} Cr`;
  }

  if (!interestRate || interestRate < DEFAULT_EMI_CONFIG.minInterestRate) {
    errors.interestRate = `Minimum interest rate is ${DEFAULT_EMI_CONFIG.minInterestRate}%`;
  }

  if (interestRate > DEFAULT_EMI_CONFIG.maxInterestRate) {
    errors.interestRate = `Maximum interest rate is ${DEFAULT_EMI_CONFIG.maxInterestRate}%`;
  }

  if (!tenure || tenure < DEFAULT_EMI_CONFIG.minTenure) {
    errors.tenure = `Minimum tenure is ${DEFAULT_EMI_CONFIG.minTenure} years`;
  }

  if (tenure > DEFAULT_EMI_CONFIG.maxTenure) {
    errors.tenure = `Maximum tenure is ${DEFAULT_EMI_CONFIG.maxTenure} years`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  DEFAULT_EMI_CONFIG,
  BANK_RATES,
  calculateEMI,
  calculateTotalInterest,
  calculateTotalAmount,
  getEMIBreakdown,
  formatEMIAmount,
  formatAmountShort,
  calculateEligibleLoan,
  calculateDownPayment,
  getAmortizationSchedule,
  validateEMIInputs,
};
