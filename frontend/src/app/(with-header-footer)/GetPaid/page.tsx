import React from 'react';

const GetPaid = () => {
    return (
        <section className="dark:bg-color6 bg-light-color5 dark:text-color7 text-light-color7 py-20">
            <div className="container mx-auto px-6">
                <h1 className="dark:text-color4 text-light-color4 font-primaryBold text-4xl md:text-5xl text-center mb-16 tracking-tight">
                    دریافت دستمزد در ددلاین
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
                                    تکمیل پروژه با کیفیت
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    پروژه را طبق توافقات قرارداد و با بالاترین کیفیت انجام دهید. اطمینان حاصل کنید که تمام نیازهای کارفرما برآورده شده و کار در زمان تعیین‌شده تحویل داده می‌شود. تحویل به‌موقع و باکیفیت کلید دریافت دستمزد سریع است.
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
                                    تحویل پروژه از طریق پلتفرم
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    فایل‌ها و نتایج نهایی پروژه را از طریق سیستم ددلاین آپلود کنید. توضیحات لازم درباره کار انجام‌شده را ارائه دهید و در صورت نیاز، دستورالعمل‌های استفاده را به کارفرما بدهید. این کار به تأیید سریع‌تر پروژه کمک می‌کند.
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
                                    بررسی و تأیید توسط کارفرما
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    کارفرما پروژه تحویل‌شده را بررسی می‌کند. اگر کار مطابق قرارداد باشد، کارفرما آن را تأیید می‌کند. در صورت نیاز به ویرایش، کارفرما درخواست خود را مطرح می‌کند و شما می‌توانید طبق قرارداد تغییرات را اعمال کنید.
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
                                    آزادسازی دستمزد از امانت
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    پس از تأیید پروژه توسط کارفرما، مبلغی که در حساب امانت (Escrow) ددلاین نگه‌داری شده بود، به حساب شما آزاد می‌شود. این فرآیند معمولاً سریع انجام می‌شود و امنیت مالی شما را تضمین می‌کند.
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
                                    برداشت وجه یا انتقال به حساب
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    دستمزد آزادشده به کیف پول ددلاین شما واریز می‌شود. می‌توانید آن را به حساب بانکی خود منتقل کنید یا برای پرداخت‌های دیگر در پلتفرم استفاده کنید. ددلاین روش‌های پرداخت امن و متنوعی ارائه می‌دهد.
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
                                    دریافت بازخورد و تقویت پروفایل
                                </h2>
                                <p className="text-base font-primaryLight leading-relaxed text-light-color7 dark:text-color7">
                                    پس از دریافت دستمزد، از کارفرما بخواهید بازخورد و امتیاز برای شما ثبت کند. نظرات مثبت و امتیاز بالا به افزایش اعتبار پروفایل شما کمک می‌کند و شانس دریافت پروژه‌های بعدی را افزایش می‌دهد.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href="#"
                            className="inline-block bg-light-color4 dark:bg-color4 text-light-color1 font-primaryMedium py-4 px-8 rounded-xl text-lg hover:bg-light-color8 dark:hover:bg-color8 transition shadow-md"
                        >
                            شروع کسب درآمد
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetPaid;