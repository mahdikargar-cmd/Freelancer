'use client';
import { useState } from "react";
import { User, Home, Wallet } from "lucide-react"; // Import Wallet icon

type NavProProps = {
    onSelect: (tabId: number) => void;
};

const NavPro = ({ onSelect }: NavProProps) => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabId: number) => {
        setActiveTab(tabId);
        onSelect(tabId);
    };

    return (
        <div className="bg-light-color1 dark:bg-color1 rounded-xl shadow-md p-4">
            <div className="flex justify-center text-xs md:text-[16px] md:justify-center gap-2 md:gap-6">
                <button
                    onClick={() => handleTabClick(1)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 1
                            ? "bg-light-color4 dark:bg-color4 text-light-color1 dark:text-color1"
                            : "hover:bg-light-color5 dark:hover:bg-color5"
                    }`}
                >
                    <User className="w-5 h-5" />
                    <span className="font-primaryMedium">پروفایل</span>
                </button>

                <button
                    onClick={() => handleTabClick(2)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 2
                            ? "bg-light-color4 dark:bg-color4 text-light-color1 dark:text-color1"
                            : "hover:bg-light-color5 dark:hover:bg-color5"
                    }`}
                >
                    <Home className="w-5 h-5" />
                    <span className="font-primaryMedium">ایجاد پروژه </span>
                </button>

                <button
                    onClick={() => handleTabClick(3)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 3
                            ? "bg-light-color4 dark:bg-color4 text-light-color1 dark:text-color1"
                            : "hover:bg-light-color5 dark:hover:bg-color5"
                    }`}
                >
                    <Wallet className="w-5 h-5" />
                    <span className="font-primaryMedium">کیف پول</span>
                </button>
            </div>
        </div>
    );
};

export default NavPro;