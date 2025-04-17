"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Humberger = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="باز کردن منو">
                <FaBars className="text-2xl" />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-light-color6 dark:bg-color1">
                    <ul className="flex flex-col p-4">
                        {/* لینک‌ها اینجا اضافه شوند */}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Humberger;