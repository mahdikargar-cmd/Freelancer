"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
import Cookies from "js-cookie";
import { api } from "@/components/lib/api";
import { Project, Proposal } from "@/types";

interface ClientProjectsProps {
    projects?: Project[];
    onViewProposals?: (proposal: Proposal) => void;
    onStartChat?: (projectId: number, freelancerId: number, proposal: Proposal) => void;
}

const ClientProjects: React.FC<ClientProjectsProps> = React.memo(
    ({ projects = [], onViewProposals, onStartChat }) => {
        const { userId } = useAuth();
        const [showPaymentModal, setShowPaymentModal] = useState(false);
        const [fetchedProjects, setFetchedProjects] = useState<Project[]>(Array.isArray(projects) ? projects : []);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [proposals, setProposals] = useState<Proposal[]>([]);
        const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
        const [viewingProposals, setViewingProposals] = useState(false);
        const [showChatConfirmModal, setShowChatConfirmModal] = useState(false);
        const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

        const formatDate = (date: string | null) => {
            if (!date) return "نامشخص";
            try {
                return new Date(date).toLocaleDateString("fa-IR");
            } catch {
                return "نامشخص";
            }
        };

        const handlePaymentSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            alert("پرداخت با موفقیت انجام شد.");
            setShowPaymentModal(false);
        }, []);

        const handlePaymentClick = useCallback(() => {
            setShowPaymentModal(true);
        }, []);

        const getClientProjects = useCallback(async () => {
            if (!userId || isLoading) {
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
                // تبدیل تاریخ‌ها از آرایه به رشته
                const formattedData = data.map((project: Project) => {
                    let createdDate = project.createdDate;
                    if (Array.isArray(project.createdDate)) {
                        const [year, month, day] = project.createdDate as unknown as [number, number, number];
                        createdDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    }
                    let endDate = project.endDate;
                    if (Array.isArray(project.endDate)) {
                        const [year, month, day] = project.endDate as unknown as [number, number, number];
                        endDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    }
                    return { ...project, createdDate, endDate };
                });
                setFetchedProjects(formattedData);
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
        }, [userId, isLoading]);

        useEffect(() => {
            if (userId && !fetchedProjects.length && !isLoading) {
                getClientProjects();
            }
        }, [userId, getClientProjects, isLoading]);

        const handleViewProposals = useCallback(async (projectId: number) => {
            try {
                setIsLoading(true);
                setSelectedProjectId(projectId);
                const response = await api.get(`/app/IdSuggest/${projectId}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                    withCredentials: true,
                });

                console.log("response suggest", response.data);
                const proposalsWithStartChat = (Array.isArray(response.data) ? response.data : []).map((p: Proposal) => {
                    let createdDate = p.projectId.createdDate;
                    if (Array.isArray(p.projectId.createdDate)) {
                        const [year, month, day] = p.projectId.createdDate as unknown as [number, number, number];
                        createdDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    }
                    let endDate = p.projectId.endDate;
                    if (Array.isArray(p.projectId.endDate)) {
                        const [year, month, day] = p.projectId.endDate as unknown as [number, number, number];
                        endDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    }
                    let submittedAt = p.submittedAt;
                    if (Array.isArray(p.submittedAt)) {
                        const [year, month, day, hour, minute, second] = p.submittedAt as unknown as [number, number, number, number, number, number];
                        submittedAt = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
                    }
                    return {
                        ...p,
                        projectId: { ...p.projectId, createdDate, endDate },
                        submittedAt,
                        startChat: p.startChat ?? false,
                    };
                });
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
                const updatedProposal = { ...proposal, startChat: true, status: "OPEN" };
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
                                <div
                                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
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
                                                {proposal.title || "بدون عنوان"} (فریلنسر: {proposal.freelancerId.email})
                                            </h4>
                                            <span
                                                className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs">
                                                {proposal.status === "PENDING"
                                                    ? "در انتظار"
                                                    : proposal.status === "ACCEPTED"
                                                        ? "پذیرفته شده"
                                                        : proposal.status === "REJECTED"
                                                            ? "رد شده"
                                                            : proposal.status || "نامشخص"}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <p className="text-sm text-light-color7 dark:text-color7">قیمت
                                                    پیشنهادی:</p>
                                                <p className="font-primaryMedium text-light-color4 dark:text-color4">
                                                    {proposal.proposedBudget ? `${proposal.proposedBudget} تومان` : "نامشخص"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-light-color7 dark:text-color7">زمان
                                                    تحویل:</p>
                                                <p className="font-primaryMedium text-light-color4 dark:text-color4">
                                                    {proposal.estimatedDuration ? `${proposal.estimatedDuration} روز` : "نامشخص"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">توضیحات:</p>
                                            <p className="text-light-color2 dark:text-color2">{proposal.content || "بدون توضیحات"}</p>
                                        </div>

                                        <div className="mb-3">
                                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">تاریخ
                                                ارسال:</p>
                                            <p className="text-light-color2 dark:text-color2">{formatDate(proposal.submittedAt)}</p>
                                        </div>

                                        {proposal.status === "PENDING" && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        proposal.startChat
                                                            ? onStartChat?.(proposal.projectId.id, proposal.freelancerId.id, proposal)
                                                            : handleOpenChatConfirmModal(proposal)
                                                    }
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    {proposal.startChat ? "نمایش گفتگو" : "شروع گفتگو"}
                                                </button>
                                                <button
                                                    onClick={() => handleViewProposalDetails(proposal)}
                                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-amber-300 transition-colors hover:text-black"
                                                >
                                                    مشاهده جزئیات
                                                </button>
                                                <button
                                                    onClick={handlePaymentClick}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                                >
                                                    پرداخت و سپردن پروژه
                                                </button>
                                                {/* Payment Modal */}
                                                {showPaymentModal && selectedProject && (
                                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                        <div className="bg-light-color5 dark:bg-color5 rounded-2xl p-6 w-full max-w-md">
                                                            <h3 className="text-xl font-primaryMedium text-light-color2 dark:text-color2 mb-4">
                                                                پرداخت پروژه
                                                            </h3>
                                                            <form onSubmit={handlePaymentSubmit}>
                                                                <div className="mb-4">
                                                                    <label className="block text-light-color7 dark:text-color7 mb-2">
                                                                        مبلغ پرداختی (تومان)
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        defaultValue={`${selectedProject.priceStarted.toLocaleString()}`}
                                                                        readOnly
                                                                        className="w-full p-3 rounded-lg border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color2 dark:text-color2"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="block text-light-color7 dark:text-color7 mb-2">
                                                                        روش پرداخت
                                                                    </label>
                                                                    <select
                                                                        className="w-full p-3 rounded-lg border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color2 dark:text-color2"
                                                                        aria-label="روش پرداخت"
                                                                    >
                                                                        <option>درگاه پرداخت آنلاین</option>
                                                                        <option>کیف پول</option>
                                                                        <option>کارت به کارت</option>
                                                                    </select>
                                                                </div>
                                                                <div className="flex justify-between mt-6">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setShowPaymentModal(false)}
                                                                        className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                                                        aria-label="انصراف از پرداخت"
                                                                    >
                                                                        انصراف
                                                                    </button>
                                                                    <button
                                                                        type="submit"
                                                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                                        aria-label="تایید و پرداخت"
                                                                    >
                                                                        تایید و پرداخت
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                )}
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
                                <div
                                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
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
                                            <span
                                                className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs">
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

                                        <div className="mt-2">
                                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">تاریخ
                                                ایجاد:</p>
                                            <p className="text-light-color2 dark:text-color2">{formatDate(project.createdDate)}</p>
                                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">تاریخ
                                                پایان:</p>
                                            <p className="text-light-color2 dark:text-color2">{formatDate(project.endDate)}</p>
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
                                آیا مطمئن هستید که می‌خواهید با فریلنسر {selectedProposal.freelancerId.email} برای پروژه
                                "{selectedProposal.projectId.subject}" گفتگو را شروع کنید؟
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
                                    className="px-4(py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    تایید و شروع گفتگو
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

export default ClientProjects;