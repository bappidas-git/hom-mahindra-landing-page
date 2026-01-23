# Lead Form API Setup Guide

This guide explains how to set up the PHP backend for the lead form submission.

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- PDO MySQL extension enabled
- For Gmail SMTP: PHPMailer library (optional but recommended)

## Quick Start

### 1. Configure Database and Email Settings

Edit the `config.php` file and update the following:

```php
// Database Configuration
define('DB_HOST', 'localhost');      // Your MySQL host
define('DB_NAME', 'mahindra_blossom');  // Database name (will be created automatically)
define('DB_USER', 'your_username');  // MySQL username
define('DB_PASS', 'your_password');  // MySQL password

// Email Configuration (Gmail SMTP)
define('SMTP_USERNAME', 'your-email@gmail.com');  // Your Gmail address
define('SMTP_PASSWORD', 'your-app-password');      // Gmail App Password
define('SMTP_FROM_EMAIL', 'your-email@gmail.com');
define('NOTIFICATION_EMAILS', 'marketing@homadvisory.com');  // Where to send lead notifications
```

### 2. Setting Up Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security > 2-Step Verification (enable it if not already)
3. Go to Security > App Passwords: https://myaccount.google.com/apppasswords
4. Create a new app password:
   - Select "Mail" as the app
   - Select "Other" as the device
   - Name it "Mahindra Blossom Lead Form"
5. Copy the 16-character password and use it in `config.php`

### 3. Install PHPMailer (Recommended)

For reliable Gmail SMTP delivery, install PHPMailer:

```bash
cd public/api
mkdir PHPMailer && cd PHPMailer
# Download PHPMailer files or use Composer
```

Or download manually from: https://github.com/PHPMailer/PHPMailer

Create this folder structure:
```
public/api/
├── PHPMailer/
│   └── src/
│       ├── Exception.php
│       ├── PHPMailer.php
│       └── SMTP.php
├── config.php
├── lead-handler.php
└── README.md
```

### 4. Database Setup

The database and table will be created automatically on the first form submission. The PHP script creates:

- Database: `mahindra_blossom` (or whatever you set in `DB_NAME`)
- Table: `leads` with the following structure:

```sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    message TEXT DEFAULT NULL,
    source VARCHAR(100) DEFAULT 'website',
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent VARCHAR(500) DEFAULT NULL,
    referrer VARCHAR(500) DEFAULT NULL,
    status ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
    email_sent TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Development Setup

### Running PHP Development Server

To test the API locally alongside the React app:

```bash
# Terminal 1: Start PHP server on port 8080
cd public
php -S localhost:8080

# Terminal 2: Start React app
npm start
```

Then update `.env`:
```
REACT_APP_API_BASE_URL=http://localhost:8080
```

### Testing the API

```bash
# Test with cURL
curl -X POST http://localhost:8080/api/lead-handler.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","mobile":"9876543210","message":"Test message"}'
```

## Production Deployment

### Apache Configuration

Create or update `.htaccess` in your web root:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Allow direct access to API
    RewriteRule ^api/(.*)$ api/$1 [L]

    # React app routing
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### Nginx Configuration

```nginx
location /api {
    try_files $uri $uri/ =404;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

location / {
    try_files $uri $uri/ /index.html;
}
```

### Security Checklist

- [ ] Update `config.php` with production credentials
- [ ] Set `DEBUG_MODE` to `false` in production
- [ ] Update `ALLOWED_ORIGINS` with your domain
- [ ] Ensure HTTPS is enabled
- [ ] Set proper file permissions (644 for files, 755 for directories)
- [ ] Keep `config.php` out of version control with sensitive data

## Troubleshooting

### "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

This error occurs when the PHP script doesn't return valid JSON. Check:
1. PHP syntax errors in the script
2. PHP error output being sent before JSON
3. PHP extensions (PDO, json) are enabled

### Email not being sent

1. Verify Gmail App Password is correct (16 characters, no spaces)
2. Check if PHPMailer is installed correctly
3. Enable `DEBUG_MODE` in config to see detailed errors
4. Check spam folder

### Database connection fails

1. Verify MySQL credentials
2. Ensure MySQL is running
3. Check if the MySQL user has CREATE DATABASE permission

## API Response Format

### Success Response
```json
{
    "success": true,
    "message": "Thank you! Your enquiry has been submitted successfully.",
    "data": {
        "lead_id": 123,
        "email_sent": true
    }
}
```

### Error Response
```json
{
    "success": false,
    "message": "Error description",
    "data": {}
}
```

### Duplicate Lead Response (409)
```json
{
    "success": false,
    "message": "You have already submitted an enquiry with this email or mobile number.",
    "data": {
        "duplicate": true
    }
}
```

### Validation Error Response (422)
```json
{
    "success": false,
    "message": "Validation failed",
    "data": {
        "errors": {
            "name": "Please enter a valid name",
            "email": "Please enter a valid email address"
        }
    }
}
```
