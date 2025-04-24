"use client";
import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/components/lib/useAuth";
import { api } from "@/components/lib/api";

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    deadline: number;
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    employerId?: { id: number; email: string; firstName?: string; lastName?: string };
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
        employerId: { id: number; email: string; role: string } | null;
        category: { id: number; name: string; parentCategory: { id: number; name: string } | null } | null;
        skills: { id: number; name: string }[] | null;
        suggestions: any[] | null;
    };
    freelancerId: { id: number; email: string; role: string };
    title: string;
    content: string;
    proposedBudget: number;
    estimatedDuration: number;
    submittedAt: string;
    status: string;
    assigned: boolean;
    milestones: any[] | null;
    startChat?: boolean;
}

interface FreelancerProjectsProps {
    onViewProposals?: (proposal: Proposal) => void;
    onStartChat?: (projectId: number, receiverId: number, proposal?: Proposal) => void;
}

const FreelancerProjects: React.FC<FreelancerProjectsProps> = ({ onViewProposals, onStartChat }) => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useAuth();

    const getFreelancerProposals = useCallback(async () => {
        try {
            const response = await api.get(`/app/freelancer/${userId}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                withCredentials: true,
            });
            console.log("Freelancer proposals response:", response.data);
            setProposals(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching freelancer proposals:", err);
            setError("خطا در دریافت پیشنهادهای فریلنسر.");
            setProposals([]);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            getFreelancerProposals();
        } else {
            setError("لطفاً وارد حساب کاربری شوید.");
            setIsLoading(false);
        }
    }, [userId, getFreelancerProposals]);

    const handleViewProposal = (proposal: Proposal) => {
        if (onViewProposals) {
            onViewProposals(proposal);
        }
    };

    const handleStartChat = (projectId: number, receiverId: number, proposal: Proposal) => {
        if (onStartChat) {
            onStartChat(projectId, receiverId, proposal);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4">
            <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2 mb-4">
                پروژه‌های فریلنسر
            </h3>
            {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 mb-6 text-center">
                    {error}
                </div>
            )}
            {proposals.length === 0 ? (
                <p className="text-light-color7 dark:text-color7 text-center">
                    هیچ پیشنهادی یافت نشد.
                </p>
            ) : (
                <div className="space-y-4">
                    {proposals.map((proposal) => (
                        <div
                            key={proposal.id}
                            className="bg-light-color1 dark:bg-color1 p-4 rounded-xl"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-primaryMedium text-light-color2 dark:text-color2">
                                    {proposal.projectId.subject}
                                </h4>
                                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 px-2 py-1 rounded-md text-xs">
                                    {proposal.status === "PENDING"
                                        ? "در انتظار"
                                        : proposal.status === "OPEN"
                                            ? "باز"
                                            : proposal.status === "ACCEPTED"
                                                ? "پذیرفته شده"
                                                : proposal.status === "REJECTED"
                                                    ? "رد شده"
                                                    : proposal.status}
                                </span>
                            </div>
                            <p className="text-sm text-light-color7 dark:text-color7 mb-3">
                                {proposal.projectId.description}
                            </p>
                            <p className="text-sm text-light-color7 dark:text-color7 mb-3">
                                بودجه پیشنهادی: {proposal.proposedBudget} تومان
                            </p>
                            <p className="text-sm text-light-color7 dark:text-color7 mb-3">
                                مدت زمان تخمینی: {proposal.estimatedDuration} روز
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-light-color4 dark:text-color4 text-sm">
                                    {proposal.projectId.priceStarted} -{" "}
                                    {proposal.projectId.priceEnded} تومان
                                </span>
                                {(proposal.startChat ||
                                    proposal.status === "OPEN" ||
                                    proposal.status === "ACCEPTED" ||
                                    proposal.status === "IN_PROGRESS" ||
                                    proposal.status === "COMPLETED") &&
                                proposal.projectId.employerId?.id ? (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleViewProposal(proposal)}
                                            className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                                        >
                                            مشاهده جزئیات
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleStartChat(
                                                    proposal.projectId.id,
                                                    proposal.projectId.employerId.id,
                                                    proposal
                                                )
                                            }
                                            className="bg-light-color4 dark:bg-color4 text-white px-3 py-1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors text-sm flex items-center"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                />
                                            </svg>
                                            گفتگو
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FreelancerProjects;