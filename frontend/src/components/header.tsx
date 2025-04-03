import Link from "next/link";
import Image from "next/image";
import img from '../img/logo-alt.png';
import API from "./utils/api";
import Humberger from "./SVG/HumbergerMenu";
import SignHead from "./signUpheader";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderLink {
    id: number;
    title: string;
    titleId?: number;
}

interface HeaderData {
    links: HeaderLink[];
}

const Header = async () => {
    const res = await fetch(`${API}/api/getHeader`, { cache: "no-store" });
    const posts: HeaderData = await res.json();

    return (
        <nav className="w-full z-20 top-0 start-0 mt-6 sticky bg-light-color1 dark:bg-color6">
            <div className="max-w-screen-xl xl:w-[1000px] flex flex-wrap items-center justify-between md:justify-around mx-2 md:mx-auto p-3 
                bg-light-color5 dark:bg-color1 rounded-full border border-light-color6 dark:border-color5 transition-all duration-300">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={img} className="h-8 w-32" alt="Logo" width={100} height={128} />
                </Link>
                <Humberger />
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-primaryMedium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                        {posts.links.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href="#"
                                    className="inline-block py-2 px-4 text-sm text-light-color2 dark:text-color2
                                    hover:text-light-color4 dark:hover:text-color4 hover:bg-light-color6 dark:hover:bg-color5
                                    rounded-full transition-all duration-300"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <ThemeSwitcher />
                <SignHead />
            </div>
        </nav>
    );
};

export default Header;
