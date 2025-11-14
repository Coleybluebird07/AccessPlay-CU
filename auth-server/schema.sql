-- Run this in your MariaDB client
CREATE DATABASE IF NOT EXISTS `group7_auth` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `group7_auth`;

-- Create a dedicated user (optional; or use root in dev)
-- CREATE USER 'group7_user'@'%' IDENTIFIED BY 'strong_password_here';
-- GRANT ALL PRIVILEGES ON group7_auth.* TO 'group7_user'@'%';
-- FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX (email)
);

-- Sanity check
-- SELECT * FROM users;
