//helpers to work with auth.

export function getToken() {
    return localStorage.getItem("authToken");
}

export function getUserEmail() {
    return localStorage.getItem("userEmail");
}

export function isLoggedIn() {
    return !!getToken();
}

export function getIsAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}

export function setAuthSession(token, user) {
    localStorage.setItem("authToken", token);
    if (user?.email) {
        localStorage.setItem("userEmail", user.email);
    }
    if (typeof user?.is_admin !== "undefined") {
        localStorage.setItem("isAdmin", user.is_admin ? "true" : "false");
    } else {
        localStorage.setItem("isAdmin", "false");
    }
}

export function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    //full-page redirect
    window.location.href = "/";
}
