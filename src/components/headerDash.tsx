'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

const NavPro = () => {
    const pathname = usePathname();

    interface Info {
        title: string;
        link: string;
        id: number;
    }

    const info: Info[] = [
        {
            title: "اتاق کار",
            link: "/panel/dashboard/myRoom",
            id: 1
        },
        {
            title: "پروفایل",
            link: "/panel/dashboard/profile",
            id: 2
        }
    ];

    return (
        <nav className="w-full md:max-w-screen-xl mx-auto bg-color1 border border-color5 text-white font-primaryMedium text-xl shadow-md py-4 mt-6 rounded-full">
            <ul className="flex justify-center space-x-8">
                {info.map((item) => (
                    <li key={item.id}>
                        <Link href={item.link}>
                            <span className={`inline-block py-2 px-4 text-sm text-color2 hover:text-color4 hover:bg-color5 rounded-full ${pathname === item.link ? "bg-color4 text-color6" : ""}`}>
                                {item.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavPro;
