"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

export function useAuth() {
    const getInitialState = () => {
        const token = Cookies.get("token");
        const userId = Cookies.get("userId");
        const loggedIn = !!(token && userId && userId !== "undefined" && userId !== "null");
        return { loggedIn, userId: loggedIn ? userId : null };
    };

    const [isLoggedIn, setIsLoggedIn] = useState(getInitialState().loggedIn);
    const [userId, setUserId] = useState<string | null>(getInitialState().userId);

    const checkAuthStatus = useCallback(() => {
        const token = Cookies.get("token");
        const userId = Cookies.get("userId");
        const loggedIn = !!(token && userId && userId !== "undefined" && userId !== "null");

        setIsLoggedIn(loggedIn);
        setUserId(loggedIn ? userId : null);

    }, []);

    useEffect(() => {
        checkAuthStatus();

        const handleStorageChange = () => {
            checkAuthStatus();
        };

        window.addEventListener("storage", handleStorageChange);

        const interval = setInterval(checkAuthStatus, 10000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, [checkAuthStatus]);

    const register = useCallback((token: string, userId: string) => {
        console.log("🔍 useAuth - Registering:", { token: token?.substring(0, 20), userId });
        Cookies.set("token", token, { expires: 7, secure: process.env.NODE_ENV === "production" });
        Cookies.set("userId", userId, { expires: 7, secure: process.env.NODE_ENV === "production" });
        setIsLoggedIn(true);
        setUserId(userId);
    }, []);

    const logout = useCallback(() => {
        console.log("🔍 useAuth - Logging out");
        Cookies.remove("token");
        Cookies.remove("userId");
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    return { isLoggedIn, userId, register, logout };
}