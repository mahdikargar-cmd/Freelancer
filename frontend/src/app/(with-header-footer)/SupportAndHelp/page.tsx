import React from 'react';

const SupportAndHelp = () => {
    return (
        <section className="dark:bg-color6 bg-light-color5 dark:text-color7 text-light-color7 py-20">
            <div className="container mx-auto px-6">
                <h1 className="dark:text-color4 text-light-color4 font-primaryBold text-4xl md:text-5xl text-center mb-16 tracking-tight">
                    پشتیبانی و راهنما در ددلاین
                </h1>

                <div className="max-w-5xl mx-auto bg-light-color1 dark:bg-color5 rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="space-y-16">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۱
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    دسترسی به مرکز راهنما
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    مرکز راهنمای ددلاین شامل مجموعه‌ای از مقالات، آموزش‌ها و سوالات متداول (FAQ) است که به شما کمک می‌کند با پلتفرم آشنا شوید. از نحوه ساخت پروفایل تا مدیریت پرداخت‌ها، همه چیز به‌صورت گام‌به‌گام توضیح داده شده است.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۲
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    پشتیبانی 24/7 از طریق چت
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    تیم پشتیبانی ددلاین به‌صورت 24 ساعته از طریق چت آنلاین در دسترس است. چه کارفرما باشید و چه فریلنسر، می‌توانید برای مشکلات فنی، سوالات مربوط به پروژه یا هر موضوع دیگری مستقیماً با تیم پشتیبانی ارتباط برقرار کنید.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۳
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    پشتیبانی ایمیلی و تیکت
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    برای مسائل پیچیده‌تر، می‌توانید از طریق سیستم تیکت یا ایمیل با تیم پشتیبانی تماس بگیرید. کافی است مشکل خود را شرح دهید تا در کوتاه‌ترین زمان پاسخ دقیق و حرفه‌ای دریافت کنید. این روش برای پیگیری موضوعات خاص بسیار مناسب است.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۴
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    جامعه کاربران و فروم
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    در جامعه کاربران ددلاین، می‌توانید با دیگر فریلنسرها و کارفرمایان ارتباط برقرار کنید، سوالات خود را مطرح کنید و از تجربیات دیگران بهره‌مند شوید. فروم ددلاین فضایی برای تبادل دانش و حل مشکلات به‌صورت جمعی است.
                                </p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۵
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    وبینارها و آموزش‌های زنده
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    ددلاین به‌صورت دوره‌ای وبینارها و جلسات آموزشی زنده برگزار می‌کند تا کاربران را با قابلیت‌های جدید پلتفرم، نکات فریلنسینگ و بهترین روش‌های کار آشنا کند. این جلسات فرصتی عالی برای یادگیری و پرس‌وجو مستقیم هستند.
                                </p>
                            </div>
                        </div>

                        {/* Step 6 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۶
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    حل اختلافات
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    در صورت بروز اختلاف بین کارفرما و فریلنسر، تیم پشتیبانی ددلاین با بررسی قرارداد و شواهد، به‌صورت بی‌طرفانه به حل مشکل کمک می‌کند. این فرآیند تضمین می‌کند که حقوق هر دو طرف محفوظ بماند.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href="#"
                            className="inline-block bg-light-color4 dark:bg-color4 text-light-color1 font-primaryMedium py-4 px-8 rounded-xl text-lg hover:bg-light-color8 dark:hover:bg-color8 transition shadow-md"
                        >
                            تماس با پشتیبانی
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportAndHelp;