"use client";
import { useState } from "react";
import { MdOutlineMoreTime } from "react-icons/md";
import { FaClock, FaRegCommentDots, FaDollarSign } from "react-icons/fa";

const ProjectId = ({ params }: { params: { projectId: string } }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="max-w-screen-lg mx-2 md:mx-auto p-6 bg-color1 rounded-2xl shadow-lg text-color2 my-4 border border-color5 relative">
            <div className="absolute top-0 right-0 left-0 h-2 bg-color4 rounded-t-2xl"></div>
            <span className="border-2 border-green-900 bg-green-300 text-green-900 px-3 py-1 rounded-full mt-2 font-primaryLight flex items-center gap-2 text-md w-fit">
                <MdOutlineMoreTime /> باز
            </span>
            <h1 className="text-3xl font-primaryDemibold text-color4 mt-4">
                طراحی سایت و اپلیکیشن
            </h1>
            <ul className="font-primaryMedium text-color7 space-y-3 mt-4">
                <li className="flex items-center gap-2"><FaClock className="text-color4" /> 12 روز و 12 ساعت</li>
                <li className="flex items-center gap-2"><FaRegCommentDots className="text-color4" /> 2 پیشنهاد</li>
                <li className="flex items-center gap-2"><FaDollarSign className="text-color4" /> از پنج میلیون تا هفت میلیون</li>
            </ul>
            <div className="mt-6 text-justify text-color3 leading-relaxed font-primaryMedium">
                <p>
                    نیاز به یک اپلیکیشن فروشگاهی اندرویدی دارم که قابلیت‌های **کامنت گذاشتن، پنل ادمین، پنل کاربری، ثبت سفارش آنلاین و درگاه پرداخت** داشته باشد.
                    همچنین نیاز است که بخش جستجوی پیشرفته و فیلترهای متنوع برای کاربران در نظر گرفته شود. امکان **ارسال نوتیفیکیشن، چت بین کاربران، و پیگیری وضعیت سفارش** هم
                    باید در سیستم لحاظ شود.
                    UI/UX پروژه اهمیت زیادی دارد و طراحی باید **مدرن، ریسپانسیو و مطابق با استانداردهای روز** باشد.
                </p>
                {!expanded && <span>...</span>}
                {expanded && (
                    <div className="mt-6 ">
                        <p>
                            همچنین نیاز است که اپلیکیشن دارای **پنل مدیریت برای کنترل سفارشات، مدیریت کاربران، و تنظیمات پیشرفته** باشد.
                            در بخش فنی، نیازمند توسعه یک **API پیشرفته با Node.js یا Django** و دیتابیس **PostgreSQL یا MongoDB** هستیم.
                            طراحی گرافیکی نیز باید با **Figma یا Adobe XD** ارائه شود.
                        </p>
                        <h2 className="text-xl font-primaryDemibold text-color4 my-4">مهارت‌های مورد نیاز:</h2>
                        <ul className="flex flex-wrap gap-2 text-sm ">
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">Android</li>
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">Backend</li>
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">FullStack</li>
                            <li className="px-3 py-1 bg-color4 text-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">CSS</li>
                        </ul>
                    </div>
                )}
            </div>
            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 py-2 px-4 bg-color4 text-color5 font-primaryMedium text-md rounded-lg hover:bg-color8 transition"
            >
                {expanded ? "نمایش کمتر" : "مشاهده بیشتر"}
            </button>
        </div>
    );
};

export default ProjectId;
