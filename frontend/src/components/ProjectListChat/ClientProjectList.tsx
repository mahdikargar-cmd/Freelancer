"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

// تعریف تایپ‌ها برای بهبود خوانایی و امنیت تایپ
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

interface ClientProjectListProps {
    onViewProposals?: (projectId: number) => void;
}

const ClientProjectList = ({ onViewProposals }: ClientProjectListProps) => {
    // State management
    const [clientProjects, setClientProjects] = useState<Project[]>([]);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isProposalsVisible, setIsProposalsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingProposals, setIsLoadingProposals] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [proposalsError, setProposalsError] = useState<string | null>(null);
    const { userId } = useAuth();

    // Fetch projects
    const fetchProjects = useCallback(async () => {
        if (!userId) {
            setError("لطفاً وارد حساب کاربری خود شوید.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`/app/getEmployer?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                withCredentials: true,
            });

            setClientProjects(response.data || []);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching projects:", err);
            setError("خطا در دریافت پروژه‌ها. لطفاً دوباره تلاش کنید.");
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    // Fetch proposals for a project
    const fetchProposals = useCallback(async (projectId: number) => {
        setIsLoadingProposals(true);
        setProposalsError(null);

        try {
            const response = await axios.get(`/app/proposals/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                withCredentials: true,
            });
            setProposals(response.data || []);
        } catch (err: any) {
            console.error("Error fetching proposals:", err);
            setProposalsError("خطا در دریافت پیشنهادها. لطفاً دوباره تلاش کنید.");
            setProposals([]);
        } finally {
            setIsLoadingProposals(false);
        }
    }, []);

    // Load projects on mount
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Open proposals panel for a specific project
    const handleViewProposals = (project: Project) => {
        setSelectedProject(project);
        setIsProposalsVisible(true);
        fetchProposals(project.id);

        if (onViewProposals) {
            onViewProposals(project.id);
        }
    };

    // Handle accepting a proposal with confirmation
    const handleAcceptProposal = (proposalId: number, freelancerName: string) => {
        if (confirm(`آیا مطمئن هستید که می‌خواهید پیشنهاد ${freelancerName} را بپذیرید؟`)) {
            // API call to accept proposal would go here
            alert(`پیشنهاد فریلنسر با شناسه ${proposalId} پذیرفته شد. می‌توانید قرارداد را تنظیم کنید.`);
            setIsProposalsVisible(false);
            // در یک سیستم واقعی، بعد از پذیرش پیشنهاد، پروژه‌ها را دوباره بارگیری می‌کنیم
            fetchProjects();
        }
    };

    // Status mapping to Persian
    const statusToPersian: Record<Project["status"], string> = {
        PENDING: "در انتظار",
        OPEN: "باز",
        IN_PROGRESS: "در حال اجرا",
        COMPLETED: "تکمیل شده",
        CANCELLED: "لغو شده",
    };

    // Status color mapping
    const getStatusColor = (status: Project["status"]) => {
        switch (status) {
            case "PENDING": return "bg-blue-500";
            case "OPEN": return "bg-yellow-500";
            case "IN_PROGRESS": return "bg-light-color4 dark:bg-color4";
            case "COMPLETED": return "bg-green-600";
            case "CANCELLED": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    // Format utilities
    const formatPrice = (amount: number) => `${amount.toLocaleString("fa-IR")} تومان`;
    const formatPriceRange = (start: number, end: number) => {
        return `${start.toLocaleString("fa-IR")} - ${end.toLocaleString("fa-IR")} تومان`;
    };
    const formatDeadline = (days: number) => `${days} روز`;

    // Loading state
    if (isLoading) {
        return (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
                <p className="mt-4 text-light-color7 dark:text-color7">در حال بارگذاری پروژه‌ها...</p>
            </div>
        );
    }

    return (
        <div className="dir-rtl">
            {/* Error Display */}
            {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 mb-6 text-center">
                    {error}
                </div>
            )}

            {/* Projects List */}
            <div className="space-y-4">
                {clientProjects.length > 0 ? (
                    clientProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            data-testid={`project-${project.id}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-primaryMedium text-xl text-light-color2 dark:text-color2">
                                    {project.subject}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs text-light-color2 dark:text-color1 ${getStatusColor(project.status)}`}>
                  {statusToPersian[project.status]}
                </span>
                            </div>

                            <p className="text-light-color7 dark:text-color7 text-sm mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                    <p className="text-light-color7 dark:text-color7 text-xs mb-1">بودجه</p>
                                    <p className="text-light-color4 dark:text-color4 font-primaryMedium">
                                        {formatPriceRange(project.priceStarted, project.priceEnded)}
                                    </p>
                                </div>
                                <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                    <p className="text-light-color7 dark:text-color7 text-xs mb-1">مهلت</p>
                                    <p className="text-light-color2 dark:text-color2">
                                        {formatDeadline(project.deadLine || 14)}
                                    </p>
                                </div>
                                <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                    <p className="text-light-color7 dark:text-color7 text-xs mb-1">پیشنهادها</p>
                                    <p className="text-light-color2 dark:text-color2 flex items-center gap-2">
                                        <span>{project.proposals || 0} پیشنهاد</span>
                                        {(project.proposals || 0) > 0 && (
                                            <span className="w-2 h-2 rounded-full bg-light-color4 dark:bg-color4"></span>
                                        )}
                                    </p>
                                </div>
                                <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                    <p className="text-light-color7 dark:text-color7 text-xs mb-1">پیام‌ها</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-light-color2 dark:text-color2">
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

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => handleViewProposals(project)}
                                    className="flex items-center px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                    aria-label={`مشاهده پیشنهادهای پروژه ${project.subject}`}
                                    disabled={!project.proposals}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    مشاهده پیشنهادها
                                    {project.proposals ? ` (${project.proposals})` : " (0)"}
                                </button>
                                <button
                                    className="flex items-center px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                                    aria-label={`شروع گفتگو برای پروژه ${project.subject}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    گفتگو
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-light-color7 dark:text-color7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 4a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8z" />
                        </svg>
                        <p className="text-light-color7 dark:text-color7 mb-4">هیچ پروژه‌ای یافت نشد.</p>
                        <button className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors">
                            ایجاد پروژه جدید
                        </button>
                    </div>
                )}
            </div>

            {/* Proposals Slide-Over Panel (جایگزین modal) */}
            {isProposalsVisible && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50" role="dialog" aria-modal="true">
                    <div className="bg-light-color5 dark:bg-color5 w-full max-w-md ml-auto h-full overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out animate-slide-in">
                        <div className="sticky top-0 bg-light-color5 dark:bg-color5 z-10 border-b border-light-color6 dark:border-color6 px-6 py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-primaryMedium text-light-color2 dark:text-color2">
                                        پیشنهادهای دریافتی
                                    </h3>
                                    <p className="text-sm text-light-color7 dark:text-color7 mt-1">
                                        برای پروژه «{selectedProject.subject}»
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsProposalsVisible(false)}
                                    className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                    aria-label="بستن پنل پیشنهادها"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-light-color7 dark:text-color7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <div className="bg-light-color1 dark:bg-color1 px-3 py-2 rounded-lg">
                                    <span className="text-xs text-light-color7 dark:text-color7">بودجه:</span>
                                    <span className="text-sm text-light-color4 dark:text-color4 mr-1">
                    {formatPriceRange(selectedProject.priceStarted, selectedProject.priceEnded)}
                  </span>
                                </div>
                                <div className="bg-light-color1 dark:bg-color1 px-3 py-2 rounded-lg">
                                    <span className="text-xs text-light-color7 dark:text-color7">مهلت:</span>
                                    <span className="text-sm text-light-color2 dark:text-color2 mr-1">
                    {formatDeadline(selectedProject.deadLine || 14)}
                  </span>
                                </div>
                                <div className="bg-light-color1 dark:bg-color1 px-3 py-2 rounded-lg">
                                    <span className="text-xs text-light-color7 dark:text-color7">وضعیت:</span>
                                    <span className="text-sm text-light-color2 dark:text-color2 mr-1">
                    {statusToPersian[selectedProject.status]}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {isLoadingProposals ? (
                                <div className="text-center p-8">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
                                    <p className="mt-4 text-light-color7 dark:text-color7">در حال بارگذاری پیشنهادها...</p>
                                </div>
                            ) : proposalsError ? (
                                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 text-center">
                                    {proposalsError}
                                    <button
                                        onClick={() => fetchProposals(selectedProject.id)}
                                        className="block mx-auto mt-3 px-4 py-2 bg-red-200 dark:bg-red-800 rounded-lg hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
                                    >
                                        تلاش مجدد
                                    </button>
                                </div>
                            ) : proposals.length > 0 ? (
                                <div className="space-y-6">
                                    {proposals.map((proposal) => (
                                        <div
                                            key={proposal.id}
                                            className="bg-light-color1 dark:bg-color1 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-light-color4 dark:ring-color4 flex-shrink-0">
                                                    <img
                                                        src={proposal.avatar}
                                                        alt={proposal.freelancerName}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/default-avatar.png";
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-primaryMedium text-lg text-light-color2 dark:text-color2">
                                                                {proposal.freelancerName}
                                                            </h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className="flex items-center">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 text-yellow-500"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                    </svg>
                                                                    <span className="text-sm text-light-color7 dark:text-color7 mr-1">
                                    {proposal.rating.toFixed(1)}
                                  </span>
                                                                </div>
                                                                <span className="inline-block h-1 w-1 rounded-full bg-light-color7 dark:bg-color7"></span>
                                                                <span className="text-xs text-light-color7 dark:text-color7">
                                  {proposal.completedProjects} پروژه تکمیل شده
                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="text-left">
                                                            <div className="inline-block bg-light-color5 dark:bg-color5 px-3 py-1 rounded-full">
                                <span className="text-light-color4 dark:text-color4 font-primaryMedium">
                                  {proposal.price}
                                </span>
                                                            </div>
                                                            <p className="text-sm text-light-color7 dark:text-color7 mt-2">
                                                                زمان تحویل: {proposal.deliveryTime}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 p-3 bg-light-color5 dark:bg-color5 rounded-lg text-light-color2 dark:text-color2 text-sm">
                                                        {proposal.description}
                                                    </div>

                                                    <div className="flex justify-end gap-3 mt-4">
                                                        <button
                                                            className="flex items-center px-4 py-2 bg-light-color5 dark:bg-color5 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color6 transition-colors"
                                                            aria-label={`گفتگو با ${proposal.freelancerName}`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                            </svg>
                                                            گفتگو
                                                        </button>
                                                        <button
                                                            onClick={() => handleAcceptProposal(proposal.id, proposal.freelancerName)}
                                                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                            aria-label={`پذیرفتن پیشنهاد ${proposal.freelancerName}`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            پذیرفتن پیشنهاد
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-light-color7 dark:text-color7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M12 4a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8z" />
                                    </svg>
                                    <p className="text-light-color7 dark:text-color7">هیچ پیشنهادی برای این پروژه یافت نشد.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-grow" onClick={() => setIsProposalsVisible(false)}></div>
                </div>
            )}
        </div>
    );
};

export default ClientProjectList;