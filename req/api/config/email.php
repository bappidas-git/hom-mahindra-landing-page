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

// Gmail SMTP Settings
define('SMTP_HOST',  'smtp.gmail.com');
define('SMTP_PORT',  587);
define('SMTP_USER',  'myemail@gmail.com');
define('SMTP_PASS',  '16_DIGIT_APP_PASSWORD');
define('SMTP_SECURE', 'tls'); // Use 'tls' for port 587, 'ssl' for port 465

// Email Recipients
define('EMAIL_FROM', 'myemail@gmail.com');
define('EMAIL_FROM_NAME', 'Nambiar District 25');
define('EMAIL_TO', 'client@gmail.com');
define('EMAIL_TO_NAME',  'Marketing Team');

// Optional: CC Recipients (comma-separated)
define('EMAIL_CC',  'client@gmail.com');

// Email Settings
define('EMAIL_SUBJECT_PREFIX', '[New Lead] - Nambiar District 25');
