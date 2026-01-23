<?php
/**
 * Database Configuration
 *
 * This file contains the database connection settings.
 * Update these values with your actual database credentials.
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'rgkuwjpumm');
define('DB_USER', 'rgkuwjpumm');
define('DB_PASS', '**********');
define('DB_CHARSET', 'utf8mb4');

/**
 * Get database connection
 *
 * @return PDO|null Database connection or null on failure
 */
function getConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

/**
 * Get database connection without database selection (for creating database)
 *
 * @return PDO|null Database connection or null on failure
 */
function getConnectionWithoutDB() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}
