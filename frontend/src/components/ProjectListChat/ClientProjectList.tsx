"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
import Cookies from "js-cookie";
import { api } from "@/components/lib/api";

interface Employer {
    id: number;
    email?: string;
}

interface Skill {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    parentCategory: Category | null;
}

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    deadline: number;
    createdDate: string | null;
    endDate: string | null;
    type: "FIXED" | "HOURLY";
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    active: boolean;
    suggested: number;
    employerId: Employer;
    category: Category | null;
    skills: Skill[] | null;
    suggestions: any[] | null;
}

interface Proposal {
    id: number;
    projectId: {
        id: number;
        subject: string;
        description: string;
        priceStarted: number;
        priceEnded: number;
        deadline: number;
        createdDate: string;
        endDate: string;
        type: string;
        status: string;
        active: boolean;
        suggested: number;
        employerId: Employer | null;
        category: Category | null;
        skills: Skill[] | null;
        suggestions: any[] | null;
    };
    freelancerId: {
        id: number;
        email: string;
        role: string;
    };
    title: string;
    content: string;
    proposedBudget: number;
    estimatedDuration: number;
    submittedAt: string;
    status: string;
    assigned: boolean;
    milestones: any[] | null;
    startChat: boolean; // اجباری کردن startChat
}

interface ClientProjectsProps {
    projects?: Project[];
    onViewProposals?: (proposal: Proposal) => void;
    onStartChat?: (projectId: number, freelancerId: number, proposal: Proposal) => void;
}

const ClientProjects: React.FC<ClientProjectsProps> = ({
                                                           projects = [],
                                                           onViewProposals,
                                                           onStartChat,
                                                       }) => {
    const { userId } = useAuth();
    const [fetchedProjects, setFetchedProjects] = useState<Project[]>(Array.isArray(projects) ? projects : []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [viewingProposals, setViewingProposals] = useState(false);
    const [showChatConfirmModal, setShowChatConfirmModal] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

    const getClientProjects = useCallback(async () => {
        if (!userId) {
            setError("لطفاً وارد حساب کاربری خود شوید.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await api.get(`/app/getEmployer?id=${userId}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                withCredentials: true,
            });
            console.log("resss", response.data);
            const data = Array.isArray(response.data) ? response.data : [];
            setFetchedProjects(data);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching projects:", err);
            if (err.response?.status === 204) {
                setFetchedProjects([]);
            } else {
                setError("خطا در دریافت پروژه‌های clientprojectlist. لطفاً دوباره تلاش کنید.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId && fetchedProjects.length === 0) {
            getClientProjects();
        }
    }, [userId, getClientProjects]);

    const handleViewProposals = useCallback(async (projectId: number) => {
        try {
            setIsLoading(true);
            setSelectedProjectId(projectId);
            const response = await api.get(`/app/IdSuggest/${projectId}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                withCredentials: true,
            });
            // اطمینان از اینکه startChat در پیشنهادات تنظیم شده است
            const proposalsWithStartChat = (Array.isArray(response.data) ? response.data : []).map((p: Proposal) => ({
                ...p,
                startChat: p.startChat ?? false, // تنظیم مقدار پیش‌فرض
            }));
            setProposals(proposalsWithStartChat);
            setViewingProposals(true);
        } catch (err) {
            console.error("Error fetching proposals:", err);
            setError("خطا در دریافت پیشنهادات. لطفاً دوباره تلاش کنید.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const upChatStart = async (proposalId: number, proposal: Proposal) => {
        try {
            const updatedProposal = { ...proposal, startChat: true };
            const updateStartChat = await api.put(
                `/app/updateSuggest/${proposalId}`,
                updatedProposal,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                }
            );
            console.log("update start chat response:", updateStartChat.data);
            return true;
        } catch (error) {
            console.log("error in startChat: ", error);
            setError("خطا در فعال‌سازی چت.");
            return false;
        }
    };

    const handleOpenChatConfirmModal = useCallback((proposal: Proposal) => {
        setSelectedProposal(proposal);
        setShowChatConfirmModal(true);
    }, []);

    const handleConfirmChat = useCallback(async () => {
        if (!selectedProposal) return;

        const projectId = selectedProposal.projectId.id;
        const freelancerId = selectedProposal.freelancerId.id;

        const updated = await upChatStart(selectedProposal.id, selectedProposal);

        if (updated) {
            setProposals((prevProposals) =>
                prevProposals.map((p) =>
                    p.id === selectedProposal.id ? { ...p, startChat: true } : p
                )
            );

            if (onStartChat) {
                onStartChat(projectId, freelancerId, { ...selectedProposal, startChat: true });
            }

            setShowChatConfirmModal(false);
            setViewingProposals(false);
            setSelectedProjectId(null);
        }
    }, [selectedProposal, onStartChat]);

    const handleCancelChat = useCallback(() => {
        setShowChatConfirmModal(false);
    }, []);

    const handleViewProposalDetails = useCallback(
        (proposal: Proposal) => {
            if (onViewProposals) {
                onViewProposals(proposal);
            }
        },
        [onViewProposals]
    );

    const handleBackToProjects = useCallback(() => {
        setViewingProposals(false);
        setSelectedProjectId(null);
    }, []);

    const selectedProject = selectedProjectId
        ? fetchedProjects.find((project) => project.id === selectedProjectId)
        : null;

    return (
        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4">
            {viewingProposals && selectedProject ? (
                <>
                    <div className="mb-4 flex justify-between items-center">
                        <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2">
                            پیشنهادات برای پروژه: {selectedProject.subject}
                        </h3>
                        <button
                            onClick={handleBackToProjects}
                            className="px-3 py-1 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg text-sm"
                        >
                            بازگشت به لیست پروژه‌ها
                        </button>
                    </div>

                    {isLoading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
                        </div>
                    )}

                    {error && (
                        <div
                            aria-live="polite"
                            className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 mb-4 text-center"
                        >
                            {error}
                        </div>
                    )}

                    {!isLoading && proposals.length === 0 ? (
                        <p className="text-center text-light-color7 dark:text-color7 py-4">
                            هیچ پیشنهادی برای این پروژه یافت نشد.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {proposals.map((proposal) => (
                                <div key={proposal.id} className="bg-light-color1 dark:bg-color1 p-4 rounded-xl">
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-primaryMedium text-light-color2 dark:text-color2">
                                            {proposal.title} (فریلنسر: {proposal.freelancerId.email})
                                        </h4>
                                        <span className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs">
                                            {proposal.status === "PENDING"
                                                ? "در انتظار"
                                                : proposal.status === "ACCEPTED"
                                                    ? "پذیرفته شده"
                                                    : proposal.status === "REJECTED"
                                                        ? "رد شده"
                                                        : proposal.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <p className="text-sm text-light-color7 dark:text-color7">قیمت پیشنهادی:</p>
                                            <p className="font-primaryMedium text-light-color4 dark:text-color4">
                                                {proposal.proposedBudget} تومان
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-light-color7 dark:text-color7">زمان تحویل:</p>
                                            <p className="font-primaryMedium text-light-color4 dark:text-color4">
                                                {proposal.estimatedDuration} روز
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">توضیحات:</p>
                                        <p className="text-light-color2 dark:text-color2">{proposal.content}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">تاریخ ارسال:</p>
                                        <p className="text-light-color2 dark:text-color2">
                                            {new Date(proposal.submittedAt).toLocaleDateString("fa-IR")}
                                        </p>
                                    </div>

                                    {proposal.status === "PENDING" && (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenChatConfirmModal(proposal)}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                شروع گفتگو
                                            </button>
                                            <button
                                                onClick={() => handleViewProposalDetails(proposal)}
                                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-amber-300 transition-colors hover:text-black"
                                            >
                                                مشاهده جزئیات
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2 mb-4">
                        پروژه‌های کارفرما
                    </h3>

                    {isLoading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 europei-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
                        </div>
                    )}

                    {error && (
                        <div
                            aria-live="polite"
                            className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 mb-4 text-center"
                        >
                            {error}
                        </div>
                    )}

                    {!isLoading && fetchedProjects.length === 0 ? (
                        <p className="text-center text-light-color7 dark:text-color7">هیچ پروژه‌ای یافت نشد.</p>
                    ) : (
                        <div className="space-y-4">
                            {fetchedProjects.map((project) => (
                                <div key={project.id} className="bg-light-color1 dark:bg-color1 p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-primaryMedium text-light-color2 dark:text-color2">{project.subject}</h4>
                                        <span className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs">
                                            {project.status === "OPEN"
                                                ? "باز"
                                                : project.status === "PENDING"
                                                    ? "درحال بررسی"
                                                    : project.status === "IN_PROGRESS"
                                                        ? "در حال انجام"
                                                        : project.status === "COMPLETED"
                                                            ? "تکمیل شده"
                                                            : project.status === "CANCELLED"
                                                                ? "لغو شده"
                                                                : "نامشخص"}
                                        </span>
                                    </div>

                                    <p className="text-sm text-light-color7 dark:text-color7 mb-2">{project.description}</p>

                                    <div className="flex justify-between items-center">
                                        <span className="text-light-color4 dark:text-color4 font-primaryMedium">
                                            {project.priceStarted} - {project.priceEnded} تومان
                                        </span>
                                        <button
                                            onClick={() => handleViewProposals(project.id)}
                                            className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                                            aria-label={`مشاهده پیشنهادات برای ${project.subject}`}
                                        >
                                            مشاهده پیشنهادات ({project.suggested})
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {showChatConfirmModal && selectedProposal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-primaryMedium text-light-color2 dark:text-color2 mb-4">
                            تایید شروع گفتگو
                        </h3>
                        <p className="text-light-color7 dark:text-color7 mb-6">
                            آیا مطمئن هستید که می‌خواهید با فریلنسر {selectedProposal.freelancerId.email} برای پروژه "{selectedProposal.projectId.subject}" گفتگو را شروع کنید؟
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleCancelChat}
                                className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                            >
                                انصراف
                            </button>
                            <button
                                onClick={handleConfirmChat}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                تایید و شروع گفتگو
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientProjects;