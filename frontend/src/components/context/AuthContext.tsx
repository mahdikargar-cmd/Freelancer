"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const storedUserId = Cookies.get("userId");
      setUserId(storedUserId || null);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string, id: string) => {
    Cookies.set("token", token);
    Cookies.set("userId", id);
    setUserId(id);
    setIsLoggedIn(true);
    router.push("/dashboard");
  };


  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    setUserId(null);
    setIsLoggedIn(false);
    router.push("/login");
    // پاک کردن کش و localStorage اگر استفاده میشده
    localStorage.removeItem("profileData");
  };


  return (
      <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
