import { test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Browse_games from "../src/components/browser_games/browse_game.jsx";

// Mock fetch response
const mockGames = [
    {
        game_id: 1,
        name: "Mock Game 1",
        short_description: "A fun mock game",
        genres: ["Puzzle", "Adventure"],
        platform: "iOS",
        images: ["mock1.jpg"],
    },
    {
        game_id: 2,
        name: "Mock Game 2",
        short_description: "Another mock game",
        genres: ["RPG"],
        platform: "Android",
        images: [],
    },
];

// Stub global fetch
vi.stubGlobal("fetch", vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockGames)
    })
));

test("shows 'No games found' initially if fetch hasn't resolved", () => {
    render(<Browse_games />);
    const noGames = screen.getByText(/No games found/i);
    expect(noGames).not.toBeNull();
});

test("renders fetched games correctly", async () => {
    render(<Browse_games />);

    // Wait for the fetch to complete and component to update
    await waitFor(() => {
        // Multiple elements might exist if React Strict Mode is enabled
        const game1Elements = screen.getAllByText("Mock Game 1");
        expect(game1Elements.length).toBeGreaterThan(0);

        const game2Elements = screen.getAllByText("Mock Game 2");
        expect(game2Elements.length).toBeGreaterThan(0);
    });

    // Check images safely using getAllByAltText
    const img1 = screen.getAllByAltText("Mock Game 1")[0];
    expect(img1.getAttribute("src")).toBe("mock1.jpg");

    const img2 = screen.getAllByAltText("Mock Game 2")[0];
    expect(img2.getAttribute("src")).toBe("placeholder.jpg");
});
