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

export function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    //full-page redirect
    window.location.href = "/";
}
