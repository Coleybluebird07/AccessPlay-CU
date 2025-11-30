import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const FILE_PATH = path.join(process.cwd(), "auth-server/data/userPreferences.json");

// Read preferences
function readPreferences() {
    if (!fs.existsSync(FILE_PATH)) return {};
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}


// Save preferences
function writePreferences(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}


// Get settings for user
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    const allPrefs = readPreferences();

    const defaultSettings = {
        darkMode: false,
        highContrast: false,
        textSize: "medium",
    };

    res.json(allPrefs[userId] || defaultSettings);
});



// Save/update settings
router.post("/:userId", (req, res) => {
    const userId = req.params.userId;
    const newSettings = req.body;

    const allPrefs = readPreferences();
    allPrefs[userId] = newSettings;

    writePreferences(allPrefs);

    res.json({
        message: "Preferences updated",
        preferences: newSettings
    });
});

export default router;
