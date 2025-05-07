
import Image from 'next/image';
import Link from 'next/link';
import img from '../img/payment.png';
import { FaShieldAlt, FaLock, FaCheckCircle } from 'react-icons/fa';

const SafePayment = () => {
    return (
        <section className="py-12 md:py-20 bg-light-color5 dark:bg-color5">
            <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* تصویر سمت راست */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative w-full max-w-md">
                        <Image
                            src={img} // جایگزین با مسیر تصویر واقعی
                            alt="پرداخت امن و مطمئن"
                            width={500}
                            height={400}
                            className="rounded-xl shadow-lg object-cover transform transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute -top-4 -left-4 bg-light-color4 dark:bg-color4 text-white p-3 rounded-full shadow-md">
                            <FaShieldAlt className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* متن سمت چپ */}
                <div className="w-full md:w-1/2 text-center md:text-right">
                    <h2 className="text-3xl md:text-4xl font-primaryBold text-light-color2 dark:text-color2 mb-4">
                        پرداخت امن، اعتماد کامل
                    </h2>
                    <p className="text-lg font-primaryMedium text-light-color3 dark:text-color3 mb-6 leading-relaxed">
                        با سیستم پرداخت امن ما، خیالتان از معاملات راحت باشد! وجه پروژه تا تکمیل و رضایت شما نزد ما امانت
                        است. ددلاین‌ها تضمین‌شده و فرآیند پروژه‌ها کاملاً شفاف است. به جمع فریلنسرها و کارفرمایان مطمئن بپیوندید.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center justify-center md:justify-start gap-2 text-light-color3 dark:text-color3">
                            <FaLock className="text-light-color4 dark:text-color4" />
                            <span className="font-primaryMedium">پرداخت امن با درگاه‌های معتبر</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2 text-light-color3 dark:text-color3">
                            <FaCheckCircle className="text-light-color4 dark:text-color4" />
                            <span className="font-primaryMedium">تضمین تحویل به‌موقع پروژه</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2 text-light-color3 dark:text-color3">
                            <FaShieldAlt className="text-light-color4 dark:text-color4" />
                            <span className="font-primaryMedium">پشتیبانی ۲۴/۷ برای اعتماد کامل</span>
                        </li>
                    </ul>
                    <Link
                        href="/projects"
                        className="inline-block px-6 py-3 rounded-lg bg-light-color8 text-light-color5 dark:bg-color4 dark:text-color5 font-primaryMedium text-lg hover:bg-light-color4 dark:hover:bg-color8 hover:text-light-color5 dark:hover:text-color5 transition-colors duration-300"
                        aria-label="مشاهده پروژه‌های فریلنسری"
                    >
                        شروع کار با پروژه‌ها
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SafePayment;