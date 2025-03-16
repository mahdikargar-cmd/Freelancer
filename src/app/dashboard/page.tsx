'use client';

import { useState } from "react";
import NavPro from "@/components/headerDash";
import Profile from "@/components/profile";
import Room from "@/components/myRoom";
const DashBoard = () => {
    const [selectedTab, setSelectedTab] = useState(1);

    return (
            <div className="text-white mx-4 md:mx-auto">
                <NavPro onSelect={setSelectedTab} />

                <div className="mt-6">
                    {selectedTab === 1 ? <Profile /> : <Room />}
                </div>
            </div>
    );
};

export default DashBoard;
