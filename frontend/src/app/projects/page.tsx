'use client'
import { FaClock, FaRegCommentDots, FaDollarSign } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const Project = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");

    return (
        <div className="max-w-screen-lg mx-2 md:mx-auto p-6 rounded-2xl shadow-lg my-4 border bg-light-color1 text-light-color2 dark:bg-color1 dark:text-color2 border-color5">
            {/* فیلترها */}
            <div className="bg-light-color6 p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 flex-wrap border dark:bg-color6 dark:border-color5 border-light-color5">
                <input
                    type="text"
                    placeholder="جستجو بر اساس عنوان"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full md:w-1/4 dark:bg-color5 dark:text-color2"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full md:w-1/4 dark:bg-color5 dark:text-color2"
                >
                    <option value="">دسته‌بندی</option>
                    <option value="android">Android</option>
                    <option value="backend">Backend</option>
                    <option value="fullStack">FullStack</option>
                    <option value="css">CSS</option>
                </select>
                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full md:w-1/4 dark:bg-color5 dark:text-color2"
                >
                    <option value="">محدوده قیمت</option>
                    <option value="5-7">5 تا 7 میلیون</option>
                    <option value="7-10">7 تا 10 میلیون</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full md:w-1/4 dark:bg-color5 dark:text-color2"
                >
                    <option value="">وضعیت پروژه</option>
                    <option value="open">باز</option>
                    <option value="closed">بسته</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full md:w-1/4 dark:bg-color5 dark:text-color2"
                >
                    <option value="">مرتب‌سازی بر اساس</option>
                    <option value="newest">جدیدترین</option>
                    <option value="oldest">قدیمی‌ترین</option>
                    <option value="skills">بر اساس مهارت‌های من</option>
                </select>
            </div>

            {/* لیست پروژه‌ها */}
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 justify-between border border-light-color6 dark:border-color5 rounded-2xl shadow-lg p-4 md:p-6 my-4">
                    {/* توضیحات پروژه */}
                    <div className="flex-1">
                        <h1 className="font-primaryDemibold text-2xl mb-2 text-light-color4 dark:text-color4">طراحی اپلیکیشن</h1>
                        <p className="font-primaryMedium text-light-color3 dark:text-color3 leading-relaxed mb-4 text-justify">
                            نیاز به یک اپلیکیشن اندرویدی فروشگاهی هستم که قابلیت کامنت گذاشتن، پنل ادمینی و کاربری داشته باشد و قابلیت ثبت سفارش آنلاین نیز داشته باشد.
                        </p>
                        <ul className="flex flex-wrap gap-2 text-sm font-primaryMedium">
                            <li className="px-3 py-1 dark:bg-color4 bg-light-color4 dark:text-color5 text-light-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">android</li>
                            <li className="px-3 py-1 dark:bg-color4 bg-light-color4 dark:text-color5 text-light-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">backend</li>
                            <li className="px-3 py-1 dark:bg-color4 bg-light-color4 dark:text-color5 text-light-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">fullStack</li>
                            <li className="px-3 py-1 dark:bg-color4 bg-light-color4 dark:text-color5 text-light-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">css</li>
                        </ul>
                    </div>

                    {/* اطلاعات پروژه و دکمه */}
                    <div className="bg-light-color5 p-4 rounded-xl shadow-md flex flex-col items-start dark:bg-color5">
                        <ul className="font-primaryMedium text-light-color7 dark:text-color7 space-y-3">
                            <li className="flex items-center gap-2"><FaClock className="dark:text-color4 text-light-color4" /> 12 روز و 12 ساعت</li>
                            <li className="flex items-center gap-2"><FaRegCommentDots className="dark:text-color4 text-light-color4" /> 2 پیشنهاد</li>
                            <li className="flex items-center gap-2"><FaDollarSign className="dark:text-color4 text-light-color4" /> از پنج میلیون تا هفت میلیون</li>
                        </ul>
                        <button className="w-full mt-4 py-2 rounded-lg dark:bg-color4 dark:text-color5 font-primaryMedium text-md md:text-lg dark:hover:bg-color8 dark:hover:text-color1 hover:bg-light-color9 hover:text-light-color1 transition bg-light-color8 text-light-color5">
                            <Link href={`/projects/${index}`}>
                                مشاهده پروژه
                            </Link>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Project;
