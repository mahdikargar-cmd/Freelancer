"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
    const router = useRouter();
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get("adminToken");
        const loggedIn = !!token;
        setIsAdminLoggedIn(loggedIn);

        console.log("🔍 useAdminAuth - Checking admin login:", {
            token: token?.substring(0, 20),
            loggedIn,
        });

        // اگر توکن وجود داشت و کاربر در صفحه ورود است، به داشبورد هدایت شود
        if (loggedIn && router.pathname === "/admin/login") {
            router.push("/admin");
        }
    }, [router]);

    const login = (token: string) => {
        console.log("🔍 useAdminAuth - Logging in admin:", { token: token?.substring(0, 20) });
        Cookies.set("adminToken", token, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
        });
        setIsAdminLoggedIn(true);
        router.push("/admin");
    };

    const logout = () => {
        console.log("🔍 useAdminAuth - Logging out admin");
        Cookies.remove("adminToken");
        setIsAdminLoggedIn(false);
        router.push("/admin/login");
    };

    return { isAdminLoggedIn, login, logout };
}