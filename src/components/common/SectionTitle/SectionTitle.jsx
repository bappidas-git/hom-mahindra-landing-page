/* ============================================
   SectionTitle Component - Nambiar District 25 Phase 2
   Reusable section title with badge and animations
   ============================================ */

import React from 'react';
import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

const SectionTitle = ({
  badge = null,
  title,
  highlight = null,
  subtitle = null,
  align = 'center', // left, center, right
  variant = 'light', // light, dark
  className = '',
  badgeVariant = 'dark', // dark, gold, outline
  showUnderline = true,
  ...props
}) => {

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const underlineVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' }
    }
  };

  // Build class names
  const classNames = [
    styles.sectionTitle,
    styles[align],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  // Render title with optional highlight
  const renderTitle = () => {
    if (!highlight) {
      return <span>{title}</span>;
    }

    // If title contains the highlight word, split and style it
    const parts = title.split(highlight);
    if (parts.length === 1) {
      // Highlight not found in title, render separately
      return (
        <>
          <span>{title}</span>{' '}
          <span className={styles.highlight}>{highlight}</span>
        </>
      );
    }

    // Highlight found in title
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < parts.length - 1 && (
              <span className={styles.highlight}>{highlight}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <motion.div
      className={classNames}
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      {...props}
    >
      {/* Badge */}
      {badge && (
        <motion.div variants={itemVariants}>
          <span className={`${styles.badge} ${styles[`badge${badgeVariant.charAt(0).toUpperCase() + badgeVariant.slice(1)}`]}`}>
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2 className={styles.title} variants={itemVariants}>
        {renderTitle()}
      </motion.h2>

      {/* Underline */}
      {showUnderline && (
        <motion.div
          className={styles.underline}
          variants={underlineVariants}
        />
      )}

      {/* Subtitle */}
      {subtitle && (
        <motion.p className={styles.subtitle} variants={itemVariants} style={variant === 'dark' ? { color: '#FFFFFFCC' } : undefined}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
