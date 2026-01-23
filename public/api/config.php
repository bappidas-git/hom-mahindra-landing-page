<?php
/**
 * Configuration file for Lead Handler
 * Mahindra Blossom Landing Page
 *
 * IMPORTANT: Update these settings before deploying to production!
 */

// Prevent direct access
if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    http_response_code(403);
    exit('Direct access forbidden');
}

// ============================================
// Database Configuration
// ============================================
define('DB_HOST', 'localhost');
define('DB_NAME', 'aaxwdrhhjw');
define('DB_USER', 'aaxwdrhhjw');
define('DB_PASS', 'CfEdfthSj3');
define('DB_CHARSET', 'utf8mb4');

// ============================================
// Email Configuration (Gmail SMTP)
// ============================================
// To use Gmail SMTP, you need to:
// 1. Enable 2-Step Verification on your Google Account
// 2. Generate an App Password: https://myaccount.google.com/apppasswords
// 3. Use the App Password below (not your regular Gmail password)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'mythikona@gmail.com');  // Your Gmail address
define('SMTP_PASSWORD', 'euyaavuesxhuxzhv');      // Gmail App Password (16 characters)
define('SMTP_FROM_EMAIL', 'mythikona@gmail.com'); // From email address
define('SMTP_FROM_NAME', 'Mahindra Blossom - H.O.M Advisory');

// Email recipients (comma-separated for multiple)
define('NOTIFICATION_EMAILS', 'prasoon@homadvisory.com,assamdigital@gmail.com');

// ============================================
// Application Settings
// ============================================
define('SITE_NAME', 'Mahindra Blossom');
define('SITE_URL', 'https://www.mahindralifespaces-hopefarm.com');
define('ADMIN_EMAIL', 'assamdigital@gmail.com');

// ============================================
// Security Settings
// ============================================
// Allowed origins for CORS (comma-separated)
define('ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:5000,https://www.mahindralifespaces-hopefarm.com');

// Enable/disable features
define('ENABLE_EMAIL_NOTIFICATIONS', true);
define('ENABLE_DATABASE_LOGGING', true);
define('DEBUG_MODE', false);

// Rate limiting (requests per minute per IP)
define('RATE_LIMIT', 10);
