'use client';
import { useState, useEffect } from "react";
import NavPro from "@/components/headerDash";
import Profile from "@/components/profile";
import Room from "@/components/myRoom";
const DashBoard = () => {
    const [selectedTab, setSelectedTab] = useState(1);
    useEffect(() => {
        const loadUserData = setTimeout(() => {
        }, 1000);
        return () => clearTimeout(loadUserData);
    }, []);
    return (
        <div className="mx-4 md:mx-auto text-light-color2 dark:text-white">
            <NavPro onSelect={setSelectedTab} />
            {/* Main Content Area */}
            <div className="mt-6">
                {selectedTab === 1 ? <Profile /> : <Room />}
            </div>
        </div>
    );
};
export default DashBoard;