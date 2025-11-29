import { Router } from "express";
import { withConn } from "./db.js";

const router = Router();

// Helper to safely convert BigInt values to Numbers/strings for JSON
function serialiseRow(row) {
  if (!row || typeof row !== "object") return row;
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    if (typeof value === "bigint") {
      // Most of our BIGINTs are ids and safe to cast for this UI
      out[key] = Number(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function serialiseRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(serialiseRow);
}

// All routes here are mounted behind authMiddleware + requireAdmin in index.js

// ---- Users ----
router.get("/users", async (req, res) => {
  try {
    const usersRaw = await withConn(async (conn) => {
      const rows = await conn.query(
        "SELECT id, email, is_admin, created_at FROM users ORDER BY created_at DESC LIMIT 200"
      );
      return rows;
    });
    const users = serialiseRows(usersRaw);
    return res.json({ ok: true, users });
  } catch (err) {
    console.error("Admin GET /users error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load users" });
  }
});

router.patch("/users/:id/admin", async (req, res) => {
  const userId = Number(req.params.id);
  const { is_admin } = req.body ?? {};

  if (Number.isNaN(userId)) {
    return res.status(400).json({ ok: false, error: "Invalid user id" });
  }

  const adminFlag = is_admin ? 1 : 0;

  try {
    await withConn(async (conn) => {
      await conn.query("UPDATE users SET is_admin = ? WHERE id = ?", [adminFlag, userId]);
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Admin PATCH /users/:id/admin error:", err);
    return res.status(500).json({ ok: false, error: "Failed to update user" });
  }
});

router.delete("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    return res.status(400).json({ ok: false, error: "Invalid user id" });
  }

  try {
    await withConn(async (conn) => {
      await conn.query("DELETE FROM users WHERE id = ?", [userId]);
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Admin DELETE /users/:id error:", err);
    return res.status(500).json({ ok: false, error: "Failed to delete user" });
  }
});

// ---- Games ----
router.get("/games", async (req, res) => {
  try {
    const gamesRaw = await withConn(async (conn) => {
      const rows = await conn.query("SELECT * FROM games ORDER BY created_at DESC LIMIT 200");
      return rows;
    });
    const games = serialiseRows(gamesRaw);
    return res.json({ ok: true, games });
  } catch (err) {
    console.error("Admin GET /games error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load games" });
  }
});

router.post("/games", async (req, res) => {
  const {
    name,
    short_description,
    detailed_description,
    platform,
    release_date,
    developer,
    publisher,
    redirect_url_android,
    redirect_url_ios,
  } = req.body ?? {};

  if (!name || !short_description || !detailed_description || !platform || !release_date || !developer || !publisher || !redirect_url_android || !redirect_url_ios) {
    return res.status(400).json({ ok: false, error: "Missing required game fields" });
  }

  try {
    const insertedId = await withConn(async (conn) => {
      const result = await conn.query(
        `INSERT INTO games
        (name, short_description, detailed_description, platform, release_date, developer, publisher, redirect_url_android, redirect_url_ios)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          short_description,
          detailed_description,
          platform,
          release_date,
          developer,
          publisher,
          redirect_url_android,
          redirect_url_ios,
        ]
      );
      return Number(result.insertId);
    });

    return res.status(201).json({ ok: true, game_id: insertedId });
  } catch (err) {
    console.error("Admin POST /games error:", err);
    return res.status(500).json({ ok: false, error: "Failed to create game" });
  }
});

router.patch("/games/:id", async (req, res) => {
  const gameId = Number(req.params.id);
  if (Number.isNaN(gameId)) {
    return res.status(400).json({ ok: false, error: "Invalid game id" });
  }

  const allowedFields = [
    "name",
    "short_description",
    "detailed_description",
    "platform",
    "release_date",
    "developer",
    "publisher",
    "redirect_url_android",
    "redirect_url_ios",
  ];

  const updates = [];
  const values = [];
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(req.body ?? {}, field)) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (!updates.length) {
    return res.json({ ok: true });
  }

  values.push(gameId);

  try {
    await withConn(async (conn) => {
      await conn.query(`UPDATE games SET ${updates.join(", ")} WHERE game_id = ?`, values);
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Admin PATCH /games/:id error:", err);
    return res.status(500).json({ ok: false, error: "Failed to update game" });
  }
});

router.delete("/games/:id", async (req, res) => {
  const gameId = Number(req.params.id);
  if (Number.isNaN(gameId)) {
    return res.status(400).json({ ok: false, error: "Invalid game id" });
  }

  try {
    await withConn(async (conn) => {
      await conn.query("DELETE FROM games WHERE game_id = ?", [gameId]);
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Admin DELETE /games/:id error:", err);
    return res.status(500).json({ ok: false, error: "Failed to delete game" });
  }
});

// ---- Reviews ----
router.get("/reviews", async (req, res) => {
  try {
    const reviewsRaw = await withConn(async (conn) => {
      const rows = await conn.query(
        `SELECT r.review_id, r.game_id, r.user_id, r.rating, r.comment, r.created_at,
                g.name AS game_name, u.email AS user_email
         FROM reviews r
         JOIN games g ON r.game_id = g.game_id
         JOIN users u ON r.user_id = u.id
         ORDER BY r.created_at DESC
         LIMIT 200`
      );
      return rows;
    });
    const reviews = serialiseRows(reviewsRaw);
    return res.json({ ok: true, reviews });
  } catch (err) {
    console.error("Admin GET /reviews error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load reviews" });
  }
});

router.delete("/reviews/:id", async (req, res) => {
  const reviewId = Number(req.params.id);
  if (Number.isNaN(reviewId)) {
    return res.status(400).json({ ok: false, error: "Invalid review id" });
  }

  try {
    await withConn(async (conn) => {
      await conn.query("DELETE FROM reviews WHERE review_id = ?", [reviewId]);
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Admin DELETE /reviews/:id error:", err);
    return res.status(500).json({ ok: false, error: "Failed to delete review" });
  }
});

export default router;

