"use client";
import React, { useEffect, useState } from "react";
import { DashboardAd } from "@/app/admin/dashboardAd/page";
import {
    BadgeIcon,
    BarChart3,
    Bell,
    ChevronRight,
    HelpCircle,
    LogOut,
    MessageSquare,
    Search,
    Settings,
    SunIcon,
    User,
    Users,
    Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectSetting from "./test/page";
import ProjectsList from "@/components/ProjectsList";
import UserList from "@/components/userList";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
// انیمیشن‌های انطباق نوار کناری
const sidebarVariants = {
    open: { width: "240px", transition: { duration: 0.3 } },
    closed: { width: "80px", transition: { duration: 0.3 } },
};

const logoTextVariants = {
    open: { opacity: 1, display: "block", transition: { delay: 0.1, duration: 0.2 } },
    closed: { opacity: 0, display: "none", transition: { duration: 0.2 } },
};

const Admin = () => {
    const [component, setComponent] = useState("dashboardAd");
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const route = useRouter();
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setIsOpen(!mobile);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // منوهای اصلی و تنظیمات
    const mainMenuItems = [
        { text: "داشبورد", id: 1, component: "dashboardAd", icon: <BadgeIcon size={20} /> },
        { text: "کاربران", id: 2, component: "users", icon: <Users size={20} /> },
        { text: "گزارش‌ها", id: 3, component: "reports", icon: <BarChart3 size={20} /> },
        { text: "پیام‌ها", id: 4, component: "messages", icon: <MessageSquare size={20} /> },

    ];

    const settingsMenuItems = [
        { text: "تنظیمات", id: 5, component: "settings", icon: <Settings size={20} /> },
        { text: "راهنما", id: 6, component: "help", icon: <HelpCircle size={20} /> },
        { text: "تنظیمات پروژه", id: 7, component: "ProjectSetting", icon: <Settings size={20} /> },
        { text: "لیست پروژه ها", id: 8, component: "ProjectsList", icon: <MessageSquare size={20} /> },
        { text: "لیست کاربران", id: 9, component: "UserList", icon: <User size={20} /> },
    ];

    // تابعی برای رندر کردن کامپوننت‌ها
    const renderComponent = () => {
        switch (component) {
            case "dashboardAd":
                return <DashboardAd />;
            case "ProjectSetting":
                return <ProjectSetting />;
            case "ProjectsList":
                return <ProjectsList />;
            case "UserList":
                return <UserList />
            default:
                return <DashboardAd />;
        }
    };

    // کامپوننت Sidebar (نوار کناری)
    const Sidebar = () => (
        <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariants}
            className="bg-color5 h-full p-4 flex flex-col overflow-hidden relative"
        >
            {/* لوگو */}
            <div className="flex items-center mb-8 space-x-2 space-x-reverse">
                <div className="w-10 h-10 rounded-lg bg-color4 flex items-center justify-center">
                    <span className="text-xl font-primaryBold text-color1">د</span>
                </div>
                <motion.div variants={logoTextVariants} className="font-primaryBold text-color2 text-lg">
                    ددلاین
                </motion.div>
            </div>

            {/* دکمه تغییر منو در موبایل */}
            {isMobile && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-color2 absolute top-6 right-4"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* بخش جستجو */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="جستجو..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-color6 rounded-lg py-2 text-color2 focus:outline-none focus:ring-1 focus:ring-color4 ${isOpen ? "pl-4 pr-10" : "px-2"
                        }`}
                />
                <Search size={18} className="absolute left-3 top-2.5 text-color7" />
            </div>

            {/* منوی اصلی */}
            <div className="space-y-1 mb-6">
                <div className={`text-color7 text-xs mb-2 ${!isOpen && "text-center"}`}>
                    {isOpen ? "منو اصلی" : "منو"}
                </div>
                {mainMenuItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ backgroundColor: "#262626" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setComponent(item.component)}
                        className={`flex items-center py-2 px-3 w-full rounded-lg transition-colors ${component === item.component ? "bg-color6 text-color4" : "text-color2 hover:bg-color6"
                            }`}
                    >
                        <div className={component === item.component ? "text-color4" : "text-color7"}>
                            {item.icon}
                        </div>
                        {isOpen && <span className="mr-3 whitespace-nowrap">{item.text}</span>}
                    </motion.button>
                ))}
            </div>

            {/* منوی تنظیمات */}
            <div className="space-y-1 mb-6">
                <div className={`text-color7 text-xs mb-2 ${!isOpen && "text-center"}`}>
                    {isOpen ? "تنظیمات" : "⚙️"}
                </div>
                {settingsMenuItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ backgroundColor: "#262626" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setComponent(item.component)}
                        className={`flex items-center py-2 px-3 w-full rounded-lg transition-colors ${component === item.component ? "bg-color6 text-color4" : "text-color2 hover:bg-color6"
                            }`}
                    >
                        <div className={component === item.component ? "text-color4" : "text-color7"}>
                            {item.icon}
                        </div>
                        {isOpen && <span className="mr-3 whitespace-nowrap font-primaryMedium">{item.text}</span>}
                    </motion.button>
                ))}
            </div>

            {/* دکمه تغییر حالت نوار کناری */}
            {!isMobile && (
                <motion.button
                    whileHover={{ backgroundColor: "#262626" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="mt-auto mb-4 flex items-center justify-center py-2 px-3 rounded-lg hover:bg-color6 transition"
                >
                    <ChevronRight
                        size={20}
                        className={`text-color7 transition-transform ${!isOpen && "rotate-180"}`}
                    />
                    {isOpen && <span className="mr-2 whitespace-nowrap">بستن منو</span>}
                </motion.button>
            )}
        </motion.div>
    );
    const logout = () => {
        Cookies.remove("adminToken");
        route.push('/')
    }
    // کامپوننت Header (سربرگ)
    const Header = () => (
        <header className="bg-color5 p-4 flex justify-between items-center">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-primaryBold text-color2"
            >
                {component === "dashboardAd" && "داشبورد"}
                {component === "test" && "صفحه تست"}
            </motion.h1>
            <div className="flex items-center space-x-4 space-x-reverse">
                {/* اعلان‌ها */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 rounded-full bg-color6 text-color7 hover:text-color2"
                >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-color4 rounded-full"></span>
                </motion.button>

                {/* پروفایل */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center space-x-2 space-x-reverse bg-color6 px-2 py-1 rounded-lg"
                    >
                        <div className="w-8 h-8 rounded-full bg-color4 flex items-center justify-center text-color1">
                            <User size={16} />
                        </div>
                        <span className="font-primaryMedium">مدیر</span>
                    </motion.button>

                    {/* منوی پروفایل */}
                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 mt-2 w-48 bg-color5 rounded-lg shadow-lg overflow-hidden z-50"
                            >
                                <div className="p-4 border-b border-color6">
                                    <p className="font-primaryMedium">مدیر سیستم</p>
                                    <p className="text-xs text-color7">admin@deadline.ir</p>
                                </div>
                                <div className="p-2">
                                    <button className="w-full flex items-center p-2 hover:bg-color6 rounded-lg transition">
                                        <User size={16} className="ml-2 text-color7" />
                                        <span>پروفایل</span>
                                    </button>
                                    <button className="w-full flex items-center p-2 hover:bg-color6 rounded-lg transition">
                                        <Settings size={16} className="ml-2 text-color7" />
                                        <span>تنظیمات</span>
                                    </button>
                                    <button className="w-full flex items-center p-2 hover:bg-color6 rounded-lg transition text-red-500 font-primaryMedium" onClick={logout}>
                                        <LogOut size={16} className="ml-2" />
                                            خروج
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );



    return (
        <div className="flex flex-col md:flex-row h-screen bg-color1 text-color2 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <motion.main
                    key={component}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-auto p-6 bg-color1"
                >
                    {renderComponent()}
                </motion.main>
            </div>
        </div>
    );
};

export default Admin;
