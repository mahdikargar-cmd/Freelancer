import Link from "next/link";

const Footer = () => {
    const footerLinks = [
        {
            title: 'لینک‌های سریع',
            links: [
                { name: 'صفحه اصلی', url: '/' },
                { name: 'کارفرما', url: '/employer' },
                { name: 'فریلنسر', url: '/freelancer' },
                { name: 'درباره ما', url: '/about' },
                { name: 'تماس با ما', url: '/contact' },

            ] 
        },
        {
           title: 'خدمات مشتریان',
            links: [
                { name: 'سوالات متداول', url: '/faq' },
                { name: 'شرایط و مقررات', url: '/terms' },
                { name: 'حریم خصوصی', url: '/privacy' },
            ]
        },
        {
            title: 'تماس با ما',
            links: [
                { name: 'تهران، خیابان ولی‌عصر', url: '#' },
                { name: 'تلفن: ۰۲۱-۸۸۷۷۶۶۵۵', url: '#' },
                { name: 'ایمیل: info@example.com', url: '#' },
                { name: 'ساعات کاری: ۹ صبح تا ۵ عصر', url: '#' }
            ]
        }
    ];

    const socialLinks = [
        { name: 'تلگرام', icon: 'M22.05 1.577c-.393-.016-.784.08-1.117.235-.484.186-4.92 1.902-9.41 3.64-2.26.873-4.518 1.746-6.256 2.415-1.737.67-3.045 1.168-3.114 1.192-.46.16-.868.432-1.15.83-.28.4-.41.866-.373 1.296.09 1.077 1.92 1.5 1.92 1.5l4.96 1.626c.225.62.49 1.804 1.05 3.432.04.14.21.81.41 1.485.2.685.43 1.358.59 1.663.08.155.22.39.4.565.16.17.33.3.52.365.22.07.4.03.65-.13.25-.16 3.8-3.42 3.8-3.42l4.78 3.53.03.01.01.01c.16.12.33.2.5.24.17.04.35.05.51.02.16-.02.31-.08.46-.19.12-.1.25-.27.31-.45.3-.78.71-2.05 1.06-3.1.35-1.06.68-2.01.89-2.58l2.26-6.62c.25-.75.32-1.37.32-1.93 0-.51-.05-.94-.19-1.3-.14-.35-.36-.66-.66-.89-.31-.24-.66-.4-1.01-.44zm-.84 1.79c.03 0 .05.01.08.01.07.02.13.05.17.1.05.04.08.1.11.17.02.07.02.25.02.25l-2.28 6.7c-.2.59-.54 1.55-.89 2.61-.36 1.06-.76 2.29-1.03 3.03l-7.63-5.63-4.24 3.76.49-4.7c.27-.75 5.1-6.27 7.68-9.43.01-.01.02-.03.03-.04l.04-.03c.01-.01.03-.01.04-.02.03-.01.05-.02.08-.02.05-.01.11 0 .15.03.05.03.08.07.1.12.02.05.02.1.01.15-.01.04-.03.08-.06.1-.02.03-.05.05-.07.05-.16.1-.68.44-1.38.89-.7.45-1.56 1.01-2.42 1.57-1.71 1.12-3.42 2.25-3.42 2.25l9.35-3.65c.11-.04.2-.11.27-.2.06-.09.1-.19.08-.29-.01-.1-.07-.19-.16-.26-.09-.07-.19-.11-.31-.11l-9.06 3.38c-.1.03-.2.09-.28.17-.08.08-.14.18-.17.29-.01.05-.02.1-.01.16.01.05.04.1.08.15.04.04.09.07.14.1.05.02.11.02.16.01l9.72-3.55z', url: '#' },
        { name: 'واتس‌اپ', icon: 'M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.196-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z', url: '#' },
        { name: 'اینستاگرام', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z', url: '#' }
    ];
   

  
    const newsLetterForm = () => {
        return (
            <div className="mt-6">
                <h4 className="font-primaryMedium text-gray-800 mb-3">عضویت در خبرنامه</h4>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="ایمیل خود را وارد کنید"
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-r-md focus:outline-none font-primaryMedium"
                    />
                    <button className="bg-black font-primaryMedium text-white px-4 py-2 rounded-l-md hover:bg-gray-800 transition duration-300">
                        عضویت
                    </button>
                </div>
            </div>
        );
    };

    return (
        <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">لوگوی سایت</h2>
                        <p className="text-gray-600 mb-4 font-primaryMedium">
                            فروشگاه آنلاین محصولات با بهترین کیفیت و قیمت مناسب. ما به دنبال جلب رضایت مشتریان عزیز هستیم.
                        </p>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="text-gray-500 hover:text-black transition-colors duration-300"
                                    aria-label={social.name}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                        {newsLetterForm()}
                    </div>

                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {footerLinks.map((column, index) => (
                            <div key={index}>
                                <h3 className="text-md font-primaryDemibold text-gray-900 mb-4">{column.title}</h3>
                                <ul>
                                    {column.links.map((link, linkIndex) => (
                                        <li key={linkIndex} className="mb-2">
                                            <Link
                                                href={link.url}
                                                className="text-gray-600 hover:text-black transition duration-300 font-primaryMedium"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm mb-4 md:mb-0 font-primaryMedium">
                            © ۱۴۰۴ تمامی حقوق این سایت محفوظ است.
                        </p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <img src="/images/enamad.png" alt="نماد اعتماد الکترونیکی" className="h-16 w-auto" />
                            <img src="/images/samandehi.png" alt="نشان ساماندهی" className="h-16 w-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;