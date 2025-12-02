USE `group7_auth`;



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
    ('Word Master', 'Word puzzle game.', 'Full description for Word Master.', 'Android/iOS', '2024-03-15', 'Dev Studio C', 'Publisher C', 'http://example.com/android3', 'http://example.com/ios3'),
    ('Galaxy Builder', 'Build your own galaxy and explore space.', 'A sandbox galaxy-creation game where players design planets, stars, and civilizations.', 'Android/iOS', '2024-04-21', 'NebulaSoft', 'Cosmic Games', 'https://example.com/android4', 'https://example.com/ios4'),
    ('Mystery Manor', 'Solve mysteries inside a haunted mansion.', 'A puzzle adventure game full of riddles, ghosts, and hidden clues.', 'Android/iOS', '2024-05-12', 'ShadowPeak Studios', 'Nightfall Publishing', 'https://example.com/android5', 'https://example.com/ios5'),
    ('Speed Drift X', 'High-speed futuristic racing.', 'A neon-lit racing experience with customizable hover cars.', 'Android/iOS', '2024-06-30', 'TurboDev', 'Velocity Corp', 'https://example.com/android6', 'https://example.com/ios6'),
    ('Castle Defender', 'Defend your kingdom!', 'Tower defense strategy game with upgradeable heroes.', 'Android/iOS', '2024-07-18', 'IronForge', 'BattleGate', 'https://example.com/android7', 'https://example.com/ios7'),
    ('Zen Garden Life', 'Relax and build gardens.', 'A peaceful simulation game focused on creativity and calm.', 'Android/iOS', '2024-08-02', 'Harmony Studio', 'ZenPlay', 'https://example.com/android8', 'https://example.com/ios8'),
    ('Crypto Tycoon', 'Build a crypto empire.', 'A business sim where players mine, trade, and manage virtual assets.', 'Android/iOS', '2024-08-17', 'FutureChain', 'DigitalCraft', 'https://example.com/android9', 'https://example.com/ios9'),
    ('Ninja Strike', 'Fast-paced ninja action.', 'Side-scrolling action game with combos and stealth mechanics.', 'Android/iOS', '2024-09-05', 'RedMoon Studio', 'BladeWorks', 'https://example.com/android10', 'https://example.com/ios10'),
    ('Island Survival 3D', 'Survive on a deserted island.', 'Collect resources, craft tools, and survive dangerous wildlife.', 'Android/iOS', '2024-10-01', 'WildCore', 'SurvivalTech', 'https://example.com/android11', 'https://example.com/ios11'),
    ('CyberChess', 'Chess in a cyberpunk world.', 'Tactical chess battles with special abilities and ranked multiplayer.', 'Android/iOS', '2024-11-11', 'QuantumBit', 'Nightgrid', 'https://example.com/android12', 'https://example.com/ios12');


INSERT INTO accessibility_features (feature_name, feature_description)
VALUES
    ('Color Blind Mode', 'Provides alternative color palettes for players with color vision deficiency.'),
    ('Subtitle & Captions', 'Displays subtitles for dialogue and captions for sound effects.'),
    ('One-Handed Play', 'Allows full gameplay using only one hand for better accessibility.'),
    ('Voice Control Support', 'Enables players to control gameplay actions using voice commands.'),
    ('Screen Reader Compatibility', 'Fully supports screen readers for visually impaired players.'),
    ('Customize Text Size', 'Players can enlarge or reduce in-game text for better readability.'),
    ('No Audio Required', 'The game is fully playable without sound, using visual cues only.'),
    ('Slow-Paced Gameplay', 'Ensures relaxed timing so players aren’t pressured by fast-pacing.'),
    ('Visual Audio Indicator', 'Shows visual alerts for important audio cues in the game.'),
    ('Difficulty Adjustments', 'Players can adjust difficulty settings anytime during play.'),
    ('Haptic Feedback Options', 'Allows vibration feedback to be reduced or disabled.'),
    ('High Contrast Mode', 'Increases UI contrast for better visibility and clarity.'),
    ('Motion Sensitivity Options', 'Includes settings to reduce motion blur and screen shaking.'),
    ('Customizable Controls', 'Players can remap touch or controller inputs to their preference.'),
    ('Auto-Save Feature', 'Automatically saves progress without requiring manual saving.'),
    ('Pause Anytime', 'Allows pausing the game at any moment without limitations.');


INSERT INTO game_features (feature_id, game_id) VALUES
-- Game 1
(1,1),(2,1),(3,1),(9,1),(10,1),(15,1),

-- Game 2
(4,2),(5,2),(6,2),(11,2),(16,2),

-- Game 3
(7,3),(8,3),(13,3),(14,3),

-- Game 4
(12,4),(15,4),

-- Game 5
(1,5),(2,5),

-- Game 6
(8,6),(6,6),

-- Game 7
(7,7),(13,7),

-- Game 8
(5,8),(3,8),

-- Game 9
(9,9),(11,9),

-- Game 10
(1,10),(15,10),

-- Game 11
(10,11),

-- Game 12
(16,12);


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
    (3, 11), -- Trivia

    (4, 5), (4, 2),   -- Galaxy Builder: Simulations, Adventure
    (5, 1), (5, 2),   -- Mystery Manor: Puzzle, Adventure
    (6, 4), (6, 2),   -- Speed Drift X: Casual, Adventure
    (7, 5), (7, 3),   -- Castle Defender: Simulations, RPG
    (8, 4), (8, 5),   -- Zen Garden Life: Casual, Simulations
    (9, 5), (9, 11),  -- Crypto Tycoon: Sims, Trivia
    (10, 3), (10, 2), -- Ninja Strike: RPG, Adventure
    (11, 5), (11, 4), -- Island Survival: Sims, Casual
    (12, 7), (12, 8); -- CyberChess: Card, Board

INSERT INTO game_images (game_id, image_url) VALUES
                                                 (1,'https://example.com/images/game1_img1.jpg'),
                                                 (1,'https://example.com/images/game1_img2.jpg'),
                                                 (2,'https://example.com/images/game2_img1.jpg'),
                                                 (2,'https://example.com/images/game2_img2.jpg'),
                                                 (3,'https://example.com/images/game3_img1.jpg'),
                                                 (3,'https://example.com/images/game3_img2.jpg'),
                                                 (4,'https://example.com/images/galaxy1.jpg'),
                                                 (4,'https://example.com/images/galaxy2.jpg'),
                                                 (5,'https://example.com/images/manor1.jpg'),
                                                 (5,'https://example.com/images/manor2.jpg'),
                                                 (6,'https://example.com/images/drift1.jpg'),
                                                 (6,'https://example.com/images/drift2.jpg'),
                                                 (7,'https://example.com/images/castle1.jpg'),
                                                 (7,'https://example.com/images/castle2.jpg'),
                                                 (8,'https://example.com/images/zen1.jpg'),
                                                 (9,'https://example.com/images/crypto1.jpg'),
                                                 (9,'https://example.com/images/crypto2.jpg'),
                                                 (10,'https://example.com/images/ninja1.jpg'),
                                                 (10,'https://example.com/images/ninja2.jpg'),
                                                 (11,'https://example.com/images/island1.jpg'),
                                                 (11,'https://example.com/images/island2.jpg'),
                                                 (12,'https://example.com/images/cyberchess1.jpg');



INSERT INTO users (email, password_hash, created_at) VALUES
                                                         ('user10@example.com', '$2y$10$A1b2C3d4E5f6G7h8I9j0kLmNOpQrStUvWxYz1234567890abcd', '2025-01-01 10:00:00'),
                                                         ('user11@example.com', '$2y$10$Z9y8X7w6V5u4T3s2R1q0pOnMlKjIhHgFeDcBa9876543210zyxw', '2025-01-01 10:05:00'),
                                                         ('user12@example.com', '$2y$10$PpQqRrSsTtUuVvWwXxYyZzAaBbCcDdEeFfGgHh1234567890ab', '2025-01-01 10:10:00'),
                                                         ('user14@example.com', '$2y$10$M1n2B3v4C5x6N7m8Z9p0LqRrStUvWxYzAaBbCcDdEeFfGgHhIi', '2025-01-01 10:15:00'),
                                                         ('user15@example.com', '$2y$10$QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKk1234567890bb', '2025-01-01 10:20:00'),
                                                         ('user17@example.com', '$2y$10$LkJjHhGgFfDdSsAaPpOoIiUuYyTtRrEeWwQq0987654321mm', '2025-01-01 10:25:00'),
                                                         ('user18@example.com', '$2y$10$AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRr1234567890cc', '2025-01-01 10:30:00'),
                                                         ('user22@example.com', '$2y$10$TtRrEeWwQqYyUuIiOoPpAaSsDdFfGgHhJjKk0987654321dd', '2025-01-01 10:35:00'),
                                                         ('user7@example.com', '$2y$10$LkJjHhGgFfDdSsAaPpOoIiUuYyTtRrEeWwQq0987654321mm', '2025-01-01 10:25:00'),
                                                         ('user8@example.com', '$2y$10$AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRr1234567890cc', '2025-01-01 10:30:00'),
                                                         ('user2@example.com', '$2y$10$TtRrEeWwQqYyUuIiOoPpAaSsDdFfGgHhJjKk0987654321dd', '2025-01-01 10:35:00');


INSERT INTO reviews (game_id, user_id, rating, comment, created_at)
VALUES (1, 1, 5, 'Amazing game! Great graphics and smooth gameplay. Highly recommend.', '2025-01-02 14:20:10'),
       (1, 4, 4, 'Very enjoyable overall, but levels get repetitive.', '2025-01-05 09:42:33'),
       (1, 7, 3, 'Decent but could use more content.', '2025-01-07 17:20:55'),

       (2, 8, 5, 'Absolutely loved it! Storyline was super immersive.', '2025-01-03 11:30:45'),
       (2, 3, 2, 'Not really my type of game. Controls felt clunky.', '2025-01-08 08:22:11'),
       (2, 2, 4, 'Pretty fun and the music is great.', '2025-01-09 21:15:37'),

       (3, 3, 3, 'Good concept but has some bugs.', '2025-01-10 12:10:18'),
       (3, 4, 4, 'Enjoyable and unique mechanics. Worth trying.', '2025-01-11 16:49:02'),
       (3, 5, 5, 'One of the best games I’ve played this year!', '2025-01-12 19:04:29'),
       (4, 3, 5, 'A beautiful galaxy simulator. Loved it!', NOW()),
       (4, 5, 4, 'Very creative and relaxing.', NOW()),

       (5, 9, 4, 'Creepy and smart puzzles!', NOW()),
       (5, 10, 3, 'Great atmosphere but too short.', NOW()),

       (6, 2, 5, 'Fast, smooth, futuristic racing!', NOW()),
       (6, 7, 4, 'Good visuals and gameplay.', NOW()),

       (7, 1, 5, 'Best tower defense I’ve played!', NOW()),
       (7, 3, 4, 'Addictive gameplay.', NOW()),

       (8, 8, 5, 'Very calming experience.', NOW()),
       (8, 9, 4, 'Great for stress relief.', NOW()),

       (9, 3, 3, 'Interesting idea but too grindy.', NOW()),

       (10, 2, 5, 'Amazing ninja combat!', NOW()),
       (10, 9, 4, 'Good combos and action.', NOW()),

       (11, 9, 5, 'A great survival challenge!', NOW()),
       (11, 10, 4, 'Fun and tough island survival.', NOW()),

       (12, 10, 5, 'Chess meets cyberpunk—love it!', NOW());
