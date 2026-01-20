/* ============================================
   EMICalculatorModal Component - Nambiar District 25 Phase 2
   Full-featured EMI calculator in a modal popup
   ============================================ */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  Slider,
  IconButton,
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  getEMIBreakdown,
  DEFAULT_EMI_CONFIG,
} from '../../../utils/emiCalculator';
import styles from './PricingSection.module.css';

const EMICalculatorModal = ({ isOpen, onClose, propertyPrice = 17000000, configType = '' }) => {
  // State for calculator values
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [interestRate, setInterestRate] = useState(DEFAULT_EMI_CONFIG.defaultInterestRate);
  const [tenure, setTenure] = useState(DEFAULT_EMI_CONFIG.defaultTenure);

  // Update loan amount when property price changes
  useEffect(() => {
    if (isOpen) {
      setLoanAmount(propertyPrice * 0.8);
    }
  }, [propertyPrice, isOpen]);

  // Calculate EMI breakdown
  const emiBreakdown = useMemo(() => {
    return getEMIBreakdown(loanAmount, interestRate, tenure);
  }, [loanAmount, interestRate, tenure]);

  // Format values for display
  const formatAmount = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Custom slider styles
  const sliderSx = {
    color: '#C9A227',
    height: 6,
    '& .MuiSlider-track': {
      border: 'none',
      background: 'linear-gradient(90deg, #C9A227 0%, #E5C96E 100%)',
    },
    '& .MuiSlider-rail': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '& .MuiSlider-thumb': {
      width: 20,
      height: 20,
      backgroundColor: '#C9A227',
      border: '3px solid #FFFFFF',
      boxShadow: '0 2px 8px rgba(201, 162, 39, 0.4)',
      '&:before': {
        boxShadow: 'none',
      },
      '&:hover, &.Mui-focusVisible': {
        boxShadow: '0 0 0 8px rgba(201, 162, 39, 0.16)',
      },
      '&.Mui-active': {
        boxShadow: '0 0 0 12px rgba(201, 162, 39, 0.16)',
      },
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: '#C9A227',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '0.75rem',
      fontWeight: 600,
    },
  };

  // Modal animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.emiModal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleSection}>
                <div className={styles.modalIconWrapper}>
                  <Icon icon="mdi:calculator-variant" />
                </div>
                <div>
                  <Typography className={styles.modalTitle}>
                    EMI Calculator
                  </Typography>
                  {configType && (
                    <Typography className={styles.modalSubtitle} sx={{ color: '#D9DCE0 !important' }}>
                      For {configType} - {formatAmount(propertyPrice)}
                    </Typography>
                  )}
                </div>
              </div>
              <IconButton
                className={styles.modalCloseBtn}
                onClick={onClose}
                aria-label="Close EMI Calculator"
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </div>

            {/* Modal Content */}
            <div className={styles.modalContent}>
              {/* Sliders Section */}
              <div className={styles.modalSliders}>
                {/* Loan Amount Slider */}
                <div className={styles.modalSliderGroup}>
                  <div className={styles.modalSliderHeader}>
                    <div className={styles.sliderLabelWithIcon}>
                      <Icon icon="mdi:bank-outline" />
                      <Typography className={styles.modalSliderLabel}>Loan Amount</Typography>
                    </div>
                    <Typography className={styles.modalSliderValue}>
                      {formatAmount(loanAmount)}
                    </Typography>
                  </div>
                  <Slider
                    value={loanAmount}
                    onChange={(e, newValue) => setLoanAmount(newValue)}
                    min={DEFAULT_EMI_CONFIG.minLoanAmount}
                    max={DEFAULT_EMI_CONFIG.maxLoanAmount}
                    step={100000}
                    sx={sliderSx}
                  />
                  <div className={styles.modalSliderRange}>
                    <span>₹50 L</span>
                    <span>₹5 Cr</span>
                  </div>
                </div>

                {/* Interest Rate Slider */}
                <div className={styles.modalSliderGroup}>
                  <div className={styles.modalSliderHeader}>
                    <div className={styles.sliderLabelWithIcon}>
                      <Icon icon="mdi:percent-outline" />
                      <Typography className={styles.modalSliderLabel}>Interest Rate</Typography>
                    </div>
                    <Typography className={styles.modalSliderValue}>
                      {interestRate.toFixed(1)}%
                    </Typography>
                  </div>
                  <Slider
                    value={interestRate}
                    onChange={(e, newValue) => setInterestRate(newValue)}
                    min={DEFAULT_EMI_CONFIG.minInterestRate}
                    max={DEFAULT_EMI_CONFIG.maxInterestRate}
                    step={0.1}
                    sx={sliderSx}
                  />
                  <div className={styles.modalSliderRange}>
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Loan Tenure Slider */}
                <div className={styles.modalSliderGroup}>
                  <div className={styles.modalSliderHeader}>
                    <div className={styles.sliderLabelWithIcon}>
                      <Icon icon="mdi:calendar-clock" />
                      <Typography className={styles.modalSliderLabel}>Loan Tenure</Typography>
                    </div>
                    <Typography className={styles.modalSliderValue}>
                      {tenure} Years
                    </Typography>
                  </div>
                  <Slider
                    value={tenure}
                    onChange={(e, newValue) => setTenure(newValue)}
                    min={DEFAULT_EMI_CONFIG.minTenure}
                    max={DEFAULT_EMI_CONFIG.maxTenure}
                    step={1}
                    sx={sliderSx}
                  />
                  <div className={styles.modalSliderRange}>
                    <span>5 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* EMI Results */}
              <motion.div
                className={styles.modalResults}
                key={`${loanAmount}-${interestRate}-${tenure}`}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Monthly EMI - Hero */}
                <div className={styles.modalEmiHero}>
                  <Typography className={styles.emiHeroLabel} sx={{ color: '#C8CBCF !important' }}>
                    Your Monthly EMI
                  </Typography>
                  <Typography className={styles.emiHeroValue}>
                    {formatAmount(emiBreakdown.monthlyEMI)}
                  </Typography>
                </div>

                {/* Breakdown Grid */}
                <div className={styles.modalBreakdownGrid}>
                  <div className={styles.modalBreakdownItem}>
                    <div className={styles.breakdownIconWrapper} style={{ backgroundColor: 'rgba(76, 175, 80, 0.15)' }}>
                      <Icon icon="mdi:cash-check" style={{ color: '#4CAF50' }} />
                    </div>
                    <div>
                      <Typography className={styles.breakdownItemLabel} sx={{ color: '#D9DCE0 !important' }}>Principal</Typography>
                      <Typography className={styles.breakdownItemValue}>
                        {formatAmount(emiBreakdown.principal)}
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.modalBreakdownItem}>
                    <div className={styles.breakdownIconWrapper} style={{ backgroundColor: 'rgba(244, 67, 54, 0.15)' }}>
                      <Icon icon="mdi:chart-line" style={{ color: '#F44336' }} />
                    </div>
                    <div>
                      <Typography className={styles.breakdownItemLabel} sx={{ color: '#D9DCE0 !important' }}>Total Interest</Typography>
                      <Typography className={styles.breakdownItemValue}>
                        {formatAmount(emiBreakdown.totalInterest)}
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.modalBreakdownItem}>
                    <div className={styles.breakdownIconWrapper} style={{ backgroundColor: 'rgba(201, 162, 39, 0.15)' }}>
                      <Icon icon="mdi:wallet-outline" style={{ color: '#C9A227' }} />
                    </div>
                    <div>
                      <Typography className={styles.breakdownItemLabel} sx={{ color: '#D9DCE0 !important' }}>Total Amount</Typography>
                      <Typography className={styles.breakdownItemValue} style={{ color: '#C9A227' }}>
                        {formatAmount(emiBreakdown.totalAmount)}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className={styles.modalNote}>
                  <Icon icon="mdi:information-outline" />
                  <Typography sx={{ color: '#C8CBCF !important' }}>
                    <strong>Note:</strong> This is an approximate calculation. Actual EMI may vary based on bank's terms and conditions.
                  </Typography>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EMICalculatorModal;
