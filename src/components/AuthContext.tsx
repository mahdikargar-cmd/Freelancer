"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
    token: string | null | undefined;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            setToken(null);
        }
        setLoading(false);
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
