/* ============================================
   Header Component - Nambiar District 25 Phase 2
   Fixed header with scroll behavior and navigation
   ============================================ */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import styles from './Header.module.css';

// Logo imports
import whiteLogo from '../../../assets/images/logo/white-logo-hom.png';
import darkLogo from '../../../assets/images/logo/logo-hom.png';
import iconLogo from '../../../assets/images/logo/HOM-Icon.png';

// Navigation items
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Overview', href: '#overview' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Location', href: '#location' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const Header = ({ forceCloseMenu = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  // Close mobile menu when bottom drawer opens
  useEffect(() => {
    if (forceCloseMenu && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [forceCloseMenu]);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);

    // Determine active section
    const sections = navItems.map(item => item.href.substring(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smooth scroll to section (for desktop navigation)
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsMobileMenuOpen(false);
  };

  // Handle mobile menu item click (close menu first, then scroll with delay)
  const handleMobileMenuClick = (e, href) => {
    e.preventDefault();
    e.stopPropagation();

    // Store the target href before closing
    const targetHref = href;

    // Close menu first
    setIsMobileMenuOpen(false);

    // Scroll after a brief delay to allow menu close animation to start
    setTimeout(() => {
      const targetId = targetHref.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <Container maxWidth="xl" className={styles.headerContainer}>
        {/* Logo Section */}
        <motion.div
          className={styles.logoSection}
          variants={logoVariants}
          initial="initial"
          animate="animate"
        >
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <img
                src={isScrolled ? darkLogo : whiteLogo}
                alt="HOM - House of Memories"
                className={styles.mainLogo}
              />
            </div>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`${styles.navLink} ${activeSection === item.href.substring(1) ? styles.active : ''}`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        )}

        {/* Right Section - Logo Icon & CTA */}
        <div className={styles.rightSection}>
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <a
                href="tel:+919632367929"
                className={styles.callButton}
              >
                <Icon icon="mdi:phone" className={styles.callButtonIcon} />
                +91-9632367929
              </a>
            </motion.div>
          )}

          <motion.div
            className={styles.iconLogo}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
          >
            <img
              src={iconLogo}
              alt="HOM Icon"
              className={styles.iconLogoImage}
            />
          </motion.div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              className={styles.menuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icon
                icon={isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'}
                className={styles.menuIcon}
              />
            </IconButton>
          )}
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className={styles.mobileNavContent}>
              <ul className={styles.mobileNavList}>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      type="button"
                      onClick={(e) => handleMobileMenuClick(e, item.href)}
                      className={`${styles.mobileNavLink} ${activeSection === item.href.substring(1) ? styles.active : ''}`}
                    >
                      <Icon icon={getNavIcon(item.label)} className={styles.mobileNavIcon} />
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className={styles.mobileNavCTA}>
                <a
                  href="tel:+919632367929"
                  className={styles.mobileCallButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon icon="mdi:phone" className={styles.callButtonIcon} />
                  +91-9632367929
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Helper function to get navigation icons
const getNavIcon = (label) => {
  const icons = {
    'Home': 'mdi:home-outline',
    'Overview': 'mdi:information-outline',
    'Amenities': 'mdi:star-four-points-outline',
    'Pricing': 'mdi:tag-outline',
    'Floor Plans': 'mdi:floor-plan',
    'Location': 'mdi:map-marker-outline',
    'Contact': 'mdi:phone-outline',
  };
  return icons[label] || 'mdi:circle-outline';
};

export default Header;
