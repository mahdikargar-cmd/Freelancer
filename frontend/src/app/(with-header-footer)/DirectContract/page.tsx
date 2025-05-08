import React from 'react';

const DirectContract = () => {
    return (
        <section className="dark:bg-color6 bg-light-color5 dark:text-color7 text-light-color7 py-20">
            <div className="container mx-auto px-6">
                <h1 className="dark:text-color4 text-light-color4 font-primaryBold text-4xl md:text-5xl text-center mb-16 tracking-tight">
                    قرارداد مستقیم در ددلاین
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
                                    انتخاب فریلنسر و مذاکره اولیه
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    از بازار استعدادها یا کاتالوگ پروژه، فریلنسر مناسب را پیدا کنید. از طریق سیستم پیام‌رسانی ددلاین با او ارتباط برقرار کنید و جزئیات پروژه مانند دامنه کار، زمان‌بندی، و بودجه را بحث کنید. این مرحله برای توافق اولیه و شفاف‌سازی انتظارات حیاتی است.
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
                                    تنظیم قرارداد
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    پس از توافق، از ابزار قرارداد مستقیم ددلاین استفاده کنید. جزئیات پروژه شامل شرح خدمات، مبلغ، زمان تحویل، و تعداد ویرایش‌ها را در قرارداد مشخص کنید. قراردادهای ددلاین به‌صورت دیجیتال امضا می‌شوند و امنیت هر دو طرف را تضمین می‌کنند.
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
                                    پرداخت امن از طریق امانت
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    کارفرما مبلغ پروژه را در سیستم امانت (Escrow) ددلاین واریز می‌کند. این مبلغ تا زمان تکمیل و تأیید پروژه نزد ددلاین نگه داشته می‌شود. این روش تضمین می‌کند که فریلنسر پس از تحویل کار باکیفیت دستمزد خود را دریافت کند و کارفرما از کیفیت کار مطمئن باشد.
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
                                    اجرای پروژه و تحویل
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    فریلنسر پروژه را طبق قرارداد اجرا کرده و کار را در زمان مشخص‌شده تحویل می‌دهد. کارفرما می‌تواند پیشرفت پروژه را از طریق پلتفرم ددلاین پیگیری کند و در صورت نیاز بازخورد یا درخواست ویرایش ارائه دهد.
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
                                    تأیید و آزادسازی پرداخت
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    پس از تحویل پروژه، کارفرما کار را بررسی می‌کند. در صورت رضایت، پرداخت از حساب امانت آزاد شده و به فریلنسر منتقل می‌شود. هر دو طرف می‌توانند بازخورد و امتیاز برای یکدیگر ثبت کنند تا به بهبود اعتبار در پلتفرم کمک کنند.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href="#"
                            className="inline-block bg-light-color4 dark:bg-color4 text-light-color1 font-primaryMedium py-4 px-8 rounded-xl text-lg hover:bg-light-color8 dark:hover:bg-color8 transition shadow-md"
                        >
                            شروع قرارداد مستقیم
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DirectContract;