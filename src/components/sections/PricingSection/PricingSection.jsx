/* ============================================
   PricingSection Component - Nambiar District 25 Phase 2
   Redesigned with full-width config card & EMI popup modal
   ============================================ */

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Container,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import ConfigurationSelector from "./ConfigurationSelector";
import EMICalculatorModal from "./EMICalculatorModal";
import {
  configurationsData,
  priceRange,
} from "../../../data/configurationsData";
import { useModal } from "../../../context/ModalContext";
import styles from "./PricingSection.module.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
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

// Get unique configuration types for quick selection
const getConfigTypes = () => {
  const types = [
    ...new Set(configurationsData.map((c) => c.type.split(" ")[0] + " BHK")),
  ];
  return types.slice(0, 4); // Show max 4 types
};

const PricingSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openLeadDrawer } = useModal();

  // Selected configuration state
  const [selectedConfigId, setSelectedConfigId] = useState(1);

  // EMI Modal state
  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);

  // Get current selected configuration
  const selectedConfig =
    configurationsData.find((c) => c.id === selectedConfigId) ||
    configurationsData[0];

  // Handle configuration change
  const handleConfigChange = (configId) => {
    setSelectedConfigId(configId);
  };

  // Handle quick config selection
  const handleQuickConfigSelect = (typePrefix) => {
    const config = configurationsData.find((c) =>
      c.type.startsWith(typePrefix.split(" ")[0])
    );
    if (config) {
      setSelectedConfigId(config.id);
    }
  };

  // Handle view details
  const handleViewDetails = () => {
    openLeadDrawer("view-pricing", {
      subtitle: `For ${selectedConfig.type} - ${selectedConfig.sqft} sq.ft`,
    });
  };

  // Handle main CTA click
  const handleMainCta = () => {
    openLeadDrawer("get-best-price");
  };

  // Handle EMI Modal
  const handleOpenEMI = () => {
    setIsEMIModalOpen(true);
  };

  const handleCloseEMI = () => {
    setIsEMIModalOpen(false);
  };

  // Info cards data
  const infoCards = [
    {
      icon: "mdi:check-decagram",
      iconColor: "#4CAF50",
      bgColor: "#4caf5026",
      title: "RERA Approved",
      subtitle: "100% Legal",
    },
    {
      icon: "mdi:bank-outline",
      iconColor: "#2196F3",
      bgColor: "#2196f326",
      title: "Bank Approved",
      subtitle: "Easy Loans",
    },
    {
      icon: "mdi:percent-outline",
      iconColor: "#9C27B0",
      bgColor: "#9c27b026",
      title: "Flexible Payment",
      subtitle: "Easy Plans",
    },
    {
      icon: "mdi:shield-check-outline",
      iconColor: "#FF9800",
      bgColor: "#ff980026",
      title: "Price Protection",
      subtitle: "No Hidden Costs",
    },
  ];

  const configTypes = getConfigTypes();

  return (
    <section className={styles.pricingSection} id="pricing" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgPattern} />
      <div className={styles.bgGradientLeft} />
      <div className={styles.bgGradientRight} />
      <div className={styles.bgAccentTopRight} />
      <div className={styles.bgAccentBottomLeft} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header - Compact */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Chip
              label="PRICING & EMI"
              className={styles.pricingBadge}
              sx={{
                backgroundColor: "rgba(201, 162, 39, 0.15)",
                color: "#C9A227",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                height: "28px",
                borderRadius: "16px",
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
                color: "#FFFFFF",
                marginTop: "0.75rem",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Choose Your Perfect <span className={styles.goldText}>Home</span>
            </Typography>

            <div className={styles.titleUnderline}>
              <span className={styles.underlineBar} />
            </div>

            <Typography
              className={styles.sectionSubtitle}
              sx={{ color: "#D9DCE0 !important" }}
            >
              Starting from{" "}
              <span className={styles.priceHighlight}>
                ₹{priceRange.startingFrom}*
              </span>{" "}
              onwards
            </Typography>
          </motion.div>

          {/* Quick Config Selection Strip */}
          {!isSmallMobile && (
            <motion.div
              variants={itemVariants}
              className={styles.quickConfigStrip}
            >
              {configTypes.map((type) => (
                <button
                  key={type}
                  className={`${styles.quickConfigChip} ${
                    selectedConfig.type.startsWith(type.split(" ")[0])
                      ? styles.quickConfigChipActive
                      : ""
                  }`}
                  onClick={() => handleQuickConfigSelect(type)}
                >
                  {type}
                </button>
              ))}
            </motion.div>
          )}

          {/* Full Width Configuration Card */}
          <motion.div variants={itemVariants}>
            <ConfigurationSelector
              selectedConfig={selectedConfigId}
              onConfigChange={handleConfigChange}
              onViewDetails={handleViewDetails}
              onOpenEMI={handleOpenEMI}
            />
          </motion.div>

          {/* Info Cards Strip - Horizontal Pill Layout */}
          <motion.div variants={itemVariants} className={styles.infoCards}>
            <div className={styles.infoCardsStrip}>
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  className={styles.infoCard}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className={styles.infoIconWrapper}
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <Icon icon={card.icon} style={{ color: card.iconColor }} />
                  </div>
                  <div className={styles.infoTextWrapper}>
                    <Typography
                      className={styles.infoTitle}
                      sx={{ color: "#FFFFFF !important" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      className={styles.infoSubtitle}
                      sx={{ color: "#D9DCE0 !important" }}
                    >
                      {card.subtitle}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Main CTA Button */}
          <motion.div variants={itemVariants} className={styles.floatingCta}>
            <motion.button
              className={styles.mainCtaBtn}
              onClick={handleMainCta}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon icon="mdi:phone-in-talk" />
              <span>Get Best Price Quote</span>
              <Icon icon="mdi:arrow-right" />
            </motion.button>
          </motion.div>

          {/* Disclaimer - Compact */}
          <motion.div variants={itemVariants} className={styles.disclaimer}>
            <Icon icon="mdi:information-outline" />
            <Typography sx={{ color: "#C8CBCF !important" }}>
              *Prices are indicative. GST & charges applicable. Contact sales
              for latest offers.
            </Typography>
          </motion.div>
        </motion.div>
      </Container>

      {/* EMI Calculator Modal */}
      <EMICalculatorModal
        isOpen={isEMIModalOpen}
        onClose={handleCloseEMI}
        propertyPrice={selectedConfig.price}
        configType={selectedConfig.type}
      />
    </section>
  );
};

export default PricingSection;
