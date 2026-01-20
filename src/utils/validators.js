/* ============================================
   Validators - Nambiar District 25 Phase 2
   Form validation utilities
   ============================================ */

/**
 * Indian Mobile Number Validation
 * Valid Indian mobile numbers start with 6, 7, 8, or 9 followed by 9 digits
 * Total 10 digits
 */
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

/**
 * Email Validation Regex
 * Standard email validation pattern
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Name Validation Regex
 * Allows letters, spaces, and common name characters
 * Minimum 2 characters
 */
export const NAME_REGEX = /^[a-zA-Z\s.'-]{2,50}$/;

/**
 * Validate Indian Mobile Number
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} - True if valid
 */
export const validateIndianMobile = (mobile) => {
  if (!mobile) return false;
  // Remove any spaces or dashes
  const cleanedMobile = mobile.replace(/[\s-]/g, '');
  return INDIAN_MOBILE_REGEX.test(cleanedMobile);
};

/**
 * Validate Email Address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  if (!email) return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validate Name
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid
 */
export const validateName = (name) => {
  if (!name) return false;
  return NAME_REGEX.test(name.trim());
};

/**
 * Validate Message
 * @param {string} message - Message to validate
 * @param {number} minLength - Minimum length (default: 1)
 * @param {number} maxLength - Maximum length (default: 500)
 * @returns {boolean} - True if valid
 */
export const validateMessage = (message, minLength = 1, maxLength = 500) => {
  if (!message) return false;
  const trimmedMessage = message.trim();
  return trimmedMessage.length >= minLength && trimmedMessage.length <= maxLength;
};

/**
 * Get validation error message for mobile number
 * @param {string} mobile - Mobile number
 * @returns {string} - Error message or empty string
 */
export const getMobileErrorMessage = (mobile) => {
  if (!mobile) return 'Mobile number is required';

  const cleanedMobile = mobile.replace(/[\s-]/g, '');

  if (cleanedMobile.length < 10) {
    return 'Mobile number must be 10 digits';
  }

  if (cleanedMobile.length > 10) {
    return 'Mobile number cannot exceed 10 digits';
  }

  if (!/^[6-9]/.test(cleanedMobile)) {
    return 'Mobile number must start with 6, 7, 8, or 9';
  }

  if (!/^\d+$/.test(cleanedMobile)) {
    return 'Mobile number can only contain digits';
  }

  return '';
};

/**
 * Get validation error message for email
 * @param {string} email - Email address
 * @returns {string} - Error message or empty string
 */
export const getEmailErrorMessage = (email) => {
  if (!email) return 'Email is required';

  const trimmedEmail = email.trim();

  if (!trimmedEmail.includes('@')) {
    return 'Please enter a valid email address';
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return 'Please enter a valid email address';
  }

  return '';
};

/**
 * Get validation error message for name
 * @param {string} name - Name
 * @returns {string} - Error message or empty string
 */
export const getNameErrorMessage = (name) => {
  if (!name) return 'Name is required';

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return 'Name must be at least 2 characters';
  }

  if (trimmedName.length > 50) {
    return 'Name cannot exceed 50 characters';
  }

  if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
    return 'Name can only contain letters and spaces';
  }

  return '';
};

/**
 * Get validation error message for message
 * @param {string} message - Message content
 * @returns {string} - Error message or empty string
 */
export const getMessageErrorMessage = (message) => {
  if (!message) return 'Message is required';

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 1) {
    return 'Please enter a message';
  }

  if (trimmedMessage.length > 500) {
    return 'Message cannot exceed 500 characters';
  }

  return '';
};

/**
 * Validate entire lead form
 * @param {Object} formData - Form data object
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateLeadForm = (formData) => {
  const errors = {};

  const nameError = getNameErrorMessage(formData.name);
  if (nameError) errors.name = nameError;

  const mobileError = getMobileErrorMessage(formData.mobile);
  if (mobileError) errors.mobile = mobileError;

  const emailError = getEmailErrorMessage(formData.email);
  if (emailError) errors.email = emailError;

  const messageError = getMessageErrorMessage(formData.message);
  if (messageError) errors.message = messageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export default {
  INDIAN_MOBILE_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  validateIndianMobile,
  validateEmail,
  validateName,
  validateMessage,
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
  getMessageErrorMessage,
  validateLeadForm,
  formatPhoneNumber,
  sanitizeInput,
};
