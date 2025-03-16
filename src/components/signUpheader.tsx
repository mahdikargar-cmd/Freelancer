'use client';

import { useAuth } from "./AuthContext";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useState,useEffect } from "react";

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
                        className="flex items-center p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                    >
                        <FaUser className="text-color4" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg font-primaryMedium">
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                حساب کاربری
                            </Link>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
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
                            className="inline-block py-2 px-4 text-sm text-color2 hover:text-color4 hover:bg-color5 rounded-full"
                        >
                            ثبت نام
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/login"
                            className="inline-block py-2 px-4 text-sm bg-color4 text-color1 hover:text-color4 hover:bg-color5 rounded-full"
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
