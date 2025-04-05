'use client';

import { useState } from "react";

interface NavProProps {
    onSelect: (id: number) => void;
}

const NavPro = ({ onSelect }: NavProProps) => {
    const [activeTab, setActiveTab] = useState(1);

    const info = [
        { title: "پروفایل", id: 1 },
        { title: "اتاق کار", id: 2 }
    ];

    return (
        <nav className="w-full md:max-w-screen-xl mx-auto bg-light-color1 dark:bg-color1 border border-light-color5 dark:border-color5 text-light-color2 dark:text-white font-primaryMedium text-xl shadow-md py-4 mt-6 rounded-full">
            <ul className="flex justify-evenly">
                {info.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => {
                                setActiveTab(item.id);
                                onSelect(item.id);
                            }}
                            className={`inline-block py-2 px-4 text-sm rounded-full transition-all duration-300
                        ${activeTab === item.id
                                    ? "bg-light-color4 dark:bg-color4 text-light-color6 dark:text-color6 shadow-lg scale-105"
                                    : "text-light-color2 dark:text-color2 hover:text-light-color4 dark:hover:text-color4 hover:bg-light-color5 dark:hover:bg-color5"
                                }`}
                        >
                            {item.title}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavPro;
