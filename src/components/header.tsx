import Link from "next/link";

const Header = () => {
    const mainHeader = [
        {
            title: 'صفحه اصلی',
            id: 1
        },
        {
            title: 'محصولات',
            id: 2
        },
        {
            title: 'درباره ما',
            id: 3
        },
        {
            title: 'تماس با ما',
            id: 4
        },
        {
            title: 'مقالات',
            id: 5
        },
        {
            title: 'ثبت نام کاربر',
            id: 6
        }
    ];

    return (
        <>
            {/* Top header */}
            <div className="bg-gray-100 w-full border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Link href="/" className="text-gray-700 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </Link>
                        <Link href="/faq" className="text-gray-700 hover:text-red-500 text-sm">
                            FAQ
                        </Link>
                        <Link href="/en" className="text-gray-700 hover:text-red-500 text-sm">
                            EN
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <Link href="/auth" className="font-bold text-gray-700 hover:text-red-500 text-sm">
                            ثبت نام / ورود
                        </Link>
                        <Link href="/search" className="text-gray-700 hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Link>
                        <Link href="/cart" className="text-gray-700 hover:text-red-500 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">1</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Logo center */}


            {/* Main navigation */}
            <nav className="bg-white border-b border-gray-200 shadow-sm grid grid-cols-12">
                <div className="bg-white py-4 col-span-2">
                    <div className="max-w-screen-xl mx-auto flex justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">لوگوی سایت</h1>
                        </div>
                    </div>
                </div>
               <div className="max-w-screen-xl mx-auto col-span-10">
                    <ul className="flex justify-center items-center  space-x-8 rtl:space-x-reverse">
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

            </nav>
        </>
    );
};

export default Header;