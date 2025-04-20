"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import ProjectListChat from "@/components/ProjectListChat/page";

const FreelanceDashboard = () => {
    const [selectedProject, setSelectedProject] = useState<{
        id: number;
        receiverId: number;
    } | null>(null);

    const [chatKey, setChatKey] = useState(0);

    const handleProjectSelect = (projectId: number, employerId: number) => {
        setChatKey(prevKey => prevKey + 1);
        setSelectedProject({ id: projectId, receiverId: employerId });
    };

    const handleStartChat = (projectId: number, freelancerId: number) => {
        setChatKey(prevKey => prevKey + 1);
        setSelectedProject({ id: projectId, receiverId: freelancerId });
    };

    return (
        <div className="container mx-auto px-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 order-2 lg:order-1">
                    <ProjectListChat
                        onViewProposals={handleProjectSelect}
                        onStartChat={handleStartChat}
                    />
                </div>
                <div className="lg:col-span-6 order-1 lg:order-2">
                    {selectedProject ? (
                        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg">
                            <ChatInterface
                                key={chatKey}
                                projectId={selectedProject.id}
                                receiverId={selectedProject.receiverId}
                            />
                        </div>
                    ) : (
                        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-6 text-center">
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
                                    لطفاً یک پروژه را انتخاب کنید تا چت نمایش داده شود.
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