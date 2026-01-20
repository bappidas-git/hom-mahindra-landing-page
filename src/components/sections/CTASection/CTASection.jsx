/* ============================================
   CTASection Component - Nambiar District 25 Phase 2
   "Ready to Experience the SOHO Life?" call-to-action section
   Desktop-optimized with innovative split layout
   ============================================ */

import React from "react";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Button from "../../common/Button/Button";
import { useModal } from "../../../context/ModalContext";
import styles from "./CTASection.module.css";
import clubImage from "../../../assets/images/club-image/club-image.jpg";

const CTASection = () => {
  const { openLeadDrawer } = useModal();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleScheduleVisit = () => {
    openLeadDrawer("schedule-site-visit");
  };

  // Stats data for desktop showcase
  const stats = [
    { value: "25+", label: "Years Excellence", icon: "mdi:trophy-award" },
    { value: "750+", label: "Happy Families", icon: "mdi:home-heart" },
    { value: "15+", label: "Projects Delivered", icon: "mdi:office-building" },
  ];

  return (
    <section id="cta" className={styles.section}>
      {/* Background Pattern */}
      <div className={styles.bgPattern} />

      {/* Animated Background Elements */}
      <motion.div
        className={styles.floatingElement1}
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ color: "#FFFFFF26" }}
      >
        <Icon icon="mdi:home-variant" />
      </motion.div>

      <motion.div
        className={styles.floatingElement2}
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "1s", color: "#FFFFFF26" }}
      >
        <Icon icon="mdi:star-four-points" />
      </motion.div>

      <motion.div
        className={styles.floatingElement3}
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "2s", color: "#FFFFFF26" }}
      >
        <Icon icon="mdi:key-variant" />
      </motion.div>

      <motion.div
        className={styles.floatingElement4}
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "1.5s", color: "#FFFFFF26" }}
      >
        <Icon icon="mdi:diamond-stone" />
      </motion.div>

      <Container maxWidth="xl">
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Side - Visual Showcase (Desktop) */}
          <motion.div variants={itemVariants} className={styles.visualShowcase}>
            {/* Hero Image Card */}
            <div className={styles.imageCard}>
              <div className={styles.imageCardGlow} />
              <img
                src={clubImage}
                alt="SOHO Living at Nambiar District 25"
                className={styles.heroImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.imageLabel}>
                  <Icon icon="mdi:home-city" />
                  <span>Your Dream Home Awaits</span>
                </div>
              </div>
            </div>

            {/* Stats Cards - Desktop Only */}
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={styles.statCard}
                  variants={scaleVariants}
                  whileHover={{ scale: 1.03, y: -3 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.statIconWrapper}>
                    <Icon icon={stat.icon} className={styles.statIcon} />
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div
                    className={styles.statLabel}
                    style={{ color: "#0A1628B3" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div variants={itemVariants} className={styles.textContent}>
            <Typography
              variant="overline"
              className={styles.preTitle}
              sx={{ color: "#000" }}
            >
              Don't Miss This Opportunity
            </Typography>

            <Typography
              variant="h3"
              className={styles.title}
              sx={{ marginBottom: "15px;", marginTop: "15px" }}
            >
              Ready to Experience the{" "}
              <span className={styles.highlight}>SOHO Life?</span>
            </Typography>

            <Typography
              variant="body1"
              className={styles.description}
              sx={{ color: "#0A1628CC !important", marginBottom: "15px;" }}
            >
              Take the first step towards owning your dream home. Schedule a
              site visit today and discover the perfect blend of luxury,
              comfort, and convenience at Nambiar District 25 Phase 2.
            </Typography>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className={styles.ctaButtons}>
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <Button
                  variant="secondary"
                  size="large"
                  endIcon="mdi:arrow-right"
                  onClick={handleScheduleVisit}
                  className={styles.primaryBtn}
                >
                  Schedule a Site Visit
                </Button>
              </motion.div>

              <Button
                variant="dark"
                size="large"
                startIcon="mdi:phone-outline"
                href="tel:+919632367929"
                className={styles.secondaryBtn}
              >
                Call Now
              </Button>
            </motion.div>

            {/* Trust Indicators - Enhanced Cards */}
            <motion.div
              variants={itemVariants}
              className={styles.trustIndicators}
            >
              <motion.div
                className={styles.trustCard}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className={styles.trustIconWrapper}>
                  <Icon icon="mdi:shield-check" className={styles.trustIcon} />
                </div>
                <div className={styles.trustContent}>
                  <span className={styles.trustLabel}>RERA Registered</span>
                  <span
                    className={styles.trustSubtext}
                    style={{ color: "#0A162899" }}
                  >
                    Government Approved
                  </span>
                </div>
              </motion.div>

              <motion.div
                className={styles.trustCard}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className={styles.trustIconWrapper}>
                  <Icon icon="mdi:bank" className={styles.trustIcon} />
                </div>
                <div className={styles.trustContent}>
                  <span className={styles.trustLabel}>Bank Loan Approved</span>
                  <span
                    className={styles.trustSubtext}
                    style={{ color: "#0A162899" }}
                  >
                    Easy Financing
                  </span>
                </div>
              </motion.div>

              <motion.div
                className={styles.trustCard}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className={styles.trustIconWrapper}>
                  <Icon icon="mdi:account-group" className={styles.trustIcon} />
                </div>
                <div className={styles.trustContent}>
                  <span className={styles.trustLabel}>750+ Families</span>
                  <span
                    className={styles.trustSubtext}
                    style={{ color: "#0A162899" }}
                  >
                    Trust Nambiar
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile/Tablet Trust Indicators (Simple) */}
            <motion.div
              variants={itemVariants}
              className={styles.trustIndicatorsMobile}
            >
              <div className={styles.trustItem}>
                <Icon
                  icon="mdi:shield-check"
                  className={styles.trustItemIcon}
                />
                <span>RERA Registered</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <Icon icon="mdi:bank" className={styles.trustItemIcon} />
                <span>Bank Loan Approved</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <Icon
                  icon="mdi:account-group"
                  className={styles.trustItemIcon}
                />
                <span>750+ Happy Families</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative Elements */}
      <div className={styles.cornerDecoration1} />
      <div className={styles.cornerDecoration2} />
    </section>
  );
};

export default CTASection;
