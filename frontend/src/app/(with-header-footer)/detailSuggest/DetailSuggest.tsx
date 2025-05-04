import React, { useEffect, useState } from "react";
import { api } from "@/components/lib/api";
import Cookies from "js-cookie";
import { Proposal } from "@/types";

// تایپ برای props کامپوننت
interface DetailSuggestProps {
    id?: string;
    proposal?: Proposal;
}

// تایپ برای کلیدهای statusConfig
type StatusType = "PENDING" | "ACCEPTED" | "REJECTED" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

// کامپوننت اصلی
const DetailSuggest: React.FC<DetailSuggestProps> = ({ id, proposal }) => {
    const [fetchedProposal, setFetchedProposal] = useState<Proposal | null>(proposal || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"proposal" | "project">("proposal");

    useEffect(() => {
        if (!proposal && id) {
            const fetchProposal = async () => {
                try {
                    setIsLoading(true);
                    const response = await api.get(`/app/IdSuggest/${id}`, {
                        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                        withCredentials: true,
                    });
                    setFetchedProposal(response.data);
                    setError(null);
                } catch (err) {
                    console.error("Error fetching proposal:", err);
                    setError("خطا در دریافت جزئیات پیشنهاد. لطفاً دوباره تلاش کنید.");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchProposal();
        }
    }, [id, proposal]);

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<StatusType, { color: string; text: string }> = {
            PENDING: {
                color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                text: "در انتظار",
            },
            ACCEPTED: {
                color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                text: "پذیرفته شده",
            },
            REJECTED: {
                color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                text: "رد شده",
            },
            OPEN: {
                color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                text: "باز",
            },
            IN_PROGRESS: {
                color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                text: "در حال انجام",
            },
            COMPLETED: {
                color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                text: "تکمیل شده",
            },
            CANCELLED: {
                color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
                text: "لغو شده",
            },
        };

        const config = statusConfig[status as StatusType] || {
            color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
            text: status,
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-primaryMedium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "نامشخص";
        try {
            return new Date(dateString).toLocaleDateString("fa-IR");
        } catch (e) {
            return "نامشخص";
        }
    };

    const renderTabs = () => (
        <div className="flex mb-6 border-b border-light-color6 dark:border-color6">
            <button
                onClick={() => setActiveTab("proposal")}
                className={`px-4 py-3 font-primaryMedium text-sm ${
                    activeTab === "proposal"
                        ? "text-light-color4 dark:text-color4 border-b-2 border-light-color4 dark:border-color4"
                        : "text-light-color7 dark:text-color7"
                }`}
            >
                اطلاعات پیشنهاد
            </button>
            <button
                onClick={() => setActiveTab("project")}
                className={`px-4 py-3 font-primaryMedium text-sm ${
                    activeTab === "project"
                        ? "text-light-color4 dark:text-color4 border-b-2 border-light-color4 dark:border-color4"
                        : "text-light-color7 dark:text-color7"
                }`}
            >
                جزئیات پروژه
            </button>
        </div>
    );

    const renderProposalInfo = () => (
        <div className="bg-white dark:bg-color5 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-primaryMedium text-light-color2 dark:text-color2">اطلاعات اصلی پیشنهاد</h2>
                {getStatusBadge(fetchedProposal!.status || "PENDING")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="mb-4">
                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">عنوان پیشنهاد</p>
                        <p className="text-light-color2 dark:text-color2 font-primaryMedium">{fetchedProposal!.title || "بدون عنوان"}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">قیمت پیشنهادی</p>
                        <p className="text-light-color2 dark:text-color2 font-primaryMedium flex items-center">
                            <span className="bg-light-color5 dark:bg-color6 rounded-lg px-3 py-1 text-light-color4 dark:text-color4">
                                {fetchedProposal!.proposedBudget ? new Intl.NumberFormat("fa-IR").format(fetchedProposal!.proposedBudget) + " تومان" : "نامشخص"}
                            </span>
                        </p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">مدت زمان تخمینی</p>
                        <p className="text-light-color2 dark:text-color2">{fetchedProposal!.estimatedDuration ? `${fetchedProposal!.estimatedDuration} روز` : "نامشخص"}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">تاریخ ارسال</p>
                        <p className="text-light-color2 dark:text-color2">{formatDate(fetchedProposal!.submittedAt)}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">وضعیت اختصاص</p>
                        <div>
                            {fetchedProposal!.assigned ? (
                                <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                                    اختصاص داده شده
                                </span>
                            ) : (
                                <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                                    اختصاص داده نشده
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-light-color7 dark:text-color7 mb-1">توضیحات پیشنهاد</p>
                    <div className="bg-light-color5 dark:bg-color6 rounded-lg p-4 h-64 overflow-y-auto">
                        <p className="text-light-color2 dark:text-color2 whitespace-pre-wrap">{fetchedProposal!.content || "بدون توضیحات"}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProjectInfo = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-color5 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-primaryMedium text-light-color2 dark:text-color2">اطلاعات پروژه</h2>
                    {getStatusBadge(fetchedProposal!.projectId.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-4">
                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">موضوع پروژه</p>
                            <p className="text-light-color2 dark:text-color2 font-primaryMedium">{fetchedProposal!.projectId.subject}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">محدوده قیمت</p>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="bg-light-color5 dark:bg-color6 rounded-lg px-3 py-1 text-light-color2 dark:text-color2">
                                    {new Intl.NumberFormat("fa-IR").format(fetchedProposal!.projectId.priceStarted)} تومان
                                </span>
                                <span className="text-light-color7 dark:text-color7">تا</span>
                                <span className="bg-light-color5 dark:bg-color6 rounded-lg px-3 py-1 text-light-color2 dark:text-color2">
                                    {new Intl.NumberFormat("fa-IR").format(fetchedProposal!.projectId.priceEnded)} تومان
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <p className="text-sm text-light-color7 dark:text-color7 mb-1">مهلت انجام</p>
                                <p className="text-light-color2 dark:text-color2">{fetchedProposal!.projectId.deadline} روز</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-light-color7 dark:text-color7 mb-1">تعداد پیشنهادات</p>
                                <p className="text-light-color2 dark:text-color2">{fetchedProposal!.projectId.suggested}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-light-color7 dark:text-color7 mb-1">تاریخ ایجاد</p>
                                <p className="text-light-color2 dark:text-color2">{formatDate(fetchedProposal!.projectId.createdDate)}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-light-color7 dark:text-color7 mb-1">تاریخ پایان</p>
                                <p className="text-light-color2 dark:text-color2">{formatDate(fetchedProposal!.projectId.endDate)}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">نوع پروژه</p>
                            <p className="text-light-color2 dark:text-color2">{fetchedProposal!.projectId.type}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-light-color7 dark:text-color7 mb-1">وضعیت فعال بودن</p>
                            <div>
                                {fetchedProposal!.projectId.active ? (
                                    <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                                        فعال
                                    </span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                                        غیرفعال
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-light-color7 dark:text-color7 mb-1">توضیحات پروژه</p>
                        <div className="bg-light-color5 dark:bg-color6 rounded-lg p-4 h-64 overflow-y-auto">
                            <p className="text-light-color2 dark:text-color2 whitespace-pre-wrap">{fetchedProposal!.projectId.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-color5 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-primaryMedium text-light-color2 dark:text-color2 mb-4">دسته‌بندی پروژه</h2>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {fetchedProposal!.projectId.category?.parentCategory?.name && (
                        <>
                            <span className="bg-light-color5 dark:bg-color6 rounded-lg px-3 py-1 text-light-color3 dark:text-color3">
                                {fetchedProposal!.projectId.category.parentCategory.name}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-color7 dark:text-color7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </>
                    )}
                    {fetchedProposal!.projectId.category?.name ? (
                        <span className="bg-light-color5 dark:bg-color6 rounded-lg px-3 py-1 text-light-color2 dark:text-color2">
                            {fetchedProposal!.projectId.category.name}
                        </span>
                    ) : (
                        <span className="text-light-color7 dark:text-color7">بدون دسته‌بندی</span>
                    )}
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-color4 dark:border-color4"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl p-6 text-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                {error}
            </div>
        );
    }

    if (!fetchedProposal) {
        return (
            <div className="bg-light-color5 dark:bg-color5 rounded-2xl p-8 text-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-light-color7 dark:text-color7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-light-color7 dark:text-color7 text-lg font-primaryMedium">هیچ پیشنهادی یافت نشد.</p>
            </div>
        );
    }

    return (
        <div className="bg-light-color1 dark:bg-color1 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-light-color5 dark:bg-color5 border-b border-light-color6 dark:border-color6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-primaryMedium text-light-color2 dark:text-color2">جزئیات پیشنهاد</h1>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm text-light-color7 dark:text-color7">شناسه پیشنهاد:</span>
                        <span className="bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 px-3 py-1 rounded-lg text-sm">
                            {fetchedProposal.id}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {renderTabs()}
                <div className="mt-6">
                    {activeTab === "proposal" && renderProposalInfo()}
                    {activeTab === "project" && renderProjectInfo()}
                </div>
            </div>
        </div>
    );
};

export default DetailSuggest;