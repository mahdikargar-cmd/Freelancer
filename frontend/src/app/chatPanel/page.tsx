"use client"
import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import ProjectListChat from "@/components/ProjectListChat/page";

const FreelanceDashboard = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    const handleProjectSelect = (projectId: number) => {
        setSelectedProject(projectId);
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 order-2 lg:order-1">
                    <ProjectListChat onViewProposals={handleProjectSelect} />
                </div>
                <div className="lg:col-span-6 order-1 lg:order-2">
                    <ChatInterface  />
                </div>
            </div>
        </div>
    );
};

export default FreelanceDashboard;