import Link from "next/link";

const Footer = () => {
    return (
        <footer className="dark:bg-color6 bg-light-color6 dark:text-color7 text-light-color7 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-center md:text-right">
                    <div>
                        <h3 className="dark:text-color4 text-light-color4 font-primaryBold text-lg mb-4">Deadlinee.ir</h3>
                        <p className="text-sm font-primaryLight leading-relaxed">
                            با بهترین فریلنسرها برای پروژه‌های خود ارتباط برقرار کنید.
                        </p>

                        <a referrerPolicy='origin' target='_blank'
                           href='https://trustseal.enamad.ir/?id=605034&Code=F47LNLVDGM1ALTBxtcwC5Pe4YrQxeEL1'>

                            <img
                                referrerPolicy='origin'
                                src='https://trustseal.enamad.ir/logo.aspx?id=605034&Code=F47LNLVDGM1ALTBxtcwC5Pe4YrQxeEL1'
                                alt='' style={{cursor: 'pointer'}} code='F47LNLVDGM1ALTBxtcwC5Pe4YrQxeEL1'/>
                        </a>

                    </div>

                    <div>
                        <h4 className="dark:text-color2 text-light-color2 font-primaryMedium mb-4">برای کارفرماها</h4>
                        <ul className="space-y-2 text-sm font-primaryLight">
                            <li><Link href="/HiringGuide" className="dark:hover:text-color4 hover:text-light-color4">راهنمای
                                استخدام</Link></li>
                            <li><Link href="/TalentMarket" className="dark:hover:text-color4 hover:text-light-color4">بازار
                                استعدادها</Link></li>
                            <li><Link href="/ProjectCatalog" className="dark:hover:text-color4 hover:text-light-color4">کاتالوگ پروژه</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="dark:text-color2 text-light-color2 font-primaryMedium mb-4">برای فریلنسرها</h4>
                        <ul className="space-y-2 text-sm font-primaryLight">
                            <li><Link href="/HowToFindWork" className="dark:hover:text-color4 hover:text-light-color4">چگونه کار پیدا
                                کنیم</Link></li>
                            <li><Link href="/DirectContract" className="dark:hover:text-color4 hover:text-light-color4">قرارداد
                                مستقیم</Link></li>
                            <li><Link href="/GetPaid" className="dark:hover:text-color4 hover:text-light-color4">دریافت دستمزد</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="dark:text-color2 text-light-color2 font-primaryMedium mb-4">منابع</h4>
                        <ul className="space-y-2 text-sm font-primaryLight">
                            <li><a href="#" className="dark:hover:text-color4 hover:text-light-color4">پشتیبانی و
                                راهنما</a></li>
                            <li><a href="#" className="dark:hover:text-color4 hover:text-light-color4">داستان‌های
                                موفقیت</a></li>
                            <li><a href="#" className="dark:hover:text-color4 hover:text-light-color4">جامعه کاربران</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    className="pt-8 border-t dark:border-color5 border-light-color5 text-sm text-center font-primaryLight">
                    <p>&copy; {new Date().getFullYear()} ددلاین. تمامی حقوق محفوظ است.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
