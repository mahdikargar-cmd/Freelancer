"use client";

import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/lib/useAuth";

const SignHead = () => {
    const { isLoggedIn, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = useCallback(() => {
        setShowDropdown((prev) => !prev);
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            setShowDropdown(false);
            router.push("/login");
        } catch (err) {
            console.error("خطا در خروج:", err);
        }
    }, [logout, router]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-light-color6 dark:bg-color5 text-light-color4 dark:text-color4 hover:bg-light-color7 dark:hover:bg-color7 transition-colors"
                aria-label="منوی کاربر"
            >
                <FaUser className="text-lg" />
            </button>

            {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-light-color6 dark:bg-color1 border dark:border-color5 border-light-color5 rounded-lg shadow-lg z-10">
                    <div className="py-1 text-right">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-light-color7 dark:hover:bg-color7 transition-colors"
                                    onClick={() => setShowDropdown(false)}
                                    aria-label="رفتن به داشبورد"
                                >
                                    داشبورد
                                </Link>
                                <hr className="my-1 border-light-color5 dark:border-color5" />
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-right px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-light-color7 dark:hover:bg-color7 transition-colors"
                                    aria-label="خروج از حساب"
                                >
                                    خروج
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-light-color7 dark:hover:bg-color7 transition-colors"
                                    onClick={() => setShowDropdown(false)}
                                    aria-label="ورود به حساب"
                                >
                                    ورود
                                </Link>
                                <hr className="my-1 border-light-color5 dark:border-color5" />
                                <Link
                                    href="/signUp"
                                    className="block px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-light-color7 dark:hover:bg-color7 transition-colors"
                                    onClick={() => setShowDropdown(false)}
                                    aria-label="ثبت‌نام"
                                >
                                    ثبت‌نام
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignHead;