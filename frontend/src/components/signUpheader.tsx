'use client';

import { useAuth } from "@/components/context/AuthContext";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

const SignHead = () => {
    const { isLoggedIn, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    useEffect(() => {
        if (isLoggedIn) {
            setShowDropdown(false);
        }
    }, [isLoggedIn]);

    return (
        <div className="relative w-full md:flex hidden md:w-auto md:order-1 rtl:space-x-reverse gap-2">
            {isLoggedIn ? (
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center p-2 rounded-full bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        <FaUser className="text-light-color4 dark:text-color4" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-color6 shadow-lg rounded-lg font-primaryMedium">
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                حساب کاربری
                            </Link>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                            >
                                خروج
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-primaryMedium rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0">
                    <li>
                        <Link
                            href="/signUp"
                            className="inline-block py-2 px-4 text-sm text-gray-900 hover:text-light-color4 hover:bg-light-color5 dark:text-white dark:hover:text-color4 dark:hover:bg-color5 rounded-full"
                        >
                            ثبت نام
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/login"
                            className="inline-block py-2 px-4 text-sm bg-light-color4 text-white hover:bg-light-color9 dark:bg-color4 dark:text-color1 dark:hover:bg-color5 dark:hover:text-color4 rounded-full"
                        >
                            ورود
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default SignHead;
