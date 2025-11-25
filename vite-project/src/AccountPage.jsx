import React, { useEffect, useState } from "react";
import { getToken, logout } from "./authUtils";
import "./account.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function AccountPage() {
    const [status, setStatus] = useState("loading");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    // Change password
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Change email
    const [newEmail, setNewEmail] = useState("");
    const [confirmNewEmail, setConfirmNewEmail] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            window.location.href = "/login";
            return;
        }

        async function fetchMe() {
            try {
                const res = await fetch(`${API_URL}/api/auth/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (!res.ok || !data?.ok) {
                    setError(data?.error || "Session expired. Please log in again.");
                    setStatus("error");
                    setTimeout(() => {
                        logout();
                    }, 1500);
                    return;
                }

                setUser(data.user);
                setStatus("ready");
            } catch (err) {
                console.error("ME error:", err);
                setError("Could not load account.");
                setStatus("error");
            }
        }

        fetchMe();
    }, []);

    async function handleChangePassword(e) {
        e.preventDefault();
        setPasswordMessage("");
        setPasswordError("");

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setPasswordError("Fill all fields.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setPasswordError("New password and confirmation must match.");
            return;
        }

        const token = getToken();

        try {
            setPasswordLoading(true);
            const res = await fetch(`${API_URL}/api/auth/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data?.ok) {
                setPasswordError(data?.error || "Failed to update password");
                return;
            }

            setPasswordMessage("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (err) {
            console.error(err);
            setPasswordError("Error updating password");
        } finally {
            setPasswordLoading(false);
        }
    }

    async function handleChangeEmail(e) {
        e.preventDefault();
        setEmailMessage("");
        setEmailError("");

        if (!newEmail || !confirmNewEmail || !emailPassword) {
            setEmailError("Fill all fields.");
            return;
        }

        if (newEmail !== confirmNewEmail) {
            setEmailError("Emails do not match.");
            return;
        }

        const token = getToken();

        try {
            setEmailLoading(true);
            const res = await fetch(`${API_URL}/api/auth/change-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    newEmail,
                    password: emailPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data?.ok) {
                setEmailError(data?.error || "Failed to update email");
                return;
            }

            if (data.user?.email) {
                setUser((prev) => ({ ...prev, email: data.user.email }));
                localStorage.setItem("userEmail", data.user.email);
            }
            if (data.token) {
                localStorage.setItem("authToken", data.token);
            }

            setEmailMessage("Email updated successfully.");
            setNewEmail("");
            setConfirmNewEmail("");
            setEmailPassword("");
        } catch (err) {
            console.error(err);
            setEmailError("Error updating email");
        } finally {
            setEmailLoading(false);
        }
    }

    if (status === "loading") {
        return (
            <div className="page-container">
                <div className="account-card">
                    <h1>My Account</h1>
                    <p>Loading…</p>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="page-container">
                <div className="account-card">
                    <h1>My Account</h1>
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    const memberSince = user?.created_at
        ? new Date(user.created_at).toLocaleDateString()
        : "Unknown";

    return (
        <div className="page-container">
            <div className="account-card">
                <h1>My Account</h1>

                <div className="account-layout">
                    <div className="account-column">
                        <div className="account-details">
                            <div className="account-row">
                                <span className="label">Email</span>
                                <span className="value">{user.email}</span>
                            </div>
                            <div className="account-row">
                                <span className="label">User ID</span>
                                <span className="value">{user.id}</span>
                            </div>
                            <div className="account-row">
                                <span className="label">Member since</span>
                                <span className="value">{memberSince}</span>
                            </div>
                        </div>
                    </div>

                    <div className="account-column">
                        <div className="account-section">
                            <h2>Change email</h2>
                            <form onSubmit={handleChangeEmail} className="account-form">
                                <label>
                                    New email
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </label>

                                <label>
                                    Confirm new email
                                    <input
                                        type="email"
                                        value={confirmNewEmail}
                                        onChange={(e) => setConfirmNewEmail(e.target.value)}
                                    />
                                </label>

                                <label>
                                    Current password
                                    <input
                                        type="password"
                                        value={emailPassword}
                                        onChange={(e) => setEmailPassword(e.target.value)}
                                    />
                                </label>

                                {emailError && <p className="error-message">{emailError}</p>}
                                {emailMessage && <p className="success-message">{emailMessage}</p>}

                                <button disabled={emailLoading} className="secondary-button">
                                    {emailLoading ? "Updating…" : "Update email"}
                                </button>
                            </form>
                        </div>

                        <div className="account-section">
                            <h2>Change password</h2>
                            <form onSubmit={handleChangePassword} className="account-form">
                                <label>
                                    Current password
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </label>

                                <label>
                                    New password
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </label>

                                <label>
                                    Confirm new password
                                    <input
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </label>

                                {passwordError && (
                                    <p className="error-message">{passwordError}</p>
                                )}
                                {passwordMessage && (
                                    <p className="success-message">{passwordMessage}</p>
                                )}

                                <button disabled={passwordLoading} className="secondary-button">
                                    {passwordLoading ? "Updating…" : "Update password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <button className="logout-button" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
