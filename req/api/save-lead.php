<?php
/**
 * Lead Form Submission Handler
 *
 * This script handles lead form submissions from the Nambiar District 25 landing page.
 * It creates the database and table if they don't exist, validates input, saves the lead,
 * and sends an email notification via Gmail SMTP.
 */

// Start output buffering to capture any stray output (warnings, notices, etc.)
ob_start();

// Set headers for CORS and JSON response
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Register shutdown function to ensure JSON response even on fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        // Clear any output that was buffered
        ob_end_clean();

        // Log the error
        error_log("Fatal error in save-lead.php: " . $error['message'] . " in " . $error['file'] . " on line " . $error['line']);

        // Return JSON error response
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => false,
            'message' => 'An internal server error occurred. Please try again later.'
        ]);
    }
});

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST request.'
    ]);
    exit();
}

// Load dependencies
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/email.php';

// Load PHPMailer via Composer autoload
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

/**
 * Create database if it doesn't exist
 *
 * @return bool True on success, false on failure
 */
function createDatabaseIfNotExists() {
    $conn = getConnectionWithoutDB();
    if (!$conn) {
        return false;
    }

    try {
        $sql = "CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
        $conn->exec($sql);
        return true;
    } catch (PDOException $e) {
        error_log("Failed to create database: " . $e->getMessage());
        return false;
    }
}

/**
 * Create leads table if it doesn't exist
 *
 * @param PDO $conn Database connection
 * @return bool True on success, false on failure
 */
function createLeadsTableIfNotExists($conn) {
    try {
        $sql = "CREATE TABLE IF NOT EXISTS `leads` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(50) NOT NULL,
            `mobile` VARCHAR(15) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `message` TEXT DEFAULT NULL,
            `source` VARCHAR(100) DEFAULT 'website',
            `ip_address` VARCHAR(45) DEFAULT NULL,
            `user_agent` TEXT DEFAULT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_email` (`email`),
            INDEX `idx_mobile` (`mobile`),
            INDEX `idx_created_at` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        $conn->exec($sql);
        return true;
    } catch (PDOException $e) {
        error_log("Failed to create leads table: " . $e->getMessage());
        return false;
    }
}

/**
 * Sanitize input string
 *
 * @param string $input Input string to sanitize
 * @return string Sanitized string
 */
function sanitizeInput($input) {
    if ($input === null) {
        return '';
    }
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Validate name (2-50 characters, letters/spaces/hyphens/apostrophes)
 *
 * @param string $name Name to validate
 * @return bool True if valid
 */
function validateName($name) {
    $name = trim($name);
    if (strlen($name) < 2 || strlen($name) > 50) {
        return false;
    }
    return preg_match("/^[a-zA-Z\s\-']+$/", $name);
}

/**
 * Validate Indian mobile number (10 digits, starts with 6-9)
 *
 * @param string $mobile Mobile number to validate
 * @return bool True if valid
 */
function validateMobile($mobile) {
    $mobile = preg_replace('/[^0-9]/', '', $mobile);
    return preg_match('/^[6-9]\d{9}$/', $mobile);
}

/**
 * Validate email address
 *
 * @param string $email Email to validate
 * @return bool True if valid
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate message (optional, max 500 characters)
 *
 * @param string $message Message to validate
 * @return bool True if valid
 */
function validateMessage($message) {
    if (empty($message)) {
        return true;
    }
    return strlen($message) <= 500;
}

/**
 * Get client IP address
 *
 * @return string Client IP address
 */
function getClientIP() {
    $ipKeys = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'REMOTE_ADDR'
    ];

    foreach ($ipKeys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = $_SERVER[$key];
            // Handle comma-separated IPs (X-Forwarded-For)
            if (strpos($ip, ',') !== false) {
                $ip = trim(explode(',', $ip)[0]);
            }
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return 'unknown';
}

/**
 * Send lead notification email via Gmail SMTP
 *
 * @param array $leadData Lead information
 * @param int $leadId Lead ID from database
 * @return bool True on success, false on failure
 */
function sendLeadEmail($leadData, $leadId) {
    // Check if PHPMailer is available
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        error_log("PHPMailer not installed. Run 'composer install' in the api directory.");
        return false;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->SMTPDebug = 2;

        // Recipients
        $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
        $mail->addAddress(EMAIL_TO, EMAIL_TO_NAME);

        // Add CC recipients if configured
        if (!empty(EMAIL_CC)) {
            $ccEmails = explode(',', EMAIL_CC);
            foreach ($ccEmails as $ccEmail) {
                $ccEmail = trim($ccEmail);
                if (filter_var($ccEmail, FILTER_VALIDATE_EMAIL)) {
                    $mail->addCC($ccEmail);
                }
            }
        }

        // Add reply-to as the lead's email
        $mail->addReplyTo($leadData['email'], $leadData['name']);

        // Email content
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = EMAIL_SUBJECT_PREFIX . 'Enquiry from ' . $leadData['name'];

        // Build HTML email body
        $htmlBody = buildEmailHTML($leadData, $leadId);
        $mail->Body = $htmlBody;

        // Plain text alternative
        $mail->AltBody = buildEmailPlainText($leadData, $leadId);

        $mail->send();
        return true;

    } catch (Exception $e) {
        error_log("Email sending failed: " . $mail->ErrorInfo);
        return false;
    }
}

/**
 * Build HTML email body
 *
 * @param array $leadData Lead information
 * @param int $leadId Lead ID
 * @return string HTML email content
 */
function buildEmailHTML($leadData, $leadId) {
    $submittedAt = date('d M Y, h:i A');

    return '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%); padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Lead Enquiry</h1>
                                <p style="color: #c5cae9; margin: 10px 0 0 0; font-size: 14px;">Nambiar District 25</p>
                            </td>
                        </tr>

                        <!-- Lead ID Badge -->
                        <tr>
                            <td style="padding: 20px 30px 0 30px; text-align: center;">
                                <span style="background-color: #e8eaf6; color: #3949ab; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold;">
                                    Lead ID: #' . $leadId . '
                                </span>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <!-- Name -->
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                            <table width="100%">
                                                <tr>
                                                    <td width="30%" style="color: #757575; font-size: 14px; vertical-align: top;">Name</td>
                                                    <td style="color: #212121; font-size: 16px; font-weight: bold;">' . htmlspecialchars($leadData['name']) . '</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Mobile -->
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                            <table width="100%">
                                                <tr>
                                                    <td width="30%" style="color: #757575; font-size: 14px; vertical-align: top;">Mobile</td>
                                                    <td style="color: #212121; font-size: 16px;">
                                                        <a href="tel:+91' . htmlspecialchars($leadData['mobile']) . '" style="color: #1a237e; text-decoration: none; font-weight: bold;">
                                                            +91 ' . htmlspecialchars($leadData['mobile']) . '
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Email -->
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                            <table width="100%">
                                                <tr>
                                                    <td width="30%" style="color: #757575; font-size: 14px; vertical-align: top;">Email</td>
                                                    <td style="color: #212121; font-size: 16px;">
                                                        <a href="mailto:' . htmlspecialchars($leadData['email']) . '" style="color: #1a237e; text-decoration: none;">
                                                            ' . htmlspecialchars($leadData['email']) . '
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Message (if provided) -->
                                    ' . (!empty($leadData['message']) ? '
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                            <table width="100%">
                                                <tr>
                                                    <td width="30%" style="color: #757575; font-size: 14px; vertical-align: top;">Message</td>
                                                    <td style="color: #212121; font-size: 14px; line-height: 1.5;">
                                                        ' . nl2br(htmlspecialchars($leadData['message'])) . '
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ' : '') . '

                                    <!-- Source -->
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                            <table width="100%">
                                                <tr>
                                                    <td width="30%" style="color: #757575; font-size: 14px; vertical-align: top;">Source</td>
                                                    <td style="color: #212121; font-size: 14px;">' . htmlspecialchars($leadData['source']) . '</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Submitted At -->
                                    <tr>
                                        <td style="padding: 12px 0;">
                                            <table width="100%">
                                                <tr>
                                                    <td width="30%" style="color: #757575; font-size: 14px; vertical-align: top;">Submitted</td>
                                                    <td style="color: #212121; font-size: 14px;">' . $submittedAt . '</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- CTA Button -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                                    <tr>
                                        <td align="center">
                                            <a href="tel:+91' . htmlspecialchars($leadData['mobile']) . '" style="display: inline-block; background-color: #1a237e; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                                                Call Now
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
                                <p style="color: #757575; font-size: 12px; margin: 0;">
                                    This is an automated notification from the Nambiar District 25 website.<br>
                                    Please respond to this lead within 24 hours.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>';
}

/**
 * Build plain text email body
 *
 * @param array $leadData Lead information
 * @param int $leadId Lead ID
 * @return string Plain text email content
 */
function buildEmailPlainText($leadData, $leadId) {
    $submittedAt = date('d M Y, h:i A');

    $text = "NEW LEAD ENQUIRY - Nambiar District 25\n";
    $text .= "=========================================\n\n";
    $text .= "Lead ID: #" . $leadId . "\n\n";
    $text .= "CONTACT DETAILS:\n";
    $text .= "----------------\n";
    $text .= "Name: " . $leadData['name'] . "\n";
    $text .= "Mobile: +91 " . $leadData['mobile'] . "\n";
    $text .= "Email: " . $leadData['email'] . "\n";

    if (!empty($leadData['message'])) {
        $text .= "\nMESSAGE:\n";
        $text .= "--------\n";
        $text .= $leadData['message'] . "\n";
    }

    $text .= "\nADDITIONAL INFO:\n";
    $text .= "----------------\n";
    $text .= "Source: " . $leadData['source'] . "\n";
    $text .= "Submitted: " . $submittedAt . "\n\n";
    $text .= "=========================================\n";
    $text .= "Please respond to this lead within 24 hours.\n";

    return $text;
}

// Main execution
try {
    // Clear any buffered output from included files
    ob_clean();

    // Get POST data (supports both form-data and JSON)
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';

    if (strpos($contentType, 'application/json') !== false) {
        $rawData = file_get_contents('php://input');
        if (empty($rawData)) {
            throw new Exception('Empty request body');
        }
        $data = json_decode($rawData, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data: ' . json_last_error_msg());
        }
    } else {
        $data = $_POST;
    }

    // Ensure data is an array
    if (!is_array($data)) {
        throw new Exception('Invalid request data format');
    }

    // Extract and sanitize fields
    $name = sanitizeInput($data['name'] ?? '');
    $mobile = preg_replace('/[^0-9]/', '', $data['mobile'] ?? '');
    $email = sanitizeInput($data['email'] ?? '');
    $message = sanitizeInput($data['message'] ?? '');
    $source = sanitizeInput($data['source'] ?? 'website');

    // Validate required fields
    $errors = [];

    if (empty($name)) {
        $errors[] = 'Name is required';
    } elseif (!validateName($name)) {
        $errors[] = 'Please enter a valid name (2-50 characters, letters only)';
    }

    if (empty($mobile)) {
        $errors[] = 'Mobile number is required';
    } elseif (!validateMobile($mobile)) {
        $errors[] = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!validateEmail($email)) {
        $errors[] = 'Please enter a valid email address';
    }

    if (!validateMessage($message)) {
        $errors[] = 'Message must be less than 500 characters';
    }

    if (!empty($errors)) {
        ob_clean();
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        ob_end_flush();
        exit();
    }

    // Create database if not exists
    if (!createDatabaseIfNotExists()) {
        throw new Exception('Failed to create database');
    }

    // Get database connection
    $conn = getConnection();
    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    // Create table if not exists
    if (!createLeadsTableIfNotExists($conn)) {
        throw new Exception('Failed to create leads table');
    }

    // Check for duplicate submission (same email or mobile in last 24 hours)
    $checkSql = "SELECT id FROM leads
                 WHERE (email = :email OR mobile = :mobile)
                 AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->execute([
        ':email' => $email,
        ':mobile' => $mobile
    ]);

    if ($checkStmt->rowCount() > 0) {
        ob_clean();
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'You have already submitted an enquiry recently. Our team will contact you soon.',
            'duplicate' => true
        ]);
        ob_end_flush();
        exit();
    }

    // Insert lead into database
    $sql = "INSERT INTO leads (name, mobile, email, message, source, ip_address, user_agent)
            VALUES (:name, :mobile, :email, :message, :source, :ip_address, :user_agent)";

    $stmt = $conn->prepare($sql);
    $result = $stmt->execute([
        ':name' => $name,
        ':mobile' => $mobile,
        ':email' => $email,
        ':message' => $message ?: null,
        ':source' => $source,
        ':ip_address' => getClientIP(),
        ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null
    ]);

    if ($result) {
        $leadId = $conn->lastInsertId();

        // Prepare lead data for email
        $leadData = [
            'name' => $name,
            'mobile' => $mobile,
            'email' => $email,
            'message' => $message,
            'source' => $source
        ];

        // Send email notification (non-blocking - don't fail if email fails)
        $emailSent = sendLeadEmail($leadData, $leadId);

        if (!$emailSent) {
            error_log("Warning: Lead #$leadId saved but email notification failed");
        }

        ob_clean();
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your interest! Our team will contact you shortly.',
            'lead_id' => $leadId,
            'email_sent' => $emailSent
        ]);
    } else {
        throw new Exception('Failed to save lead');
    }

} catch (Exception $e) {
    // Clear any buffered output
    ob_clean();

    error_log("Lead submission error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while processing your request. Please try again later.'
    ]);
}

// End output buffering and flush
ob_end_flush();
