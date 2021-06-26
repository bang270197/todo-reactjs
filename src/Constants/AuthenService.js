const ACCESS_TOKEN_KEY = "access_token";
export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function isLoggedIn() {
    const idToken = getAccessToken();
    if (idToken === null || typeof idToken === "undefined") {
        return false;
    }
    return true;
}
