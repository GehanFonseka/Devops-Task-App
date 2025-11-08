import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <p className="settings-subtitle">Customize your TaskPro experience</p>
            </div>

            <div className="settings-content">
                <div className="settings-section">
                    <h2>Preferences</h2>
                    <div className="setting-item">
                        <div className="setting-info">
                            <div className="setting-label">Enable Notifications</div>
                            <div className="setting-description">Receive updates about your tasks</div>
                        </div>
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <div className="setting-label">Dark Mode</div>
                            <div className="setting-description">Switch to dark theme</div>
                        </div>
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <div className="setting-label">Auto-Save</div>
                            <div className="setting-description">Automatically save changes</div>
                        </div>
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={autoSave}
                                onChange={() => setAutoSave(!autoSave)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Account Actions</h2>
                    <button className="btn btn-secondary">Export Data</button>
                    <button className="btn btn-danger">Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;