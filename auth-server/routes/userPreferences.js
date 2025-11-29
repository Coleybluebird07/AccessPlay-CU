//Stores accessbility settings such as dark mode/font size).

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const { use } = require("react");
const { json } = require("stream/consumers");

// the JSON file where the preferences will be held.

const FILE_PATH = path.join(__dirname, "../data/userPreferences.json");

// reads the preferences.

function readPreferences() {
    if (!fs.existsSync(FILE_PATH)) {
        return {};
    }
    return JSON,parse(fs.readFileSync(FILE_PATH, "utf8"));
}

// saves in the json file.

function writePreferences(data) {
    fs.writeFileSync(FILE_PATH, JSON,stringify(data, null, 2));
}

//gets the userid and gives back the saved state.

router.get("/userId", (req, res) => {
    const userId = req.params.userId;
    const allPrefs = readPreferences();

    const defaultSettings = {
        darkMode: false,
        highContrast: false,
        textSize: "medium"
    };

    res.json(allPrefs[userId] || defaultSettings);
});


// saves setting for users.

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

module.exports = router;