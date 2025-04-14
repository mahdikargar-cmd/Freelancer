'use client';

import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import {useAuth} from "@/components/lib/useAuth";

const SignHead = () => {
    const { isLoggedIn, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center dark:text-color4 text-light-color4 hover:text-color8 transition-colors"
            >
                <FaUser className="text-xl" />
            </button>
            {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-light-color6 dark:bg-color1 border dark:border-color5 border-light-color5 rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-color8 dark:hover:bg-color8"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        داشبورد
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setShowDropdown(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-color8 dark:hover:bg-color8"
                                    >
                                        خروج
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href="/login"
                                        className="block px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-color8 dark:hover:bg-color8"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        ورود
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/signUp"
                                        className="block px-4 py-2 text-sm dark:text-color3 text-light-color3 hover:bg-color8 dark:hover:bg-color8"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        ثبت‌نام
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SignHead;