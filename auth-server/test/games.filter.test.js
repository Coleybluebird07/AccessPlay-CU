import request from "supertest";
import app from "../src/index.js";
import * as dbModule from "../src/db.js";
import { vi, describe, it, expect } from "vitest";

// Utility to quickly mock DB for each test
function mockDB(returnRows) {
    vi.spyOn(dbModule, "withConn").mockImplementation(async (callback) => {
        return returnRows;
    });
}

describe("GET /api/games - Filtering & Search", () => {

    it("should return all games when no filters are applied", async () => {
        mockDB([
            { name: "Puzzle Quest" },
            { name: "Adventure Hero" },
            { name: "RPG Masters" }
        ]);

        const res = await request(app).get("/api/games");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
    });

    it("should filter by search text", async () => {
        mockDB([{ name: "Puzzle Quest" }]);

        const res = await request(app).get("/api/games?search=Puzzle");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Puzzle Quest");
    });

    it("should filter by one genre", async () => {
        mockDB([{ name: "RPG Masters" }]);

        const res = await request(app).get("/api/games?genres=RPG");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("RPG Masters");
    });

    it("should filter by multiple genres (AND match)", async () => {
        mockDB([{ name: "Puzzle Quest" }]);

        const res = await request(app).get("/api/games?genres=Puzzle,Casual");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Puzzle Quest");
    });

    it("should return empty when genre combination does not exist", async () => {
        mockDB([]); // SQL would return no rows

        const res = await request(app).get("/api/games?genres=Puzzle,RPG");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it("should filter by accessibility features", async () => {
        mockDB([{ name: "Puzzle Quest" }]);

        const res = await request(app).get("/api/games?features=Color Blind Mode");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Puzzle Quest");
    });

    it("should filter by multiple accessibility features (AND match)", async () => {
        mockDB([{ name: "Puzzle Quest" }]);

        const res = await request(app).get(
            "/api/games?features=Color Blind Mode,Auto-Save Feature"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Puzzle Quest");
    });

    it("should support combined filters (search + genre + features)", async () => {
        mockDB([{ name: "Puzzle Quest" }]);

        const res = await request(app).get(
            "/api/games?search=Puzzle&genres=Puzzle,Casual&features=Auto-Save Feature"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Puzzle Quest");
    });

    it("should return nothing if ANY filter doesn't match", async () => {
        mockDB([]); // SQL returns empty

        const res = await request(app).get(
            "/api/games?search=Puzzle&genres=RPG"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(0);
    });
});
