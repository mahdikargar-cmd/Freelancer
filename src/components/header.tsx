import Link from "next/link";
import Image from "next/image";
import img from '../img/logo-black.png'

const Header = () => {
    const mainHeader = [
        {
            title: 'صفحه اصلی',
            id: 1
        },
        {
            title: 'فریلنسر',
            id: 2
        },
        {
            title: 'کارفرما'
            , id: 3
        },
        {
            title: 'درباره ما',
            id: 4
        },

        {
            title: 'ثبت نام کاربر',
            id: 5
        }
    ];

    return (
        <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={img} className="h-8 w-32" alt="Flowbite Logo" width={100} height={128}/>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button data-collapse-toggle="navbar-sticky" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-primaryMedium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        {mainHeader.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href="#"
                                    className={`inline-block py-4 px-2 text-sm font-medium hover:text-red-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-300 ${item.id === 1 ? 'text-black' : 'text-gray-600'}`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;