/* ============================================
   Footer Component - Nambiar District 25 Phase 2
   Professional footer with disclaimer, RERA info,
   and legal modals
   ============================================ */

import React, { useState } from "react";
import { Container, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import styles from "./Footer.module.css";

// Privacy Policy Content Component
const PrivacyPolicyContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>Introduction</h3>
      <p>
        H.O.M Advisory ("we," "our," or "us") respects your privacy and is
        committed to protecting your personal data. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        visit our website or engage with our services as authorized marketing
        partners for Nambiar Builders.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Information We Collect</h3>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and other contact details you provide when filling out inquiry
          forms or contacting us.
        </li>
        <li>
          <strong>Property Preferences:</strong> Information about your property
          preferences, budget, and requirements shared during consultations.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you interact with
          our website, including pages visited, time spent, and navigation
          patterns.
        </li>
        <li>
          <strong>Device Information:</strong> IP address, browser type,
          operating system, and device identifiers for analytics and security
          purposes.
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>How We Use Your Information</h3>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>To respond to your inquiries and provide property information</li>
        <li>To schedule site visits and property viewings</li>
        <li>
          To send relevant property updates and promotional communications (with
          your consent)
        </li>
        <li>To improve our website and services based on user feedback</li>
        <li>
          To comply with legal obligations and protect our legitimate business
          interests
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Information Sharing</h3>
      <p>We may share your information with:</p>
      <ul>
        <li>
          <strong>Nambiar Builders:</strong> As authorized marketing partners,
          we share inquiry details with the developer for processing your
          property interests.
        </li>
        <li>
          <strong>Service Providers:</strong> Third-party vendors who assist us
          with website hosting, analytics, and communication services.
        </li>
        <li>
          <strong>Legal Requirements:</strong> When required by law, court
          order, or governmental regulations.
        </li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>
    </section>

    <section className={styles.legalSection}>
      <h3>Data Security</h3>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal information against unauthorized access,
        alteration, disclosure, or destruction. However, no method of
        transmission over the internet is 100% secure, and we cannot guarantee
        absolute security.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Your Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Access and request a copy of your personal data</li>
        <li>Correct any inaccurate or incomplete information</li>
        <li>
          Request deletion of your personal data (subject to legal obligations)
        </li>
        <li>Opt-out of marketing communications at any time</li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Cookies & Tracking</h3>
      <p>
        Our website uses cookies and similar tracking technologies to enhance
        your browsing experience and analyze website traffic. You can manage
        cookie preferences through your browser settings. Disabling cookies may
        affect some features of our website.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Third-Party Links</h3>
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices or content of these external
        sites. We encourage you to review the privacy policies of any
        third-party websites you visit.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Updates to This Policy</h3>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal requirements. The updated policy will be
        posted on this page with a revised effective date.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact Us</h3>
      <p>
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </p>
      <p>
        <strong>H.O.M Advisory</strong>
        <br />
        Email: sales@nambiardistrict25.com
        <br />
        Phone: +91-9632367929
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: January 2026</p>
  </div>
);

// Terms & Conditions Content Component
const TermsConditionsContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>Acceptance of Terms</h3>
      <p>
        By accessing and using this website, you accept and agree to be bound by
        these Terms and Conditions. If you do not agree to these terms, please
        do not use this website. H.O.M Advisory reserves the right to modify
        these terms at any time without prior notice.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>About This Website</h3>
      <p>
        This website is operated by H.O.M Advisory, an authorized marketing
        partner of Nambiar Builders. This is not the official website of Nambiar
        Builders. We are engaged in marketing and selling activities for Nambiar
        District 25 Phase 2 project.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Property Information Disclaimer</h3>
      <p>
        The information provided on this website is for general informational
        purposes only:
      </p>
      <ul>
        <li>
          All property details, specifications, amenities, and features are
          subject to change without prior notice.
        </li>
        <li>
          Prices mentioned are indicative and subject to revision at the
          discretion of Nambiar Builders.
        </li>
        <li>
          Images, renders, and visualizations are for representational purposes
          only and may not reflect the actual property.
        </li>
        <li>
          Availability of units is not guaranteed and is subject to real-time
          inventory status.
        </li>
        <li>Floor plans and layouts may vary from the actual construction.</li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>No Offer or Contract</h3>
      <p>
        The content on this website does not constitute an offer to sell or a
        solicitation of an offer to buy any property. No contractual
        relationship is created by your use of this website or by any inquiry
        submitted through it. Any purchase or transaction must be executed
        through official documentation with Nambiar Builders.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>User Responsibilities</h3>
      <p>By using this website, you agree to:</p>
      <ul>
        <li>
          Provide accurate and complete information when submitting inquiries
        </li>
        <li>
          Use the website only for lawful purposes and in compliance with
          applicable laws
        </li>
        <li>
          Not engage in any activity that could harm, disable, or impair the
          website
        </li>
        <li>
          Not attempt to gain unauthorized access to any part of the website or
          its systems
        </li>
        <li>
          Verify all property details directly with Nambiar Builders before
          making any purchase decision
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Intellectual Property</h3>
      <p>
        All content on this website, including but not limited to text,
        graphics, logos, images, and software, is the property of H.O.M Advisory
        or Nambiar Builders and is protected by intellectual property laws. You
        may not reproduce, distribute, or create derivative works without prior
        written consent.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Limitation of Liability</h3>
      <p>
        H.O.M Advisory shall not be liable for any direct, indirect, incidental,
        consequential, or punitive damages arising from your use of this website
        or reliance on any information provided herein. We make no warranties or
        representations about the accuracy, completeness, or reliability of the
        content on this website.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Third-Party Links</h3>
      <p>
        This website may contain links to third-party websites for your
        convenience. We do not endorse, control, or assume responsibility for
        the content or practices of any third-party sites. Your use of such
        sites is at your own risk.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Indemnification</h3>
      <p>
        You agree to indemnify and hold harmless H.O.M Advisory, its affiliates,
        and their respective officers, directors, employees, and agents from any
        claims, damages, or expenses arising from your use of this website or
        violation of these Terms and Conditions.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Governing Law</h3>
      <p>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of India. Any disputes arising from or related
        to these terms shall be subject to the exclusive jurisdiction of the
        courts in Bangalore, Karnataka.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Severability</h3>
      <p>
        If any provision of these Terms and Conditions is found to be
        unenforceable or invalid, that provision shall be limited or eliminated
        to the minimum extent necessary, and the remaining provisions shall
        continue in full force and effect.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact Information</h3>
      <p>
        For any questions regarding these Terms and Conditions, please contact
        us at:
      </p>
      <p>
        <strong>H.O.M Advisory</strong>
        <br />
        Email: sales@nambiardistrict25.com
        <br />
        Phone: +91-9632367929
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: January 2026</p>
  </div>
);

// Legal Modal Component
const LegalModal = ({ isOpen, onClose, title, children }) => {
  if (typeof window === "undefined") return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.modalBackdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={styles.legalModal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{title}</h2>
              <IconButton
                className={styles.modalCloseBtn}
                onClick={onClose}
                aria-label="Close modal"
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </div>
            <div className={styles.modalBody}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Footer = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [disclaimerExpanded, setDisclaimerExpanded] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        {/* Main Footer Content */}
        <div className={styles.mainFooter}>
          <Container maxWidth="xl">
            {/* RERA Badge */}
            <div className={styles.reraBadge} style={{ flexDirection: 'column', gap: '8px', padding: '12px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Icon icon="mdi:shield-check" className={styles.reraIcon} />
                <span className={styles.reraLabel}>RERA Registered</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ color: '#FFFFFFCC' }}>
                  <strong style={{ color: '#C9A227' }}>Nambiar District 25 – Phase 2:</strong>{' '}
                  <span style={{ color: '#FFFFFF99' }}>PRM/KA/RERA/1251/308/PR/200825/008011</span>
                </span>
                <span style={{ color: '#FFFFFFCC' }}>
                  <strong style={{ color: '#C9A227' }}>H.O.M Advisory (Agent):</strong>{' '}
                  <span style={{ color: '#FFFFFF99' }}>PRM/KA/RERA/1251/310/AG/251018/006354</span>
                </span>
              </div>
            </div>

            {/* Compact Disclaimer Bar */}
            <div className={styles.compactDisclaimer}>
              <span className={styles.disclaimerLine}>
                <Icon
                  icon="mdi:information-outline"
                  className={styles.disclaimerInfoIcon}
                  style={{ color: '#FFFFFF66' }}
                />
                <span className={styles.disclaimerSummary} style={{ color: '#FFFFFF80' }}>
                  This website is owned, operated, and maintained by <strong style={{ color: '#C9A227CC' }}>H.O.M Advisory</strong>, a RERA-registered real estate agent and an authorized channel partner of Nambiar Builders for the promotion of Nambiar District 25 – Phase 2.
                </span>
                <button
                  className={styles.disclaimerToggle}
                  onClick={() => setDisclaimerExpanded(!disclaimerExpanded)}
                  aria-expanded={disclaimerExpanded}
                  aria-label={
                    disclaimerExpanded
                      ? "Collapse disclaimer"
                      : "Expand disclaimer"
                  }
                  style={{ color: '#C9A227B3' }}
                >
                  <span className={styles.readMoreText}>
                    {disclaimerExpanded ? "Less" : "More"}
                  </span>
                  <Icon
                    icon={
                      disclaimerExpanded ? "mdi:chevron-up" : "mdi:chevron-down"
                    }
                    className={styles.toggleIcon}
                  />
                </button>
              </span>
              <AnimatePresence>
                {disclaimerExpanded && (
                  <motion.div
                    className={styles.disclaimerExpanded}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <p className={styles.disclaimerFullText} style={{ color: '#FFFFFF73' }}>
                      This website is owned, operated, and maintained by <strong style={{ color: '#C9A227BF' }}>H.O.M Advisory</strong>, a RERA-registered real estate agent (Reg. No. PRM/KA/RERA/1251/310/AG/251018/006354) and an authorized channel partner of Nambiar Builders for the promotion of Nambiar District 25 – Phase 2. This is not the official website of Nambiar Builders. All prices, specifications, layouts, floor plans, amenities, and other details are indicative and subject to change without prior notice, subject to availability and approvals. Images and artistic impressions are for illustrative purposes only.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Links & Copyright */}
            <div className={styles.footerBottom}>
              <p className={styles.copyright} style={{ color: '#FFFFFF99' }}>
                &copy; {new Date().getFullYear()} H.O.M Advisory. All Rights
                Reserved.
              </p>
              <div className={styles.legalLinks}>
                <button
                  className={styles.legalLink}
                  onClick={() => setPrivacyModalOpen(true)}
                  style={{ color: '#FFFFFFB3' }}
                >
                  Privacy Policy
                </button>
                <span className={styles.linkDivider} style={{ color: '#FFFFFF4D' }}>|</span>
                <button
                  className={styles.legalLink}
                  onClick={() => setTermsModalOpen(true)}
                  style={{ color: '#FFFFFFB3' }}
                >
                  Terms & Conditions
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Developer Credit Bar */}
        <div className={styles.developerBar}>
          <Container maxWidth="xl">
            <p className={styles.developerText} style={{ color: '#FFFFFF80' }}>
              Designed and Developed by{" "}
              <a
                href="https://assamdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.developerLink}
              >
                Assam Digital
              </a>
            </p>
          </Container>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms & Conditions"
      >
        <TermsConditionsContent />
      </LegalModal>
    </>
  );
};

export default Footer;
