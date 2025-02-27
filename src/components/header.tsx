import Image from "next/image";
import Link from "next/link";
import img from "../img/logo-alt.png"

const Header = () => {
    const mainHeader = [
        {
            title: 'صفحه اصلی',
            id: 1
        },
        {
            title: 'خدمات',
            id: 2
        },
        {
            title: 'وبلاگ',
            id: 3
        },
        {
            title: 'درباره ما',
            id: 4
        }
    ];

    const leftHeader = [
        {
            img: img,
            id: 1
        }
    ];

    const rightHeader = [
        {
            title: 'داشبورد',
            id: 1
        }
    ]

    return (
        <nav className="bg-gradient-to-l from-blue-900 to-blue-500 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {
                    leftHeader.map((items) => (
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse" key={items.id}>
                            <Image src={items.img} className="h-6" alt="Flowbite Logo" width={120} height={24} />
                        </Link>
                    ))
                }
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        rightHeader.map((items) => (
                            <button type="button" key={items.id} className="text-white bg-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full px-4 py-2 text-center font-primaryMedium text-md border-2 border-white">{items.title}</button>
                        ))
                    }
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">

                        {
                            mainHeader.map((items) => (
                                <li key={items.id}>
                                    <Link href="#" className="block py-2 px-3 text-white rounded-sm md:bg-transparent md:p-0 font-primaryBold text-lg hover:border-b-4 border-solid" aria-current="page">
                                        {items.title}
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;