"use client";
import { useState } from "react";
import { MdOutlineMoreTime, MdAccessTime, MdLocationOn, MdPersonOutline } from "react-icons/md";
import { FaClock, FaRegCommentDots, FaDollarSign, FaTools, FaInfoCircle, FaProjectDiagram, FaShieldAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";

const ProjectId = () => {
    const [expanded, setExpanded] = useState(false);
    const [tab, setTab] = useState("description");
    const [proposal, setProposal] = useState("");

    return (
        <div className="max-w-screen-lg mx-2 md:mx-auto p-6 bg-color1 rounded-2xl shadow-lg text-color2 my-4 border border-color5 relative">
            {/* Top decorative bar */}
            <div className="absolute top-0 right-0 left-0 h-2 bg-color4 rounded-t-2xl"></div>

            {/* Project header section */}
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                    <span className="border-2 border-green-900 bg-green-300 text-green-900 px-3 py-1 rounded-full mt-2 font-primaryLight flex items-center gap-2 text-md w-fit">
                        <MdOutlineMoreTime /> باز
                    </span>
                    <h1 className="text-2xl md:text-3xl font-primaryDemibold text-color4 mt-4">
                        طراحی سایت و اپلیکیشن
                    </h1>
                </div>

                {/* Project client info card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 md:mt-0 bg-color6 p-4 rounded-xl shadow-md md:w-64"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-color5 rounded-full flex items-center justify-center">
                            <MdPersonOutline className="text-color4 text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-primaryBold text-color4">کارفرما: علی رضایی</h3>
                            <p className="text-color3 text-sm font-primaryMedium">4.8 ⭐ (16 پروژه)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-color3 mt-2 font-primaryMedium">
                        <MdLocationOn className="text-color4" />
                        <span>تهران، ایران</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-color3 mt-1 font-primaryMedium">
                        <MdAccessTime className="text-color4" />
                        <span>عضویت از 1402/06/12</span>
                    </div>
                </motion.div>
            </div>

            {/* Project stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-color6 p-4 rounded-xl shadow-md flex items-center gap-4"
                >
                    <div className="w-12 h-12 bg-color5 rounded-full flex items-center justify-center">
                        <FaClock className="text-color4 text-xl" />
                    </div>
                    <div>
                        <p className="text-color3 text-sm font-primaryMedium">زمان باقی‌مانده</p>
                        <p className="font-primaryBold text-color4">12 روز و 12 ساعت</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-color6 p-4 rounded-xl shadow-md flex items-center gap-4"
                >
                    <div className="w-12 h-12 bg-color5 rounded-full flex items-center justify-center">
                        <FaRegCommentDots className="text-color4 text-xl" />
                    </div>
                    <div>
                        <p className="text-color3 text-sm font-primaryMedium">پیشنهادها</p>
                        <p className="font-primaryBold text-color4">2 پیشنهاد</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-color6 p-4 rounded-xl shadow-md flex items-center gap-4"
                >
                    <div className="w-12 h-12 bg-color5 rounded-full flex items-center justify-center">
                        <FaDollarSign className="text-color4 text-xl" />
                    </div>
                    <div>
                        <p className="text-color3 text-sm font-primaryMedium">بودجه</p>
                        <p className="font-primaryBold text-color4">5 تا 7 میلیون</p>
                    </div>
                </motion.div>
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-color5 mt-8">
                <button
                    onClick={() => setTab("description")}
                    className={`px-6 py-3 font-primaryMedium text-md flex items-center gap-2 ${tab === "description" ? "border-b-2 border-color4 text-color4" : "text-color3"}`}
                >
                    <FaInfoCircle /> توضیحات
                </button>
                <button
                    onClick={() => setTab("details")}
                    className={`px-6 py-3 font-primaryMedium text-md flex items-center gap-2 ${tab === "details" ? "border-b-2 border-color4 text-color4" : "text-color3"}`}
                >
                    <FaProjectDiagram /> جزئیات
                </button>
                <button
                    onClick={() => setTab("proposal")}
                    className={`px-6 py-3 font-primaryMedium text-md flex items-center gap-2 ${tab === "proposal" ? "border-b-2 border-color4 text-color4" : "text-color3"}`}
                >
                    <FaShieldAlt /> ارسال پیشنهاد
                </button>
            </div>

            {/* Content based on selected tab */}
            <div className="mt-6">
                {/* Description tab */}
                {tab === "description" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-justify text-color3 leading-relaxed font-primaryMedium"
                    >
                        <p>
                            نیاز به یک اپلیکیشن فروشگاهی اندرویدی دارم که قابلیت‌های <span className="text-color4 font-primaryBold">کامنت گذاشتن، پنل ادمین، پنل کاربری، ثبت سفارش آنلاین و درگاه پرداخت</span> داشته باشد.
                            همچنین نیاز است که بخش جستجوی پیشرفته و فیلترهای متنوع برای کاربران در نظر گرفته شود. امکان <span className="text-color4 font-primaryBold">ارسال نوتیفیکیشن، چت بین کاربران، و پیگیری وضعیت سفارش</span> هم
                            باید در سیستم لحاظ شود.
                            UI/UX پروژه اهمیت زیادی دارد و طراحی باید <span className="text-color4 font-primaryBold">مدرن، ریسپانسیو و مطابق با استانداردهای روز</span> باشد.
                        </p>
                        {!expanded && (
                            <button
                                onClick={() => setExpanded(true)}
                                className="mt-4 py-2 px-6 bg-color5 text-color4 font-primaryMedium text-md rounded-lg hover:bg-color6 transition flex items-center gap-2 mx-auto"
                            >
                                مشاهده بیشتر <FaInfoCircle />
                            </button>
                        )}
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6"
                            >
                                <p>
                                    همچنین نیاز است که اپلیکیشن دارای <span className="text-color4 font-primaryBold">پنل مدیریت برای کنترل سفارشات، مدیریت کاربران، و تنظیمات پیشرفته</span> باشد.
                                    در بخش فنی، نیازمند توسعه یک <span className="text-color4 font-primaryBold">API پیشرفته با Node.js یا Django</span> و دیتابیس <span className="text-color4 font-primaryBold">PostgreSQL یا MongoDB</span> هستیم.
                                    طراحی گرافیکی نیز باید با <span className="text-color4 font-primaryBold">Figma یا Adobe XD</span> ارائه شود.
                                </p>
                                <button
                                    onClick={() => setExpanded(false)}
                                    className="mt-4 py-2 px-6 bg-color5 text-color4 font-primaryMedium text-md rounded-lg hover:bg-color6 transition flex items-center gap-2 mx-auto"
                                >
                                    نمایش کمتر <FaInfoCircle />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Details tab */}
                {tab === "details" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h2 className="text-xl font-primaryDemibold text-color4 mb-4 flex items-center gap-2">
                            <FaTools /> مهارت‌های مورد نیاز
                        </h2>
                        <ul className="flex flex-wrap gap-3 text-sm mb-6 font-primaryDemibold">
                            <li className="px-4 py-2 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300 shadow-md">
                                Android
                            </li>
                            <li className="px-4 py-2 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300 shadow-md">
                                Backend
                            </li>
                            <li className="px-4 py-2 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300 shadow-md">
                                FullStack
                            </li>
                            <li className="px-4 py-2 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300 shadow-md">
                                CSS
                            </li>
                            <li className="px-4 py-2 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300 shadow-md">
                                React Native
                            </li>
                        </ul>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-primaryMedium">
                            <div className="bg-color6 p-4 rounded-xl shadow-md">
                                <h3 className="font-primaryBold text-color4 mb-2">جزئیات پروژه</h3>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span className="text-color3">نوع پروژه:</span>
                                        <span className="font-primaryBold">توسعه موبایل</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-color3">سطح پیچیدگی:</span>
                                        <span className="font-primaryBold">متوسط تا پیشرفته</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-color3">روش پرداخت:</span>
                                        <span className="font-primaryBold">نصف اول</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-color3">تاریخ انتشار:</span>
                                        <span className="font-primaryBold">1404/01/15</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-color6 p-4 rounded-xl shadow-md">
                                <h3 className="font-primaryBold text-color4 mb-2">نیازمندی‌های فنی</h3>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span className="text-color3">بک‌اند:</span>
                                        <span className="font-primaryBold">Node.js / Django</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-color3">دیتابیس:</span>
                                        <span className="font-primaryBold">PostgreSQL / MongoDB</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-color3">طراحی UI:</span>
                                        <span className="font-primaryBold">Figma / Adobe XD</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-color3">زبان برنامه‌نویسی:</span>
                                        <span className="font-primaryBold">Java / Kotlin / React Native</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Proposal tab */}
                {tab === "proposal" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-color6 p-6 rounded-xl shadow-md"
                    >
                        <h2 className="text-xl font-primaryDemibold text-color4 mb-4">ارسال پیشنهاد برای پروژه</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 font-primaryMedium text-color3">مبلغ پیشنهادی (تومان)</label>
                                <input
                                    type="text"
                                    placeholder="مثال: 6,500,000"
                                    className="w-full p-3 bg-color5 text-color2 border border-color5 rounded-lg font-primaryMedium shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-primaryMedium text-color3">زمان تحویل</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="تعداد"
                                        className="w-1/3 p-3 bg-color5 text-color2 border border-color5 rounded-lg font-primaryMedium shadow-sm"
                                    />
                                    <select className="w-2/3 p-3 bg-color5 text-color2 border border-color5 rounded-lg font-primaryMedium shadow-sm">
                                        <option value="days">روز</option>
                                        <option value="weeks">هفته</option>
                                        <option value="months">ماه</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-primaryMedium text-color3">توضیحات پیشنهاد</label>
                                <textarea
                                    value={proposal}
                                    onChange={(e) => setProposal(e.target.value)}
                                    placeholder="تجربیات و توانایی‌های خود را برای انجام این پروژه شرح دهید..."
                                    className="w-full p-3 bg-color5 text-color2 border border-color5 rounded-lg font-primaryMedium shadow-sm h-32"
                                />
                            </div>

                            <div className="flex justify-between items-center border-t border-color5 pt-4 mt-6">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="terms" className="w-4 h-4" />
                                    <label htmlFor="terms" className="text-color3 font-primaryMedium">قوانین سایت را مطالعه کرده و می‌پذیرم</label>
                                </div>
                                <button className="py-2 px-6 bg-color4 text-color5 font-primaryBold text-md rounded-lg hover:bg-color8 transition flex items-center gap-2">
                                    <IoMdSend className="text-lg" /> ارسال پیشنهاد
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProjectId;