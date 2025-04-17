"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import ProjectListChat from "@/components/ProjectListChat/page";

const FreelanceDashboard = () => {
    const [selectedProject, setSelectedProject] = useState<{
        id: number;
        employerId: number;
    } | null>(null);

    const handleProjectSelect = (projectId: number, employerId: number) => {
        setSelectedProject({ id: projectId, employerId });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 order-2 lg:order-1">
                    <ProjectListChat onViewProposals={handleProjectSelect} />
                </div>
                <div className="lg:col-span-6 order-1 lg:order-2">
                    {selectedProject ? (
                        <ChatInterface
                            projectId={selectedProject.id}
                            receiverId={selectedProject.employerId}
                        />
                    ) : (
                        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-6 text-center">
                            <p className="text-light-color7 dark:text-color7">
                                لطفاً یک پروژه را انتخاب کنید تا چت نمایش داده شود.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FreelanceDashboard;