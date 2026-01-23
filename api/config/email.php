<?php
/**
 * Email Configuration
 *
 * This file contains Gmail SMTP settings for sending lead notifications.
 * Update these values with your actual Gmail credentials.
 *
 * IMPORTANT: For Gmail, you need to:
 * 1. Enable 2-Factor Authentication on your Google account
 * 2. Generate an App Password: https://myaccount.google.com/apppasswords
 * 3. Use the App Password (not your regular password) for SMTP_PASS
 */

// Prevent direct access
if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    http_response_code(403);
    exit('Direct access forbidden');
}

// Gmail SMTP Settings
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'mythikona@gmail.com');
define('SMTP_PASS', '16_DIGIT_APP_PASSWORD');
define('SMTP_SECURE', 'tls'); // Use 'tls' for port 587, 'ssl' for port 465

// Email Recipients
define('EMAIL_FROM', 'mythikona@gmail.com');
define('EMAIL_FROM_NAME', 'Mahindra Blossom - H.O.M Advisory');
define('EMAIL_TO', 'prasoon@homadvisory.com');
define('EMAIL_TO_NAME', 'H.O.M Advisory');

// Optional: CC Recipients (comma-separated)
define('EMAIL_CC', 'assamdigital@gmail.com,susmit@assamdigital.com');

// Email Settings
define('EMAIL_SUBJECT_PREFIX', '[New Lead] Mahindra Blossom');
