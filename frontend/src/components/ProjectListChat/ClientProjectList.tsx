"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/components/lib/useAuth";
import Cookies from "js-cookie";

interface Employer {
    id: number;
    email?: string;
    role?: string;
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
    category: Category;
    skills: Skill[];
    suggestions: any[] | null;
}

interface ClientProjectsProps {
    projects?: Project[];
    onViewProposals: (projectId: number, employerId: number) => void;
}

const api = axios.create({
    baseURL: "http://localhost:8080",
});

const ClientProjects: React.FC<ClientProjectsProps> = ({ projects = [], onViewProposals }) => {
    const { userId } = useAuth();
    const [fetchedProjects, setFetchedProjects] = useState<Project[]>(Array.isArray(projects) ? projects : []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    console.log("Initial projects:", projects);
    console.log("userId:", userId);

    const getClientProjects = useCallback(async () => {
        if (!userId) {
            setError("لطفاً وارد حساب کاربری خود شوید.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await api.get(`/app/${userId}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                withCredentials: true,
            });

            console.log("Raw API response:", response.data);

            // اگر پاسخ یک شیء است، آن را به آرایه تبدیل کنید
            const data = response.data ? [response.data] : [];
            console.log("Parsed projects:", data);
            setFetchedProjects(data);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching projects:", err);
            if (err.response?.status === 204) {
                setFetchedProjects([]);
            } else {
                setError("خطا در دریافت پروژه‌ها. لطفاً دوباره تلاش کنید.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        console.log("useEffect triggered with projects:", projects, "userId:", userId);
        if (userId && (!Array.isArray(projects) || projects.length === 0)) {
            getClientProjects();
        } else {
            setFetchedProjects(Array.isArray(projects) ? projects : []);
        }
    }, [projects, userId, getClientProjects]);

    useEffect(() => {
        console.log("fetchedProjects updated:", fetchedProjects);
    }, [fetchedProjects]);

    console.log("fetchedProjects before render:", fetchedProjects);

    return (
        <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4">
            <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2 mb-4">
                پروژه‌های کارفرما
            </h3>
            {isLoading && (
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"
                    ></div>
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
                <p className="text-center text-light-color7 dark:text-color7">
                    هیچ پروژه‌ای یافت نشد.
                </p>
            ) : (
                <div className="space-y-4">
                    {fetchedProjects.map((project) => (
                        <div key={project.id} className="bg-light-color1 dark:bg-color1 p-4 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-primaryMedium text-light-color2 dark:text-color2">
                                    {project.subject}
                                </h4>
                                <span className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs">
                                    {project.status === "OPEN"
                                        ? "باز"
                                        : project.status === "IN_PROGRESS"
                                            ? "در حال انجام"
                                            : project.status === "COMPLETED"
                                                ? "تکمیل شده"
                                                : project.status === "CANCELLED"
                                                    ? "لغو شده"
                                                    : "در حال مذاکره"}
                                </span>
                            </div>
                            <p className="text-sm text-light-color7 dark:text-color7 mb-2">
                                {project.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-light-color4 dark:text-color4 font-primaryMedium">
                                    {project.priceStarted.toLocaleString()} - {project.priceEnded.toLocaleString()} تومان
                                </span>
                                <button
                                    onClick={() => onViewProposals(project.id, project.employerId.id)}
                                    className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                                    aria-label={`مشاهده پیشنهادات برای ${project.subject}`}
                                >
                                    مشاهده پیشنهادات
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientProjects;