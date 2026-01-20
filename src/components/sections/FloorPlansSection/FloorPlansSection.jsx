/* ============================================
   FloorPlansSection Component - Nambiar District 25 Phase 2
   Compact Showcase Layout - Floor plan selection
   ============================================ */

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Container,
  Typography,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { Icon } from "@iconify/react";
import {
  floorPlansData,
  floorPlanFilters,
  floorPlanHighlights,
} from "../../../data/floorPlansData";
import { useModal } from "../../../context/ModalContext";
import styles from "./FloorPlansSection.module.css";

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

const FloorPlansSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openLeadDrawer } = useModal();

  // State
  const [selectedPlanId, setSelectedPlanId] = useState(3); // Start with 3 BHK Classic (popular)
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get filtered floor plans
  const filteredPlans =
    selectedFilter === "all"
      ? floorPlansData
      : floorPlansData.filter((plan) => plan.type.includes(selectedFilter));

  // Get currently selected plan
  const selectedPlan =
    floorPlansData.find((p) => p.id === selectedPlanId) || floorPlansData[0];

  // Handle plan selection
  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  // Handle filter change
  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
    // Select first plan of the filtered type
    const filtered =
      filterValue === "all"
        ? floorPlansData
        : floorPlansData.filter((plan) => plan.type.includes(filterValue));
    if (filtered.length > 0) {
      setSelectedPlanId(filtered[0].id);
    }
  };

  // Handle view floor plan - opens lead drawer
  const handleViewPlan = () => {
    openLeadDrawer("view-plan", {
      subtitle: `For ${selectedPlan.type} - ${selectedPlan.sqft} sq.ft`,
    });
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle request callback
  const handleRequestCallback = (plan) => {
    openLeadDrawer("get-price-details", {
      subtitle: `For ${plan.type} - ${plan.sqft} sq.ft`,
    });
  };

  // Navigate to next/prev plan
  const navigatePlan = (direction) => {
    const currentIndex = filteredPlans.findIndex(
      (p) => p.id === selectedPlanId
    );
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredPlans.length;
    } else {
      newIndex =
        currentIndex === 0 ? filteredPlans.length - 1 : currentIndex - 1;
    }
    setSelectedPlanId(filteredPlans[newIndex].id);
  };

  return (
    <section className={styles.floorPlansSection} id="floor-plans" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header - Compact */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <div className={styles.headerTop}>
              <Chip
                label="FLOOR PLANS"
                className={styles.floorPlansBadge}
                sx={{
                  backgroundColor: "rgba(201, 162, 39, 0.15)",
                  color: "#C9A227",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  height: "28px",
                  borderRadius: "20px",
                  border: "1px solid rgba(201, 162, 39, 0.3)",
                }}
              />
              <Typography
                variant="h2"
                className={styles.sectionTitle}
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                  color: "#0A1628",
                  marginTop: "0.75rem",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                Choose Your{" "}
                <span className={styles.goldText}>Living Space</span>
              </Typography>
            </div>

            {/* Highlights Strip - Inline */}
            <div className={styles.highlightsStrip}>
              {floorPlanHighlights.map((highlight) => (
                <div key={highlight.id} className={styles.highlightItem}>
                  <Icon
                    icon={highlight.icon}
                    style={{ color: highlight.color }}
                  />
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Filter Pills */}
          <motion.div variants={itemVariants} className={styles.filterWrapper}>
            {floorPlanFilters.map((filter) => (
              <motion.button
                key={filter.id}
                className={`${styles.filterPill} ${
                  selectedFilter === filter.value ? styles.filterPillActive : ""
                }`}
                onClick={() => handleFilterChange(filter.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Showcase Area */}
          <motion.div
            variants={itemVariants}
            className={styles.showcaseContainer}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlan.id}
                className={styles.showcaseCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Left: Floor Plan Image */}
                <div className={styles.showcaseImageSection}>
                  {/* Badges */}
                  {selectedPlan.isPopular && (
                    <div className={styles.popularBadge}>
                      <Icon icon="mdi:star" />
                      <span>Popular</span>
                    </div>
                  )}
                  {selectedPlan.isLimited && (
                    <div className={styles.limitedBadge}>
                      <Icon icon="mdi:clock-outline" />
                      <span>Limited Units</span>
                    </div>
                  )}

                  <div
                    className={styles.showcaseImageWrapper}
                    onClick={handleViewPlan}
                  >
                    <img
                      src={selectedPlan.image}
                      alt={`${selectedPlan.name} Floor Plan`}
                      className={styles.showcaseImage}
                    />
                    {/* Blur overlay with preview label - always visible */}
                    <div className={styles.blurOverlay}>
                      <div
                        className={styles.previewLabel}
                        style={{ color: "#FFFFFFE6" }}
                      >
                        <Icon icon="mdi:floor-plan" />
                        <span>Click to View Full Plan</span>
                      </div>
                    </div>
                    {/* Hover overlay with CTA button */}
                    <div className={styles.imageOverlay}>
                      <div className={styles.viewPlanBtn}>
                        <Icon icon="mdi:magnify-plus-outline" />
                        <span>View Full Plan</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    className={`${styles.navArrow} ${styles.navArrowLeft}`}
                    onClick={() => navigatePlan("prev")}
                    aria-label="Previous plan"
                  >
                    <Icon icon="mdi:chevron-left" />
                  </button>
                  <button
                    className={`${styles.navArrow} ${styles.navArrowRight}`}
                    onClick={() => navigatePlan("next")}
                    aria-label="Next plan"
                  >
                    <Icon icon="mdi:chevron-right" />
                  </button>
                </div>

                {/* Right: Plan Details */}
                <div className={styles.showcaseDetails}>
                  <div className={styles.detailsHeader}>
                    <div>
                      <Typography className={styles.planType}>
                        {selectedPlan.type}
                      </Typography>
                      <Typography className={styles.planName}>
                        {selectedPlan.name}
                      </Typography>
                    </div>
                    <div className={styles.priceTag}>
                      <span className={styles.priceLabel}>Starting</span>
                      <span className={styles.priceValue}>
                        ₹{selectedPlan.price}*
                      </span>
                    </div>
                  </div>

                  {/* Quick Specs */}
                  <div className={styles.quickSpecs}>
                    <div className={styles.specItem}>
                      <Icon icon="mdi:bed-outline" />
                      <div className={styles.specContent}>
                        <span className={styles.specValue}>
                          {selectedPlan.bedrooms}
                        </span>
                        <span className={styles.specLabel}>Beds</span>
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <Icon icon="mdi:shower" />
                      <div className={styles.specContent}>
                        <span className={styles.specValue}>
                          {selectedPlan.bathrooms}
                        </span>
                        <span className={styles.specLabel}>Baths</span>
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <Icon icon="mdi:balcony" />
                      <div className={styles.specContent}>
                        <span className={styles.specValue}>
                          {selectedPlan.balconies}
                        </span>
                        <span className={styles.specLabel}>Balconies</span>
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <Icon icon="mdi:arrow-expand" />
                      <div className={styles.specContent}>
                        <span className={styles.specValue}>
                          {selectedPlan.sqft}
                        </span>
                        <span className={styles.specLabel}>Sq.ft</span>
                      </div>
                    </div>
                  </div>

                  {/* Area Details */}
                  {/* <div className={styles.areaDetails}>
                    <div className={styles.areaRow}>
                      <span>Carpet Area</span>
                      <span>{selectedPlan.carpetArea}</span>
                    </div>
                    <div className={styles.areaRow}>
                      <span>Super Built-up</span>
                      <span>{selectedPlan.superBuiltUpArea}</span>
                    </div>
                  </div> */}

                  {/* Features */}
                  <div className={styles.featuresList}>
                    {selectedPlan.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className={styles.featureItem}>
                        <Icon icon="mdi:check-circle" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className={styles.ctaButtons}>
                    <motion.button
                      className={styles.primaryBtn}
                      onClick={() => handleRequestCallback(selectedPlan)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon="mdi:phone-in-talk" />
                      <span>Get Price Details</span>
                    </motion.button>
                    <motion.button
                      className={styles.secondaryBtn}
                      onClick={handleViewPlan}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon="mdi:floor-plan" />
                      <span>View Plan</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Thumbnail Selector Strip */}
          <motion.div variants={itemVariants} className={styles.thumbnailStrip}>
            <div className={styles.thumbnailScroller}>
              {filteredPlans.map((plan) => (
                <motion.button
                  key={plan.id}
                  className={`${styles.thumbnailCard} ${
                    plan.id === selectedPlanId ? styles.thumbnailActive : ""
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.thumbnailInfo}>
                    <span className={styles.thumbnailType}>{plan.type}</span>
                    <span className={styles.thumbnailSqft}>
                      {plan.sqft} sq.ft
                    </span>
                  </div>
                  <div className={styles.thumbnailPrice}>₹{plan.price}</div>
                  {plan.isPopular && (
                    <div className={styles.thumbnailBadge}>
                      <Icon icon="mdi:star" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Compact CTA */}
          <motion.div variants={itemVariants} className={styles.compactCta}>
            <div className={styles.ctaContent}>
              <Icon icon="mdi:headset" className={styles.ctaIcon} />
              <div className={styles.ctaText}>
                <span className={styles.ctaTitle}>
                  Need help choosing the right floor plan?
                </span>
                <span
                  className={styles.ctaSubtitle}
                  style={{ color: "#FFFFFF99" }}
                >
                  Our experts are here to guide you
                </span>
              </div>
            </div>
            <motion.button
              className={styles.ctaBtn}
              onClick={() => openLeadDrawer("request-callback")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon icon="mdi:phone" />
              <span>Request Callback</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Floor Plan Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        className={styles.planModal}
        PaperProps={{
          sx: {
            borderRadius: { xs: "16px", md: "24px" },
            maxHeight: "90vh",
            margin: { xs: "16px", md: "32px" },
          },
        }}
      >
        {selectedPlan && (
          <DialogContent className={styles.modalContent}>
            {/* Close Button */}
            <IconButton
              className={styles.modalClose}
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#FFFFFF",
                zIndex: 10,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <Icon icon="mdi:close" />
            </IconButton>

            <Grid container spacing={3}>
              {/* Floor Plan Image */}
              <Grid item xs={12} md={7}>
                <div className={styles.modalImageWrapper}>
                  <img
                    src={selectedPlan.image}
                    alt={`${selectedPlan.name} Floor Plan`}
                    className={styles.modalImage}
                  />
                </div>
              </Grid>

              {/* Floor Plan Details */}
              <Grid item xs={12} md={5}>
                <div className={styles.modalDetails}>
                  <Typography className={styles.modalType}>
                    {selectedPlan.type}
                  </Typography>
                  <Typography className={styles.modalName}>
                    {selectedPlan.name}
                  </Typography>
                  <Typography className={styles.modalDesc}>
                    {selectedPlan.description}
                  </Typography>

                  {/* Specs Grid */}
                  <div className={styles.modalSpecs}>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:bed-outline" />
                      <span className={styles.modalSpecValue}>
                        {selectedPlan.bedrooms}
                      </span>
                      <span className={styles.modalSpecLabel}>Bedrooms</span>
                    </div>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:shower" />
                      <span className={styles.modalSpecValue}>
                        {selectedPlan.bathrooms}
                      </span>
                      <span className={styles.modalSpecLabel}>Bathrooms</span>
                    </div>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:balcony" />
                      <span className={styles.modalSpecValue}>
                        {selectedPlan.balconies}
                      </span>
                      <span className={styles.modalSpecLabel}>Balconies</span>
                    </div>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:arrow-expand" />
                      <span className={styles.modalSpecValue}>
                        {selectedPlan.sqft}
                      </span>
                      <span className={styles.modalSpecLabel}>Sq.ft</span>
                    </div>
                  </div>

                  {/* Area Details */}
                  <div className={styles.modalAreaDetails}>
                    <div className={styles.modalAreaRow}>
                      <span>Carpet Area</span>
                      <span>{selectedPlan.carpetArea}</span>
                    </div>
                    <div className={styles.modalAreaRow}>
                      <span>Built-up Area</span>
                      <span>{selectedPlan.builtUpArea}</span>
                    </div>
                    <div className={styles.modalAreaRow}>
                      <span>Super Built-up</span>
                      <span>{selectedPlan.superBuiltUpArea}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className={styles.modalPrice}>
                    <span className={styles.modalPriceLabel}>
                      Starting from
                    </span>
                    <span className={styles.modalPriceValue}>
                      ₹{selectedPlan.price}*
                    </span>
                  </div>

                  {/* Features */}
                  <div className={styles.modalFeatures}>
                    <Typography className={styles.featuresTitle}>
                      Key Features
                    </Typography>
                    <div className={styles.modalFeaturesList}>
                      {selectedPlan.features.map((feature, idx) => (
                        <div key={idx} className={styles.modalFeatureItem}>
                          <Icon icon="mdi:check-circle" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className={styles.modalActions}>
                    <motion.button
                      className={styles.modalPrimaryBtn}
                      onClick={() => handleRequestCallback(selectedPlan)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon="mdi:phone-in-talk" />
                      <span>Request Callback</span>
                    </motion.button>
                    <motion.button
                      className={styles.modalSecondaryBtn}
                      onClick={() =>
                        openLeadDrawer("download-brochure", {
                          subtitle: `${selectedPlan.type} - ${selectedPlan.sqft} sq.ft`,
                        })
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon="mdi:download" />
                      <span>Download Brochure</span>
                    </motion.button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default FloorPlansSection;
