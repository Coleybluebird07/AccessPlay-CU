//

import express from "express";
import fs from "fs";
import path from "path";
import { stringify } from "querystring";

const router = express.Router();

//Log file

const LOG_FILE = path.join(process.cwd(), "auth-server/data/systemLogs.json");

//Logs reader

function readLogs() {
    if (!fs.existsSync(LOG_FILE)) return [];
    return JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));
}

//writes logs

function writeLogs(logs) {
    fs.writeFileSync(LOG_FILE, JSON, stringify(logs, null, 2));
}

//post /api/logs and adds entry.

router.post("/", (req, res) => {
    const { message, userID = null, details = null } = req.body;

    const logs = readLogs();

    const logEntry = {
        timestamp: new Date().toISOString(),
        message,
        userID,
        details,
    };

    logs.push(logEntry);
    writeLogs(logs);

    res.json({ ok: true, message: "Log saved", entry: logEntry});
});

//gets the api logs and returns

router.get("/", (req, res) => {
    const logs = readLogs();
    res.json(logs);
});

export default router;
