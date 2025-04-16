"use client";
import axios from "axios";
import { useAuth } from "@/components/lib/useAuth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface FreelancerProject {
    id: number;
    title: string;
    client: string;
    budget: string;
    deadline: string;
    status: string;
    progress: number;
}

const FreelancerProjectList = () => {
    const { userId } = useAuth();
    const [projects, setProjects] = useState<FreelancerProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("FreelancerProjectList mounted, userId:", userId);
        let isMounted = true;

        const getSuggest = async () => {
            console.log("getSuggest called, userId:", userId);
            if (!userId) {
                console.warn("No userId provided");
                if (isMounted) {
                    setError("شناسه کاربر یافت نشد");
                    setLoading(false);
                }
                return;
            }

            const token = Cookies.get("token");
            console.log("Token:", token ? token.substring(0, 20) + "..." : "No token");

            try {
                console.log("Sending request to /app/IdSuggest/", userId);
                const response = await axios.get(`http://localhost:8080/app/IdSuggest/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("getSuggest response:", response.data);

                const fetchedProjects: FreelancerProject[] = Array.isArray(response.data)
                    ? response.data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        client: item.projectId?.employerId?.email || "نامشخص",
                        budget: `${item.proposedBudget?.toLocaleString("fa-IR") || 0} تومان`,
                        deadline: `${item.estimatedDuration || 0} روز`,
                        status: mapStatus(item.status),
                        progress: calculateProgress(item.status, item.milestones),
                    }))
                    : response.data.id
                        ? [{
                            id: response.data.id,
                            title: response.data.title,
                            client: response.data.projectId?.employerId?.email || "نامشخص",
                            budget: `${response.data.proposedBudget?.toLocaleString("fa-IR") || 0} تومان`,
                            deadline: `${response.data.estimatedDuration || 0} روز`,
                            status: mapStatus(response.data.status),
                            progress: calculateProgress(response.data.status, response.data.milestones),
                        }]
                        : [];

                if (isMounted) {
                    setProjects(fetchedProjects);
                    setError(null);
                }
            } catch (err: any) {
                console.error("Error fetching suggestions:", err.response?.data || err.message);
                if (isMounted) {
                    setError("دریافت پروژه‌ها با خطا مواجه شد: " + (err.response?.data?.message || err.message));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        getSuggest();

        return () => {
            isMounted = false;
        };
    }, [userId]);
    const mapStatus = (status: string) => {
        switch (status) {
            case "PENDING":
                return "در انتظار تأیید";
            case "ACCEPTED":
                return "تکمیل شده";
            case "REJECTED":
                return "رد شده";
            default:
                return "نامشخص";
        }
    };

    const calculateProgress = (status: string, milestones: any[]) => {
        if (status === "ACCEPTED") return 100;
        if (status === "PENDING" && milestones?.length > 0) {
            const completedMilestones = milestones.filter((m) => m.status === "ACCEPTED").length;
            return Math.round((completedMilestones / milestones.length) * 100);
        }
        return 0;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "در انتظار تأیید":
                return "bg-blue-500";
            case "تکمیل شده":
                return "bg-green-600";
            case "رد شده":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    if (loading) {
        return (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-color4 dark:border-color4 mx-auto"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-8 text-center">
                <p className="text-light-color7 dark:text-color7">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2">
                                    {project.title}
                                </h3>
                                <p className="text-light-color7 dark:text-color7 text-sm">کارفرما: {project.client}</p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs text-light-color2 dark:text-color1 ${getStatusColor(project.status)}`}
                            >
                                {project.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                            <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                <p className="text-light-color7 dark:text-color7 text-xs mb-1">مبلغ قرارداد</p>
                                <p className="text-light-color4 dark:text-color4 font-primaryMedium">{project.budget}</p>
                            </div>
                            <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                <p className="text-light-color7 dark:text-color7 text-xs mb-1">مهلت</p>
                                <p className="text-light-color2 dark:text-color2">{project.deadline}</p>
                            </div>
                            <div className="bg-light-color1 dark:bg-color1 p-3 rounded-xl">
                                <p className="text-light-color7 dark:text-color7 text-xs mb-1">وضعیت</p>
                                <p className="text-light-color2 dark:text-color2">{project.status}</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <button className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors">
                                گفتگو
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-light-color7 dark:text-color7">هیچ پروژه‌ای یافت نشد.</p>
                </div>
            )}
        </div>
    );
};

export default FreelancerProjectList;