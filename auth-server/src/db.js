import mariadb from "mariadb";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

export const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

export async function withConn(fn) {
  let conn;
  try {
    conn = await pool.getConnection();
    return await fn(conn);
  } finally {
    if (conn) await conn.release();
  }
}
