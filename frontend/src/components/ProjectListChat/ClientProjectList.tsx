"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
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

interface ClientProjectListProps {
    onViewProposals?: (projectId: number) => void;
}

const ClientProjectList = ({ onViewProposals }: ClientProjectListProps) => {
    const [showProposalsModal, setShowProposalsModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [clientProjects, setClientProjects] = useState<Project[]>([]);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingProposals, setIsLoadingProposals] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [proposalsError, setProposalsError] = useState<string | null>(null);
    const { userId } = useAuth();

    // Fetch projects
    const getClientProjects = useCallback(async () => {
        try {
            const response = await axios.get(`/app/getEmployer?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                withCredentials: true,
            });
            setError(null);
            return response.data || [];
        } catch (err: any) {
            console.error("Error fetching projects:", err);
            setError("خطا در دریافت پروژه‌ها. لطفاً دوباره تلاش کنید.");
            return [];
        }
    }, [userId]);

    // Fetch proposals for a project
    const getProposals = useCallback(async (projectId: number) => {
        setIsLoadingProposals(true);
        try {
            const response = await axios.get(`/app/proposals/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                withCredentials: true,
            });
            setProposalsError(null);
            return response.data || [];
        } catch (err: any) {
            console.error("Error fetching proposals:", err);
            setProposalsError("خطا در دریافت پیشنهادها. لطفاً دوباره تلاش کنید.");
            return [];
        } finally {
            setIsLoadingProposals(false);
        }
    }, []);

    // Load projects on mount
    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        if (userId) {
            getClientProjects().then((projects) => {
                if (isMounted) {
                    setClientProjects(projects);
                    setIsLoading(false);
                }
            });
        } else {
            if (isMounted) {
                setIsLoading(false);
                setError("لطفاً وارد حساب کاربری خود شوید.");
            }
        }
        return () => {
            isMounted = false;
        };
    }, [userId, getClientProjects]);

    // Load proposals when modal opens
    const handleViewProposals = async (projectId: number) => {
        setSelectedProjectId(projectId);
        setShowProposalsModal(true);
        const fetchedProposals = await getProposals(projectId);
        setProposals(fetchedProposals);
        if (onViewProposals) {
            onViewProposals(projectId);
        }
    };

    // Handle proposal acceptance with confirmation
    const handleAcceptProposal = (proposalId: number, freelancerName: string) => {
        if (confirm(`آیا مطمئن هستید که می‌خواهید پیشنهاد ${freelancerName} را بپذیرید؟`)) {
            // Simulate API call to accept proposal
            alert(`پیشنهاد فریلنسر با شناسه ${proposalId} پذیرفته شد. می‌توانید قرارداد را تنظیم کنید.`);
            setShowProposalsModal(false);
        }
    };

    // Status mapping and colors
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
                return "bg-blue-500";
            case "OPEN":
                return "bg-yellow-500";
            case "IN_PROGRESS":
                return "bg-light-color4 dark:bg-color4";
            case "COMPLETED":
                return "bg-green-600";
            case "CANCELLED":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    // Format price and deadline
    const formatPriceRange = (start: number, end: number) => {
        return `${start.toLocaleString("fa-IR")} - ${end.toLocaleString("fa-IR")} تومان`;
    };

    const formatDeadline = (days: number) => {
        return `${days} روز`;
    };

    if (isLoading) {
        return (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
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
                            className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                            role="article"
                            aria-labelledby={`project-title-${project.id}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3
                                    id={`project-title-${project.id}`}
                                    className="font-primaryMedium text-xl text-light-color2 dark:text-color2"
                                >
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
                                    <p className="text-light-color2 dark:text-color2">{project.proposals || 0} پیشنهاد</p>
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
                                    onClick={() => handleViewProposals(project.id)}
                                    className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                    aria-label={`مشاهده پیشنهادهای پروژه ${project.subject}`}
                                >
                                    مشاهده پیشنهادها
                                </button>
                                <button
                                    className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                                    aria-label={`شروع گفتگو برای پروژه ${project.subject}`}
                                >
                                    گفتگو
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-light-color7 dark:text-color7">هیچ پروژه‌ای یافت نشد.</p>
                    </div>
                )}
            </div>

            {/* Proposals Modal */}
            {showProposalsModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    role="dialog"
                    aria-labelledby="proposals-modal-title"
                    aria-modal="true"
                >
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3
                                id="proposals-modal-title"
                                className="text-2xl font-primaryMedium text-light-color2 dark:text-color2"
                            >
                                پیشنهادهای دریافتی
                            </h3>
                            <button
                                onClick={() => setShowProposalsModal(false)}
                                className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                aria-label="بستن پنجره پیشنهادها"
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
                        {isLoadingProposals ? (
                            <div className="text-center p-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
                            </div>
                        ) : proposalsError ? (
                            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 text-center">
                                {proposalsError}
                            </div>
                        ) : proposals.length > 0 ? (
                            <div className="space-y-4">
                                {proposals.map((proposal) => (
                                    <div
                                        key={proposal.id}
                                        className="bg-light-color1 dark:bg-color1 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-light-color4 dark:ring-color4">
                                                    <img
                                                        src={proposal.avatar}
                                                        alt={proposal.freelancerName}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/default-avatar.png";
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-primaryMedium text-lg text-light-color2 dark:text-color2">
                                                        {proposal.freelancerName}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-yellow-500"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                        <span className="text-sm text-light-color7 dark:text-color7">
                              {proposal.rating.toFixed(1)}
                            </span>
                                                        <span className="text-xs text-light-color7 dark:text-color7">
                              ({proposal.completedProjects} پروژه تکمیل شده)
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                        <span className="text-light-color4 dark:text-color4 font-primaryMedium text-lg">
                          {proposal.price}
                        </span>
                                                <p className="text-sm text-light-color7 dark:text-color7 mt-1">
                                                    زمان تحویل: {proposal.deliveryTime}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-light-color2 dark:text-color2 text-sm mb-4">{proposal.description}</p>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                className="px-4 py-2 bg-light-color5 dark:bg-color5 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color6 transition-colors"
                                                aria-label={`گفتگو با ${proposal.freelancerName}`}
                                            >
                                                گفتگو
                                            </button>
                                            <button
                                                onClick={() => handleAcceptProposal(proposal.id, proposal.freelancerName)}
                                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                aria-label={`پذیرفتن پیشنهاد ${proposal.freelancerName}`}
                                            >
                                                پذیرفتن پیشنهاد
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-8 text-light-color7 dark:text-color7">
                                هیچ پیشنهادی برای این پروژه یافت نشد.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientProjectList;