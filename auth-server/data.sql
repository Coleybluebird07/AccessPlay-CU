USE `group_test_auth`;



INSERT INTO genres (genre_name) VALUES
                                    ('Puzzle'),
                                    ('Adventure'),
                                    ('RPG'),
                                    ('Casual'),
                                    ('Simulations'),
                                    ('Word Games'),
                                    ('Card Games'),
                                    ('Board Games'),
                                    ('Music & Rhythm'),
                                    ('Educational'),
                                    ('Trivia');

INSERT INTO games
(name, short_description, detailed_description, platform, release_date, developer, publisher, redirect_url_android, redirect_url_ios)
VALUES
    ('Puzzle Quest', 'A fun puzzle game.', 'Detailed description for Puzzle Quest.', 'Android/iOS', '2024-01-01', 'Dev Studio A', 'Publisher A', 'http://example.com/android1', 'http://example.com/ios1'),
    ('Adventure Run', 'Adventure platformer game.', 'Detailed adventure game description.', 'Android/iOS', '2024-02-10', 'Dev Studio B', 'Publisher B', 'http://example.com/android2', 'http://example.com/ios2'),
    ('Word Master', 'Word puzzle game.', 'Full description for Word Master.', 'Android/iOS', '2024-03-15', 'Dev Studio C', 'Publisher C', 'http://example.com/android3', 'http://example.com/ios3');


INSERT INTO accessibility_features (feature_name, game_id, feature_description)
VALUES
    ('Color Blind Mode', 1, 'Provides alternative color palettes for players with color vision deficiency.'),
    ('Subtitle & Captions', 1, 'Displays subtitles for dialogue and captions for sound effects.'),
    ('One-Handed Play', 1, 'Allows full gameplay using only one hand for better accessibility.'),
    ('Voice Control Support', 2, 'Enables players to control gameplay actions using voice commands.'),
    ('Screen Reader Compatibility', 2, 'Fully supports screen readers for visually impaired players.'),
    ('Customize Text Size', 2, 'Players can enlarge or reduce in-game text for better readability.'),
    ('No Audio Required', 3, 'The game is fully playable without sound, using visual cues only.'),
    ('Slow-Paced Gameplay', 3, 'Ensures relaxed timing so players aren’t pressured by fast-pacing.'),
    ('Visual Audio Indicator', 1, 'Shows visual alerts for important audio cues in the game.'),
    ('Difficulty Adjustments', 1, 'Players can adjust difficulty settings anytime during play.'),
    ('Haptic Feedback Options', 2, 'Allows vibration feedback to be reduced or disabled.'),
    ('High Contrast Mode', 2, 'Increases UI contrast for better visibility and clarity.'),
    ('Motion Sensitivity Options', 3, 'Includes settings to reduce motion blur and screen shaking.'),
    ('Customizable Controls', 3, 'Players can remap touch or controller inputs to their preference.'),
    ('Auto-Save Feature', 1, 'Automatically saves progress without requiring manual saving.'),
    ('Pause Anytime', 2, 'Allows pausing the game at any moment without limitations.');


INSERT INTO game_features (game_id, feature_description)
VALUES
    -- Game 1 Features
    (1, 'Engaging match-3 puzzle mechanics'),
    (1, 'Daily rewards and challenges'),
    (1, 'Cloud save support'),
    (1, 'Offline play available'),
    (1, 'In-app achievements'),

    -- Game 2 Features
    (2, 'Fast-paced runner mechanics'),
    (2, 'Unlockable characters'),
    (2, 'Multiple adventure maps'),
    (2, 'Real-time events'),
    (2, 'Beginner-friendly tutorial'),

    -- Game 3 Features
    (3, 'Extensive dictionary support'),
    (3, 'Daily word challenges'),
    (3, 'Multiplayer word battles'),
    (3, 'Offline gameplay support'),
    (3, 'Hint and clue system');

INSERT INTO game_genres (game_id, genre_id)
VALUES
    -- Game 1 Genres (Puzzle Quest)
    (1, 1), -- Puzzle
    (1, 4), -- Casual

    -- Game 2 Genres (Adventure Run)
    (2, 2), -- Adventure
    (2, 3), -- RPG

    -- Game 3 Genres (Word Master)
    (3, 6), -- Word Games
    (3, 10), -- Educational
    (3, 11); -- Trivia

INSERT INTO game_images (game_id, image_url)
VALUES
    (1, 'https://example.com/images/game1_img1.jpg'),
    (1, 'https://example.com/images/game1_img2.jpg'),
    (2, 'https://example.com/images/game2_img1.jpg'),
    (2, 'https://example.com/images/game2_img2.jpg'),
    (3, 'https://example.com/images/game3_img1.jpg');


INSERT INTO users (email, password_hash, created_at, is_admin) VALUES
                                                         ('user10@example.com', '$2y$10$A1b2C3d4E5f6G7h8I9j0kLmNOpQrStUvWxYz1234567890abcd', '2025-01-01 10:00:00', 0),
                                                         ('user11@example.com', '$2y$10$Z9y8X7w6V5u4T3s2R1q0pOnMlKjIhHgFeDcBa9876543210zyxw', '2025-01-01 10:05:00', 0),
                                                         ('user12@example.com', '$2y$10$PpQqRrSsTtUuVvWwXxYyZzAaBbCcDdEeFfGgHh1234567890ab', '2025-01-01 10:10:00', 0),
                                                         ('user14@example.com', '$2y$10$M1n2B3v4C5x6N7m8Z9p0LqRrStUvWxYzAaBbCcDdEeFfGgHhIi', '2025-01-01 10:15:00', 0),
                                                         ('user15@example.com', '$2y$10$QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKk1234567890bb', '2025-01-01 10:20:00', 0),
                                                         ('user17@example.com', '$2y$10$LkJjHhGgFfDdSsAaPpOoIiUuYyTtRrEeWwQq0987654321mm', '2025-01-01 10:25:00', 0),
                                                         ('user18@example.com', '$2y$10$AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRr1234567890cc', '2025-01-01 10:30:00', 0),
                                                         ('user22@example.com', '$2y$10$TtRrEeWwQqYyUuIiOoPpAaSsDdFfGgHhJjKk0987654321dd', '2025-01-01 10:35:00', 0),
                                                         ('admin@gmail.com', '$2b$10$wA7Jd1U3pJZP.OX6Myw0ru0oZf6DkDaM1rD2s5cYwYdUkg3ZgVbFi', NOW(), 1); #is admin set to 1 (admin user)


INSERT INTO reviews (game_id, user_id, rating, comment, created_at) VALUES
                                                                        (1, 1, 5, 'Amazing game! Great graphics and smooth gameplay. Highly recommend.', '2025-01-02 14:20:10'),
                                                                        (1, 4, 4, 'Very enjoyable overall, but levels get repetitive.', '2025-01-05 09:42:33'),
                                                                        (1, 7, 3, 'Decent but could use more content.', '2025-01-07 17:20:55'),

                                                                        (2, 8, 5, 'Absolutely loved it! Storyline was super immersive.', '2025-01-03 11:30:45'),
                                                                        (2, 3, 2, 'Not really my type of game. Controls felt clunky.', '2025-01-08 08:22:11'),
                                                                        (2, 2, 4, 'Pretty fun and the music is great.', '2025-01-09 21:15:37'),

                                                                        (3, 3, 3, 'Good concept but has some bugs.', '2025-01-10 12:10:18'),
                                                                        (3, 4, 4, 'Enjoyable and unique mechanics. Worth trying.', '2025-01-11 16:49:02'),
                                                                        (3, 5, 5, 'One of the best games I’ve played this year!', '2025-01-12 19:04:29');
