import MainFooter from "./mainFooter";
import SocialLinks from "./sociallink";

const Footer = () => {
    const newsLetterForm = () => {
        return (
            <div className="mt-6">
                <h4 className="font-primaryMedium text-gray-800 mb-3">عضویت در خبرنامه</h4>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="ایمیل خود را وارد کنید"
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-r-md focus:outline-none font-primaryMedium"
                    />
                    <button className="bg-color4 font-primaryMedium text-color1 px-4 py-2 rounded-l-md hover:bg-color2 transition duration-300">
                        عضویت
                    </button>
                </div>
            </div>
        );
    };

    return (
        <footer className="bg-color1 border-t border-color pt-10 pb-6 border-color5">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h1 className="text-xl font-bold text-gray-900 mb-4">لوگوی سایت</h1>
                        <p className="text-gray-600 mb-4 font-primaryMedium">
                            فروشگاه آنلاین محصولات با بهترین کیفیت و قیمت مناسب. ما به دنبال جلب رضایت مشتریان عزیز هستیم.
                        </p>
                        <SocialLinks />
                        {newsLetterForm()}
                    </div>
                    <MainFooter />
                </div>

                <div className="border-t border-gray-200 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm mb-4 md:mb-0 font-primaryMedium">
                            © ۱۴۰۴ تمامی حقوق این سایت محفوظ است.
                        </p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <img src="/images/enamad.png" alt="نماد اعتماد الکترونیکی" className="h-16 w-auto" />
                            <img src="/images/samandehi.png" alt="نشان ساماندهی" className="h-16 w-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;