/* ============================================
   LeadForm Component
   Reusable lead capture form with validation
   ============================================ */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  Collapse,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import Button from '../Button/Button';
import {
  validateIndianMobile,
  validateEmail,
  validateName,
  validateMessage,
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
  getMessageErrorMessage,
} from '../../../utils/validators';
import styles from './LeadForm.module.css';

// Initial form state
const initialFormState = {
  name: '',
  mobile: '',
  email: '',
  message: '',
};

// Initial error state
const initialErrorState = {
  name: '',
  mobile: '',
  email: '',
  message: '',
};

const LeadForm = ({
  variant = 'default', // 'default', 'compact', 'dark', 'card'
  title = 'Book A Site Visit',
  subtitle = '',
  submitButtonText = 'Submit',
  showTitle = true,
  onSubmitSuccess,
  onSubmitError,
  className = '',
  formId = 'lead-form',
}) => {
  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Refs for input focus management
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // Reset submit status after delay
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Handle input change
  const handleChange = useCallback((field) => (event) => {
    let value = event.target.value;

    // Special handling for mobile number - only allow digits
    if (field === 'mobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  }, [errors]);

  // Handle input blur - validate on blur
  const handleBlur = useCallback((field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Validate the field
    let errorMessage = '';

    switch (field) {
      case 'name':
        errorMessage = getNameErrorMessage(formData.name);
        break;
      case 'mobile':
        errorMessage = getMobileErrorMessage(formData.mobile);
        break;
      case 'email':
        errorMessage = getEmailErrorMessage(formData.email);
        break;
      case 'message':
        errorMessage = getMessageErrorMessage(formData.message);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  }, [formData]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      message: getMessageErrorMessage(formData.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      message: true,
    });

    return Object.values(newErrors).every((error) => !error);
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Focus first field with error
      if (errors.name || !formData.name) {
        nameRef.current?.focus();
      } else if (errors.mobile || !formData.mobile) {
        mobileRef.current?.focus();
      } else if (errors.email || !formData.email) {
        emailRef.current?.focus();
      } else if (errors.message || !formData.message) {
        messageRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success handling
      setSubmitStatus('success');
      setFormData(initialFormState);
      setTouched({});

      // Show success message with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Our team will contact you within 24 hours.',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Great!',
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: styles.swalPopup,
          title: styles.swalTitle,
          content: styles.swalContent,
          confirmButton: styles.swalButton,
        },
      });

      // Callback for parent component
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    } catch (error) {
      setSubmitStatus('error');

      // Show error message with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Try Again',
        customClass: {
          popup: styles.swalPopup,
          title: styles.swalTitle,
          content: styles.swalContent,
          confirmButton: styles.swalButton,
        },
      });

      // Callback for parent component
      if (onSubmitError) {
        onSubmitError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  // Determine styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return styles.variantDark;
      case 'compact':
        return styles.variantCompact;
      case 'card':
        return styles.variantCard;
      default:
        return styles.variantDefault;
    }
  };

  return (
    <motion.div
      className={`${styles.formContainer} ${getVariantStyles()} ${className}`}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Form Title */}
      {showTitle && (
        <Box className={styles.formHeader}>
          <Typography variant="h5" className={styles.formTitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" className={styles.formSubtitle} sx={variant === 'dark' ? { color: '#FFFFFFB3 !important' } : undefined}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Form */}
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        {/* Name Field */}
        <motion.div variants={fieldVariants}>
          <TextField
            inputRef={nameRef}
            fullWidth
            placeholder="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="ic:outline-person"
                    className={styles.inputIcon}
                    style={variant === 'dark' ? { color: '#FFFFFF99' } : undefined}
                  />
                </InputAdornment>
              ),
              classes: {
                root: styles.inputRoot,
                focused: styles.inputFocused,
                error: styles.inputError,
              },
            }}
            inputProps={{
              'aria-label': 'Your name',
              maxLength: 50,
            }}
          />
        </motion.div>

        {/* Mobile Field */}
        <motion.div variants={fieldVariants}>
          <TextField
            inputRef={mobileRef}
            fullWidth
            placeholder="Mobile"
            variant="outlined"
            value={formData.mobile}
            onChange={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            error={touched.mobile && !!errors.mobile}
            helperText={touched.mobile && errors.mobile}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className={styles.mobilePrefix}>
                  <Typography variant="body2" className={styles.countryCode} sx={variant === 'dark' ? { color: '#FFFFFFCC !important' } : undefined}>
                    +91
                  </Typography>
                  <span className={styles.prefixDivider} style={variant === 'dark' ? { color: '#FFFFFF66' } : undefined}>-</span>
                </InputAdornment>
              ),
              classes: {
                root: styles.inputRoot,
                focused: styles.inputFocused,
                error: styles.inputError,
              },
            }}
            inputProps={{
              'aria-label': 'Mobile number',
              maxLength: 10,
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={fieldVariants}>
          <TextField
            inputRef={emailRef}
            fullWidth
            placeholder="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="ic:outline-email"
                    className={styles.inputIcon}
                    style={variant === 'dark' ? { color: '#FFFFFF99' } : undefined}
                  />
                </InputAdornment>
              ),
              classes: {
                root: styles.inputRoot,
                focused: styles.inputFocused,
                error: styles.inputError,
              },
            }}
            inputProps={{
              'aria-label': 'Email address',
            }}
          />
        </motion.div>

        {/* Message Field */}
        <motion.div variants={fieldVariants}>
          <TextField
            inputRef={messageRef}
            fullWidth
            placeholder="Message"
            variant="outlined"
            multiline
            rows={3}
            value={formData.message}
            onChange={handleChange('message')}
            onBlur={handleBlur('message')}
            error={touched.message && !!errors.message}
            helperText={touched.message && errors.message}
            disabled={isSubmitting}
            className={`${styles.textField} ${styles.messageField}`}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={styles.messageAdornment}
                >
                  <Icon
                    icon="ic:outline-message"
                    className={styles.inputIcon}
                    style={variant === 'dark' ? { color: '#FFFFFF99' } : undefined}
                  />
                </InputAdornment>
              ),
              classes: {
                root: styles.inputRoot,
                focused: styles.inputFocused,
                error: styles.inputError,
              },
            }}
            inputProps={{
              'aria-label': 'Your message',
              maxLength: 500,
            }}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={fieldVariants} className={styles.submitWrapper}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <Box className={styles.loadingState}>
                <CircularProgress size={20} color="inherit" />
                <span>Submitting...</span>
              </Box>
            ) : (
              submitButtonText
            )}
          </Button>
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Collapse in={!!submitStatus}>
                <Alert
                  severity={submitStatus}
                  className={styles.statusAlert}
                  onClose={() => setSubmitStatus(null)}
                >
                  {submitStatus === 'success'
                    ? 'Your enquiry has been submitted successfully!'
                    : 'Failed to submit. Please try again.'}
                </Alert>
              </Collapse>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default LeadForm;
