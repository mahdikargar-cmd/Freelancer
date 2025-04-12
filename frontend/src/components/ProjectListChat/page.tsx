"use client"
import {useState} from "react";

interface ProjectListChatProps {
    onViewProposals?: (projectId: number) => void
}

const ProjectListChat = ({onViewProposals}: ProjectListChatProps) => {
    const [activeTab, setActiveTab] = useState("client"); // client or freelancer

    // نمونه داده برای پروژه‌های کارفرما
    const clientProjects = [
        {
            id: 1,
            title: "طراحی وب‌سایت فروشگاهی",
            budget: "۵,۵۰۰,۰۰۰ تومان",
            deadline: "۱۴ روز",
            status: "در حال مذاکره",
            description: "طراحی یک فروشگاه آنلاین با قابلیت پرداخت و مدیریت سفارشات",
            proposals: 4,
            unreadMessages: 2,
        },
        {
            id: 2,
            title: "توسعه اپلیکیشن موبایل",
            budget: "۸,۰۰۰,۰۰۰ تومان",
            deadline: "۳۰ روز",
            status: "در حال انجام",
            description: "توسعه اپلیکیشن اندروید و iOS برای خدمات حمل و نقل",
            proposals: 7,
            unreadMessages: 0,
        },
        {
            id: 3,
            title: "بهینه‌سازی سئو وب‌سایت",
            budget: "۲,۲۰۰,۰۰۰ تومان",
            deadline: "۷ روز",
            status: "در انتظار تأیید",
            description: "بهبود رتبه سایت در موتورهای جستجو و افزایش ترافیک ارگانیک",
            proposals: 3,
            unreadMessages: 1,
        },
    ];

    // نمونه داده برای پروژه‌های فریلنسر
    const freelancerProjects = [
        {
            id: 1,
            title: "طراحی رابط کاربری اپلیکیشن",
            client: "شرکت تک‌نوین",
            budget: "۴,۸۰۰,۰۰۰ تومان",
            deadline: "۱۰ روز",
            status: "در حال انجام",
            progress: 60,
        },
        {
            id: 2,
            title: "توسعه پلاگین وردپرس",
            client: "فروشگاه مگا",
            budget: "۲,۵۰۰,۰۰۰ تومان",
            deadline: "۵ روز",
            status: "در انتظار تأیید",
            progress: 100,
        },
        {
            id: 3,
            title: "پیاده‌سازی وب‌سرویس",
            client: "استارتاپ روبیکا",
            budget: "۶,۷۰۰,۰۰۰ تومان",
            deadline: "۲۰ روز",
            status: "در حال مذاکره",
            progress: 0,
        },
        {
            id: 4,
            title: "طراحی لوگو و هویت بصری",
            client: "مشاور املاک آنلاین",
            budget: "۱,۸۰۰,۰۰۰ تومان",
            deadline: "۳ روز",
            status: "تکمیل شده",
            progress: 100,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "در حال مذاکره":
                return "bg-yellow-500";
            case "در حال انجام":
                return "bg-light-color4 dark:bg-color4";
            case "در انتظار تأیید":
                return "bg-blue-500";
            case "تکمیل شده":
                return "bg-green-600";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            {/* Toggle Tab */}
            <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-2 mb-6 flex">
                <button
                    onClick={() => setActiveTab("client")}
                    className={`flex-1 py-3 rounded-xl font-primaryMedium text-sm transition-colors ${
                        activeTab === "client"
                            ? "bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1"
                            : "bg-transparent text-light-color7 dark:text-color7 hover:bg-light-color6 dark:hover:bg-color1"
                    }`}
                >
                    پروژه‌های کارفرما
                </button>
                <button
                    onClick={() => setActiveTab("freelancer")}
                    className={`flex-1 py-3 rounded-xl font-primaryMedium text-sm transition-colors ${
                        activeTab === "freelancer"
                            ? "bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1"
                            : "bg-transparent text-light-color7 dark:text-color7 hover:bg-light-color6 dark:hover:bg-color1"
                    }`}
                >
                    پروژه‌های فریلنسر
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="جستجو در پروژه‌ها..."
                            className="w-full p-3 pr-10 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 text-light-color2 dark:text-color2"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute top-3.5 right-3 text-light-color7 dark:text-color7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="p-3 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 text-light-color2 dark:text-color2">
                            <option value="">همه وضعیت‌ها</option>
                            <option value="در حال مذاکره">در حال مذاکره</option>
                            <option value="در حال انجام">در حال انجام</option>
                            <option value="در انتظار تأیید">در انتظار تأیید</option>
                            <option value="تکمیل شده">تکمیل شده</option>
                        </select>

                        <button
                            className="p-3 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 hover:bg-light-color6 dark:hover:bg-color5 transition-colors focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {activeTab === "client" ? (
                    clientProjects.length > 0 ? (
                        clientProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2">
                                        {project.title}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs text-light-color2 dark:text-color1 ${getStatusColor(
                                            project.status
                                        )}`}
                                    >
                    {project.status}
                  </span>
                                </div>

                                <p className="text-light-color7 dark:text-color7 text-sm mb-4">
                                    {project.description}
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                        <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                            بودجه
                                        </p>
                                        <p className="text-light-color4 dark:text-color4 font-primaryMedium">
                                            {project.budget}
                                        </p>
                                    </div>
                                    <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                        <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                            مهلت
                                        </p>
                                        <p className="text-light-color2 dark:text-color2">
                                            {project.deadline}
                                        </p>
                                    </div>
                                    <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                        <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                            پیشنهادها
                                        </p>
                                        <p className="text-light-color2 dark:text-color2">
                                            {project.proposals} پیشنهاد
                                        </p>
                                    </div>
                                    <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                        <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                            پیام‌ها
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-light-color2 dark:text-color2 ml-2">
                                                {project.unreadMessages > 0 ? `${project.unreadMessages} پیام جدید` : "بدون پیام جدید"}
                                            </p>
                                            {project.unreadMessages > 0 && (
                                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors">
                                        مشاهده پیشنهادها
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors">
                                        گفتگو
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-8 text-center">
                            <p className="text-light-color7 dark:text-color7">
                                هیچ پروژه‌ای یافت نشد.
                            </p>
                        </div>
                    )
                ) : freelancerProjects.length > 0 ? (
                    freelancerProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2">
                                        {project.title}
                                    </h3>
                                    <p className="text-light-color7 dark:text-color7 text-sm">
                                        کارفرما: {project.client}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs text-light-color2 dark:text-color1 ${getStatusColor(
                                        project.status
                                    )}`}
                                >
                  {project.status}
                </span>
                            </div>

                            {/* Progress bar for projects in progress */}
                            {project.status === "در حال انجام" && (
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-light-color7 dark:text-color7">
                      میزان پیشرفت
                    </span>
                                        <span className="text-xs font-primaryMedium text-light-color4 dark:text-color4">
                      {project.progress}%
                    </span>
                                    </div>
                                    <div className="w-full bg-light-color6 dark:bg-color1 rounded-full h-2">
                                        <div
                                            className="bg-light-color4 dark:bg-color4 h-2 rounded-full"
                                            style={{width: `${project.progress}%`}}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                                <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                    <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                        مبلغ قرارداد
                                    </p>
                                    <p className="text-light-color4 dark:text-color4 font-primaryMedium">
                                        {project.budget}
                                    </p>
                                </div>
                                <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                    <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                        مهلت
                                    </p>
                                    <p className="text-light-color2 dark:text-color2">
                                        {project.deadline}
                                    </p>
                                </div>
                                <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                    <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                        وضعیت
                                    </p>
                                    <p className="text-light-color2 dark:text-color2">
                                        {project.status}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                                {project.status === "در حال مذاکره" && (
                                    <button
                                        className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors">
                                        ویرایش پیشنهاد
                                    </button>
                                )}
                                {project.status === "در حال انجام" && (
                                    <button
                                        className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors">
                                        بارگذاری فایل
                                    </button>
                                )}
                                <button
                                    className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors">
                                    گفتگو
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-light-color7 dark:text-color7">
                            هیچ پروژه‌ای یافت نشد.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectListChat;
