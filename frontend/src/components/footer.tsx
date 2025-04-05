import MainFooter from "./mainFooter";
import SocialLinks from "./sociallink";
import Image from "next/image";
import enamad from '../img/enamad_icon_text_color_blue_1024.png'
const Footer = () => {
    const newsLetterForm = () => {
        return (
            <div className="mt-6">
                <h4 className="font-primaryMedium text-light-color2 dark:text-gray-200 mb-3">عضویت در خبرنامه</h4>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="ایمیل خود را وارد کنید"
                        className="w-full px-3 py-2 text-light-color2 dark:text-white bg-light-color5 dark:bg-color6 border border-light-color6 dark:border-gray-600 rounded-r-md focus:outline-none font-primaryMedium placeholder:text-light-color7 dark:placeholder:text-gray-400"
                    />
                    <button className="bg-light-color4 dark:bg-color4 font-primaryMedium text-white px-4 py-2 rounded-l-md hover:bg-light-color9 dark:hover:bg-color5 transition duration-300">
                        عضویت
                    </button>
                </div>
            </div>
        );
    };

    return (
    <footer className="bg-color6 text-color7 py-12">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 className="text-color4 font-primaryBold text-lg mb-4">Deadlinee.ir</h3>
                    <p className="text-sm font-primaryLight">با بهترین فریلنسرها برای پروژه‌های خود ارتباط
                        برقرار کنید.</p>
                </div>

                <div>
                    <h4 className="text-color2 font-primaryMedium mb-4">برای کارفرماها</h4>
                    <ul className="space-y-2 text-sm font-primaryLight">
                        <li><a href="#" className="hover:text-color4">راهنمای استخدام</a></li>
                        <li><a href="#" className="hover:text-color4">بازار استعدادها</a></li>
                        <li><a href="#" className="hover:text-color4">کاتالوگ پروژه</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-color2 font-primaryMedium mb-4">برای فریلنسرها</h4>
                    <ul className="space-y-2 text-sm font-primaryLight">
                        <li><a href="#" className="hover:text-color4">چگونه کار پیدا کنیم</a></li>
                        <li><a href="#" className="hover:text-color4">قرارداد مستقیم</a></li>
                        <li><a href="#" className="hover:text-color4">دریافت دستمزد</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-color2 font-primaryMedium mb-4">منابع</h4>
                    <ul className="space-y-2 text-sm font-primaryLight">
                        <li><a href="#" className="hover:text-color4">پشتیبانی و راهنما</a></li>
                        <li><a href="#" className="hover:text-color4">داستان‌های موفقیت</a></li>
                        <li><a href="#" className="hover:text-color4">جامعه کاربران</a></li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-color5 text-sm text-center font-primaryLight">
                <p>&copy; {new Date().getFullYear()} ددلاین . تمامی حقوق محفوظ است.</p>
            </div>
        </div>
    </footer>    );
};

export default Footer;