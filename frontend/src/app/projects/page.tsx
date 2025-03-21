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
        <div className="max-w-screen-lg mx-2 md:mx-auto p-6 bg-color1 rounded-2xl shadow-lg text-color2 my-4 border border-color5">
            <div className="bg-color6 p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 flex-wrap">
                <input
                    type="text"
                    placeholder="جستجو بر اساس عنوان"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded-lg bg-color5 text-color2 font-primaryMedium w-full md:w-1/4"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 rounded-lg bg-color5 text-color2 font-primaryMedium w-full md:w-1/4"
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
                    className="p-2 rounded-lg bg-color5 text-color2 font-primaryMedium w-full md:w-1/4"
                >
                    <option value="">محدوده قیمت</option>
                    <option value="5-7">5 تا 7 میلیون</option>
                    <option value="7-10">7 تا 10 میلیون</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-2 rounded-lg bg-color5 text-color2 font-primaryMedium w-full md:w-1/4"
                >
                    <option value="">وضعیت پروژه</option>
                    <option value="open">باز</option>
                    <option value="closed">بسته</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 rounded-lg bg-color5 text-color2 font-primaryMedium w-full md:w-1/4"
                >
                    <option value="">مرتب‌سازی بر اساس</option>
                    <option value="newest">جدیدترین</option>
                    <option value="oldest">قدیمی‌ترین</option>
                    <option value="skills">بر اساس مهارت‌های من</option>
                </select>
            </div>
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="grid md:grid-cols-2 grid-cols-1 gap-6 items-center border border-color5 rounded-2xl shadow-lg p-4 md:p-2 my-4">
                    <div>
                        <h1 className="font-primaryDemibold text-2xl text-color4 mb-2">طراحی اپلیکیشن</h1>
                        <p className="font-primaryMedium text-color3 leading-relaxed mb-4 text-justify">
                            نیاز به یک اپلیکیشن اندرویدی فروشگاهی هستم که قابلیت کامنت گذاشتن، پنل ادمینی و کاربری داشته باشد و قابلیت ثبت سفارش آنلاین نیز داشته باشد.
                        </p>
                        <ul className="flex flex-wrap gap-2 text-sm font-primaryMedium">
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">android</li>
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">backend</li>
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">fullStack</li>
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">css</li>
                        </ul>
                    </div>
                    <div className="bg-color6 p-4 rounded-xl shadow-md">
                        <ul className="font-primaryMedium text-color7 space-y-3">
                            <li className="flex items-center gap-2"><FaClock className="text-color4" /> 12 روز و 12 ساعت</li>
                            <li className="flex items-center gap-2"><FaRegCommentDots className="text-color4" /> 2 پیشنهاد</li>
                            <li className="flex items-center gap-2"><FaDollarSign className="text-color4" /> از پنج میلیون تا هفت میلیون</li>
                        </ul>
                        <button  className="w-1/2 mt-4 py-2 rounded-lg bg-color4 text-color5 font-primaryMedium text-md md:text-lg hover:bg-color8 transition">
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
