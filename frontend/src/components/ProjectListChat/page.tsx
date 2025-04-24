"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
import ClientProjects from "@/components/ProjectListChat/ClientProjectList";
import FreelancerProjects from "@/components/ProjectListChat/FreelancerProjectList";

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
    employerId: { id: number };
    category: { id: number; name: string } | null;
    skills: { id: number; name: string }[] | null;
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

interface ProjectListChatProps {
    onViewProposals?: (proposal: Proposal) => void;
    onStartChat?: (projectId: number, receiverId: number, proposal?: Proposal) => void;
}

const ProjectListChat = ({ onViewProposals, onStartChat }: ProjectListChatProps) => {
    const { userId } = useAuth();
    const [activeTab, setActiveTab] = useState<"client" | "freelancer">();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            setIsLoading(false);
        } else {
            setError("لطفاً وارد حساب کاربری خود شوید.");
            setIsLoading(false);
        }
    }, [userId]);

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl p-4 mb-6 text-center">
                    {error}
                </div>
            )}

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

            {activeTab === "client" ? (
                <ClientProjects
                    onViewProposals={onViewProposals}
                    onStartChat={onStartChat}
                />
            ) : (
                <FreelancerProjects
                    onViewProposals={onViewProposals}
                    onStartChat={onStartChat}
                />
            )}
        </div>
    );
};

export default ProjectListChat;