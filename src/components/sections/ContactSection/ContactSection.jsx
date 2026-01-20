/* ============================================
   ContactSection Component - Nambiar District 25 Phase 2
   "A Rare Opportunity to Own Your Dream Home" contact section
   ============================================ */

import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Player } from "@lottiefiles/react-lottie-player";
import UnifiedLeadForm from "../../common/UnifiedLeadForm/UnifiedLeadForm";
import buildingAnimation from "../../../assets/lottie/building-animation.json";
import styles from "./ContactSection.module.css";

const ContactSection = () => {
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

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Contact info items
  const contactInfo = [
    {
      icon: "mdi:map-marker-outline",
      title: "Visit Us",
      content:
        "CD Road, Dommasandra, Off Sarjapur Road, Bengaluru, Karnataka 562125",
    },
    {
      icon: "mdi:phone-outline",
      title: "Call Us",
      content: "+91-9632367929",
      href: "tel:+919632367929",
    },
    {
      icon: "mdi:email-outline",
      title: "Email Us",
      content: "sales@nambiardistrict25.com",
      href: "mailto:sales@nambiardistrict25.com",
    },
    {
      icon: "mdi:clock-outline",
      title: "Office Hours",
      content: "Mon - Sun: 9:30 AM - 7:30 PM",
    },
  ];

  return (
    <section id="contact" className={styles.section}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={6} alignItems="center">
            {/* Left Side - Content */}
            <Grid item xs={12} lg={6}>
              <motion.div
                variants={itemVariants}
                className={styles.contentWrapper}
              >
                {/* Badge */}
                <span className={styles.badge}>CONTACT US</span>

                {/* Title */}
                <Typography variant="h2" className={styles.title}>
                  A Rare Opportunity to Own{" "}
                  <span className={styles.highlight}>Your Dream Home</span>
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  className={styles.description}
                  sx={{ marginBottom: "15px;", marginTop: "15px" }}
                >
                  Experience luxury living at its finest. Get in touch with our
                  team to learn more about Nambiar District 25 Phase 2 and
                  schedule your exclusive site visit today.
                </Typography>

                {/* Lottie Animation (Mobile Only) */}
                <motion.div
                  variants={itemVariants}
                  className={styles.mobileAnimation}
                >
                  <Player
                    autoplay
                    loop
                    src={buildingAnimation}
                    className={styles.lottiePlayer}
                  />
                </motion.div>

                {/* Contact Info */}
                <div className={styles.contactInfo}>
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={styles.contactItem}
                    >
                      <div className={styles.contactIcon}>
                        <Icon icon={item.icon} />
                      </div>
                      <div className={styles.contactText}>
                        <Typography
                          variant="subtitle2"
                          className={styles.contactTitle}
                        >
                          {item.title}
                        </Typography>
                        {item.href ? (
                          <a href={item.href} className={styles.contactLink}>
                            {item.content}
                          </a>
                        ) : (
                          <Typography
                            variant="body2"
                            className={styles.contactContent}
                          >
                            {item.content}
                          </Typography>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} lg={6}>
              <motion.div
                variants={formVariants}
                className={styles.formWrapper}
              >
                {/* Form Header */}
                <div className={styles.formHeader}>
                  <Typography variant="h5" className={styles.formTitle}>
                    Book A Site Visit
                  </Typography>
                  <Typography variant="body2" className={styles.formSubtitle}>
                    Fill in your details and we'll get back to you
                  </Typography>
                </div>

                {/* Unified Lead Form */}
                <UnifiedLeadForm
                  variant="default"
                  showTitle={false}
                  showSubtitle={false}
                  showMessage={true}
                  showTrustBadges={true}
                  showConsent={true}
                  showPhoneButton={false}
                  submitButtonText="Submit Enquiry"
                  formId="contact-form"
                  className={styles.formContent}
                />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Background Decorations */}
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />
      <div className={styles.bgPattern} />
    </section>
  );
};

export default ContactSection;
