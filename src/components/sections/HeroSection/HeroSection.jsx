/* ============================================
   HeroSection Component - Nambiar District 25 Phase 2
   Premium real estate hero section with animations
   ============================================ */

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Chip, useMediaQuery, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import Lottie from 'lottie-react';
import UnifiedLeadForm from '../../common/UnifiedLeadForm/UnifiedLeadForm';
import styles from './HeroSection.module.css';

// Import lottie animations
import buildingAnimation from '../../../assets/lottie/building-animation.json';

// Import hero images
import heroBuildingImg from '../../../assets/images/hero/hero-building.jpg';
import heroMobileImg from '../../../assets/images/hero/hero-mobile.jpg';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

// Hero info cards data
const heroInfoCards = [
  {
    icon: 'mdi:office-building-outline',
    value: '2, 3 & 4 BHK',
    label: 'Premium Apartments',
    color: '#C9A227',
    bgColor: 'rgba(201, 162, 39, 0.15)',
  },
  {
    icon: 'mdi:currency-inr',
    value: '₹1.24 Cr*',
    label: 'Starting Price',
    color: '#C9A227',
    bgColor: 'rgba(201, 162, 39, 0.15)',
  },
  {
    icon: 'mdi:view-grid-outline',
    value: '7 Acre',
    label: '74+ Amenities',
    color: '#2196F3',
    bgColor: 'rgba(33, 150, 243, 0.15)',
  },
  {
    icon: 'mdi:train',
    value: '600m',
    label: 'Upcoming Metro',
    color: '#C9A227',
    bgColor: 'rgba(201, 162, 39, 0.15)',
  },
];

// Trust badges data
const trustBadges = [
  { icon: 'mdi:shield-check-outline', text: 'RERA Registered' },
  { icon: 'mdi:account-group', text: '750+ Happy Families' },
  { icon: 'mdi:trophy-outline', text: 'Award Winning' },
];

// Quick features
const quickFeatures = [
  { text: 'Ready to Move', icon: 'mdi:check-circle' },
  { text: 'Bank Loan Available', icon: 'mdi:bank' },
  { text: 'Premium Location', icon: 'mdi:map-marker' },
];

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <section className={styles.heroSection} id="home">
      {/* Background Image with Overlay */}
      <div className={styles.heroBg}>
        <img
          src={isMobile ? heroMobileImg : heroBuildingImg}
          alt="District 25 Building"
          className={styles.heroImage}
          loading="eager"
        />
        <div className={styles.heroOverlay} />
      </div>

      {/* Animated Background Pattern */}
      <div className={styles.patternOverlay} />

      {/* Main Content */}
      <Container maxWidth="xl" className={styles.heroContainer}>
        <Grid container spacing={isMobile ? 3 : 6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={7} lg={6}>
            <motion.div
              className={styles.heroContent}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Launch Badge */}
              <motion.div variants={badgeVariants}>
                <Chip
                  icon={<span className={styles.pulseDot} />}
                  label="LAUNCHING PHASE 2"
                  className={styles.launchBadge}
                  sx={{
                    backgroundColor: '#C9A227',
                    color: '#0A1628',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    height: '36px',
                    borderRadius: '20px',
                    '& .MuiChip-icon': {
                      marginLeft: '8px',
                    },
                  }}
                />
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  className={styles.heroTitle}
                  sx={{
                    color: '#FFFFFF',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: 1.1,
                    marginTop: '1.5rem',
                  }}
                >
                  THE SOHO LIFE
                  <span className={styles.goldText}> RETURNS</span>
                </Typography>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  className={styles.heroSubtitle}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontWeight: 400,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    marginTop: '1rem',
                    maxWidth: '500px',
                  }}
                >
                  Live The Soho Life at Bengaluru's Finest Integrated Township
                </Typography>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={itemVariants} className={styles.trustBadges}>
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={index}
                    className={styles.trustBadge}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon={badge.icon} className={styles.badgeIcon} />
                    <span>{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Info Cards Grid */}
              <motion.div variants={itemVariants} className={styles.infoCardsWrapper}>
                <div className={styles.infoCardsGrid}>
                  {heroInfoCards.map((card, index) => (
                    <motion.div
                      key={index}
                      className={styles.infoCard}
                      custom={index}
                      variants={cardVariants}
                      whileHover={{
                        y: -5,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div
                        className={styles.infoCardIcon}
                        style={{ backgroundColor: card.bgColor }}
                      >
                        <Icon icon={card.icon} style={{ color: card.color, fontSize: '24px' }} />
                      </div>
                      <div className={styles.infoCardContent}>
                        <span className={styles.infoCardValue}>{card.value}</span>
                        <span className={styles.infoCardLabel} style={{ color: '#FFFFFFD9' }}>{card.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Features */}
              <motion.div variants={itemVariants} className={styles.quickFeatures}>
                {quickFeatures.map((feature, index) => (
                  <div key={index} className={styles.quickFeature} style={{ color: '#FFFFFFE6' }}>
                    <Icon icon={feature.icon} className={styles.featureIcon} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Content - Lead Form */}
          <Grid item xs={12} md={5} lg={6}>
            <motion.div
              className={styles.formWrapper}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            >
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontFamily: "'Playfair Display', serif",
                      textAlign: 'center',
                    }}
                  >
                    Book A Site Visit
                  </Typography>
                </div>
                <div className={styles.formBody}>
                  <UnifiedLeadForm
                    variant="hero"
                    showTitle={false}
                    showSubtitle={false}
                    showMessage={true}
                    showTrustBadges={true}
                    showConsent={true}
                    showPhoneButton={false}
                    submitButtonText="Submit Enquiry"
                    formId="hero-form"
                  />
                </div>
              </div>

              {/* Lottie Animation - Desktop Only */}
              {!isMobile && (
                <motion.div
                  className={styles.lottieWrapper}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Lottie
                    animationData={buildingAnimation}
                    loop={true}
                    className={styles.lottieAnimation}
                  />
                </motion.div>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon icon="mdi:chevron-double-down" className={styles.scrollIcon} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
