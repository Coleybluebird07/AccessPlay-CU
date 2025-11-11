import { Router } from "express";
import { withConn } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "./validators.js";

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

export default router;
