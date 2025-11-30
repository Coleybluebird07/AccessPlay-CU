import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Correct  path
const LOG_FILE = path.join(process.cwd(), "auth-server/data/systemLogs.json");

// Read logs
function readLogs() {
  if (!fs.existsSync(LOG_FILE)) return [];
  return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
}

// Write logs
function writeLogs(logs) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

// posts api logs
router.post("/", (req, res) => {
  const { message, userId = null, details = null } = req.body;

  const logs = readLogs();

  const logEntry = {
    timestamp: new Date().toISOString(),
    message,
    userId,
    details,
  };

  logs.push(logEntry);
  writeLogs(logs);

  res.json({ ok: true, message: "Log saved", entry: logEntry });
});

// get api logs
router.get("/", (req, res) => {
  const logs = readLogs();
  res.json(logs);
});

export default router;
