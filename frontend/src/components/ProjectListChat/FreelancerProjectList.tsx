"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/components/lib/useAuth";
import { api } from "@/components/lib/api";
import ChatInterface from "@/components/ChatInterface";

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    deadline: number;
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    employerId?: { id: number };
}

interface Suggestion {
    id: number;
    projectId: Project;
    freelancerId: { id: number };
    status: string;
}

const FreelancerProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedChat, setSelectedChat] = useState<{ projectId: number; receiverId: number } | null>(null);
    const { userId } = useAuth();

    const getFreelancerProjects = useCallback(async () => {
        try {
            const response = await api.get(
                `/app/freelancer/${userId}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                    withCredentials: true,
                }
            );
            setError(null);
            console.log("FreelancerProjects response", response.data);
            return response.data || [];
        } catch (err) {
            console.error("Error fetching freelancer projects:", err);
            setError("خطا در دریافت پروژه‌های فریلنسر.");
            return [];
        }
    }, [userId]);

    const getFreelancerSuggestions = useCallback(async () => {
        try {
            const response = await api.get(
                `/app/freelancer/${userId}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                    withCredentials: true,
                }
            );
            setError(null);
            console.log("Freelancer suggestions response", response.data);
            return response.data || [];
        } catch (err) {
            console.error("Error fetching freelancer suggestions:", err);
            setError("خطا در دریافت پیشنهادهای فریلنسر.");
            return [];
        }
    }, [userId]);

    useEffect(() => {
        setIsLoading(true);
        if (userId) {
            Promise.all([getFreelancerProjects(), getFreelancerSuggestions()]).then(([projectsData, suggestionsData]) => {
                setProjects(projectsData);
                setSuggestions(suggestionsData);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
            setError("لطفاً وارد حساب کاربری شوید.");
        }
    }, [userId, getFreelancerProjects, getFreelancerSuggestions]);

    const handleOpenChat = (projectId: number, receiverId: number) => {
        setSelectedChat({ projectId, receiverId });
    };

    const handleBackToProjects = () => {
        setSelectedChat(null);
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
            </div>
        );
    }

    // If a chat is selected, show the chat interface
    if (selectedChat) {
        return (
            <div>
                <button
                    onClick={handleBackToProjects}
                    className="mb-4 flex items-center text-light-color4 dark:text-color4 hover:text-light-color8 dark:hover:text-color8 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    بازگشت به لیست پروژه‌ها
                </button>
                <ChatInterface
                    projectId={selectedChat.projectId}
                    receiverId={selectedChat.receiverId}
                />
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

            {/* پیشنهادهای ارسال شده */}
            {suggestions && suggestions.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-primaryMedium text-md text-light-color2 dark:text-color2 mb-3">
                        پیشنهادهای ارسال شده
                    </h4>
                    <div className="space-y-4">
                        {suggestions.map((suggestion) => (
                            <div
                                key={suggestion.id}
                                className="bg-light-color1 dark:bg-color1 p-4 rounded-xl"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-primaryMedium text-light-color2 dark:text-color2">
                                        {suggestion.projectId.subject}
                                    </h4>
                                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 px-2 py-1 rounded-md text-xs">
                                        {suggestion.status === "PENDING" ? "در انتظار" :
                                            suggestion.status === "ACCEPTED" ? "پذیرفته شده" :
                                                suggestion.status === "REJECTED" ? "رد شده" : suggestion.status}
                                    </span>
                                </div>
                                <p className="text-sm text-light-color7 dark:text-color7 mb-3">
                                    {suggestion.projectId.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-light-color4 dark:text-color4 text-sm">
                                        {suggestion.projectId.priceStarted} - {suggestion.projectId.priceEnded} تومان
                                    </span>

                                    {suggestion.status === "ACCEPTED" && (
                                        <button
                                            onClick={() => handleOpenChat(suggestion.projectId.id, suggestion.projectId.employerId?.id || 0)}
                                            className="bg-light-color4 dark:bg-color4 text-white px-3 py-1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors text-sm flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            گفتگو
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* پروژه‌های فعال */}
            <h4 className="font-primaryMedium text-md text-light-color2 dark:text-color2 mb-3">
                پروژه‌های فعال
            </h4>
            {projects.length === 0 ? (
                <p className="text-center text-light-color7 dark:text-color7">
                    هیچ پروژه‌ای یافت نشد.
                </p>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-light-color1 dark:bg-color1 p-4 rounded-xl"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-primaryMedium text-light-color2 dark:text-color2">
                                    {project.subject}
                                </h4>
                                <span className={`px-2 py-1 rounded-md text-xs 
                                    ${project.status === "OPEN" ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" :
                                    project.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100" :
                                        project.status === "COMPLETED" ? "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100" :
                                            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"}`}>
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
                            <p className="text-sm text-light-color7 dark:text-color7 mb-3">
                                {project.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-light-color4 dark:text-color4 text-sm">
                                    {project.priceStarted} - {project.priceEnded} تومان
                                </span>

                                {(project.status === "IN_PROGRESS" || project.status === "COMPLETED") && (
                                    <button
                                        onClick={() => handleOpenChat(project.id, project.employerId?.id || 0)}
                                        className="bg-light-color4 dark:bg-color4 text-white px-3 py-1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors text-sm flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        گفتگو
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FreelancerProjects;