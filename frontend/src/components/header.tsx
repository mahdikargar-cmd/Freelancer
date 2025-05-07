"use client";
import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import img from "../img/logo.svg";
import API from "./utils/api";
import ThemeSwitcher from "./ThemeSwitcher";
import SignHead from "@/components/signUpheader";
import {FaHome} from "react-icons/fa";
import {IoIosNotifications} from "react-icons/io";
import {ImBubble} from "react-icons/im";
import {AiFillProduct} from "react-icons/ai";
import {RiFolderUserFill} from "react-icons/ri";

interface HeaderLink {
    id: number;
    title: string;
    titleId: number;
    link: string;
}

interface HeaderData {
    links: HeaderLink[];
}

// تابع برای تعیین آیکون هر لینک بر اساس عنوان یا آدرس آن
const getLinkIcon = (title: string, link: string) => {
    const titleLower = title.toLowerCase();
    const linkLower = link.toLowerCase();

    if (link === "/" || titleLower.includes("خانه") || titleLower.includes("اصلی") || linkLower.includes("home")) {
        return <FaHome className="text-xl mb-1"/>;
    } else if (titleLower.includes("پروژه ها") || linkLower.includes("about")) {
        return <AiFillProduct className="text-xl mb-1"/>;
    } else if (titleLower.includes("پنل چت") || linkLower.includes("contact")) {
        return <ImBubble className="text-xl mb-1"/>;
    }else if (titleLower.includes("داشبورد") || linkLower.includes("contact")) {
        return <RiFolderUserFill className="text-xl mb-1"/>;
    }

    // آیکون پیش‌فرض
    return <div className="w-5 h-5 rounded-full bg-light-color4 dark:bg-color4 mb-1"></div>;
};

const Header = () => {
    const [headerData, setHeaderData] = useState<HeaderData>({links: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API}/api/getHeader`, {cache: "no-store"});
                if (!res.ok) {
                    throw new Error("خطا در دریافت داده‌های هدر");
                }
                const data: HeaderData = await res.json();
                setHeaderData(data);
                setError(null);
            } catch (err: any) {
                console.error("خطا در فچ هدر:", err);
                setError("نمی‌توان داده‌های هدر را بارگذاری کرد");
            } finally {
                setLoading(false);
            }
        };

        fetchHeaderData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-16 flex items-center justify-center bg-light-color1 dark:bg-color6">
                <div
                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="w-full h-16 flex items-center justify-center bg-light-color1 dark:bg-color6 text-light-color9 dark:text-color9">
                {error}
            </div>
        );
    }

    return (
        <>
            {/* هدر اصلی */}
            <nav className="w-full  z-20 top-0 start-0 mt-6  sticky bg-light-color1 dark:bg-color6 dir-rtl">
                <div
                    className="max-w-screen-xl xl:w-[1000px] flex items-center justify-between mx-auto px-4 py-2 bg-light-color5 dark:bg-color1 rounded-full border border-light-color6 dark:border-color5 transition-all duration-300">

                    {/* لوگو و سوئیچر حالت شب - سمت راست */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse order-1">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={img}
                                className="h-12 w-12 dark:filter dark:invert dark:brightness-0"
                                alt="لوگو"
                                width={100}
                                height={128}
                                loading="lazy"
                            />
                        </Link>
                        <ThemeSwitcher/>
                    </div>

                    {/* لینک‌های هدر - وسط در دسکتاپ */}
                    <div className="hidden md:flex items-center justify-center order-2">
                        <ul className="flex flex-row font-primaryMedium gap-4 text-sm">
                            {headerData.links.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.link}
                                        className="inline-block py-2 px-4 text-light-color2 dark:text-color2 hover:text-light-color4 dark:hover:text-color4 hover:bg-light-color6 dark:hover:bg-color5 rounded-full transition-all duration-300"
                                        aria-label={`لینک به ${item.title}`}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* آیکون ورود سمت چپ */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse order-3">
                        <Link href={'../notification'}>
                            <IoIosNotifications className={'size-6 dark:text-color4'}/>

                        </Link>
                        <SignHead/>
                    </div>
                </div>
            </nav>

            {/* منوی ثابت پایین صفحه (فقط در حالت موبایل) */}
            <div
                className="md:hidden fixed bottom-0 left-0 right-0 bg-light-color5 dark:bg-color1 border-t border-light-color6 dark:border-color5 z-50">
                <div className="flex justify-around items-center px-2 py-3">
                    {headerData.links.slice(0, 5).map((item) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="flex flex-col items-center justify-center text-light-color2 dark:text-color2 hover:text-light-color4 dark:hover:text-color4 transition-all duration-300"
                            aria-label={`لینک به ${item.title}`}
                        >
                            {getLinkIcon(item.title, item.link)}
                            <span className="text-xs">{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Header;