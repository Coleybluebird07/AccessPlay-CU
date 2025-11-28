import { Router } from "express";
import { withConn } from "./db.js";
import { authMiddleware } from "./authMiddleware.js";

const router = Router();

// Get all games
router.get("/", async (req, res) => {
    try {
        const games = await withConn(async (conn) => {
            const rows = await conn.query(`
                SELECT
                    g.game_id,
                    g.name,
                    g.short_description,
                    g.detailed_description,
                    g.platform,
                    g.release_date,
                    g.developer,
                    g.publisher,
                    g.redirect_url_android,
                    g.redirect_url_ios,
                    (SELECT JSON_ARRAYAGG(image_url)
                     FROM game_images
                     WHERE game_id = g.game_id) AS images,
                    (SELECT JSON_ARRAYAGG(genres.genre_name)
                     FROM game_genres
                              JOIN genres ON game_genres.genre_id = genres.genre_id
                     WHERE game_genres.game_id = g.game_id) AS genres,
                    (SELECT ROUND(AVG(r.rating), 1)
                     FROM reviews r
                     WHERE r.game_id = g.game_id) AS average_rating
                FROM games g
                ORDER BY g.created_at DESC
            `);

            return rows.map((row) => ({
                ...row,
                game_id: row.game_id.toString(),
            }));
        });

        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Database error" });
    }
});

// Get single game by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const game = await withConn(async (conn) => {
            const rows = await conn.query(
                `
                    SELECT
                        g.*,
                        (SELECT JSON_ARRAYAGG(image_url)
                         FROM game_images
                         WHERE game_id = g.game_id) AS images,
                        (SELECT JSON_ARRAYAGG(genres.genre_name)
                         FROM game_genres
                                  JOIN genres ON game_genres.genre_id = genres.genre_id
                         WHERE game_genres.game_id = g.game_id) AS genres,
                        (SELECT ROUND(AVG(r.rating), 1)
                         FROM reviews r
                         WHERE r.game_id = g.game_id) AS average_rating
                    FROM games g
                    WHERE g.game_id = ?
                `,
                [id],
            );

            if (!rows[0]) return null;

            const row = rows[0];

            for (const key in row) {
                if (typeof row[key] === "bigint") {
                    row[key] = row[key].toString();
                }
            }

            return row;
        });

        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }

        res.json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// Get reviews for a game
router.get("/:id/reviews", async (req, res) => {
    const id = req.params.id;

    try {
        const reviews = await withConn(async (conn) => {
            const rows = await conn.query(
                `
                    SELECT
                        r.review_id,
                        r.user_id,
                        r.rating,
                        r.comment,
                        r.created_at,
                        u.email AS reviewer_email
                    FROM reviews r
                             JOIN users u ON r.user_id = u.id
                    WHERE r.game_id = ?
                    ORDER BY r.created_at DESC
                `,
                [id],
            );

            return rows.map((row) => ({
                ...row,
                review_id: row.review_id?.toString() ?? row.review_id,
                user_id: row.user_id?.toString() ?? row.user_id,
            }));
        });

        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// Create / update review (one per user per game)
router.post("/:id/reviews", authMiddleware, async (req, res) => {
    const gameId = Number(req.params.id);
    const userId = Number(req.user.id);
    const rating = Number(req.body.rating);
    const comment = req.body.comment?.trim();

    if (!rating || !comment) {
        return res
            .status(400)
            .json({ ok: false, error: "Rating and comment required" });
    }

    try {
        await withConn(async (conn) => {
            const existing = await conn.query(
                `SELECT review_id FROM reviews WHERE game_id = ? AND user_id = ?`,
                [gameId, userId],
            );

            if (existing.length > 0) {
                await conn.query(
                    `
                        UPDATE reviews
                        SET rating = ?, comment = ?, created_at = NOW()
                        WHERE game_id = ? AND user_id = ?
                    `,
                    [rating, comment, gameId, userId],
                );
            } else {
                await conn.query(
                    `
                        INSERT INTO reviews (game_id, user_id, rating, comment)
                        VALUES (?, ?, ?, ?)
                    `,
                    [gameId, userId, rating, comment],
                );
            }
        });

        res.json({ ok: true, message: "Review saved" });
    } catch (err) {
        console.error("Review error:", err);
        res.status(500).json({ ok: false, error: "Database error" });
    }
});

export default router;
