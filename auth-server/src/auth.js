import { Router } from "express";
import { withConn } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema, changeEmailSchema, changePasswordSchema } from "./validators.js";
import { authMiddleware } from "./authMiddleware.js";


const router = Router();

function signToken(user) {
  const payload = { sub: String(user.id), email: user.email };
  const secret = process.env.JWT_SECRET || "dev_secret";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, secret, { expiresIn });
}

// register
router.post("/register", async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ ok: false, error: error.message });

    const { email, password } = value;

    // Check if the email already exists
    const exists = await withConn(async (conn) => {
      const rows = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
      return rows.length > 0;
    });
    if (exists) return res.status(409).json({ ok: false, error: "Email already in use" });

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    const inserted = await withConn(async (conn) => {
      const result = await conn.query(
          "INSERT INTO users (email, password_hash) VALUES (?, ?)",
          [email, password_hash]
      );
      return { id: Number(result.insertId), email };
    });

    const token = signToken(inserted);
    return res.status(201).json({ ok: true, user: inserted, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ ok: false, error: error.message });

    const { email, password } = value;

    const user = await withConn(async (conn) => {
      const rows = await conn.query(
          "SELECT id, email, password_hash FROM users WHERE email = ?",
          [email]
      );
      return rows[0];
    });

    if (!user) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const safeUser = { id: Number(user.id), email: user.email };

    const token = signToken(safeUser);
    return res.json({ ok: true, user: safeUser, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = Number(req.user.id);

    const user = await withConn(async (conn) => {
      const rows = await conn.query(
          "SELECT id, email, created_at FROM users WHERE id = ?",
          [userId]
      );
      return rows[0] || null;
    });

    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    const safeUser = {
      id: Number(user.id),
      email: user.email,
      created_at: user.created_at,
    };

    return res.json({ ok: true, user: safeUser });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

//Requires JWT. Checks current password, then updates with hash.
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { error, value } = changePasswordSchema.validate(req.body);
    if (error) {
      return res
          .status(400)
          .json({ ok: false, error: error.details[0].message });
    }

    const { currentPassword, newPassword } = value;
    const userId = Number(req.user.id);

    // Get current password hash
    const user = await withConn(async (conn) => {
      const rows = await conn.query(
          "SELECT id, password_hash FROM users WHERE id = ?",
          [userId]
      );
      return rows[0] || null;
    });

    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password_hash);
    if (!match) {
      return res
          .status(401)
          .json({ ok: false, error: "Current password is incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await withConn(async (conn) => {
      await conn.query(
          "UPDATE users SET password_hash = ? WHERE id = ?",
          [newHash, userId]
      );
    });

    return res.json({ ok: true, message: "Password updated successfully" });
  } catch (e) {
    console.error("Change password error:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Needs JWT. Confirms password, checks email is unused, updates and returns new token.
router.post("/change-email", authMiddleware, async (req, res) => {
  try {
    const { error, value } = changeEmailSchema.validate(req.body);
    if (error) {
      return res
          .status(400)
          .json({ ok: false, error: error.details[0].message });
    }

    const { newEmail, password } = value;
    const userId = Number(req.user.id);

    const user = await withConn(async (conn) => {
      const rows = await conn.query(
          "SELECT id, email, password_hash FROM users WHERE id = ?",
          [userId]
      );
      return rows[0] || null;
    });

    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    // Check password matches
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res
          .status(401)
          .json({ ok: false, error: "Password is incorrect" });
    }

    // Check email not already in use
    const existing = await withConn(async (conn) => {
      const rows = await conn.query(
          "SELECT id FROM users WHERE email = ? AND id != ?",
          [newEmail, userId]
      );
      return rows[0] || null;
    });

    if (existing) {
      return res
          .status(409)
          .json({ ok: false, error: "Email is already in use" });
    }

    // Update email
    await withConn(async (conn) => {
      await conn.query("UPDATE users SET email = ? WHERE id = ?", [
        newEmail,
        userId,
      ]);
    });

    const safeUser = { id: userId, email: newEmail };
    const token = signToken(safeUser);

    return res.json({
      ok: true,
      message: "Email updated successfully",
      user: safeUser,
      token,
    });
  } catch (e) {
    console.error("Change email error:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});



export default router;
