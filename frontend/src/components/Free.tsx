'use client';

import Image from 'next/image';
import Link from 'next/link';
import img from '../img/freelancer.png';
import { FaMoneyBillWave, FaInfinity, FaPercentage } from 'react-icons/fa';

const Free = () => {
    return (
        <section className="py-12 md:py-20 bg-light-color1 dark:bg-color1">
            <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* متن سمت راست */}
                <div className="w-full md:w-1/2 text-center md:text-right">
                    <h2 className="text-3xl md:text-4xl font-primaryBold text-light-color2 dark:text-color2 mb-4">
                        فریلنسر شو، درآمدت رو چند برابر کن!
                    </h2>
                    <p className="text-lg font-primaryMedium text-light-color3 dark:text-color3 mb-6 leading-relaxed">
                        به‌عنوان فریلنسر در پلتفرم ما، بدون هزینه ثبت‌نام به پروژه‌های متنوع دسترسی پیدا کن! پیشنهاد نامحدود بده و با کمترین
                        کارمزد، درآمد بیشتری کسب کن. آزادی و انعطاف در کار منتظر توست.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center justify-center md:justify-start gap-2 text-light-color3 dark:text-color3">
                            <FaMoneyBillWave className="text-light-color4 dark:text-color4" />
                            <span className="font-primaryMedium">دسترسی رایگان به پروژه‌ها</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2 text-light-color3 dark:text-color3">
                            <FaInfinity className="text-light-color4 dark:text-color4" />
                            <span className="font-primaryMedium">پیشنهاد نامحدود، فرصت‌های بی‌پایان</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2 text-light-color3 dark:text-color3">
                            <FaPercentage className="text-light-color4 dark:text-color4" />
                            <span className="font-primaryMedium">کمترین کارمزد، بیشترین درآمد</span>
                        </li>
                    </ul>
                    <Link
                        href="/signUp"
                        className="inline-block px-6 py-3 rounded-lg bg-light-color8 text-light-color5 dark:bg-color4 dark:text-color5 font-primaryMedium text-lg hover:bg-light-color4 dark:hover:bg-color8 hover:text-light-color5 dark:hover:text-color5 transition-colors duration-300"
                        aria-label="ثبت‌نام به‌عنوان فریلنسر"
                    >
                        همین حالا فریلنسر شو!
                    </Link>
                </div>

                {/* تصویر سمت چپ */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="relative w-full max-w-md">
                        <Image
                            src={img} // جایگزین با مسیر تصویر واقعی
                            alt="فریلنسری با درآمد بالا و کارمزد پایین"
                            width={500}
                            height={400}
                            className="rounded-xl shadow-lg object-cover transform transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute -top-4 -right-4 bg-light-color4 dark:bg-color4 text-white p-3 rounded-full shadow-md">
                            <FaMoneyBillWave className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Free;