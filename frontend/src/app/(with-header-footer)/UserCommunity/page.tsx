import React from 'react';

const UserCommunity = () => {
    return (
        <section className="dark:bg-color6 bg-light-color5 dark:text-color7 text-light-color7 py-20">
            <div className="container mx-auto px-6">
                <h1 className="dark:text-color4 text-light-color4 font-primaryBold text-4xl md:text-5xl text-center mb-16 tracking-tight">
                    جامعه کاربران ددلاین
                </h1>

                <div className="max-w-5xl mx-auto bg-light-color1 dark:bg-color5 rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="space-y-16">
                        {/* Feature 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4  dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۱
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    فروم‌های تخصصی
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    در فروم‌های ددلاین، فریلنسرها و کارفرمایان می‌توانند در موضوعات مختلف از طراحی گرافیک تا برنامه‌نویسی بحث کنند. سوالات خود را مطرح کنید، تجربیات خود را به اشتراک بگذارید و از دانش جمعی جامعه بهره‌مند شوید.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۲
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    رویدادهای آنلاین و آفلاین
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    ددلاین به‌طور منظم وبینارها، کارگاه‌های آموزشی و رویدادهای شبکه‌سازی برگزار می‌کند. این رویدادها فرصتی برای یادگیری، تبادل ایده و ایجاد ارتباطات حرفه‌ای با دیگر اعضای جامعه فراهم می‌کنند.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۳
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    گروه‌های تخصصی
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    به گروه‌های تخصصی ددلاین در زمینه‌های مختلف مانند طراحی، برنامه‌نویسی، سئو و بازاریابی بپیوندید. این گروه‌ها فضایی برای همکاری، حل مشکلات و به اشتراک گذاشتن منابع هستند.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۴
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    داستان‌های موفقیت
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    در بخش داستان‌های موفقیت، اعضای جامعه تجربیات خود را از همکاری‌های موفق در ددلاین به اشتراک می‌گذارند. این داستان‌ها الهام‌بخش هستند و به شما انگیزه می‌دهند تا بهترین نسخه خود را ارائه دهید.
                                </p>
                            </div>
                        </div>

                        {/* Feature 5 */}
                        <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۵
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    برنامه‌های مربیگری
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    از طریق برنامه‌های مربیگری ددلاین، می‌توانید با فریلنسرهای باتجربه یا متخصصان صنعت ارتباط برقرار کنید. این برنامه‌ها به شما کمک می‌کنند تا مهارت‌های خود را ارتقا دهید و در حرفه خود رشد کنید.
                                </p>
                            </div>
                        </div>

                        {/* Feature 6 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 transform hover:scale-105 transition duration-300">
                            <div className="flex-shrink-0 bg-light-color4 dark:bg-color4 text-light-color1 rounded-full w-14 h-14 flex items-center justify-center font-primaryBold text-2xl shadow-lg">
                                ۶
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="dark:text-color2 text-light-color2 font-primaryMedium text-2xl mb-4">
                                    بازخورد و بهبود پلتفرم
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    جامعه کاربران ددلاین نقشی کلیدی در بهبود پلتفرم دارد. از طریق نظرسنجی‌ها و جلسات بازخورد، می‌توانید پیشنهادات خود را مطرح کنید و به شکل‌گیری آینده ددلاین کمک کنید.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href="#"
                            className="inline-block bg-light-color4 dark:bg-color4 text-light-color1 font-primaryMedium py-4 px-8 rounded-xl text-lg hover:bg-light-color8 dark:hover:bg-color8 transition shadow-md"
                        >
                            به جامعه ددلاین بپیوندید
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserCommunity;