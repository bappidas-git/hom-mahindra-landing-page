/* ============================================
   AmenitiesSection Component - Nambiar District 25 Phase 2
   Compact amenities showcase with carousel and CTA
   ============================================ */

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container, Typography, Chip, useTheme, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useModal } from "../../../context/ModalContext";
import {
  amenitiesCategories,
  amenitiesStats,
  getFeaturedAmenities,
  getAmenitiesByCategory,
  amenitiesData,
} from "../../../data/amenitiesData";
import styles from "./AmenitiesSection.module.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const AmenitiesSection = () => {
  useTheme(); // Theme context for MUI components
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const { openLeadDrawer } = useModal();

  const handleScheduleVisit = () => {
    openLeadDrawer("schedule-site-visit");
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Scroll carousel to start when category changes
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Get filtered amenities based on category
  const getFilteredAmenities = () => {
    if (selectedCategory === "all") {
      return getFeaturedAmenities();
    }
    return getAmenitiesByCategory(selectedCategory);
  };

  const filteredAmenities = getFilteredAmenities();

  // Quick stats for the stats bar
  const quickStats = [
    {
      icon: "mdi:home-city-outline",
      value: amenitiesStats.clubhouseSize,
      label: "Clubhouse",
    },
    {
      icon: "mdi:map-marker-radius-outline",
      value: amenitiesStats.clubhouseAcres,
      label: "Green Space",
    },
    {
      icon: "mdi:view-grid-plus-outline",
      value: amenitiesStats.totalAmenities,
      label: "Amenities",
    },
    { icon: "mdi:trophy-outline", value: "15+", label: "Sports" },
  ];

  // Category pills with counts
  const categoryPills = [
    {
      id: "all",
      label: "Featured",
      icon: "mdi:star-outline",
      count: getFeaturedAmenities().length,
    },
    ...amenitiesCategories.map((cat) => ({
      id: cat.id,
      label: cat.title,
      icon: cat.icon,
      count: getAmenitiesByCategory(cat.id).length,
    })),
  ];

  return (
    <section className={styles.amenitiesSection} id="amenities" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Compact Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <div className={styles.headerTop}>
              <Chip
                label={`${amenitiesStats.totalAmenities} AMENITIES`}
                className={styles.amenitiesBadge}
                sx={{
                  backgroundColor: "rgba(201, 162, 39, 0.15)",
                  color: "#C9A227",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  height: "28px",
                  borderRadius: "14px",
                  border: "1px solid rgba(201, 162, 39, 0.3)",
                }}
              />
            </div>

            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                color: "#FFFFFF",
                marginTop: "0.75rem",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Everything You Need,{" "}
              <span className={styles.goldText}>Within Your Community</span>
            </Typography>
          </motion.div>

          {/* Quick Stats Bar - Compact Horizontal Layout */}
          <motion.div variants={itemVariants} className={styles.statsBar}>
            {quickStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statIconWrapper}>
                  <Icon icon={stat.icon} className={styles.statIcon} />
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Category Pills */}
          <motion.div variants={itemVariants} className={styles.categoryPills}>
            {categoryPills.map((pill) => (
              <button
                key={pill.id}
                className={`${styles.categoryPill} ${
                  selectedCategory === pill.id ? styles.activePill : ""
                }`}
                onClick={() => handleCategoryChange(pill.id)}
                style={{
                  color: selectedCategory === pill.id ? "#0A1628" : "#D9DCE0",
                }}
              >
                <Icon icon={pill.icon} className={styles.pillIcon} />
                <span className={styles.pillLabel} style={{ color: "inherit" }}>
                  {pill.label}
                </span>
                <span className={styles.pillCount} style={{ color: "inherit" }}>
                  {pill.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Amenities Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={styles.carouselWrapper}
            >
              <div className={styles.carouselContainer} ref={carouselRef}>
                {filteredAmenities.map((amenity, index) => (
                  <motion.div
                    key={amenity.id}
                    className={styles.amenityCard}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -8, scale: 1.02 }}
                    onMouseEnter={() => setHoveredCard(amenity.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={styles.amenityIconWrapper}
                      style={{ backgroundColor: `${amenity.iconColor}20` }}
                    >
                      <Icon
                        icon={amenity.icon}
                        className={styles.amenityIcon}
                        style={{ color: amenity.iconColor }}
                      />
                    </div>
                    <Typography
                      className={styles.amenityName}
                      sx={{ color: "#F2F3F4 !important" }}
                    >
                      {amenity.name}
                    </Typography>
                    {/* Show description on hover */}
                    <AnimatePresence>
                      {hoveredCard === amenity.id && (
                        <motion.p
                          className={styles.amenityDescription}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ color: "#D9DCE0" }}
                        >
                          {amenity.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* More Amenities Card in Carousel */}
                <motion.div
                  className={styles.moreCard}
                  custom={filteredAmenities.length}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={styles.moreIconWrapper}>
                    <Icon
                      icon="mdi:dots-horizontal-circle-outline"
                      className={styles.moreIcon}
                    />
                  </div>
                  <Typography className={styles.moreName}>
                    +
                    {parseInt(amenitiesStats.totalAmenities) -
                      amenitiesData.length}{" "}
                    More
                  </Typography>
                  <Typography className={styles.moreSubtext}>
                    Explore all amenities
                  </Typography>
                </motion.div>
              </div>

              {/* Scroll Indicators */}
              <div className={styles.scrollIndicator}>
                <Icon icon="mdi:gesture-swipe-horizontal" />
                <span style={{ color: "#B8BCC2" }}>Scroll to explore</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Row: Category Summary + CTA */}
          <motion.div variants={itemVariants} className={styles.bottomRow}>
            {/* Mini Category Cards */}
            <div className={styles.miniCategories}>
              {amenitiesCategories.map((category, index) => {
                const categoryAmenities = getAmenitiesByCategory(category.id);
                return (
                  <motion.div
                    key={category.id}
                    className={`${styles.miniCategoryCard} ${
                      selectedCategory === category.id
                        ? styles.activeCategory
                        : ""
                    }`}
                    custom={index}
                    variants={cardVariants}
                    onClick={() => handleCategoryChange(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.miniCategoryIcon}>
                      <Icon icon={category.icon} />
                    </div>
                    <div className={styles.miniCategoryContent}>
                      <span className={styles.miniCategoryTitle}>
                        {category.title}
                      </span>
                      <span className={styles.miniCategoryCount}>
                        {categoryAmenities.length}+ Amenities
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className={styles.ctaWrapper}>
              <Button
                variant="contained"
                className={styles.ctaButton}
                onClick={handleScheduleVisit}
                endIcon={<Icon icon="mdi:arrow-right" />}
                sx={{
                  background:
                    "linear-gradient(135deg, #C9A227 0%, #E5C96E 100%)",
                  color: "#0A1628",
                  fontWeight: 700,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  padding: { xs: "12px 24px", md: "14px 32px" },
                  borderRadius: "50px",
                  textTransform: "none",
                  boxShadow: "0 8px 32px rgba(201, 162, 39, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #E5C96E 0%, #C9A227 100%)",
                    boxShadow: "0 12px 40px rgba(201, 162, 39, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Schedule a Visit
              </Button>
              <Typography
                className={styles.ctaSubtext}
                sx={{ color: "#f5f5f5 !important;" }}
              >
                Experience our world-class amenities firsthand
              </Typography>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AmenitiesSection;
