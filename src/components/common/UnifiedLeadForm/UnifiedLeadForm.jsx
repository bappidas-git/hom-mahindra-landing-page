/* ============================================
   UnifiedLeadForm Component
   Single reusable lead capture form with:
   - Duplicate prevention
   - Trust badges
   - Consent text
   - Redirect to Thank You page
   - Customizable title, subtitle, and phone CTA
   ============================================ */

import React, { useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import Button from "../Button/Button";
import {
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
  getMessageErrorMessage,
} from "../../../utils/validators";
import styles from "./UnifiedLeadForm.module.css";

// Local storage key for leads
const LEADS_STORAGE_KEY = "nambiar_submitted_leads";

// Initial form state
const initialFormState = {
  name: "",
  mobile: "",
  email: "",
  message: "",
};

// Initial error state
const initialErrorState = {
  name: "",
  mobile: "",
  email: "",
  message: "",
};

// Privacy Policy Content Component
const PrivacyPolicyContent = () => (
  <div style={{ padding: "0 8px" }}>
    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#0A1628",
        }}
      >
        Introduction
      </h3>
      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
        H.O.M Advisory ("we," "our," or "us") respects your privacy and is
        committed to protecting your personal data. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        visit our website or engage with our services as authorized marketing
        partners for Nambiar Builders.
      </p>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#0A1628",
        }}
      >
        Information We Collect
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        We may collect the following types of information:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and other contact details you provide when filling out inquiry
          forms or contacting us.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Property Preferences:</strong> Information about your property
          preferences, budget, and requirements shared during consultations.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Usage Data:</strong> Information about how you interact with
          our website, including pages visited, time spent, and navigation
          patterns.
        </li>
        <li>
          <strong>Device Information:</strong> IP address, browser type,
          operating system, and device identifiers for analytics and security
          purposes.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#0A1628",
        }}
      >
        How We Use Your Information
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        We use the collected information for the following purposes:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          To respond to your inquiries and provide property information
        </li>
        <li style={{ marginBottom: "6px" }}>
          To schedule site visits and property viewings
        </li>
        <li style={{ marginBottom: "6px" }}>
          To send relevant property updates and promotional communications (with
          your consent)
        </li>
        <li style={{ marginBottom: "6px" }}>
          To improve our website and services based on user feedback
        </li>
        <li>
          To comply with legal obligations and protect our legitimate business
          interests
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#0A1628",
        }}
      >
        Information Sharing
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        We may share your information with:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          <strong>Nambiar Builders:</strong> As authorized marketing partners,
          we share inquiry details with the developer for processing your
          property interests.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Service Providers:</strong> Third-party vendors who assist us
          with website hosting, analytics, and communication services.
        </li>
        <li>
          <strong>Legal Requirements:</strong> When required by law, court
          order, or governmental regulations.
        </li>
      </ul>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginTop: "8px",
        }}
      >
        We do not sell your personal information to third parties.
      </p>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#0A1628",
        }}
      >
        Data Security
      </h3>
      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
        We implement appropriate technical and organizational measures to
        protect your personal information against unauthorized access,
        alteration, disclosure, or destruction. However, no method of
        transmission over the internet is 100% secure, and we cannot guarantee
        absolute security.
      </p>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#0A1628",
        }}
      >
        Your Rights
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        You have the right to:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          Access and request a copy of your personal data
        </li>
        <li style={{ marginBottom: "6px" }}>
          Correct any inaccurate or incomplete information
        </li>
        <li style={{ marginBottom: "6px" }}>
          Request deletion of your personal data (subject to legal obligations)
        </li>
        <li style={{ marginBottom: "6px" }}>
          Opt-out of marketing communications at any time
        </li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#0A1628",
        }}
      >
        Contact Us
      </h3>
      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </p>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginTop: "8px",
        }}
      >
        <strong>H.O.M Advisory</strong>
        <br />
        Email: sales@nambiardistrict25.com
        <br />
        Phone: +91-9632367929
      </p>
    </section>

    <p style={{ fontSize: "12px", color: "#6B7280", fontStyle: "italic" }}>
      Last Updated: January 2026
    </p>
  </div>
);

// Privacy Policy Modal Component
const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (typeof window === "undefined") return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "16px",
          }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #E5E7EB",
                backgroundColor: "#F9FAFB",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  margin: 0,
                  color: "#0A1628",
                }}
              >
                Privacy Policy
              </h2>
              <IconButton
                onClick={onClose}
                aria-label="Close modal"
                size="small"
                sx={{ color: "#6B7280" }}
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </div>
            <div
              style={{
                padding: "20px",
                overflowY: "auto",
                maxHeight: "calc(80vh - 60px)",
              }}
            >
              <PrivacyPolicyContent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const UnifiedLeadForm = ({
  variant = "default", // 'default', 'dark', 'hero', 'drawer'
  title = "Book A Site Visit",
  subtitle = "Fill in your details and our experts will get in touch with you",
  submitButtonText = "Submit Enquiry",
  showTitle = true,
  showSubtitle = true,
  showMessage = true,
  showTrustBadges = true,
  showConsent = true,
  showPhoneButton = false,
  onClose, // Called when drawer should close (for drawer variant)
  onSubmitSuccess,
  className = "",
  formId = "unified-lead-form",
}) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Refs for input focus management
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // Check if lead already exists in localStorage
  const checkDuplicateLead = useCallback((email, mobile) => {
    try {
      const storedLeads = JSON.parse(
        localStorage.getItem(LEADS_STORAGE_KEY) || "[]"
      );
      return storedLeads.some(
        (lead) =>
          lead.email.toLowerCase() === email.toLowerCase() ||
          lead.mobile === mobile
      );
    } catch {
      return false;
    }
  }, []);

  // Save lead to localStorage
  const saveLeadToStorage = useCallback((leadData) => {
    try {
      const storedLeads = JSON.parse(
        localStorage.getItem(LEADS_STORAGE_KEY) || "[]"
      );
      storedLeads.push({
        email: leadData.email,
        mobile: leadData.mobile,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(storedLeads));
    } catch (error) {
      console.error("Error saving lead to storage:", error);
    }
  }, []);

  // Handle input change
  const handleChange = useCallback(
    (field) => (event) => {
      let value = event.target.value;

      // Special handling for mobile number - only allow digits
      if (field === "mobile") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [errors]
  );

  // Handle input blur - validate on blur
  const handleBlur = useCallback(
    (field) => () => {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));

      // Validate the field
      let errorMessage = "";

      switch (field) {
        case "name":
          errorMessage = getNameErrorMessage(formData.name);
          break;
        case "mobile":
          errorMessage = getMobileErrorMessage(formData.mobile);
          break;
        case "email":
          errorMessage = getEmailErrorMessage(formData.email);
          break;
        case "message":
          if (showMessage && formData.message) {
            errorMessage = getMessageErrorMessage(formData.message);
          }
          break;
        default:
          break;
      }

      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage,
      }));
    },
    [formData, showMessage]
  );

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      message:
        showMessage && formData.message
          ? getMessageErrorMessage(formData.message)
          : "",
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      message: true,
    });

    return Object.values(newErrors).every((error) => !error);
  }, [formData, showMessage]);

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
      } else if (showMessage && (errors.message || !formData.message)) {
        messageRef.current?.focus();
      }
      return;
    }

    // Check for duplicate lead
    if (checkDuplicateLead(formData.email, formData.mobile)) {
      // Close drawer first if it exists
      if (onClose) {
        onClose();
      }

      await Swal.fire({
        icon: "info",
        title: "Already Registered!",
        html: `
          <p style="margin-bottom: 12px;">You have already submitted an enquiry with this email or mobile number.</p>
          <p style="color: #666; font-size: 14px;">Our team will contact you soon. For immediate assistance, please call us.</p>
        `,
        confirmButtonColor: "#C9A227",
        confirmButtonText: "Got it!",
        showCancelButton: true,
        cancelButtonText: "Call Now",
        cancelButtonColor: "#0A1628",
        customClass: {
          popup: styles.swalPopup,
        },
      }).then((result) => {
        if (!result.isConfirmed && result.dismiss === "cancel") {
          window.location.href = "tel:+919632367929";
        }
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save lead to localStorage
      saveLeadToStorage(formData);

      // Set lead submitted flag for thank you page access
      sessionStorage.setItem("lead_submitted", "true");
      sessionStorage.setItem("lead_name", formData.name);

      // Reset form
      setFormData(initialFormState);
      setTouched({});
      setErrors(initialErrorState);

      // Close drawer first if it exists
      if (onClose) {
        onClose();
      }

      // Show success message with SweetAlert2
      await Swal.fire({
        icon: "success",
        title: "Thank You!",
        html: `
          <p style="margin-bottom: 8px;">Your enquiry has been submitted successfully.</p>
          <p style="font-size: 14px; color: #666;">Redirecting you to more information...</p>
        `,
        confirmButtonColor: "#C9A227",
        confirmButtonText: "Continue",
        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
        customClass: {
          popup: styles.swalPopup,
        },
      });

      // Callback for parent component
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }

      // Navigate to thank you page
      navigate("/thank-you");
    } catch (error) {
      // Close drawer first if it exists
      if (onClose) {
        onClose();
      }

      // Show error message with SweetAlert2
      await Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#C9A227",
        confirmButtonText: "Try Again",
        customClass: {
          popup: styles.swalPopup,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.3 },
    }),
  };

  // Determine styles based on variant
  const getVariantClass = () => {
    switch (variant) {
      case "dark":
        return styles.variantDark;
      case "hero":
        return styles.variantHero;
      case "drawer":
        return styles.variantDrawer;
      default:
        return styles.variantDefault;
    }
  };

  return (
    <div
      className={`${styles.formContainer} ${getVariantClass()} ${className}`}
    >
      {/* Form Header */}
      {(showTitle || showSubtitle) && (
        <div className={styles.formHeader}>
          {showTitle && (
            <Typography variant="h5" className={styles.formTitle}>
              {title}
            </Typography>
          )}
          {showSubtitle && subtitle && (
            <Typography
              variant="body2"
              className={styles.formSubtitle}
              sx={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFFB3 !important" }
                  : undefined
              }
            >
              {subtitle}
            </Typography>
          )}
        </div>
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
        <motion.div
          custom={0}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <TextField
            inputRef={nameRef}
            fullWidth
            placeholder="Your Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="mdi:account-outline"
                    className={styles.inputIcon}
                    style={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFF80" }
                        : undefined
                    }
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "aria-label": "Your name",
              maxLength: 50,
            }}
          />
        </motion.div>

        {/* Mobile Field */}
        <motion.div
          custom={1}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <TextField
            inputRef={mobileRef}
            fullWidth
            placeholder="Mobile Number"
            variant="outlined"
            value={formData.mobile}
            onChange={handleChange("mobile")}
            onBlur={handleBlur("mobile")}
            error={touched.mobile && !!errors.mobile}
            helperText={touched.mobile && errors.mobile}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={styles.mobilePrefix}
                >
                  <Typography
                    variant="body2"
                    className={styles.countryCode}
                    sx={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFFCC !important" }
                        : undefined
                    }
                  >
                    +91
                  </Typography>
                  <span
                    className={styles.prefixDivider}
                    style={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFF4D" }
                        : undefined
                    }
                  >
                    -
                  </span>
                </InputAdornment>
              ),
            }}
            inputProps={{
              "aria-label": "Mobile number",
              maxLength: 10,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          custom={2}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <TextField
            inputRef={emailRef}
            fullWidth
            placeholder="Email Address"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="mdi:email-outline"
                    className={styles.inputIcon}
                    style={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFF80" }
                        : undefined
                    }
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "aria-label": "Email address",
            }}
          />
        </motion.div>

        {/* Message Field */}
        {showMessage && (
          <motion.div
            custom={3}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <TextField
              inputRef={messageRef}
              fullWidth
              placeholder="Message (Optional)"
              variant="outlined"
              multiline
              rows={3}
              value={formData.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
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
                      icon="mdi:message-outline"
                      className={styles.inputIcon}
                      style={
                        variant === "dark" || variant === "drawer"
                          ? { color: "#FFFFFF80" }
                          : undefined
                      }
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                "aria-label": "Your message",
                maxLength: 500,
              }}
            />
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          custom={showMessage ? 4 : 3}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className={styles.submitWrapper}
        >
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
              <>
                <Icon icon="mdi:send" className={styles.submitIcon} />
                <span>{submitButtonText}</span>
              </>
            )}
          </Button>
        </motion.div>

        {/* Trust Badges */}
        {showTrustBadges && (
          <motion.div
            custom={showMessage ? 5 : 4}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className={styles.trustBadges}
          >
            <div
              className={styles.trustBadge}
              style={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99" }
                  : undefined
              }
            >
              <Icon icon="mdi:shield-check" className={styles.trustIcon} />
              <span>100% Secure</span>
            </div>
            <div
              className={styles.trustBadge}
              style={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99" }
                  : undefined
              }
            >
              <Icon icon="mdi:phone-in-talk" className={styles.trustIcon} />
              <span>Quick Response</span>
            </div>
            <div
              className={styles.trustBadge}
              style={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99" }
                  : undefined
              }
            >
              <Icon icon="mdi:lock" className={styles.trustIcon} />
              <span>Privacy Protected</span>
            </div>
          </motion.div>
        )}

        {/* Consent Text */}
        {showConsent && (
          <motion.div
            custom={showMessage ? 6 : 5}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="caption"
              className={styles.consentText}
              sx={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99 !important" }
                  : undefined
              }
            >
              By submitting, you agree to our{" "}
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className={styles.privacyLink}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Privacy Policy
              </button>{" "}
              and consent to receive communications about Nambiar District 25.
            </Typography>
          </motion.div>
        )}
      </form>

      {/* Phone Button */}
      {showPhoneButton && (
        <div className={styles.phoneSection}>
          <Typography
            className={styles.orText}
            sx={{ color: "#FFFFFF80 !important" }}
          >
            Or call us directly
          </Typography>
          <a href="tel:+919632367929" className={styles.phoneLink}>
            <Icon icon="mdi:phone" />
            <span>+91-9632367929</span>
          </a>
        </div>
      )}

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default UnifiedLeadForm;
