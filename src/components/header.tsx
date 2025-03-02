import Link from "next/link";
import Image from "next/image";
import img from '../img/logo-alt.png'
import API from "./api";
import Humberger from "./SVG/HumbergerMenu";
import SignHead from "./signUpheader";

interface HeaderLink {
    id: number;
    title: string;
    titleId?: number;
}

interface HeaderData {
    links: HeaderLink[]
}

const Header = async () => {
    const res = await fetch(`${API}/api/getHeader`, { cache: "no-store" });
    const posts: HeaderData = await res.json();

    return (
        <nav className="w-full z-20 top-0 start-0 mt-6 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:justify-around mx-auto p-4 bg-color1 rounded-full">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={img} className="h-8 w-32" alt="Flowbite Logo" width={100} height={128} />
                </Link>
                <Humberger />
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-primaryMedium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                        {posts.links.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href="#"
                                    className={`inline-block py-2 px-4 text-sm text-color2 hover:text-color4 hover:bg-color5 rounded-full `}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <SignHead />
            </div>
        </nav>
    );
};

export default Header;