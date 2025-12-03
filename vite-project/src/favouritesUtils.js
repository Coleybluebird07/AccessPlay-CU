const FAVOURITES_KEY = "favouriteGames";

export function getFavouriteGames() {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(FAVOURITES_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        //Only strings
        return parsed.filter((item) => typeof item === "string");
    } catch (err) {
        console.error("Failed to read favourite games from localStorage:", err);
        return [];
    }
}


 //Toggle a game in the favourites list.
 //If it is already in favourites, remove it otherwise add it.

export function toggleFavouriteGame(name) {
    if (typeof name !== "string" || !name.trim()) {
        return getFavouriteGames();
    }

    const current = getFavouriteGames();
    const exists = current.includes(name);
    let updated;

    if (exists) {
        updated = current.filter((n) => n !== name);
    } else {
        updated = [...current, name];
    }

    try {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(
                FAVOURITES_KEY,
                JSON.stringify(updated)
            );
        }
    } catch (err) {
        console.error("Failed to write favourite games to localStorage:", err);
    }

    return updated;
}


export function isFavouriteGame(name) {
    const current = getFavouriteGames();
    return current.includes(name);
}
