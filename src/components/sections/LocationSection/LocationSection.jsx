/* ============================================
   LocationSection Component - Nambiar District 25 Phase 2
   Location advantages and map integration section
   ============================================ */

import React, { useState, useMemo } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Player } from "@lottiefiles/react-lottie-player";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import Button from "../../common/Button/Button";
import { useModal } from "../../../context/ModalContext";
import {
  projectLocation,
  locationCategories,
  nearbyLandmarks,
  connectivityHighlights,
  getLandmarksByCategory,
} from "../../../data/locationData";
import locationPinAnimation from "../../../assets/lottie/location-pin.json";
import interactiveMapImage from "../../../assets/images/map/interactive-map.jpg";
import styles from "./LocationSection.module.css";

const LocationSection = () => {
  const { openLeadDrawer } = useModal();
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter landmarks based on active category
  const filteredLandmarks = useMemo(() => {
    if (activeCategory === "all") {
      return nearbyLandmarks.filter((landmark) => landmark.featured);
    }
    return getLandmarksByCategory(activeCategory);
  }, [activeCategory]);

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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 40px rgba(10, 22, 40, 0.15)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const handleScheduleVisit = () => {
    openLeadDrawer("schedule-site-visit");
  };

  const handleViewOnMap = () => {
    openLeadDrawer("view-map", {
      subtitle: `View ${projectLocation.name} on Google Maps`,
    });
  };

  return (
    <section id="location" className={styles.section}>
      <Container maxWidth="xl">
        {/* Section Title */}
        <SectionTitle
          badge="LOCATION"
          title="Bangalore's Most"
          highlight="Promising Location"
          subtitle="Strategically located in North Bangalore with excellent connectivity to IT hubs, schools, hospitals, and entertainment zones."
          align="center"
          variant="dark"
          badgeVariant="gold"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={4} className={styles.mainContent}>
            {/* Map Section */}
            <Grid item xs={12} lg={7}>
              <motion.div variants={itemVariants} className={styles.mapWrapper}>
                {/* Map Container */}
                <div className={styles.mapContainer}>
                  {/* Google Maps Embed Placeholder - Replace with actual embed */}
                  <div className={styles.mapPlaceholder}>
                    <img
                      src={interactiveMapImage}
                      alt="Nambiar District 25 Phase 2 Location Map"
                      className={styles.mapImage}
                      loading="lazy"
                    />
                    <div className={styles.mapOverlay}>
                      <Player
                        autoplay
                        loop
                        src={locationPinAnimation}
                        className={styles.locationPin}
                      />
                      <Typography
                        variant="h6"
                        className={styles.mapTitle}
                        sx={{ color: "#ffffff !important;" }}
                      >
                        {projectLocation.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={styles.mapAddress}
                        sx={{ color: "#ffffff !important;" }}
                      >
                        {projectLocation.address}
                      </Typography>
                      <Button
                        variant="primary"
                        size="small"
                        startIcon="mdi:map-marker"
                        onClick={handleViewOnMap}
                        className={styles.mapButton}
                      >
                        View on Google Maps
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Connectivity Highlights */}
                <div className={styles.connectivityBar}>
                  {connectivityHighlights
                    .slice(0, 3)
                    .map((highlight, index) => (
                      <motion.div
                        key={highlight.id}
                        className={`${styles.connectivityItem} ${
                          highlight.highlight ? styles.highlighted : ""
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={styles.connectivityIcon}
                          style={{
                            backgroundColor: `${highlight.iconColor}20`,
                            color: highlight.iconColor,
                          }}
                        >
                          <Icon icon={highlight.icon} />
                        </div>
                        <div className={styles.connectivityText}>
                          <Typography
                            variant="subtitle2"
                            className={styles.connectivityTitle}
                          >
                            {highlight.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            className={styles.connectivityDesc}
                            sx={{ color: "#D9DCE0 !important" }}
                          >
                            {highlight.description}
                          </Typography>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </Grid>

            {/* Landmarks Section */}
            <Grid item xs={12} lg={5}>
              <motion.div
                variants={itemVariants}
                className={styles.landmarksWrapper}
              >
                <div className={styles.landmarksHeader}>
                  <Typography
                    variant="h5"
                    className={styles.landmarksTitle}
                    sx={{ marginBottom: "20px;" }}
                  >
                    Nearby <span className={styles.goldText}>Landmarks</span>
                  </Typography>

                  {/* Category Tabs */}
                  <Tabs
                    value={activeCategory}
                    onChange={handleCategoryChange}
                    className={styles.categoryTabs}
                    variant="scrollable"
                    scrollButtons="auto"
                    TabIndicatorProps={{
                      className: styles.tabIndicator,
                    }}
                  >
                    <Tab
                      value="all"
                      label="All"
                      className={styles.categoryTab}
                    />
                    {locationCategories.map((category) => (
                      <Tab
                        key={category.id}
                        value={category.id}
                        label={category.name}
                        icon={
                          <Icon
                            icon={category.icon}
                            className={styles.tabIcon}
                          />
                        }
                        iconPosition="start"
                        className={styles.categoryTab}
                      />
                    ))}
                  </Tabs>
                </div>

                {/* Landmarks List */}
                <div className={styles.landmarksList}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={styles.landmarksGrid}
                    >
                      {filteredLandmarks.map((landmark, index) => (
                        <motion.div
                          key={landmark.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          transition={{ delay: index * 0.05 }}
                          className={`${styles.landmarkCard} ${
                            landmark.highlight ? styles.highlightedLandmark : ""
                          }`}
                        >
                          <div
                            className={styles.landmarkIcon}
                            style={{
                              backgroundColor: `${landmark.iconColor}15`,
                              color: landmark.iconColor,
                            }}
                          >
                            <Icon icon={landmark.icon} />
                          </div>
                          <div className={styles.landmarkInfo}>
                            <Typography
                              variant="subtitle2"
                              className={styles.landmarkName}
                            >
                              {landmark.name}
                            </Typography>
                            <div className={styles.landmarkMeta}>
                              <Chip
                                label={landmark.distance}
                                size="small"
                                className={styles.distanceChip}
                                icon={<Icon icon="mdi:map-marker-distance" />}
                              />
                              <Typography
                                variant="caption"
                                className={styles.driveTime}
                              >
                                <Icon
                                  icon="mdi:car"
                                  className={styles.driveIcon}
                                />
                                {landmark.driveTime}
                              </Typography>
                            </div>
                          </div>
                          {landmark.highlight && (
                            <Chip
                              label="Upcoming"
                              size="small"
                              className={styles.upcomingChip}
                            />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* CTA Button */}
                <motion.div
                  variants={itemVariants}
                  className={styles.landmarksCta}
                >
                  <Button
                    variant="outline"
                    size="large"
                    fullWidth
                    endIcon="mdi:arrow-right"
                    onClick={handleScheduleVisit}
                  >
                    Schedule a Site Visit
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Location Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.featuresSection}
        >
          <Grid container spacing={3}>
            {[
              {
                icon: "mdi:train",
                title: "500m from Metro",
                desc: "Upcoming Metro Station",
                color: "#FF9800",
              },
              {
                icon: "mdi:office-building",
                title: "IT Hub Proximity",
                desc: "Near Wipro & RMZ Ecoworld",
                color: "#2196F3",
              },
              {
                icon: "mdi:airplane",
                title: "1 hr 40 mins to Airport",
                desc: "Quick Airport Access",
                color: "#9C27B0",
              },
              {
                icon: "mdi:road",
                title: "ORR Connected",
                desc: "Outer Ring Road Access",
                color: "#4CAF50",
              },
            ].map((feature, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <motion.div
                  variants={itemVariants}
                  className={styles.featureCard}
                >
                  <div
                    className={styles.featureIcon}
                    style={{
                      backgroundColor: `${feature.color}15`,
                      color: feature.color,
                    }}
                  >
                    <Icon icon={feature.icon} />
                  </div>
                  <Typography
                    variant="subtitle1"
                    className={styles.featureTitle}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.featureDesc}
                    sx={{ color: "#D9DCE0 !important" }}
                  >
                    {feature.desc}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Background Decorations */}
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />
    </section>
  );
};

export default LocationSection;
