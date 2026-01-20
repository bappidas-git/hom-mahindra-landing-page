/* ============================================
   Formatters - Nambiar District 25 Phase 2
   Utility functions for formatting data
   ============================================ */

/**
 * Format number to Indian currency format with symbol
 * @param {number} amount - Amount in rupees
 * @param {boolean} showSymbol - Whether to show rupee symbol
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return showSymbol ? '₹0' : '0';
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

/**
 * Format amount to Crores/Lakhs display
 * @param {number} amount - Amount in rupees
 * @returns {string} - Formatted string like "1.70 Cr" or "50 L"
 */
export const formatIndianAmount = (amount) => {
  if (!amount || amount <= 0) return '₹0';

  if (amount >= 10000000) {
    // Crores (1 Cr = 10,000,000)
    const crores = amount / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // Lakhs (1 L = 100,000)
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} L`;
  } else if (amount >= 1000) {
    // Thousands
    const thousands = amount / 1000;
    return `₹${thousands.toFixed(2)} K`;
  }

  return `₹${amount}`;
};

/**
 * Format amount to short display with separate value and unit
 * @param {number} amount - Amount in rupees
 * @returns {Object} - Object with value, unit, and formatted string
 */
export const formatAmountWithUnit = (amount) => {
  if (!amount || amount <= 0) {
    return { value: '0', unit: '', formatted: '₹0' };
  }

  if (amount >= 10000000) {
    const value = (amount / 10000000).toFixed(2);
    return { value, unit: 'Cr', formatted: `₹${value} Cr` };
  } else if (amount >= 100000) {
    const value = (amount / 100000).toFixed(2);
    return { value, unit: 'L', formatted: `₹${value} L` };
  } else if (amount >= 1000) {
    const value = (amount / 1000).toFixed(2);
    return { value, unit: 'K', formatted: `₹${value} K` };
  }

  return { value: amount.toString(), unit: '', formatted: `₹${amount}` };
};

/**
 * Format number with Indian number system commas
 * @param {number} number - Number to format
 * @returns {string} - Formatted number with commas (e.g., 12,34,567)
 */
export const formatIndianNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  const numStr = Math.abs(number).toString();
  let result = '';

  // Handle decimal part
  const parts = numStr.split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Format integer part with Indian grouping
  if (integerPart.length > 3) {
    // Last 3 digits
    result = integerPart.slice(-3);
    integerPart = integerPart.slice(0, -3);

    // Remaining digits in groups of 2
    while (integerPart.length > 2) {
      result = integerPart.slice(-2) + ',' + result;
      integerPart = integerPart.slice(0, -2);
    }

    if (integerPart.length > 0) {
      result = integerPart + ',' + result;
    }
  } else {
    result = integerPart;
  }

  // Add decimal part if exists
  if (decimalPart) {
    result += '.' + decimalPart;
  }

  // Add negative sign if needed
  if (number < 0) {
    result = '-' + result;
  }

  return result;
};

/**
 * Format square feet display
 * @param {number} sqft - Square feet value
 * @returns {string} - Formatted string like "1,245 sq.ft"
 */
export const formatSqft = (sqft) => {
  if (!sqft || sqft <= 0) return '0 sq.ft';

  return `${formatIndianNumber(sqft)} sq.ft`;
};

/**
 * Format area in acres
 * @param {number} acres - Area in acres
 * @returns {string} - Formatted string
 */
export const formatAcres = (acres) => {
  if (!acres || acres <= 0) return '0 Acres';

  if (acres === 1) return '1 Acre';
  return `${acres} Acres`;
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as XXX XXX XXXX
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }

  // If has country code
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  return phone;
};

/**
 * Format phone number with country code
 * @param {string} phone - Phone number
 * @returns {string} - Phone number with +91
 */
export const formatPhoneWithCountryCode = (phone) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `+91 ${cleaned}`;
  }

  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+${cleaned}`;
  }

  return phone;
};

/**
 * Format distance display
 * @param {number} distance - Distance value
 * @param {string} unit - Unit (km, m, mins)
 * @returns {string} - Formatted distance
 */
export const formatDistance = (distance, unit = 'km') => {
  if (!distance || distance <= 0) return '0 ' + unit;

  if (unit === 'km' && distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance} ${unit}`;
};

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }

  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date to readable format
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} - Formatted date
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';

  const d = new Date(date);

  if (isNaN(d.getTime())) return '';

  const options = {
    short: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' },
    monthYear: { month: 'long', year: 'numeric' },
  };

  return d.toLocaleDateString('en-IN', options[format] || options.short);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} - Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format BHK type for display
 * @param {string} type - BHK type like "2 BHK" or "3 BHK 2T"
 * @returns {Object} - Parsed BHK info
 */
export const formatBHKType = (type) => {
  if (!type) return { bedrooms: 0, display: '' };

  const match = type.match(/(\d+\.?\d*)\s*BHK/i);
  const bedrooms = match ? parseFloat(match[1]) : 0;

  return {
    bedrooms,
    display: type,
    shortDisplay: `${bedrooms} BHK`,
  };
};

/**
 * Format price range display
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {string} - Formatted price range
 */
export const formatPriceRange = (min, max) => {
  if (!min && !max) return 'Price on Request';

  const minFormatted = formatAmountWithUnit(min);
  const maxFormatted = formatAmountWithUnit(max);

  if (min === max) {
    return minFormatted.formatted;
  }

  return `${minFormatted.formatted} - ${maxFormatted.formatted}`;
};

/**
 * Slugify text for URLs
 * @param {string} text - Text to slugify
 * @returns {string} - URL-safe slug
 */
export const slugify = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default {
  formatCurrency,
  formatIndianAmount,
  formatAmountWithUnit,
  formatIndianNumber,
  formatSqft,
  formatAcres,
  formatPhoneNumber,
  formatPhoneWithCountryCode,
  formatDistance,
  formatPercentage,
  formatDate,
  truncateText,
  capitalizeWords,
  formatBHKType,
  formatPriceRange,
  slugify,
};
