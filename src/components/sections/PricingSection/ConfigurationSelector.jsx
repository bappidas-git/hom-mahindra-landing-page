/* ============================================
   ConfigurationSelector Component - Nambiar District 25 Phase 2
   Full-width horizontal layout with innovative UX
   ============================================ */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { configurationsData } from '../../../data/configurationsData';
import styles from './PricingSection.module.css';

const ConfigurationSelector = ({ selectedConfig, onConfigChange, onViewDetails, onOpenEMI }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentConfig = configurationsData.find(c => c.id === selectedConfig) || configurationsData[0];

  const handleChange = (event) => {
    onConfigChange(event.target.value);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={styles.fullWidthConfigCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Section - Selector */}
      <div className={styles.configLeftSection}>
        {/* Header Badge */}
        <Chip
          icon={<Icon icon="mdi:home-outline" />}
          label="Select Configuration"
          className={styles.configBadge}
          sx={{
            backgroundColor: '#C9A227',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.7rem',
            height: '28px',
            borderRadius: '14px',
            '& .MuiChip-icon': {
              color: '#FFFFFF',
              fontSize: '14px',
            },
          }}
        />

        {/* Dropdown Label */}
        <Typography className={styles.dropdownLabel} sx={{ color: '#E6E8EA !important' }}>
          Choose Your Apartment Type
        </Typography>

        {/* Configuration Dropdown */}
        <FormControl fullWidth className={styles.configDropdown}>
          <Select
            value={selectedConfig}
            onChange={handleChange}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            displayEmpty
            IconComponent={() => (
              <Icon
                icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                className={styles.dropdownIcon}
              />
            )}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#0A1628',
                  border: '1px solid rgba(201, 162, 39, 0.3)',
                  borderRadius: '10px',
                  marginTop: '4px',
                  maxHeight: '280px',
                  '& .MuiMenuItem-root': {
                    padding: '10px 14px',
                    fontSize: '0.875rem',
                    color: '#FFFFFF',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(201, 162, 39, 0.15)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(201, 162, 39, 0.25)',
                      '&:hover': {
                        backgroundColor: 'rgba(201, 162, 39, 0.35)',
                      },
                    },
                  },
                },
              },
            }}
            sx={{
              backgroundColor: 'linear-gradient(135deg, #E8D5A3 0%, #D4C085 100%)',
              background: 'linear-gradient(135deg, #E8D5A3 0%, #D4C085 100%)',
              borderRadius: '10px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: '2px solid #C9A227',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '2px solid #E5C96E',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px solid #C9A227',
              },
              '& .MuiSelect-select': {
                padding: '10px 14px',
                color: '#0A1628',
                fontWeight: 600,
                fontSize: '0.875rem',
              },
            }}
          >
            {configurationsData.map((config) => (
              <MenuItem key={config.id} value={config.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, width: '100%' }}>
                  <span style={{ fontWeight: 600 }}>{config.type}</span>
                  <span style={{ color: '#C9A227', fontSize: '0.75rem' }}>•</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8125rem' }}>{config.sqft} sq.ft</span>
                  <span style={{ marginLeft: 'auto', color: '#C9A227', fontWeight: 600, fontSize: '0.8125rem' }}>
                    ₹{config.priceDisplay} {config.priceUnit}*
                  </span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Center Section - Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedConfig}
          className={styles.configCenterSection}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Config Type and Specs */}
          <div className={styles.configMainInfo}>
            <Typography className={styles.configTypeMain}>
              {currentConfig.type}
            </Typography>
            <div className={styles.configSpecsRow}>
              <span className={styles.specItem}>
                <Icon icon="mdi:bed-outline" />
                {currentConfig.bedrooms} Beds
              </span>
              <span className={styles.specDivider}>|</span>
              <span className={styles.specItem}>
                <Icon icon="mdi:shower" />
                {currentConfig.bathrooms} Baths
              </span>
              <span className={styles.specDivider}>|</span>
              <span className={styles.specItem}>
                <Icon icon="mdi:arrow-expand" />
                {currentConfig.sqft} sq.ft
              </span>
            </div>
          </div>

          {/* Price Display */}
          <div className={styles.configPriceMain}>
            <Typography className={styles.priceLabelMain} sx={{ color: '#D9DCE0 !important' }}>Starting from</Typography>
            <Typography className={styles.priceValueMain}>
              ₹{currentConfig.priceDisplay} {currentConfig.priceUnit}*
            </Typography>
          </div>

          {/* Features Row */}
          <div className={styles.configFeaturesRow}>
            {currentConfig.features.slice(0, 4).map((feature, index) => (
              <motion.span
                key={feature}
                className={styles.featureTag}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ color: '#D9DCE0' }}
              >
                <Icon icon="mdi:check-circle" />
                {feature}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Section - CTAs */}
      <div className={styles.configRightSection}>
        {/* View Details Button */}
        <motion.button
          className={styles.viewDetailsBtnCompact}
          onClick={onViewDetails}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon icon="mdi:floor-plan" />
          <span>View Pricing</span>
        </motion.button>

        {/* EMI Calculator Button */}
        <motion.button
          className={styles.emiCalcBtn}
          onClick={onOpenEMI}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon icon="mdi:calculator-variant" />
          <span>Calculate EMI</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ConfigurationSelector;
