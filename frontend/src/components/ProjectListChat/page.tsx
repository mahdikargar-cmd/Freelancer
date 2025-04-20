"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
import axios from "axios";
import Cookies from "js-cookie";
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

interface ProjectListChatProps {
    onViewProposals?: (projectId: number, employerId: number) => void;
    onStartChat?: (projectId: number, freelancerId: number) => void;
}

const ProjectListChat = ({ onViewProposals, onStartChat }: ProjectListChatProps) => {
    const [activeTab, setActiveTab] = useState<"client" | "freelancer">("client");
    const [clientProjects, setClientProjects] = useState<Project[]>([]);
 /*   const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");*/
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useAuth();

    const getClientProjects = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:8080/app/getEmployer?id=${userId}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                withCredentials: true,
            });
            console.log("employer in projectListChat", response.data);
            setClientProjects(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (err) {
            setError("خطا در دریافت پروژه‌ها. لطفاً دوباره تلاش کنید.");
            setClientProjects([]);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            getClientProjects();
        } else {
            setIsLoading(false);
            setError("لطفاً وارد حساب کاربری خود شوید.");
        }
    }, [userId, getClientProjects]);

    const handleViewProposals = useCallback(
        (projectId: number, employerId: number) => {
            if (onViewProposals) {
                onViewProposals(projectId, employerId);
            }
        },
        [onViewProposals]
    );

    const handleStartChat = useCallback(
        (projectId: number, freelancerId: number) => {
            if (onStartChat) {
                onStartChat(projectId, freelancerId);
            }
        },
        [onStartChat]
    );

/*    const filteredProjects = clientProjects.filter(
        (project) =>
            project.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!filterStatus || project.status === filterStatus)
    );*/

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto">  </div>
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

{/*
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
*/}

            {activeTab === "client" ? (
                <ClientProjects
/*
                    projects={filteredProjects}
*/
                    onViewProposals={handleViewProposals}
                    onStartChat={handleStartChat}
                />
            ) : (
                <FreelancerProjects />
            )}
        </div>
    );
};

export default ProjectListChat;