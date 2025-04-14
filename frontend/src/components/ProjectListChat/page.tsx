"use client";
import {useEffect, useState, useCallback} from "react";
import {useAuth} from "@/components/lib/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    deadLine: number;
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    proposals?: number;
    unreadMessages?: number;
}

interface Proposal {
    id: number;
    projectId: number;
    freelancerName: string;
    avatar: string;
    price: string;
    deliveryTime: string;
    rating: number;
    completedProjects: number;
    description: string;
}

interface ProjectListChatProps {
    onViewProposals?: (projectId: number) => void;
}

const ProjectListChat = ({onViewProposals}: ProjectListChatProps) => {
    const [activeTab, setActiveTab] = useState<"client" | "freelancer">("client");
    const [showProposalsModal, setShowProposalsModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [clientProjects, setClientProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Added error state
    const {userId} = useAuth();

    // Fetch projects with useCallback to prevent unnecessary re-renders
    const getClientProjects = useCallback(async () => {
        try {
            const response = await axios.get(`/app/getEmployer?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                withCredentials: true,
            });
            setError(null);
            console.log("Projects fetched:", response.data);
            console.log("User ID:", userId);
            return response.data || [];
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("خطا در دریافت پروژه‌ها. لطفاً دوباره تلاش کنید.");
            return [];
        }
    }, [userId]);

    // Load projects on mount or when userId changes
    useEffect(() => {
        setIsLoading(true);
        if (userId) {
            getClientProjects().then((projects) => {
                setClientProjects(projects);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
            setError("لطفاً وارد حساب کاربری خود شوید.");
        }
    }, [userId, getClientProjects]);

    // Sample data for freelancer projects (unchanged)
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

    // Sample data for proposals (unchanged)
    const proposalsList: Proposal[] = [
        {
            id: 1,
            projectId: 1,
            freelancerName: "علی محمدی",
            avatar: "./file.svg",
            price: "۵,۲۰۰,۰۰۰ تومان",
            deliveryTime: "۱۲ روز",
            rating: 4.8,
            completedProjects: 37,
            description:
                "من تجربه زیادی در طراحی وب‌سایت‌های فروشگاهی دارم و می‌توانم این پروژه را با کیفیت بالا و در زمان مناسب تحویل دهم.",
        },
        {
            id: 2,
            projectId: 1,
            freelancerName: "مریم حیدری",
            avatar: "./file.svg",
            price: "۵,۸۰۰,۰۰۰ تومان",
            deliveryTime: "۱۰ روز",
            rating: 4.9,
            completedProjects: 52,
            description:
                "متخصص در طراحی و توسعه فروشگاه‌های آنلاین با استفاده از فناوری‌های مدرن.",
        },
        {
            id: 3,
            projectId: 1,
            freelancerName: "رضا کریمی",
            avatar: "./file.svg",
            price: "۴,۹۰۰,۰۰۰ تومان",
            deliveryTime: "۱۵ روز",
            rating: 4.5,
            completedProjects: 23,
            description:
                "طراح و برنامه‌نویس وب با ۵ سال تجربه در زمینه فروشگاه‌های آنلاین.",
        },
        {
            id: 4,
            projectId: 1,
            freelancerName: "سارا احمدی",
            avatar: "./file.svg",
            price: "۵,۵۰۰,۰۰۰ تومان",
            deliveryTime: "۱۴ روز",
            rating: 4.7,
            completedProjects: 41,
            description:
                "تخصص من طراحی رابط کاربری جذاب و کاربرپسند است.",
        },
    ];
    const statusToPersian: Record<Project["status"], string> = {
        PENDING: "در انتظار",
        OPEN: "باز",
        IN_PROGRESS: "در حال اجرا",
        COMPLETED: "تکمیل شده",
        CANCELLED: "لغو شده",
    };
    const getStatusColor = (status: Project["status"]) => {
        switch (status) {
            case "PENDING":
                return "bg-blue-500"; // 在等待
            case "OPEN":
                return "bg-yellow-500"; // 开放
            case "IN_PROGRESS":
                return "bg-light-color4 dark:bg-color4"; // 进行中
            case "COMPLETED":
                return "bg-green-600"; // 已完成
            case "CANCELLED":
                return "bg-red-500"; // 已取消
            default:
                return "bg-gray-500"; // 未知状态
        }
    };

    const handleViewProposals = (projectId: number) => {
        setSelectedProjectId(projectId);
        setShowProposalsModal(true);
        if (onViewProposals) {
            onViewProposals(projectId);
        }
    };

    const handleAcceptProposal = (proposalId: number) => {
        alert(`پیشنهاد فریلنسر با شناسه ${proposalId} پذیرفته شد. می‌توانید قرارداد را تنظیم کنید.`);
        setShowProposalsModal(false);
    };

    const formatPriceRange = (start: number, end: number) => {
        return `${start.toLocaleString()} - ${end.toLocaleString()} تومان`;
    };

    const formatDeadline = (days: number) => {
        return `${days} روز`;
    };

    if (isLoading) {
        return <div className="text-center">در حال بارگذاری...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            {/* Error Display */}
            {error && (
                <div
                    className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 mb-6 text-center">
                    {error}
                </div>
            )}

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
                            className="p-3 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 text-light-color2 dark:text-color2"
                        >
                            <option value="">همه وضعیت‌ها</option>
                            <option value="در حال مذاکره">در حال مذاکره</option>
                            <option value="در حال انجام">در حال انجام</option>
                            <option value="در انتظار تأیید">در انتظار تأیید</option>
                            <option value="تکمیل شده">تکمیل شده</option>
                        </select>
                        <button
                            className="p-3 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 hover:bg-light-color6 dark:hover:bg-color5 transition-colors focus:outline-none"
                        >
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
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z"
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
                                        {project.subject}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs text-light-color2 dark:text-color1 ${getStatusColor(
                                            project.status
                                        )}`}
                                    >
                        {statusToPersian[project.status]}
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
                                            {formatPriceRange(project.priceStarted, project.priceEnded)}
                                        </p>
                                    </div>
                                    <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                        <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                            مهلت
                                        </p>
                                        <p className="text-light-color2 dark:text-color2">
                                            {formatDeadline(project.deadLine || 14)}
                                        </p>
                                    </div>
                                    <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                        <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                            پیشنهادها
                                        </p>
                                        <p className="text-light-color2 dark:text-color2">
                                            {project.proposals || 0} پیشنهاد
                                        </p>
                                    </div>
                                    <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                        <p className="text-light-color7 dark:text-color7 text-xs mb-1">
                                            پیام‌ها
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-light-color2 dark:text-color2 ml-2">
                                                {(project.unreadMessages || 0) > 0
                                                    ? `${project.unreadMessages} پیام جدید`
                                                    : "بدون پیام جدید"}
                                            </p>
                                            {(project.unreadMessages || 0) > 0 && (
                                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        onClick={() => handleViewProposals(project.id)}
                                        className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                    >
                                        مشاهده پیشنهادها
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                                    >
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
                                        className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                    >
                                        ویرایش پیشنهاد
                                    </button>
                                )}
                                {project.status === "در حال انجام" && (
                                    <button
                                        className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                    >
                                        بارگذاری فایل
                                    </button>
                                )}
                                <button
                                    className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                                >
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

            {/* Proposals Modal */}
            {showProposalsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="bg-light-color5 dark:bg-color5 rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-primaryMedium text-light-color2 dark:text-color2">
                                پیشنهادهای دریافتی
                            </h3>
                            <button
                                onClick={() => setShowProposalsModal(false)}
                                className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-light-color7 dark:text-color7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            {proposalsList
                                .filter((proposal) => proposal.projectId === selectedProjectId)
                                .map((proposal) => (
                                    <div key={proposal.id} className="bg-light-color1 dark:bg-color1 p-4 rounded-xl">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <img
                                                        src={proposal.avatar}
                                                        alt={proposal.freelancerName}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/default-avatar.png"; // Fallback image
                                                        }}
                                                    />
                                                </div>
                                                <div className="mr-3">
                                                    <h4 className="font-primaryMedium text-light-color2 dark:text-color2">
                                                        {proposal.freelancerName}
                                                    </h4>
                                                    <div className="flex items-center mt-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 text-yellow-500"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                            />
                                                        </svg>
                                                        <span
                                                            className="text-sm text-light-color7 dark:text-color7 mr-1">
                              {proposal.rating}
                            </span>
                                                        <span
                                                            className="text-xs text-light-color7 dark:text-color7 mr-2">
                              ({proposal.completedProjects} پروژه تکمیل شده)
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                        <span className="text-light-color4 dark:text-color4 font-primaryMedium">
                          {proposal.price}
                        </span>
                                                <span className="text-sm text-light-color7 dark:text-color7 mt-1">
                          زمان تحویل: {proposal.deliveryTime}
                        </span>
                                            </div>
                                        </div>
                                        <p className="text-light-color2 dark:text-color2 text-sm mb-4">
                                            {proposal.description}
                                        </p>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="px-4 py-2 bg-light-color5 dark:bg-color5 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color6 transition-colors"
                                            >
                                                گفتگو
                                            </button>
                                            <button
                                                onClick={() => handleAcceptProposal(proposal.id)}
                                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                            >
                                                پذیرفتن پیشنهاد
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectListChat;