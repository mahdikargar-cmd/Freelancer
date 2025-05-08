import React from 'react';

const HiringGuide = () => {
    return (
        <section className="dark:bg-color6 bg-light-color6 dark:text-color7 text-light-color7 py-20">
            <div className="container mx-auto px-6">
                <h1 className="dark:text-color4 text-light-color4 font-primaryBold text-4xl md:text-5xl text-center mb-16 tracking-tight">
                    راهنمای استخدام در ددلاین
                </h1>

                <div className="max-w-5xl mx-auto bg-white dark:bg-color1 rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="space-y-16">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-color4 dark:bg-color2 text-white rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۱
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    تعریف پروژه
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-gray-600 dark:text-gray-300">
                                    با دقت نیازهای پروژه خود را مشخص کنید. توضیحات کامل شامل اهداف، مهارت‌های مورد نیاز، بودجه و زمان‌بندی را ارائه دهید تا فریلنسرهای حرفه‌ای به پروژه شما جذب شوند.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-color4 dark:bg-color2 text-white rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۲
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    جستجوی فریلنسر
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-gray-600 dark:text-gray-300">
                                    از بازار استعدادهای ددلاین استفاده کنید. پروفایل‌ها، نمونه‌کارها و نظرات مشتریان قبلی را بررسی کنید تا بهترین فریلنسر را برای پروژه خود پیدا کنید.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-color4 dark:bg-color2 text-white rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۳
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    ارتباط و توافق
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-gray-600 dark:text-gray-300">
                                    از سیستم پیام‌رسان ددلاین برای ارتباط با فریلنسرها استفاده کنید. جزئیات پروژه را نهایی کرده و قرارداد را تنظیم کنید. پرداخت امن با ابزارهای ددلاین تضمین می‌شود.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-color4 dark:bg-color2 text-white rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۴
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    مدیریت پروژه و تحویل
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-gray-600 dark:text-gray-300">
                                    پیشرفت پروژه را در پلتفرم ددلاین دنبال کنید. پس از تحویل کار، آن را بررسی کنید و در صورت رضایت، پرداخت را آزاد کنید. نظرات خود را برای تقویت جامعه ددلاین ثبت کنید.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href="#"
                            className="inline-block bg-color4 dark:bg-color2 text-black font-primaryMedium py-4 px-8 rounded-xl text-lg hover:bg-opacity-80 transition shadow-md"
                        >
                            همین حالا پروژه خود را شروع کنید
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HiringGuide;