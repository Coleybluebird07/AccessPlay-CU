import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../src/index.js";
import * as dbModule from "../src/db.js";

vi.spyOn(dbModule, "withConn").mockImplementation(async (callback) => {
    return [
        {
            game_id: "1",
            name: "Mock Game 1",
            short_description: "A fun mock game",
            detailed_description: "Details...",
            platform: "iOS",
            release_date: "2025-01-01",
            developer: "Dev",
            publisher: "Pub",
            redirect_url_android: null,
            redirect_url_ios: null,
            images: ["mock1.jpg"],
            genres: ["Puzzle", "Adventure"],
        },
        {
            game_id: "2",
            name: "Mock Game 2",
            short_description: "Another mock game",
            detailed_description: "Details...",
            platform: "Android",
            release_date: "2025-01-01",
            developer: "Dev",
            publisher: "Pub",
            redirect_url_android: null,
            redirect_url_ios: null,
            images: [],
            genres: ["RPG"],
        },
    ];
});

describe("GET /api/games", () => {
    it("should return a list of games", async () => {
        const res = await request(app).get("/api/games");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });
});
