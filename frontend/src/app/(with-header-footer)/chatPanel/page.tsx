"use client";
import { useState } from "react";
import ProjectListChat from "@/components/ProjectListChat/page";
import DetailSuggest from "@/app/(with-header-footer)/detailSuggest/[id]/page";
import ChatInterface from "@/components/ChatInterface";
import { useAuth } from "@/components/lib/useAuth";

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

const FreelanceDashboard = () => {
    const { userId } = useAuth(); // دریافت userId و role (کارفرما یا فریلنسر)
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [showChat, setShowChat] = useState<boolean>(false);
    const [chatProjectId, setChatProjectId] = useState<number | null>(null);
    const [chatReceiverId, setChatReceiverId] = useState<number | null>(null);

    const handleViewProposal = (proposal: Proposal) => {
        console.log("Viewing proposal:", proposal);
        setSelectedProposal(proposal);
        setShowChat(false); // مخفی کردن چت هنگام نمایش جزئیات پیشنهاد
    };

    const handleStartChat = (projectId: number, receiverId: number, proposal?: Proposal) => {
        console.log("Starting chat:", { projectId, receiverId, proposal });
        setChatProjectId(projectId);
        setChatReceiverId(receiverId);
        if (proposal) {
            setSelectedProposal({ ...proposal, startChat: true });
        } else {
            setSelectedProposal(null); // برای جلوگیری از نمایش DetailSuggest
        }
        setShowChat(true);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 order-2 lg:order-1">
                    <ProjectListChat
                        onViewProposals={handleViewProposal}
                        onStartChat={handleStartChat}
                    />
                </div>
                <div className="lg:col-span-6 order-1 lg:order-2">
                    {showChat && chatProjectId && chatReceiverId ? (
                        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg">
                            <ChatInterface
                                projectId={chatProjectId}
                                receiverId={chatReceiverId}
                            />
                        </div>
                    ) : selectedProposal ? (
                        <div className="bg-light-color5 mt-6 dark:bg-color5 rounded-2xl shadow-lg">
                            <DetailSuggest
                                key={selectedProposal.id}
                                projectId={selectedProposal.projectId.id}
                                proposal={selectedProposal}
                            />
                        </div>
                    ) : (
                        <div className="bg-light-color5 mt-8 dark:bg-color5 rounded-2xl shadow-lg p-6 text-center">
                            <div className="flex flex-col items-center justify-center py-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-light-color7 dark:text-color7 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                <p className="text-light-color7 dark:text-color7 text-lg">
                                    لطفاً یک پیشنهاد را انتخاب کنید تا جزئیات نمایش داده شود.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FreelanceDashboard;