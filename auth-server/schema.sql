CREATE DATABASE IF NOT EXISTS `group_test_auth` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `group_test_auth`;


CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- admin flag: 1 = admin, 0 = normal user
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  INDEX (email)
);

CREATE TABLE IF NOT  EXISTS games (
    game_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_description VARCHAR(512) NOT NULL,
    detailed_description TEXT NOT NULL,
    platform VARCHAR(100) NOT NULL,
    release_date DATE NOT NULL,
    developer VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    redirect_url_android VARCHAR(512) NOT NULL,
    redirect_url_ios VARCHAR(512) NOT NULL,
    INDEX (name)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reviews (
    review_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (game_id, user_id),
    INDEX (game_id),
    INDEX (user_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS game_images (
    image_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    INDEX (game_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS accessibility_features (
    feature_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    feature_name VARCHAR(100) NOT NULL UNIQUE,
    game_id BIGINT UNSIGNED NOT NULL,
    feature_description VARCHAR(512) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    INDEX (game_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS game_features (
    feature_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT UNSIGNED NOT NULL,
    feature_description VARCHAR(512) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    INDEX (game_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS genres (
    genre_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (genre_name)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS game_genres (
    game_id BIGINT UNSIGNED NOT NULL,
    genre_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE,
    INDEX (game_id),
    INDEX (genre_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_favorites (
    user_id BIGINT UNSIGNED NOT NULL,
    game_id BIGINT UNSIGNED NOT NULL,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    INDEX (user_id),
    INDEX (game_id)
)ENGINE=InnoDB;

ALTER TABLE games ADD avg_rating DECIMAL(3,1) DEFAULT 0;

CREATE TRIGGER IF NOT EXISTS update_avg_rating_after_insert
    AFTER INSERT ON reviews
    FOR EACH ROW
    UPDATE games
    SET avg_rating = (
        SELECT ROUND(AVG(rating), 1)
        FROM reviews
        WHERE game_id = NEW.game_id
    )
    WHERE game_id = NEW.game_id;

CREATE TRIGGER IF NOT EXISTS update_avg_rating_after_update
    AFTER UPDATE ON reviews
    FOR EACH ROW
    UPDATE games
    SET avg_rating = (
        SELECT ROUND(AVG(rating), 1)
        FROM reviews
        WHERE game_id = NEW.game_id
    )
    WHERE game_id = NEW.game_id;


