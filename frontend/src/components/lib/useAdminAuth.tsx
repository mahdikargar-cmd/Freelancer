"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: number;
    sub: string;
    iat: number;
    exp: number;
    [key: string]: any;
}

export const useAdminAuth = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            setIsLoading(true);
            const token = Cookies.get("adminToken");

            if (token) {
                try {
                    const decoded: DecodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    console.log("Token decoded:", {
                        userId: decoded.userId,
                        username: decoded.sub,
                        expires: new Date(decoded.exp * 1000).toLocaleString(),
                    });

                    if (decoded.exp < currentTime) {
                        console.warn("Token expired, logging out");
                        Cookies.remove("adminToken");
                        setIsLoggedIn(false);
                        setUserId(null);
                        setUsername(null);
                    } else {
                        setIsLoggedIn(true);
                        setUserId(decoded.userId);
                        setUsername(decoded.sub);
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    Cookies.remove("adminToken");
                    setIsLoggedIn(false);
                    setUserId(null);
                    setUsername(null);
                }
            } else {
                console.log("No admin token found");
                setIsLoggedIn(false);
                setUserId(null);
                setUsername(null);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const logout = () => {
        Cookies.remove("adminToken");
        setIsLoggedIn(false);
        setUserId(null);
        setUsername(null);
    };

    return {
        userId,
        username,
        isLoggedIn,
        isLoading,
        logout,
    };
};