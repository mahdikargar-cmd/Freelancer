import React from 'react';

const TalentMarket = () => {
    // Static data for demonstration; replace with API data later
    const freelancers = [
        {
            id: 1,
            name: 'علی محمدی',
            role: 'طراح گرافیک',
            rating: 4.8,
            reviews: 120,
            skills: ['فتوشوب', 'ایلاستریتور', 'طراحی UI/UX'],
            avatar: 'https://via.placeholder.com/80',
            hourlyRate: 500000,
            projectsCompleted: 85,
        },
        {
            id: 2,
            name: 'سارا حسینی',
            role: 'برنامه‌نویس وب',
            rating: 4.9,
            reviews: 95,
            skills: ['React', 'Node.js', 'TypeScript'],
            avatar: 'https://via.placeholder.com/80',
            hourlyRate: 700000,
            projectsCompleted: 62,
        },
        {
            id: 3,
            name: 'رضا احمدی',
            role: 'متخصص سئو',
            rating: 4.7,
            reviews: 80,
            skills: ['سئو تکنیکال', 'تحلیل کلمات کلیدی', 'لینک‌سازی'],
            avatar: 'https://via.placeholder.com/80',
            hourlyRate: 450000,
            projectsCompleted: 50,
        },
    ];

    return (
        <section className="dark:bg-color6 bg-light-color5 dark:text-color7 text-light-color7 py-20">
            <div className="container mx-auto px-6">
                <h1 className="dark:text-color4 text-light-color4 font-primaryBold text-4xl md:text-5xl text-center mb-16 tracking-tight">
                    بازار استعدادهای ددلاین
                </h1>

                <div className="max-w-6xl mx-auto">
                    {/* Search and Filter Bar */}
                    <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="جستجوی فریلنسر یا مهارت..."
                                className="w-full py-3 px-5 rounded-xl bg-light-color1 dark:bg-color5 border dark:border-color5 border-light-color6 text-sm font-primaryLight focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 placeholder-light-color7 dark:placeholder-color7"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select className="py-3 px-4 rounded-xl bg-light-color1 dark:bg-color5 border dark:border-color5 border-light-color6 text-sm font-primaryLight focus:outline-none text-light-color2 dark:text-color7">
                                <option>دسته‌بندی</option>
                                <option>طراحی</option>
                                <option>برنامه‌نویسی</option>
                                <option>سئو</option>
                            </select>
                            <select className="py-3 px-4 rounded-xl bg-light-color1 dark:bg-color5 border dark:border-color5 border-light-color6 text-sm font-primaryLight focus:outline-none text-light-color2 dark:text-color7">
                                <option>مرتب‌سازی</option>
                                <option>بالاترین امتیاز</option>
                                <option>بیشترین پروژه</option>
                                <option>نرخ ساعتی</option>
                            </select>
                        </div>
                    </div>

                    {/* Freelancers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {freelancers.map((freelancer) => (
                            <div
                                key={freelancer.id}
                                className="bg-light-color1 dark:bg-color5 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={freelancer.avatar}
                                        alt={freelancer.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="dark:text-color2 text-light-color2 font-primaryMedium text-lg">
                                            {freelancer.name}
                                        </h3>
                                        <p className="text-sm font-primaryLight text-light-color7 dark:text-color7">
                                            {freelancer.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="font-primaryMedium text-light-color2 dark:text-color2">{freelancer.rating}</span>
                                        <span className="text-sm text-light-color7 dark:text-color7">({freelancer.reviews} نظر)</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-primaryLight text-light-color7 dark:text-color7">
                                        مهارت‌ها:
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {freelancer.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-light-color4 dark:bg-color4 text-light-color1 text-xs font-primaryLight py-1 px-3 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-primaryLight text-light-color7 dark:text-color7">
                                            نرخ ساعتی: {freelancer.hourlyRate.toLocaleString()} تومان
                                        </p>
                                        <p className="text-sm font-primaryLight text-light-color7 dark:text-color7">
                                            پروژه‌های تکمیل‌شده: {freelancer.projectsCompleted}
                                        </p>
                                    </div>
                                    <a
                                        href="#"
                                        className="bg-light-color4 dark:bg-color4 text-light-color1 font-primaryMedium py-2 px-4 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition"
                                    >
                                        مشاهده پروفایل
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

export default TalentMarket;