"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/components/lib/useAuth";

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    deadline: number;
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

const FreelancerProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useAuth();

    const getFreelancerProjects = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/app/IdSuggest/${userId}`,
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

    useEffect(() => {
        setIsLoading(true);
        if (userId) {
            getFreelancerProjects().then((projects) => {
                setProjects(projects);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
            setError("لطفاً وارد حساب کاربری شوید.");
        }
    }, [userId, getFreelancerProjects]);

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
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FreelancerProjects;