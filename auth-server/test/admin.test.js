import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/index.js";
import * as dbModule from "../src/db.js";
// import test frameworks


//helper JWT secret password for test environment
const DEV_SECRET = process.env.JWT_SECRET || "dev_secret";

//generates an admin JWT token for admin authentication testing.
function makeAdminToken() {
  return jwt.sign({ sub: 1, email: "admin@example.com", is_admin: true }, DEV_SECRET, { expiresIn: "1h" });
}
//generates a non-admin / regular user JWT token to test access restrictions.
function makeUserToken() {
  return jwt.sign({ sub: 2, email: "user@example.com", is_admin: false }, DEV_SECRET, { expiresIn: "1h" });
}

//reset spies and mocks before each test.
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Admin routes (basic)", () => {
    //ensure that the admin can list users.
  it("GET /api/admin/users - returns users when admin", async () => {
      //mocking the database call to return a list of users.
    vi.spyOn(dbModule, "withConn").mockImplementation(async () => {
      return [
        { id: 1n, email: "admin@example.com", is_admin: 1n, created_at: "2025-01-01 10:00:00" },
      ];
    });

    const token = makeAdminToken();
    const res = await request(app).get("/api/admin/users").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users[0].email).toBe("admin@example.com");
  });

  // ensure that the admin can validate a users' admin flag
  it("PATCH /api/admin/users/:id/admin - toggles admin flag", async () => {
      //mock db updaet success/
    vi.spyOn(dbModule, "withConn").mockImplementation(async () => {
      return {}; // just succeed
    });

    const token = makeAdminToken();
    const res = await request(app)
      .patch("/api/admin/users/1/admin")
      .send({ is_admin: true })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  //ensure that the admin can delete a user.
  it("DELETE /api/admin/users/:id - deletes a user", async () => {
    vi.spyOn(dbModule, "withConn").mockImplementation(async () => {
      return {}; // succeed
    });

    const token = makeAdminToken();
    const res = await request(app).delete("/api/admin/users/1").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
  //ensure that the admin can fetch the game list.
  it("GET /api/admin/games - returns games list", async () => {
    vi.spyOn(dbModule, "withConn").mockImplementation(async () => {
      return [
        { game_id: 1n, name: "Mock Game", platform: "iOS", created_at: "2025-01-01" },
      ];
    });

    const token = makeAdminToken();
    const res = await request(app).get("/api/admin/games").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.games)).toBe(true);
    expect(res.body.games[0].name).toBe("Mock Game");
  });

  //ensure that the admin can delete any game.
  it("DELETE /api/admin/games/:id - deletes a game", async () => {
    vi.spyOn(dbModule, "withConn").mockImplementation(async () => {
      return {}; // succeed
    });

    const token = makeAdminToken();
    const res = await request(app).delete("/api/admin/games/1").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  //ensure that reviews are fetched and returned on the admin panel
  it("GET /api/admin/reviews - returns reviews", async () => {
    vi.spyOn(dbModule, "withConn").mockImplementation(async () => {
      return [
        { review_id: 1n, game_id: 1n, user_id: 1n, rating: 5, comment: "Great", created_at: "2025-01-01", game_name: "Mock Game", user_email: "u@example.com" },
      ];
    });

    const token = makeAdminToken();
    const res = await request(app).get("/api/admin/reviews").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.reviews)).toBe(true);
    expect(res.body.reviews[0].comment).toBe("Great");
  });

  //ensure that the admin can delete reviews.
  it("DELETE /api/admin/reviews/:id - deletes a review", async () => {
    vi.spyOn(dbModule, "withConn").mockImplementation(async () => {
      return {}; // succeed
    });

    const token = makeAdminToken();
    const res = await request(app).delete("/api/admin/reviews/1").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  //ensure that non-admin users are blocked from accessing admin routes (admin panel).
  it("rejects non-admin users with 403", async () => {
    const token = makeUserToken();
    const res = await request(app).get("/api/admin/users").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.ok).toBe(false);
  });
});
