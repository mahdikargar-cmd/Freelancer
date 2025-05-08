import React from 'react';

const ProjectCatalog = () => {
    // Static data for demonstration; replace with API data later
    const services = [
        {
            id: 1,
            title: 'طراحی لوگو حرفه‌ای',
            category: 'طراحی گرافیک',
            freelancer: 'علی محمدی',
            price: 1500000,
            deliveryTime: '۵ روز کاری',
            revisions: 2,
            description: 'طراحی لوگو با ۳ طرح اولیه، مناسب برای برندهای حرفه‌ای با امکان ۲ بار ویرایش رایگان.',
            image: 'https://via.placeholder.com/300x200',
            rating: 4.8,
            reviews: 45,
        },
        {
            id: 2,
            title: 'توسعه وب‌سایت وردپرسی',
            category: 'برنامه‌نویسی',
            freelancer: 'سارا حسینی',
            price: 4500000,
            deliveryTime: '۱۰ روز کاری',
            revisions: 3,
            description: 'طراحی و توسعه وب‌سایت وردپرسی با قالب اختصاصی و بهینه‌سازی کامل برای سئو.',
            image: 'https://via.placeholder.com/300x200',
            rating: 4.9,
            reviews: 32,
        },
        {
            id: 3,
            title: 'بهینه‌سازی سئو سایت',
            category: 'سئو',
            freelancer: 'رضا احمدی',
            price: 2000000,
            deliveryTime: '۷ روز کاری',
            revisions: 1,
            description: 'تحلیل کامل سایت، بهینه‌سازی کلمات کلیدی و بهبود رتبه در موتورهای جستجو.',
            image: 'https://via.placeholder.com/300x200',
            rating: 4.7,
            reviews: 28,
        },
    ];

    return (
        <section className="dark:bg-color6 bg-light-color5 dark:text-color7 text-light-color7 py-20">
            <div className="container mx-auto px-6">
                <h1 className="dark:text-color4 text-light-color4 font-primaryBold text-4xl md:text-5xl text-center mb-16 tracking-tight">
                    کاتالوگ پروژه‌های ددلاین
                </h1>

                <div className="max-w-6xl mx-auto">
                    {/* Search and Filter Bar */}
                    <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="جستجوی سرویس یا دسته‌بندی..."
                                className="w-full py-3 px-5 rounded-xl bg-light-color1 dark:bg-color5 border dark:border-color5 border-light-color6 text-sm font-primaryLight focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 placeholder-light-color7 dark:placeholder-color7"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select className="py-3 px-4 rounded-xl bg-light-color1 dark:bg-color5 border dark:border-color5 border-light-color6 text-sm font-primaryLight focus:outline-none text-light-color2 dark:text-color7">
                                <option>دسته‌بندی</option>
                                <option>طراحی گرافیک</option>
                                <option>برنامه‌نویسی</option>
                                <option>سئو</option>
                            </select>
                            <select className="py-3 px-4 rounded-xl bg-light-color1 dark:bg-color5 border dark:border-color5 border-light-color6 text-sm font-primaryLight focus:outline-none text-light-color2 dark:text-color7">
                                <option>مرتب‌سازی</option>
                                <option>محبوب‌ترین</option>
                                <option>قیمت: کم به زیاد</option>
                                <option>قیمت: زیاد به کم</option>
                            </select>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-light-color1 dark:bg-color5 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="dark:text-color2 text-light-color2 font-primaryMedium text-xl mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm font-primaryLight text-light-color7 dark:text-color7 mb-3">
                                        توسط: {service.freelancer} | {service.category}
                                    </p>
                                    <p className="text-sm font-primaryLight text-light-color7 dark:text-color7 mb-4 line-clamp-2">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-yellow-400">★</span>
                                        <span className="font-primaryMedium text-light-color2 dark:text-color2">{service.rating}</span>
                                        <span className="text-sm text-light-color7 dark:text-color7">({service.reviews} نظر)</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-sm font-primaryLight text-light-color7 dark:text-color7">
                                                قیمت: {service.price.toLocaleString()} تومان
                                            </p>
                                            <p className="text-sm font-primaryLight text-light-color7 dark:text-color7">
                                                زمان تحویل: {service.deliveryTime}
                                            </p>
                                            <p className="text-sm font-primaryLight text-light-color7 dark:text-color7">
                                                تعداد ویرایش: {service.revisions}
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="block w-full text-center bg-light-color4 dark:bg-color4 text-light-color1 font-primaryMedium py-2 px-4 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition"
                                    >
                                        سفارش دهید
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center gap-4">
                        <button className="py-2 px-4 bg-light-color4 dark:bg-color4 text-light-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition font-primaryMedium">
                            قبلی
                        </button>
                        <button className="py-2 px-4 bg-light-color4 dark:bg-color4 text-light-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition font-primaryMedium">
                            بعدی
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectCatalog;