/* ============================================
   EMICalculator Component - Nambiar District 25 Phase 2
   Compact interactive EMI calculator
   ============================================ */

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Slider,
  Chip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  getEMIBreakdown,
  DEFAULT_EMI_CONFIG,
} from '../../../utils/emiCalculator';
import styles from './PricingSection.module.css';

const EMICalculator = ({ propertyPrice = 17000000 }) => {
  // State for calculator values
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [interestRate, setInterestRate] = useState(DEFAULT_EMI_CONFIG.defaultInterestRate);
  const [tenure, setTenure] = useState(DEFAULT_EMI_CONFIG.defaultTenure);

  // Update loan amount when property price changes
  useEffect(() => {
    setLoanAmount(propertyPrice * 0.8);
  }, [propertyPrice]);

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

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Custom slider styles - compact
  const sliderSx = {
    color: '#C9A227',
    height: 5,
    '& .MuiSlider-track': {
      border: 'none',
      background: 'linear-gradient(90deg, #C9A227 0%, #E5C96E 100%)',
    },
    '& .MuiSlider-rail': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '& .MuiSlider-thumb': {
      width: 18,
      height: 18,
      backgroundColor: '#C9A227',
      border: '2px solid #FFFFFF',
      boxShadow: '0 2px 6px rgba(201, 162, 39, 0.4)',
      '&:before': {
        boxShadow: 'none',
      },
      '&:hover, &.Mui-focusVisible': {
        boxShadow: '0 0 0 6px rgba(201, 162, 39, 0.16)',
      },
      '&.Mui-active': {
        boxShadow: '0 0 0 10px rgba(201, 162, 39, 0.16)',
      },
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: '#C9A227',
      borderRadius: '6px',
      padding: '3px 6px',
      fontSize: '0.6875rem',
      fontWeight: 600,
    },
  };

  return (
    <motion.div
      className={styles.emiCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Badge */}
      <Chip
        icon={<Icon icon="mdi:calculator-variant" />}
        label="EMI Calculator"
        className={styles.emiBadge}
        sx={{
          backgroundColor: 'rgba(201, 162, 39, 0.15)',
          color: '#C9A227',
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '32px',
          borderRadius: '16px',
          border: '1px solid rgba(201, 162, 39, 0.3)',
          '& .MuiChip-icon': {
            color: '#C9A227',
            fontSize: '16px',
          },
        }}
      />

      {/* Title */}
      <Typography className={styles.emiTitle}>
        Calculate Monthly EMI
      </Typography>

      {/* Sliders Section - Compact */}
      <div className={styles.emiSliders}>
        {/* Loan Amount Slider */}
        <div className={styles.sliderGroup}>
          <div className={styles.sliderHeader}>
            <Typography className={styles.sliderLabel}>Loan Amount</Typography>
            <Typography className={styles.sliderValue}>
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
          <div className={styles.sliderRange}>
            <span>₹0.5 Cr</span>
            <span>₹5 Cr</span>
          </div>
        </div>

        {/* Interest Rate Slider */}
        <div className={styles.sliderGroup}>
          <div className={styles.sliderHeader}>
            <Typography className={styles.sliderLabel}>Interest Rate</Typography>
            <Typography className={styles.sliderValue}>
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
          <div className={styles.sliderRange}>
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Loan Tenure Slider */}
        <div className={styles.sliderGroup}>
          <div className={styles.sliderHeader}>
            <Typography className={styles.sliderLabel}>Loan Tenure</Typography>
            <Typography className={styles.sliderValue}>
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
          <div className={styles.sliderRange}>
            <span>5 Years</span>
            <span>30 Years</span>
          </div>
        </div>
      </div>

      {/* EMI Results Card - Compact */}
      <motion.div
        className={styles.emiResults}
        variants={resultVariants}
        initial="hidden"
        animate="visible"
        key={`${loanAmount}-${interestRate}-${tenure}`}
      >
        {/* Monthly EMI */}
        <div className={styles.emiMain}>
          <Typography className={styles.emiMainLabel}>
            MONTHLY EMI
          </Typography>
          <Typography className={styles.emiMainValue}>
            {formatAmount(emiBreakdown.monthlyEMI)}
          </Typography>
        </div>

        {/* Breakdown - Compact */}
        <div className={styles.emiBreakdown}>
          <div className={styles.emiBreakdownItem}>
            <Typography className={styles.breakdownLabel}>Principal</Typography>
            <Typography className={styles.breakdownValue}>
              {formatAmount(emiBreakdown.principal)}
            </Typography>
          </div>

          <div className={styles.emiBreakdownItem}>
            <Typography className={styles.breakdownLabel}>Interest</Typography>
            <Typography className={styles.breakdownValue}>
              {formatAmount(emiBreakdown.totalInterest)}
            </Typography>
          </div>

          <div className={`${styles.emiBreakdownItem} ${styles.totalRow}`}>
            <Typography className={styles.breakdownLabelTotal}>Total Amount</Typography>
            <Typography className={styles.breakdownValueTotal}>
              {formatAmount(emiBreakdown.totalAmount)}
            </Typography>
          </div>
        </div>

        {/* Note - Compact */}
        <div className={styles.emiNote}>
          <Icon icon="mdi:information-outline" />
          <Typography>
            <strong>Note:</strong> Approximate calculation. Actual EMI may vary.
          </Typography>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EMICalculator;
