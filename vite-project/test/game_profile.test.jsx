import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi, test, expect, beforeEach, afterEach } from "vitest";
import GameProfile from "../src/components/game_profile/game_profile.jsx";

// Reset DOM & mocks
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// ---- MOCK AUTH ----
vi.mock("../src/authUtils.js", () => ({
    isLoggedIn: () => false,  // default for these tests
}));

// ---- FAKE GAME DATA ----
const mockGame = {
    game_id: 1,
    name: "Puzzle Quest",
    short_description: "A fun puzzle game",
    detailed_description: "Very fun and engaging game.",
    genres: ["Puzzle", "Adventure"],
    accessibility: ["Color Blind Mode", "Captions"],
    images: ["puzzle.jpg"],
    average_rating: 4.5,
    redirect_url_android: "https://play.google.com/test",
    redirect_url_ios: "https://apps.apple.com/test",
    developer: "Dev Studio",
    publisher: "Pub Co",
    platform: "iOS",
    release_date: "2025-01-01"
};

const mockReviews = [
    {
        review_id: 1,
        reviewer_email: "test@example.com",
        rating: 5,
        comment: "Amazing game!",
        created_at: "2025-01-02T00:00:00Z"
    }
];

// ---- GLOBAL MOCK FETCH ----
beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn((url) => {
        // Mock 1st fetch (game details)
        if (url.includes("/api/games/1/reviews")) {
            return Promise.resolve({
                json: () => Promise.resolve(mockReviews)
            });
        }

        // Mock 2nd fetch (reviews)
        if (url.includes("/api/games/1")) {
            return Promise.resolve({
                json: () => Promise.resolve(mockGame)
            });
        }

        throw new Error("Unhandled fetch: " + url);
    }));
});

// ---- RENDER HELPER ----
function renderPage(id = 1) {
    return render(
        <MemoryRouter initialEntries={[`/games/${id}`]}>
            <Routes>
                <Route path="/games/:id" element={<GameProfile />} />
            </Routes>
        </MemoryRouter>
    );
}

/* TEST 1 — Renders Loading State */
test("shows loading state initially", () => {
    renderPage();

    expect(screen.getByText("Loading...")).toBeTruthy();
});

/* TEST 2 — Fetches & Displays Game Data */
test("displays game hero section", async () => {
    renderPage();

    await waitFor(() => {
        expect(screen.getByText("Puzzle Quest")).toBeTruthy();
    });

    expect(screen.getByText("A fun puzzle game")).toBeTruthy();
    const img = screen.getByAltText("Puzzle Quest");
    expect(img.getAttribute("src")).toBe("puzzle.jpg");
});

/* TEST 3 — Displays Genres */
test("renders genres badges", async () => {
    renderPage();

    await waitFor(() => {
        expect(screen.getByText("Puzzle")).toBeTruthy();
    });

    expect(screen.getByText("Adventure")).toBeTruthy();
});

/* TEST 4 — Displays Accessibility Features */
test("renders accessibility features", async () => {
    renderPage();

    await waitFor(() => {
        expect(screen.getByText("Color Blind Mode")).toBeTruthy();
    });

    expect(screen.getByText("Captions")).toBeTruthy();
});

/* TEST 5 — Displays Download Buttons */
test("renders download buttons", async () => {
    renderPage();

    await waitFor(() => {
        expect(screen.getByText("Download for Android")).toBeTruthy();
    });

    const androidBtn = screen.getByText("Download for Android");
    const iosBtn = screen.getByText("Download for iOS");

    expect(androidBtn.closest("a").href).toBe("https://play.google.com/test");
    expect(iosBtn.closest("a").href).toBe("https://apps.apple.com/test");
});

/* TEST 6 — Displays Game Details Section */
test("shows developer, publisher, platform, release date", async () => {
    renderPage();

    await waitFor(() => {
        expect(screen.getByText(/Developer/i)).toBeTruthy();
    });

    expect(screen.getByText("Dev Studio")).toBeTruthy();
    expect(screen.getByText("Pub Co")).toBeTruthy();
    expect(screen.getByText("iOS")).toBeTruthy();
    expect(screen.getByText("2025-01-01")).toBeTruthy();
});

/* TEST 7 — Shows Reviews List */
test("renders user reviews", async () => {
    renderPage();

    await waitFor(() => {
        expect(screen.getByText("Amazing game!")).toBeTruthy();
    });

    expect(screen.getByText("test@example.com")).toBeTruthy();
});

/* TEST 8 — Shows login prompt when NOT logged in */
test("shows log in prompt if user is not logged in", async () => {
    renderPage();

    await waitFor(() => {
        expect(screen.getByText("User Reviews")).toBeTruthy();
    });

    expect(screen.getByText(/log in/i)).toBeTruthy();
});
