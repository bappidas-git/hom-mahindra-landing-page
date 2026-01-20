/* ============================================
   Button Component - Nambiar District 25 Phase 2
   Reusable button with multiple variants and animations
   ============================================ */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import styles from './Button.module.css';

const Button = forwardRef(({
  children,
  variant = 'primary', // primary, secondary, outline, dark, ghost, text
  size = 'medium', // small, medium, large
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon = null,
  endIcon = null,
  iconOnly = false,
  className = '',
  onClick,
  type = 'button',
  href = null,
  target = null,
  rel = null,
  ariaLabel = null,
  ...props
}, ref) => {

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Build class names
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    loading ? styles.loading : '',
    iconOnly ? styles.iconOnly : '',
    className
  ].filter(Boolean).join(' ');

  // Render loading spinner
  const renderLoader = () => (
    <CircularProgress
      size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
      className={styles.loader}
      thickness={4}
    />
  );

  // Render icon
  const renderIcon = (icon, position) => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return (
        <Icon
          icon={icon}
          className={`${styles.icon} ${styles[`icon${position.charAt(0).toUpperCase() + position.slice(1)}`]}`}
        />
      );
    }

    return (
      <span className={`${styles.icon} ${styles[`icon${position.charAt(0).toUpperCase() + position.slice(1)}`]}`}>
        {icon}
      </span>
    );
  };

  // Button content
  const buttonContent = (
    <>
      {loading && renderLoader()}
      {!loading && startIcon && renderIcon(startIcon, 'start')}
      {!iconOnly && (
        <span className={styles.label}>
          {children}
        </span>
      )}
      {iconOnly && !loading && children}
      {!loading && endIcon && renderIcon(endIcon, 'end')}
    </>
  );

  // Common props
  const commonProps = {
    ref,
    className: classNames,
    disabled: disabled || loading,
    onClick: disabled || loading ? undefined : onClick,
    'aria-label': ariaLabel,
    'aria-disabled': disabled || loading,
    ...props
  };

  // Render as link if href provided
  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        variants={buttonVariants}
        initial="initial"
        whileHover={!disabled && !loading ? "hover" : undefined}
        whileTap={!disabled && !loading ? "tap" : undefined}
        {...commonProps}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      {...commonProps}
    >
      {buttonContent}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
