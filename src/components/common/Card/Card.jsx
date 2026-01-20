/* ============================================
   Card Component - Nambiar District 25 Phase 2
   Reusable card with multiple variants and animations
   ============================================ */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import styles from './Card.module.css';

const Card = forwardRef(({
  children,
  variant = 'default', // default, elevated, outlined, flat, gradient, dark, feature, stat
  iconVariant = 'gold', // gold, green, purple, orange, pink, red, teal, blue
  icon = null,
  lottieAnimation = null,
  title = null,
  subtitle = null,
  value = null,
  label = null,
  hoverable = true,
  clickable = false,
  selected = false,
  className = '',
  onClick,
  animationDelay = 0,
  ...props
}, ref) => {

  // Animation variants
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: animationDelay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: hoverable ? {
      y: -8,
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
      transition: { duration: 0.3 }
    } : {},
    tap: clickable ? {
      scale: 0.98,
      transition: { duration: 0.1 }
    } : {}
  };

  // Build class names
  const classNames = [
    styles.card,
    styles[variant],
    hoverable ? styles.hoverable : '',
    clickable ? styles.clickable : '',
    selected ? styles.selected : '',
    className
  ].filter(Boolean).join(' ');

  // Render icon with colored background
  const renderIcon = () => {
    if (!icon && !lottieAnimation) return null;

    return (
      <div className={`${styles.iconWrapper} ${styles[`icon${iconVariant.charAt(0).toUpperCase() + iconVariant.slice(1)}`]}`}>
        {lottieAnimation ? (
          <div className={styles.lottieContainer}>
            {lottieAnimation}
          </div>
        ) : typeof icon === 'string' ? (
          <Icon icon={icon} className={styles.icon} />
        ) : (
          icon
        )}
      </div>
    );
  };

  // Render for stat cards
  if (variant === 'stat') {
    return (
      <motion.div
        ref={ref}
        className={classNames}
        variants={cardVariants}
        initial="initial"
        whileInView="animate"
        whileHover="hover"
        whileTap={clickable ? "tap" : undefined}
        viewport={{ once: true, margin: "-50px" }}
        onClick={clickable ? onClick : undefined}
        {...props}
      >
        {renderIcon()}
        <div className={styles.statContent}>
          {value && <div className={styles.statValue}>{value}</div>}
          {label && <div className={styles.statLabel}>{label}</div>}
        </div>
      </motion.div>
    );
  }

  // Render for feature cards (used in highlights section)
  if (variant === 'feature') {
    return (
      <motion.div
        ref={ref}
        className={classNames}
        variants={cardVariants}
        initial="initial"
        whileInView="animate"
        whileHover="hover"
        whileTap={clickable ? "tap" : undefined}
        viewport={{ once: true, margin: "-50px" }}
        onClick={clickable ? onClick : undefined}
        {...props}
      >
        {renderIcon()}
        <div className={styles.featureContent}>
          {title && <h4 className={styles.featureTitle}>{title}</h4>}
          {subtitle && <p className={styles.featureSubtitle} style={variant === 'dark' ? { color: '#FFFFFFCC' } : undefined}>{subtitle}</p>}
          {children}
        </div>
      </motion.div>
    );
  }

  // Render for highlight cards with centered icon
  if (variant === 'highlight') {
    return (
      <motion.div
        ref={ref}
        className={classNames}
        variants={cardVariants}
        initial="initial"
        whileInView="animate"
        whileHover="hover"
        whileTap={clickable ? "tap" : undefined}
        viewport={{ once: true, margin: "-50px" }}
        onClick={clickable ? onClick : undefined}
        {...props}
      >
        {renderIcon()}
        <div className={styles.highlightContent}>
          {title && <p className={styles.highlightTitle}>{title}</p>}
        </div>
      </motion.div>
    );
  }

  // Default card render
  return (
    <motion.div
      ref={ref}
      className={classNames}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      whileTap={clickable ? "tap" : undefined}
      viewport={{ once: true, margin: "-50px" }}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {icon && (
        <div className={styles.cardHeader}>
          {renderIcon()}
          {title && <h4 className={styles.cardTitle}>{title}</h4>}
        </div>
      )}
      {!icon && title && <h4 className={styles.cardTitle}>{title}</h4>}
      {subtitle && <p className={styles.cardSubtitle} style={variant === 'dark' ? { color: '#FFFFFFCC' } : undefined}>{subtitle}</p>}
      {children && <div className={styles.cardContent}>{children}</div>}
    </motion.div>
  );
});

Card.displayName = 'Card';

// Sub-component for card sections
export const CardHeader = ({ children, className = '' }) => (
  <div className={`${styles.cardHeader} ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`${styles.cardContent} ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`${styles.cardFooter} ${className}`}>{children}</div>
);

export const CardImage = ({ src, alt, className = '' }) => (
  <div className={`${styles.cardImageWrapper} ${className}`}>
    <img src={src} alt={alt} className={styles.cardImage} loading="lazy" />
  </div>
);

export default Card;
