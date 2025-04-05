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
        <footer className="bg-light-color5 dark:bg-color1 border-t border-light-color6 dark:border-color5 pt-10 pb-6">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h1 className="text-xl font-bold text-light-color2 dark:text-white mb-4">لوگوی سایت</h1>
                        <p className="text-light-color3 dark:text-gray-400 mb-4 font-primaryMedium">
                            فروشگاه آنلاین محصولات با بهترین کیفیت و قیمت مناسب. ما به دنبال جلب رضایت مشتریان عزیز هستیم.
                        </p>
                        <SocialLinks />
                        {newsLetterForm()}
                    </div>
                    <MainFooter />
                </div>
                <div className="border-t border-light-color6 dark:border-gray-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-light-color7 dark:text-gray-400 text-sm mb-4 md:mb-0 font-primaryMedium">
                            © ۱۴۰۴ تمامی حقوق این سایت محفوظ است.
                        </p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <Image
                                src={enamad}
                                alt="نماد اعتماد الکترونیکی"
                                className="h-16 w-auto"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;