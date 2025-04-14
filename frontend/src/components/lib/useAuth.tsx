"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useAuth() {
    // مقداردهی اولیه همگام از کوکی‌ها
    const initialToken = Cookies.get("token");
    const initialUserId = Cookies.get("userId");
    const initialLoggedIn = !!(initialToken && initialUserId && initialUserId !== "undefined" && initialUserId !== "null");

    const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
    const [userId, setUserId] = useState<string | null>(initialLoggedIn ? initialUserId : null);

    useEffect(() => {
        const token = Cookies.get("token");
        const userId = Cookies.get("userId");
        const loggedIn = !!(token && userId && userId !== "undefined" && userId !== "null");
        setIsLoggedIn(loggedIn);
        setUserId(loggedIn ? userId : null);
        console.log("🔍 useAuth - Checking login:", {
            token: token?.substring(0, 20),
            userId,
            loggedIn,
        });
    }, []);

    const register = (token: string, userId: string) => {
        console.log("🔍 useAuth - Registering:", { token: token?.substring(0, 20), userId });
        Cookies.set("token", token, { expires: 7, secure: process.env.NODE_ENV === "production" });
        Cookies.set("userId", userId, { expires: 7, secure: process.env.NODE_ENV === "production" });
        setIsLoggedIn(true);
        setUserId(userId);
    };

    const logout = () => {
        console.log("🔍 useAuth - Logging out");
        Cookies.remove("token");
        Cookies.remove("userId");
        setIsLoggedIn(false);
        setUserId(null);
        window.location.href = "/login";
    };

    return { isLoggedIn, userId, register, logout };
}