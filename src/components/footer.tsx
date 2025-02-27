import Image from "next/image";
import Link from "next/link";
import logo from '../img/logo-black.png'
const Footer = () => {

    const logoRight = [
        {
            img: logo,
            text: "تهران خیابان انقلاب",
            email: "support@ProLancer.com",
            id: 1
        }
    ]

    const linkFooter = [
        {
            title: 'پشتیبانی',
            text: 'support@ProLancer.com',
            id: 1
        },
        {
            title: 'مجوزها',
            text: 'اینماد',
            id: 2
        },
        {
            title: 'تماس با ما',
            text: '09123456789',
            id: 3
        },
    ];

    const licence = [
        {
            text: "تمامی حقوق این سایت متعلق به شرکت پرو لنسر میباشد .",
            id: 1
        }
    ];

    return (
        <footer className="bg-white relative">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        {
                            logoRight.map((items) => (
                                <div className="flex flex-col items-center" key={items.id}>
                                    <Image src={items.img} className="h-8 mb-2" alt="ProLancer Logo" width={120} height={24} />
                                    <p className="text-right font-primaryMedium">
                                        {items.text}
                                    </p>
                                    <p className="text-right font-primaryMedium">
                                        {items.email}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3">
                        {
                            linkFooter.map((items) => (
                                <div key={items.id} className="font-primaryMedium">
                                    <h1 className="mb-6 text-sm font-semibold text-gray-900 uppercase">{items.title}</h1>
                                    <ul className="text-gray-500 font-medium">
                                        <li className="mb-4">
                                            <Link href="/" className="hover:underline">{items.text}</Link>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    {
                        licence.map((items) => (
                            <span key={items.id} className="text-sm text-gray-500 sm:text-center font-primaryMedium">
                                {items.text}
                            </span>
                        ))
                    }
                </div>
            </div>
        </footer>

    )
}

export default Footer;