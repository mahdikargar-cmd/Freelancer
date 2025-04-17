"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
import axios from "axios";
import Cookies from "js-cookie";
import ClientProjects from "./ClientProjectList";
import FreelancerProjects from "./FreelancerProjectList";

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    deadline: number;
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    proposals?: number;
    unreadMessages?: number;
    employerId: { id: number };
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
    onViewProposals?: (projectId: number, employerId: number) => void;
}

const ProjectListChat = ({ onViewProposals }: ProjectListChatProps) => {
    const [activeTab, setActiveTab] = useState<"client" | "freelancer">("client");
    const [showProposalsModal, setShowProposalsModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [clientProjects, setClientProjects] = useState<Project[]>([]);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useAuth();

    const getClientProjects = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/app/getEmployer?id=${userId}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                withCredentials: true,
            });
            setError(null);
            console.log("Projects fetched:", response.data);
            return response.data || [];
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("خطا در دریافت پروژه‌ها. لطفاً دوباره تلاش کنید.");
            return [];
        }
    }, [userId]);

    const getProposals = useCallback(async (projectId: number) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/app/proposals?projectId=${projectId}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                }
            );
            setError(null);
            return response.data || [];
        } catch (err) {
            console.error("Error fetching proposals:", err);
            setError("خطا در دریافت پیشنهادات.");
            return [];
        }
    }, []);

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

    useEffect(() => {
        if (selectedProjectId) {
            getProposals(selectedProjectId).then((data) => {
                setProposals(data);
            });
        }
    }, [selectedProjectId, getProposals]);

    const handleViewProposals = useCallback(
        (projectId: number, employerId: number) => {
            setSelectedProjectId(projectId);
            setShowProposalsModal(true);
            if (onViewProposals) {
                onViewProposals(projectId, employerId);
            }
        },
        [onViewProposals]
    );

    const handleAcceptProposal = useCallback((proposalId: number) => {
        alert(`پیشنهاد فریلنسر با شناسه ${proposalId} پذیرفته شد. می‌توانید قرارداد را تنظیم کنید.`);
        setShowProposalsModal(false);
    }, []);

    const filteredProjects = clientProjects.filter(
        (project) =>
            project.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!filterStatus || project.status === filterStatus)
    );

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            {/* Error Display */}
            {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 mb-6 text-center">
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
                    aria-label="نمایش پروژه‌های کارفرما"
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
                    aria-label="نمایش پروژه‌های فریلنسر"
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="جستجو در پروژه‌ها..."
                            className="w-full p-3 pr-10 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 text-light-color2 dark:text-color2"
                            aria-label="جستجو در پروژه‌ها"
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
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="p-3 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 text-light-color2 dark:text-color2"
                            aria-label="فیلتر بر اساس وضعیت"
                        >
                            <option value="">همه وضعیت‌ها</option>
                            <option value="PENDING">در انتظار تأیید</option>
                            <option value="OPEN">باز</option>
                            <option value="IN_PROGRESS">در حال انجام</option>
                            <option value="COMPLETED">تکمیل شده</option>
                            <option value="CANCELLED">لغو شده</option>
                        </select>
                        <button
                            className="p-3 rounded-xl border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 hover:bg-light-color6 dark:hover:bg-color5 transition-colors focus:outline-none"
                            aria-label="فیلتر پروژه‌ها"
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
            {activeTab === "client" ? (
                <ClientProjects
                    projects={filteredProjects}
                    onViewProposals={handleViewProposals}
                />
            ) : (
                <FreelancerProjects />
            )}

            {/* Proposals Modal */}
            {showProposalsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-primaryMedium text-light-color2 dark:text-color2">
                                پیشنهادهای دریافتی
                            </h3>
                            <button
                                onClick={() => setShowProposalsModal(false)}
                                className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                aria-label="بستن مودال پیشنهادات"
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
                            {proposals.length === 0 ? (
                                <p className="text-center text-light-color7 dark:text-color7">
                                    هنوز پیشنهادی برای این پروژه وجود ندارد.
                                </p>
                            ) : (
                                proposals
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
                                                                e.currentTarget.src = "/default-avatar.png";
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
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                            <span className="text-sm text-light-color7 dark:text-color7 mr-1">
                                {proposal.rating}
                              </span>
                                                            <span className="text-xs text-light-color7 dark:text-color7 mr-2">
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
                                                <button className="px-4 py-2 bg-light-color5 dark:bg-color5 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color6 transition-colors">
                                                    گفتگو
                                                </button>
                                                <button
                                                    onClick={() => handleAcceptProposal(proposal.id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                    aria-label={`پذیرفتن پیشنهاد ${proposal.freelancerName}`}
                                                >
                                                    پذیرفتن پیشنهاد
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectListChat;