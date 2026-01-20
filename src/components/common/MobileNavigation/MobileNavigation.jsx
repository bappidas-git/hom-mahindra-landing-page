/* ============================================
   MobileNavigation Component
   Bottom sticky navigation bar for mobile devices
   ============================================ */

import React, { useState, useEffect } from "react";
import { IconButton, Typography, Badge } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "./MobileNavigation.module.css";

// Navigation items configuration
const navItems = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "ic:baseline-whatsapp",
    color: "#25D366",
    action: "whatsapp",
    href: "https://wa.me/919632367929?text=Hi,%20I%20am%20interested%20in%20District%2025%20Phase%202",
  },
  {
    id: "call",
    label: "Call",
    icon: "ic:baseline-phone",
    color: "#C9A227",
    action: "call",
    href: "tel:+919632367929",
  },
  {
    id: "enquiry",
    label: "Enquiry",
    icon: "ic:baseline-download",
    color: "#C9A227",
    action: "enquiry",
    badge: true,
  },
  {
    id: "menu",
    label: "Menu",
    icon: "ic:baseline-menu",
    color: "#6B7280",
    action: "menu",
  },
];

const MobileNavigation = ({
  onEnquiryClick,
  onMenuClick,
  isDrawerOpen = false,
  showBadge = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeItem, setActiveItem] = useState(null);

  // Hide navigation on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle navigation item click
  const handleItemClick = (item) => {
    setActiveItem(item.id);

    // Reset active state after animation
    setTimeout(() => setActiveItem(null), 300);

    switch (item.action) {
      case "whatsapp":
      case "call":
        window.open(item.href, "_blank");
        break;
      case "enquiry":
        if (onEnquiryClick) onEnquiryClick();
        break;
      case "menu":
        if (onMenuClick) onMenuClick();
        break;
      default:
        break;
    }
  };

  // Animation variants for the navigation bar
  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  // Ripple animation for buttons
  const rippleVariants = {
    initial: {
      scale: 0,
      opacity: 0.5,
    },
    animate: {
      scale: 2.5,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className={styles.mobileNav}
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Safe area background for notched devices */}
          <div className={styles.safeAreaBackground} />

          <div className={styles.navContainer}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${styles.navItem} ${
                  activeItem === item.id ? styles.active : ""
                }`}
                variants={itemVariants}
                whileTap="tap"
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.05 },
                }}
              >
                <IconButton
                  className={styles.navButton}
                  onClick={() => handleItemClick(item)}
                  aria-label={item.label}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Ripple effect */}
                  <AnimatePresence>
                    {activeItem === item.id && (
                      <motion.span
                        className={styles.ripple}
                        variants={rippleVariants}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0 }}
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon with badge for enquiry */}
                  {item.badge && showBadge ? (
                    <Badge
                      badgeContent=""
                      variant="dot"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#F44336",
                          width: 8,
                          height: 8,
                          minWidth: 8,
                        },
                      }}
                    >
                      <Icon
                        icon={item.icon}
                        className={styles.navIcon}
                        style={{ color: item.color }}
                      />
                    </Badge>
                  ) : (
                    <Icon
                      icon={
                        item.id === "menu" && isDrawerOpen
                          ? "ic:baseline-close"
                          : item.icon
                      }
                      className={styles.navIcon}
                      style={{ color: item.color }}
                    />
                  )}
                </IconButton>

                <Typography
                  variant="caption"
                  className={styles.navLabel}
                  sx={{ color: item.color }}
                >
                  {item.label}
                </Typography>
              </motion.div>
            ))}
          </div>

          {/* Decorative top border gradient */}
          <div className={styles.topBorder} />
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
