import {Router} from "express";
import {withConn} from "./db.js";

const router = Router();

// get all games
router.get("/", async (req, res) => {
    try {
        const games = await withConn(async (conn) => {
            const rows = await conn.query(`
                SELECT g.game_id,
                       g.name,
                       g.short_description,
                       g.detailed_description,
                       g.platform,
                       g.release_date,
                       g.developer,
                       g.publisher,
                       g.redirect_url_android,
                       g.redirect_url_ios,
                       (SELECT JSON_ARRAYAGG(image_url) FROM game_images WHERE game_id = g.game_id) AS images,
                       (SELECT JSON_ARRAYAGG(genres.genre_name)
                        FROM game_genres
                                 JOIN genres ON game_genres.genre_id = genres.genre_id
                        WHERE game_genres.game_id = g.game_id) AS genres FROM games g ORDER BY g.created_at DESC`);
            // Convert BigInt to string
            return rows.map(row => ({
                ...row,
                game_id: row.game_id.toString()
            }));
        });

        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Database error" });
    }
});

// get game by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const game = await withConn(async (conn) => {
            const rows = await conn.query(`
                SELECT g.*,
                       (SELECT JSON_ARRAYAGG(image_url) FROM game_images WHERE game_id = g.game_id) AS images,
                       (SELECT JSON_ARRAYAGG(genres.genre_name)
                        FROM game_genres
                                 JOIN genres ON game_genres.genre_id = genres.genre_id
                        WHERE game_genres.game_id = g.game_id) AS genres
                FROM games g
                WHERE g.game_id = ?
            `, [id]);

            if (!rows[0]) return null;

            const row = rows[0];

            // Convert ALL BigInts to strings
            for (let key in row) {
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

export default router;