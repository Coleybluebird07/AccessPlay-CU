import React, { useEffect, useState } from "react";
import "./SettingsPage.css";

export default function SettingsPage() {
  const userId = localStorage.getItem("userId");

  const [settings, setSettings] = useState({
    darkMode: false,
    highContrast: false,
    textSize: "medium",
  });

  // Load user preferences from backend
  useEffect(() => {
    if (!userId) return;

    fetch(`/api/preferences/${userId}`)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => console.log("Can't load user preferences"));
  }, [userId]);

  // Save settings to backend
  function saveSettings() {
    fetch(`/api/preferences/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
      .then(() => alert("Preferences have been saved"))
      .catch(() => alert("Error saving your preferences"));
  }



  return (
    <div className="settings-wrapper">
      <div className="settings-card">

        <h1 className="settings-title">Accessibility Preferences</h1>
        <p className="settings-subtitle">
          Customise your AccessPlay experience!
        </p>

        {/* Dark Mode */}
        <div className="settings-item">
          <label className="settings-label">Dark Mode</label>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) =>
              setSettings({ ...settings, darkMode: e.target.checked })
            }
          />
        </div>

        {/* High Contrast */}
        <div className="settings-item">
          <label className="settings-label">High Contrast Mode</label>
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) =>
              setSettings({ ...settings, highContrast: e.target.checked })
            }
          />
        </div>

        {/* Text Size */}
        <div className="settings-item">
          <label className="settings-label">Text Size</label>
          <select
            className="settings-select"
            value={settings.textSize}
            onChange={(e) =>
              setSettings({ ...settings, textSize: e.target.value })
            }
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button className="settings-save-button" onClick={saveSettings}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}
