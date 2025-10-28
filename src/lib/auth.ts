export const TOKEN_KEY = "demo_token";

export const isLoggedIn = () => !!localStorage.getItem(TOKEN_KEY);

export const login = () => {
    localStorage.setItem(TOKEN_KEY, "1");
    location.href = "/app/home";
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    location.href = "/login";
};