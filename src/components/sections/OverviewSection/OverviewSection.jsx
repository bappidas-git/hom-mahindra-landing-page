/* ============================================
   OverviewSection Component - Nambiar District 25 Phase 2
   Compact, innovative overview with bento grid layout
   ============================================ */

import React, { useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useModal } from "../../../context/ModalContext";
import AnimatedCounter from "../../common/AnimatedCounter/AnimatedCounter";
import styles from "./OverviewSection.module.css";

// Import images
import overviewImage1 from "../../../assets/images/overview/overview-image-1.jpg";
import overviewImage2 from "../../../assets/images/overview/overview-image-2.jpg";
import overviewImage3 from "../../../assets/images/overview/overview-image-3.jpg";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Consolidated data - no repetition
const keyStats = [
  {
    value: "100",
    unit: "Acres",
    label: "Township",
    icon: "mdi:city-variant-outline",
    color: "#C9A227",
  },
  {
    value: "2.5L",
    unit: "Sq.Ft",
    label: "Clubhouse",
    icon: "mdi:home-city-outline",
    color: "#C9A227",
  },
  {
    value: "4000+",
    unit: "Trees",
    label: "Green Living",
    icon: "mdi:tree",
    color: "#4CAF50",
  },
  {
    value: "80%",
    unit: "Open",
    label: "Space",
    icon: "mdi:nature",
    color: "#4CAF50",
  },
];

const quickFeatures = [
  { icon: "mdi:account-group-outline", text: "700+ Happy Families" },
  { icon: "mdi:floor-plan", text: "4 Units/Floor" },
  { icon: "mdi:elevator-passenger-outline", text: "4 Elevators/Tower" },
  { icon: "mdi:panorama-horizontal-outline", text: "Panoramic Balconies" },
  { icon: "mdi:shield-check", text: "24/7 Security" },
  { icon: "mdi:compass-outline", text: "100% Vaastu" },
  { icon: "mdi:delete-outline", text: "Garbage Chute" },
  { icon: "mdi:home-variant-outline", text: "7 Config Types" },
];

const galleryImages = [
  { src: overviewImage1, alt: "Nambiar District 25 - Modern Living" },
  { src: overviewImage2, alt: "Nambiar District 25 - Premium Amenities" },
  { src: overviewImage3, alt: "Nambiar District 25 - Luxury Lifestyle" },
];

const OverviewSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { openLeadDrawer } = useModal();

  // Image carousel state
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(([prev]) => [(prev + 1) % galleryImages.length, 1]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleImageNav = useCallback((newIndex) => {
    setActiveIndex(([prev]) => [newIndex, newIndex > prev ? 1 : -1]);
  }, []);

  const handleScheduleVisit = () => {
    openLeadDrawer("schedule-site-visit");
  };

  return (
    <section className={styles.overviewSection} id="overview" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgGradient} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.mainWrapper}
        >
          {/* Section Header - Compact */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <span className={styles.badge}>PHASE 2 NOW LAUNCHING</span>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                color: "#0A1628",
              }}
            >
              Where Quality Meets{" "}
              <span className={styles.goldText}>Affordability</span>
            </Typography>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className={styles.bentoGrid}>
            {/* Image Gallery Card - Main Feature */}
            <motion.div
              variants={itemVariants}
              className={`${styles.bentoCard} ${styles.imageCard}`}
            >
              <div className={styles.imageGallery}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={galleryImages[activeIndex].src}
                    alt={galleryImages[activeIndex].alt}
                    className={styles.galleryImage}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Image Navigation Dots */}
                <div className={styles.imageDots}>
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      className={`${styles.dot} ${
                        idx === activeIndex ? styles.activeDot : ""
                      }`}
                      onClick={() => handleImageNav(idx)}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Floating Badge */}
                <motion.div
                  className={styles.floatingBadge}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className={styles.badgeValue}>100</span>
                  <span
                    className={styles.badgeLabel}
                    style={{ color: "#FFFFFFE6" }}
                  >
                    Acres
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className={`${styles.bentoCard} ${styles.statsCard}`}
            >
              <div className={styles.statsGrid}>
                {keyStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={styles.statItem}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={styles.statIcon}
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon icon={stat.icon} style={{ color: stat.color }} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>
                        <AnimatedCounter
                          value={stat.value}
                          duration={1.5}
                          delay={0.2 + index * 0.1}
                        />
                        <span className={styles.statUnit}>{stat.unit}</span>
                      </div>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Features Strip */}
            <motion.div
              variants={itemVariants}
              className={`${styles.bentoCard} ${styles.featuresCard}`}
            >
              <div className={styles.featuresScroll}>
                <div className={styles.featuresTrack}>
                  {[...quickFeatures, ...quickFeatures].map(
                    (feature, index) => (
                      <div key={index} className={styles.featureChip}>
                        <Icon
                          icon={feature.icon}
                          className={styles.featureIcon}
                        />
                        <span>{feature.text}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* CTA Card - Prominent */}
            <motion.div
              variants={itemVariants}
              className={`${styles.bentoCard} ${styles.ctaCard}`}
            >
              <div className={styles.ctaContent}>
                <div className={styles.ctaText}>
                  <Typography
                    className={styles.ctaTitle}
                    sx={{ color: "#ffffff !important;" }}
                  >
                    Experience Premium Living
                  </Typography>
                  <Typography
                    className={styles.ctaSubtitle}
                    sx={{ color: "#FFFFFFB3 !important" }}
                  >
                    Schedule a site visit today
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  onClick={handleScheduleVisit}
                  className={styles.ctaButton}
                  endIcon={<Icon icon="mdi:arrow-right" />}
                  sx={{
                    background:
                      "linear-gradient(135deg, #C9A227 0%, #E5C96E 100%)",
                    color: "#0A1628",
                    fontWeight: 700,
                    fontSize: { xs: "0.9375rem", md: "1rem" },
                    padding: { xs: "14px 28px", md: "16px 36px" },
                    borderRadius: "50px",
                    textTransform: "none",
                    boxShadow: "0 8px 30px rgba(201, 162, 39, 0.4)",
                    minWidth: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #E5C96E 0%, #C9A227 100%)",
                      boxShadow: "0 12px 40px rgba(201, 162, 39, 0.5)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Schedule Site Visit
                </Button>
              </div>

              {/* Decorative elements */}
              <div className={styles.ctaDecor}>
                <Icon icon="mdi:calendar-check" className={styles.decorIcon} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default OverviewSection;
