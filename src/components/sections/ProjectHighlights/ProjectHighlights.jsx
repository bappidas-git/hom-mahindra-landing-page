/* ============================================
   ProjectHighlights Component - Nambiar District 25 Phase 2
   Project highlights with expand/collapse functionality
   ============================================ */

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Container, Typography, Grid, Button, useMediaQuery, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import { mainHighlights, additionalHighlights, projectKeyNumbers } from '../../../data/highlightsData';
import styles from './ProjectHighlights.module.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const expandVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    }
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  },
};

const expandCardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const keyNumberVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const ProjectHighlights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const { openLeadDrawer } = useModal();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleScheduleVisit = () => {
    openLeadDrawer('schedule-site-visit');
  };

  return (
    <section className={styles.highlightsSection} id="highlights" ref={ref}>
      {/* Background Pattern */}
      <div className={styles.patternBg} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={isMobile ? 3 : 5} alignItems="flex-start">
            {/* Left Side - Tower Image */}
            <Grid item xs={12} md={5} lg={4}>
              <motion.div variants={imageVariants} className={styles.imageWrapper}>
                <div className={styles.towerImageContainer}>
                  <img
                    src="https://placehold.co/600x800/1a1a1a/FFFFFF?text=Tower+B%26W+600x800"
                    alt="Nambiar District 25 Tower"
                    className={styles.towerImage}
                    loading="lazy"
                  />
                  {/* Acres Badge */}
                  <motion.div
                    className={styles.acresBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <span className={styles.acresValue}>100</span>
                    <span className={styles.acresLabel} style={{ color: '#FFFFFFE6' }}>Acres</span>
                  </motion.div>
                </div>
              </motion.div>
            </Grid>

            {/* Right Side - Content */}
            <Grid item xs={12} md={7} lg={8}>
              <motion.div variants={itemVariants} className={styles.contentWrapper}>
                {/* Section Title */}
                <Typography
                  variant="h2"
                  className={styles.sectionTitle}
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                    color: '#0A1628',
                    marginBottom: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  Project{' '}
                  <span className={styles.goldText}>Highlights</span>
                </Typography>

                {/* Main Highlights Grid */}
                <Grid container spacing={isMobile ? 1.5 : 2} className={styles.highlightsGrid}>
                  {mainHighlights.map((highlight, index) => (
                    <Grid item xs={6} key={highlight.id}>
                      <motion.div
                        className={styles.highlightCard}
                        custom={index}
                        variants={cardVariants}
                        whileHover={{
                          y: -4,
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                          transition: { duration: 0.25 }
                        }}
                      >
                        <div
                          className={styles.highlightIconWrapper}
                          style={{ backgroundColor: highlight.bgColor }}
                        >
                          <Icon
                            icon={highlight.icon}
                            className={styles.highlightIcon}
                            style={{ color: highlight.iconColor }}
                          />
                        </div>
                        <Typography className={styles.highlightTitle}>
                          {highlight.title}
                        </Typography>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                {/* Expand/Collapse Button */}
                <motion.div variants={itemVariants} className={styles.expandButtonWrapper}>
                  <Button
                    variant="contained"
                    onClick={handleToggleExpand}
                    className={styles.expandButton}
                    endIcon={
                      <Icon
                        icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                        className={styles.expandIcon}
                      />
                    }
                    sx={{
                      background: 'linear-gradient(135deg, #C9A227 0%, #E5C96E 100%)',
                      color: '#0A1628',
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', md: '0.9375rem' },
                      padding: { xs: '12px 24px', md: '14px 32px' },
                      borderRadius: '50px',
                      textTransform: 'none',
                      boxShadow: '0 4px 15px rgba(201, 162, 39, 0.3)',
                      width: '100%',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #E5C96E 0%, #C9A227 100%)',
                        boxShadow: '0 6px 20px rgba(201, 162, 39, 0.4)',
                      },
                    }}
                  >
                    {isExpanded ? 'Show Less' : 'View All Highlights'}
                  </Button>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={expandVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={styles.expandedContent}
                    >
                      <Grid container spacing={isMobile ? 1.5 : 2}>
                        {additionalHighlights.map((highlight, index) => (
                          <Grid item xs={6} key={highlight.id}>
                            <motion.div
                              className={styles.highlightCard}
                              variants={expandCardVariants}
                              whileHover={{
                                y: -4,
                                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                                transition: { duration: 0.25 }
                              }}
                            >
                              <div
                                className={styles.highlightIconWrapper}
                                style={{ backgroundColor: highlight.bgColor }}
                              >
                                <Icon
                                  icon={highlight.icon}
                                  className={styles.highlightIcon}
                                  style={{ color: highlight.iconColor }}
                                />
                              </div>
                              <Typography className={styles.highlightTitle}>
                                {highlight.title}
                              </Typography>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Schedule Site Visit Button */}
                <motion.div variants={itemVariants} className={styles.siteVisitButtonWrapper}>
                  <Button
                    variant="outlined"
                    onClick={handleScheduleVisit}
                    className={styles.siteVisitButton}
                    endIcon={<Icon icon="mdi:check" />}
                    sx={{
                      color: '#0A1628',
                      borderColor: '#0A1628',
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', md: '0.9375rem' },
                      padding: { xs: '12px 24px', md: '14px 32px' },
                      borderRadius: '50px',
                      textTransform: 'none',
                      borderWidth: '2px',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: '#0A1628',
                        color: '#FFFFFF',
                        borderColor: '#0A1628',
                        borderWidth: '2px',
                      },
                    }}
                  >
                    Schedule Site Visit
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>

          {/* Key Numbers Section */}
          <motion.div variants={itemVariants} className={styles.keyNumbersWrapper}>
            <Grid container spacing={isMobile ? 1.5 : 2}>
              {projectKeyNumbers.map((item, index) => (
                <Grid item xs={6} sm={3} key={item.id}>
                  <motion.div
                    className={styles.keyNumberCard}
                    custom={index}
                    variants={keyNumberVariants}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.25 }
                    }}
                    style={{
                      background: index === 2
                        ? 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
                        : 'linear-gradient(135deg, #FEF9E7 0%, #FCF3CF 100%)',
                    }}
                  >
                    <Typography
                      className={styles.keyNumberValue}
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </Typography>
                    <Typography className={styles.keyNumberLabel}>
                      {item.label}
                    </Typography>
                    <Typography className={styles.keyNumberSublabel}>
                      {item.sublabel}
                    </Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProjectHighlights;
