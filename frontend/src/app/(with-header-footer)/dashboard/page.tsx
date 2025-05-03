'use client';
import { useState, useEffect } from "react";
import NavPro from "@/components/profileInformation";
import Profile from "@/components/profile";
import Room from "@/components/myRoom";
import Wallet from "@/app/(with-header-footer)/dashboard/Wallet";

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
                {selectedTab === 1 ? <Profile /> :
                    selectedTab === 2 ? <Room /> :
                        <Wallet />}
            </div>
        </div>
    );
};

export default DashBoard;