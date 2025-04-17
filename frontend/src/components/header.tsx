"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import img from "../img/logo-2.ico";
import API from "./utils/api";
import Humberger from "./SVG/HumbergerMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import SignHead from "@/components/signUpheader";

interface HeaderLink {
    id: number;
    title: string;
    titleId: number;
    link: string;
}

interface HeaderData {
    links: HeaderLink[];
}

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
        <nav className="w-full z-20 top-0 start-0 mt-6 sticky bg-light-color1 dark:bg-color6">
            <div
                className="max-w-screen-xl xl:w-[1000px] flex flex-wrap items-center justify-between md:justify-around mx-2 md:mx-auto p-3 bg-light-color5 dark:bg-color1 rounded-full border border-light-color6 dark:border-color5 transition-all duration-300">


                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={img} className="h-12 w-12" alt="لوگو" width={100} height={128} loading="lazy"/>
                </Link>
                <ThemeSwitcher/>
                <Humberger/>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-primaryMedium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                        {headerData.links.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.link}
                                    className="inline-block py-2 px-4 text-sm text-light-color2 dark:text-color2 hover:text-light-color4 dark:hover:text-color4 hover:bg-light-color6 dark:hover:bg-color5 rounded-full transition-all duration-300"
                                    aria-label={`لینک به ${item.title}`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <SignHead/>

            </div>
        </nav>
    );
};

export default Header;