import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

const Profile = () => {
    return (
        <div className="text-white max-w-screen-xl mx-auto my-8">
            {/* نوار ناوبری (Navbar) */}
            <div className="col-span-full mt-2 border border-color5 rounded-full shadow-md mx-auto">
                <div className="bg-color1 text-color2 p-4 rounded-full shadow-lg ">
                    <h2 className="text-xl font-primaryBold mb-4">پیشرفت تکمیل پروفایل</h2>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-color4 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <p className="mt-2 text-sm font-primaryRegular">۶۰% تکمیل شده</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 ">
                <div className="bg-color1 text-color2 p-8 rounded-2xl shadow-xl border border-color5 transition-all hover:shadow-2xl mx-auto self-start">
                    <div className="grid grid-cols-1 items-center font-primaryMedium">

                        {/* بخش تصویر پروفایل */}
                        <div className="flex flex-col justify-center items-center border-b-2 border-color3 mb-4 pb-4">
                            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl shadow-md">
                                عکس پروفایل
                            </div>
                            <button className="mt-3 bg-color4 text-black px-5 py-2 rounded-lg text-sm font-bold transition-all hover:bg-opacity-80">
                                تغییر عکس
                            </button>
                            <div className="flex gap-8 mt-5 text-center">
                                <div>
                                    <p className="text-xl font-extrabold">250</p>
                                    <p className="text-sm text-gray-300">دنبال‌کننده</p>
                                </div>
                                <div>
                                    <p className="text-xl font-extrabold">180</p>
                                    <p className="text-sm text-gray-300">دنبال‌شونده</p>
                                </div>
                            </div>
                        </div>

                        {/* اطلاعات پروفایل */}
                        <div className="flex flex-col justify-center space-y-3">
                            <h2 className="text-2xl font-primaryBold mb-3 text-color4">اطلاعات پروفایل</h2>

                            <p className="flex items-center gap-2 border border-color5 shadow-md p-2 rounded-full cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <FaUser className="text-color4" />
                                <span className="font-semibold">نام:</span> محمد احمدی
                            </p>
                            <p className="flex items-center gap-2 border border-color5 shadow-md p-2 rounded-full cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <FaEnvelope className="text-color4" />
                                <span className="font-semibold">ایمیل:</span> mohamad@example.com
                            </p>
                            <p className="flex items-center gap-2 border border-color5 shadow-md p-2 rounded-full cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <FaPhone className="text-color4" />
                                <span className="font-semibold">شماره تماس:</span> ۰۹۱۲۱۲۳۴۵۶۷
                            </p>
                            <p className="flex items-center gap-2 border border-color5 shadow-md p-2 rounded-full cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <FaMapMarkerAlt className="text-color4" />
                                <span className="font-semibold">آدرس:</span> تهران، خیابان آزادی، کوچه‌ی ۱۰
                            </p>
                            <p className="flex items-center gap-2 border border-color5 shadow-md p-2 rounded-full cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <FaUniversity className="text-color4" />
                                <span className="font-semibold">محل تحصیل:</span> دانشگاه تهران
                            </p>

                            <p className="font-semibold mt-4">مهارت‌ها:</p>
                            <ul className="flex flex-wrap gap-3 mt-2">
                                {["React", "Node.js", "MongoDB", "Tailwind CSS"].map((skill, index) => (
                                    <li key={index} className="bg-color4 text-black px-3 py-1 rounded-md text-xs font-semibold shadow-md cursor-pointer">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="bg-color1 text-color2 p-6 rounded-2xl mt-6 shadow-lg ">
                        <h2 className="text-xl font-primaryBold mb-4">تکمیل اطلاعات پروفایل</h2>
                        <p className="mb-4 font-primaryMedium">لطفاً اطلاعات زیر را تکمیل کنید:</p>
                        <ul className="space-y-2 font-primaryMedium">
                            <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-color4 rounded-full flex items-center justify-center text-xs">1</span>
                                <span>آدرس محل سکونت</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-color4 rounded-full flex items-center justify-center text-xs">2</span>
                                <span>شماره تماس</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-color4 rounded-full flex items-center justify-center text-xs">3</span>
                                <span>محل تحصیل</span>
                            </li>
                        </ul>
                        <button className="mt-4 bg-color4 text-white px-6 py-2 rounded-md text-sm hover:bg-opacity-80 transition-all">
                            تکمیل اطلاعات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;