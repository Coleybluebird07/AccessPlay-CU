import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { vi, test, expect, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Browse_games from "../src/components/browser_games/browse_game.jsx";

// RESET BETWEEN TESTS
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// GLOBAL FETCH MOCK
beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                { game_id: 1, name: "Puzzle Quest", genres: ["Puzzle", "Casual"], images: ["puzzle.jpg"], platform: "iOS" },
                { game_id: 2, name: "Adventure Hero", genres: ["Adventure"], images: [], platform: "Android" },
                { game_id: 3, name: "RPG Masters", genres: ["RPG"], images: [], platform: "Android" }
            ])
        })
    ));
});

// Utility
function renderUI() {
    return render(
        <MemoryRouter>
            <Browse_games />
        </MemoryRouter>
    );
}

/* TEST 1 — SEARCH FILTER */
test("search input triggers fetch with correct query", async () => {
    renderUI();

    const input = screen.getAllByPlaceholderText("Search for games...")[0];
    fireEvent.change(input, { target: { value: "Puzzle" } });

    await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("search=Puzzle")
        );
    });
});

/* TEST 2 — GENRE FILTER */
test("genre checkbox triggers correct fetch", async () => {
    renderUI();

    fireEvent.click(screen.getAllByLabelText("Puzzle")[0]);

    await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("genres=Puzzle")
        );
    });
});

/* TEST 3 — MULTIPLE GENRES */
test("multiple genres update encoded query", async () => {
    renderUI();

    fireEvent.click(screen.getAllByLabelText("Puzzle")[0]);
    fireEvent.click(screen.getAllByLabelText("Casual")[0]);

    await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("genres=Puzzle%2CCasual")
        );
    });
});

/* TEST 4 — SINGLE ACCESSIBILITY FEATURE */
test("single feature checkbox works", async () => {
    renderUI();

    fireEvent.click(screen.getAllByLabelText("Color Blind Mode")[0]);

    await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("features=Color+Blind+Mode")
        );
    });
});

/* TEST 5 — MULTIPLE ACCESSIBILITY FEATURES */
test("multiple features trigger encoded query", async () => {
    renderUI();

    fireEvent.click(screen.getAllByLabelText("Color Blind Mode")[0]);
    fireEvent.click(screen.getAllByLabelText("Auto-Save Feature")[0]);

    await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("features=Color+Blind+Mode%2CAuto-Save+Feature")
        );
    });
});

/* TEST 6 — COMBINED FILTERS */
test("combined filters generate correct encoded query", async () => {
    renderUI();

    fireEvent.change(screen.getAllByPlaceholderText("Search for games...")[0], {
        target: { value: "Puzzle" }
    });

    fireEvent.click(screen.getAllByLabelText("Puzzle")[0]);
    fireEvent.click(screen.getAllByLabelText("Color Blind Mode")[0]);

    await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("search=Puzzle")
        );
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("genres=Puzzle")
        );
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("features=Color+Blind+Mode")
        );
    });
});

/* TEST 7 — MOBILE FILTER PANEL */
test("mobile filter panel opens & closes", async () => {
    renderUI();

    const button = screen.getAllByText("Filters")[0];
    fireEvent.click(button);

    expect(document.querySelector(".filters.visible")).not.toBeNull();

    const close = screen.getAllByText("✕")[0];
    fireEvent.click(close);

    await waitFor(() => {
        expect(document.querySelector(".filters.visible")).toBeNull();
    });
});
