import React, { useEffect, useState } from "react";
import { getToken, getIsAdmin } from "../../authUtils";
import "./AdminPanel.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function Section({ title, children }) {
  return (
    <section className="admin-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = getToken();
  const isAdmin = getIsAdmin();

  useEffect(() => {
    if (!token || !isAdmin) {
      setLoading(false);
      return;
    }

    async function fetchAll() {
      try {
        setLoading(true);
        setError("");
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, gamesRes, reviewsRes] = await Promise.all([
          fetch(`${API_URL}/api/admin/users`, { headers }),
          fetch(`${API_URL}/api/admin/games`, { headers }),
          fetch(`${API_URL}/api/admin/reviews`, { headers }),
        ]);

        if (!usersRes.ok || !gamesRes.ok || !reviewsRes.ok) {
          throw new Error("Failed to load admin data");
        }

        const usersJson = await usersRes.json();
        const gamesJson = await gamesRes.json();
        const reviewsJson = await reviewsRes.json();

        setUsers(usersJson.users || []);
        setGames(gamesJson.games || []);
        setReviews(reviewsJson.reviews || []);
      } catch (err) {
        console.error("[AdminPanel] load error", err);
        setError(err.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [token, isAdmin]);

  if (!token || !isAdmin) {
    return (
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <p>You must be logged in as an admin to view this page.</p>
      </div>
    );
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  async function handleDeleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete user");
    }
  }

  async function handleToggleAdmin(id, current) {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}/admin`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ is_admin: !current }),
      });
      if (!res.ok) throw new Error("Failed to update user");
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, is_admin: !current } : u))
      );
    } catch (err) {
      alert(err.message || "Failed to update user");
    }
  }

  async function handleDeleteGame(id) {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/games/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error("Failed to delete game");
      setGames((prev) => prev.filter((g) => g.game_id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete game");
    }
  }

  async function handleDeleteReview(id) {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/reviews/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error("Failed to delete review");
      setReviews((prev) => prev.filter((r) => r.review_id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete review");
    }
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="admin-error">{error}</p>}

      <Section title="Users">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.is_admin ? "Yes" : "No"}</td>
                <td>{u.created_at}</td>
                <td>
                  <button
                    className="admin-btn"
                    onClick={() => handleToggleAdmin(u.id, !!u.is_admin)}
                  >
                    {u.is_admin ? "Revoke admin" : "Make admin"}
                  </button>
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Games">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Platform</th>
              <th>Avg rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => (
              <tr key={g.game_id}>
                <td>{g.game_id}</td>
                <td>{g.name}</td>
                <td>{g.platform}</td>
                <td>{g.avg_rating}</td>
                <td>
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleDeleteGame(g.game_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Reviews">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Game</th>
              <th>User</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.review_id}>
                <td>{r.review_id}</td>
                <td>{r.game_name}</td>
                <td>{r.user_email}</td>
                <td>{r.rating}</td>
                <td>{r.comment}</td>
                <td>{r.created_at}</td>
                <td>
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleDeleteReview(r.review_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
};

export default AdminPanel;

