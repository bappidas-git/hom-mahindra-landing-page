<?php
/**
 * Lead Form Handler
 * Mahindra Blossom Landing Page
 *
 * Handles form submissions:
 * - Validates input data
 * - Creates database table if not exists
 * - Saves lead to database
 * - Sends email notification via Gmail SMTP
 */

// Set headers first
header('Content-Type: application/json; charset=utf-8');

// Include configuration
require_once __DIR__ . '/config.php';

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = array_map('trim', explode(',', ALLOWED_ORIGINS));

if (in_array($origin, $allowedOrigins) || DEBUG_MODE) {
    header("Access-Control-Allow-Origin: " . ($origin ?: '*'));
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");
header("Access-Control-Max-Age: 86400");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST request.'
    ]);
    exit;
}

/**
 * Send JSON response and exit
 */
function sendResponse($success, $message, $data = [], $httpCode = 200) {
    http_response_code($httpCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Sanitize input string
 */
function sanitizeInput($input) {
    if (is_string($input)) {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    }
    return $input;
}

/**
 * Validate email format
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate Indian mobile number
 */
function isValidMobile($mobile) {
    // Indian mobile: starts with 6-9, followed by 9 digits
    return preg_match('/^[6-9]\d{9}$/', $mobile);
}

/**
 * Validate name
 */
function isValidName($name) {
    return preg_match('/^[a-zA-Z\s.\'-]{2,50}$/', $name);
}

/**
 * Get database connection and create table if not exists
 */
function getDbConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

        // Create database if not exists
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE `" . DB_NAME . "`");

        // Create leads table if not exists
        $createTableSQL = "
            CREATE TABLE IF NOT EXISTS `leads` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `name` VARCHAR(100) NOT NULL,
                `email` VARCHAR(255) NOT NULL,
                `mobile` VARCHAR(15) NOT NULL,
                `message` TEXT DEFAULT NULL,
                `source` VARCHAR(100) DEFAULT 'website',
                `ip_address` VARCHAR(45) DEFAULT NULL,
                `user_agent` VARCHAR(500) DEFAULT NULL,
                `referrer` VARCHAR(500) DEFAULT NULL,
                `status` ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
                `email_sent` TINYINT(1) DEFAULT 0,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX `idx_email` (`email`),
                INDEX `idx_mobile` (`mobile`),
                INDEX `idx_status` (`status`),
                INDEX `idx_created_at` (`created_at`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ";

        $pdo->exec($createTableSQL);

        return $pdo;

    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            sendResponse(false, 'Database error: ' . $e->getMessage(), [], 500);
        } else {
            sendResponse(false, 'Database connection failed. Please try again later.', [], 500);
        }
    }
}

/**
 * Check if lead already exists
 */
function checkDuplicateLead($pdo, $email, $mobile) {
    $stmt = $pdo->prepare("SELECT id FROM leads WHERE email = ? OR mobile = ? LIMIT 1");
    $stmt->execute([$email, $mobile]);
    return $stmt->fetch() !== false;
}

/**
 * Save lead to database
 */
function saveLead($pdo, $data) {
    $stmt = $pdo->prepare("
        INSERT INTO leads (name, email, mobile, message, source, ip_address, user_agent, referrer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['name'],
        $data['email'],
        $data['mobile'],
        $data['message'] ?? null,
        $data['source'] ?? 'website',
        $_SERVER['REMOTE_ADDR'] ?? null,
        substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500),
        substr($_SERVER['HTTP_REFERER'] ?? '', 0, 500)
    ]);

    return $pdo->lastInsertId();
}

/**
 * Update email sent status
 */
function updateEmailStatus($pdo, $leadId, $sent) {
    $stmt = $pdo->prepare("UPDATE leads SET email_sent = ? WHERE id = ?");
    $stmt->execute([$sent ? 1 : 0, $leadId]);
}

/**
 * Send email notification via Gmail SMTP
 */
function sendEmailNotification($data) {
    if (!ENABLE_EMAIL_NOTIFICATIONS) {
        return true;
    }

    // Use PHPMailer if available, otherwise use native mail with SMTP
    $phpmailerPath = __DIR__ . '/PHPMailer/src/PHPMailer.php';

    if (file_exists($phpmailerPath)) {
        return sendWithPHPMailer($data);
    } else {
        return sendWithNativeMail($data);
    }
}

/**
 * Send email using PHPMailer (recommended for Gmail)
 */
function sendWithPHPMailer($data) {
    require_once __DIR__ . '/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/src/SMTP.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';

        // Recipients
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);

        // Add notification recipients
        $recipients = array_map('trim', explode(',', NOTIFICATION_EMAILS));
        foreach ($recipients as $recipient) {
            if (isValidEmail($recipient)) {
                $mail->addAddress($recipient);
            }
        }

        // Reply-to the lead's email
        $mail->addReplyTo($data['email'], $data['name']);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Lead - ' . SITE_NAME . ' - ' . $data['name'];
        $mail->Body = getEmailTemplate($data);
        $mail->AltBody = getPlainTextEmail($data);

        $mail->send();
        return true;

    } catch (Exception $e) {
        if (DEBUG_MODE) {
            error_log("PHPMailer Error: " . $mail->ErrorInfo);
        }
        return false;
    }
}

/**
 * Send email using native PHP mail (fallback)
 */
function sendWithNativeMail($data) {
    $to = NOTIFICATION_EMAILS;
    $subject = 'New Lead - ' . SITE_NAME . ' - ' . $data['name'];

    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SMTP_FROM_NAME . ' <' . SMTP_FROM_EMAIL . '>',
        'Reply-To: ' . $data['name'] . ' <' . $data['email'] . '>',
        'X-Mailer: PHP/' . phpversion()
    ];

    $body = getEmailTemplate($data);

    return @mail($to, $subject, $body, implode("\r\n", $headers));
}

/**
 * Get HTML email template
 */
function getEmailTemplate($data) {
    $date = date('F j, Y \a\t g:i A');

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr>
            <td style="background: linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%); padding: 30px; text-align: center;">
                <h1 style="color: #C9A227; margin: 0; font-size: 24px; font-weight: 600;">New Lead Received</h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Mahindra Blossom - Whitefield</p>
            </td>
        </tr>

        <!-- Lead Details -->
        <tr>
            <td style="padding: 30px;">
                <h2 style="color: #0A1628; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">Contact Information</h2>

                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                            <strong style="color: #666; display: inline-block; width: 100px;">Name:</strong>
                            <span style="color: #0A1628;">{$data['name']}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                            <strong style="color: #666; display: inline-block; width: 100px;">Mobile:</strong>
                            <a href="tel:+91{$data['mobile']}" style="color: #0A1628; text-decoration: none;">+91-{$data['mobile']}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                            <strong style="color: #666; display: inline-block; width: 100px;">Email:</strong>
                            <a href="mailto:{$data['email']}" style="color: #0A1628; text-decoration: none;">{$data['email']}</a>
                        </td>
                    </tr>
HTML;

    $html = <<<HTML
                    <tr>
                        <td style="padding: 12px 0;">
                            <strong style="color: #666; display: block; margin-bottom: 5px;">Message:</strong>
                            <p style="color: #0A1628; margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px; border-left: 3px solid #C9A227;">
HTML;

    if (!empty($data['message'])) {
        $html .= htmlspecialchars($data['message']);
    } else {
        $html .= '<em style="color: #999;">No message provided</em>';
    }

    $html .= <<<HTML
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Action Buttons -->
        <tr>
            <td style="padding: 0 30px 30px 30px;">
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding-right: 10px;">
                            <a href="tel:+91{$data['mobile']}" style="display: block; background-color: #C9A227; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; text-align: center; font-weight: 600;">
                                Call Now
                            </a>
                        </td>
                        <td style="padding-left: 10px;">
                            <a href="mailto:{$data['email']}" style="display: block; background-color: #0A1628; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; text-align: center; font-weight: 600;">
                                Send Email
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="background-color: #f9f9f9; padding: 20px 30px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                    This lead was submitted on <strong>{$date}</strong><br>
                    via the Mahindra Blossom website landing page
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

    return $html;
}

/**
 * Get plain text email
 */
function getPlainTextEmail($data) {
    $date = date('F j, Y \a\t g:i A');
    $message = !empty($data['message']) ? $data['message'] : 'No message provided';

    return <<<TEXT
NEW LEAD - MAHINDRA BLOSSOM

Contact Information:
--------------------
Name: {$data['name']}
Mobile: +91-{$data['mobile']}
Email: {$data['email']}

Message:
--------
{$message}

--------------------
Submitted on: {$date}
TEXT;
}

// ============================================
// Main Execution
// ============================================

try {
    // Get input data
    $rawInput = file_get_contents('php://input');

    if (empty($rawInput)) {
        sendResponse(false, 'No data received', [], 400);
    }

    $input = json_decode($rawInput, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        sendResponse(false, 'Invalid JSON data', [], 400);
    }

    // Sanitize and validate input
    $name = sanitizeInput($input['name'] ?? '');
    $email = sanitizeInput($input['email'] ?? '');
    $mobile = preg_replace('/\D/', '', $input['mobile'] ?? '');
    $message = sanitizeInput($input['message'] ?? '');
    $source = sanitizeInput($input['source'] ?? 'website');

    // Validation
    $errors = [];

    if (empty($name)) {
        $errors['name'] = 'Name is required';
    } elseif (!isValidName($name)) {
        $errors['name'] = 'Please enter a valid name (2-50 characters, letters only)';
    }

    if (empty($email)) {
        $errors['email'] = 'Email is required';
    } elseif (!isValidEmail($email)) {
        $errors['email'] = 'Please enter a valid email address';
    }

    if (empty($mobile)) {
        $errors['mobile'] = 'Mobile number is required';
    } elseif (!isValidMobile($mobile)) {
        $errors['mobile'] = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!empty($errors)) {
        sendResponse(false, 'Validation failed', ['errors' => $errors], 422);
    }

    // Prepare lead data
    $leadData = [
        'name' => $name,
        'email' => strtolower($email),
        'mobile' => $mobile,
        'message' => $message,
        'source' => $source
    ];

    // Database operations
    if (ENABLE_DATABASE_LOGGING) {
        $pdo = getDbConnection();

        // Check for duplicate
        if (checkDuplicateLead($pdo, $leadData['email'], $leadData['mobile'])) {
            sendResponse(false, 'You have already submitted an enquiry with this email or mobile number. Our team will contact you soon.', [
                'duplicate' => true
            ], 409);
        }

        // Save lead
        $leadId = saveLead($pdo, $leadData);

        // Send email notification
        $emailSent = sendEmailNotification($leadData);

        // Update email status in database
        updateEmailStatus($pdo, $leadId, $emailSent);

        sendResponse(true, 'Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.', [
            'lead_id' => $leadId,
            'email_sent' => $emailSent
        ]);

    } else {
        // Just send email without database
        $emailSent = sendEmailNotification($leadData);

        sendResponse(true, 'Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.', [
            'email_sent' => $emailSent
        ]);
    }

} catch (Exception $e) {
    if (DEBUG_MODE) {
        sendResponse(false, 'Server error: ' . $e->getMessage(), [], 500);
    } else {
        sendResponse(false, 'An error occurred. Please try again later.', [], 500);
    }
}
