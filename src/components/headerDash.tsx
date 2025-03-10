'use client';

import { useState } from "react";

interface NavProProps {
    onSelect: (id: number) => void;
}

const NavPro = ({ onSelect }: NavProProps) => {
    const [activeTab, setActiveTab] = useState(1);

    const info = [
        { title: "اتاق کار", id: 1 },
        { title: "پروفایل", id: 2 }
    ];

    return (
        <nav className="w-full md:max-w-screen-xl mx-auto bg-color1 border border-color5 text-white font-primaryMedium text-xl shadow-md py-4 mt-6 rounded-full">
            <ul className="flex justify-evenly">
                {info.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => {
                                setActiveTab(item.id);
                                onSelect(item.id);
                            }}
                            className={`inline-block py-2 px-4 text-sm rounded-full transition-all duration-300
                                ${
                                    activeTab === item.id
                                        ? "bg-color4 text-color6 shadow-lg scale-105"
                                        : "text-color2 hover:text-color4 hover:bg-color5"
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
