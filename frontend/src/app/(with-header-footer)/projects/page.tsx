'use client';
import { FaClock, FaRegCommentDots, FaDollarSign } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import { api } from "@/components/lib/api";
import PriceRangeSelector from "@/components/PriceRangeSelector";

interface Skill {
    id: number;
    name: string;
}

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    skills: Skill[];
    category: {
        id: number;
        name: string;
        parentCategory: null | unknown;
    };
    suggested: number;
    deadline: number;
    active: boolean;
    type: string;
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    createdDate: [number, number, number];
    endDate: [number, number, number];
    employerId: {
        id: number;
        email: string;
        role: string;
    };
}

interface ApiResponse {
    content: Project[];
    pageable: unknown;
    last: boolean;
    totalPages: number;
    totalElements: number;
}

// تابع برای تبدیل تاریخ آرایه‌ای به رشته فارسی
const formatDate = (date: [number, number, number]): string => {
    try {
        const [year, month, day] = date;
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(year, month - 1, day));
    } catch (error) {
        return "نامشخص";
    }
};

const Project = () => {
    const [category, setCategory] = useState<string>("");
    const [priceRange, setPriceRange] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // تابع دریافت پروژه‌ها
    const getProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<ApiResponse>("/app/getProjects", {
                params: {
                    category: category || undefined,
                    priceRange: priceRange || undefined,
                    sortBy: sortBy || undefined,
                    active: true, // فقط پروژه‌های فعال
                },
                withCredentials: true
            });
            setProjects(response.data.content);
            console.log("پروژه‌ها:", response.data);
        } catch (error) {
            console.error("خطا در دریافت پروژه‌ها:", error);
            setProjects([]);
            setError("خطا در بارگذاری پروژه‌ها. لطفاً دوباره تلاش کنید.");
        } finally {
            setLoading(false);
        }
    }, [category, priceRange, sortBy]);

    // دیبانس کردن درخواست‌ها
    const debouncedGetProjects = useCallback(debounce(getProjects, 500), [getProjects]);

    // بارگذاری اولیه پروژه‌ها
    useEffect(() => {
        getProjects();
    }, []);

    // به‌روزرسانی پروژه‌ها هنگام تغییر فیلترها
    useEffect(() => {
        debouncedGetProjects();
    }, [category, priceRange, sortBy, debouncedGetProjects]);

    // مدیریت تغییر محدوده قیمت
    const handlePriceRangeChange = (newPriceRange: string) => {
        setPriceRange(newPriceRange);
    };

    return (
        <div className="max-w-screen-lg mx-2 md:mx-auto p-6 rounded-2xl shadow-lg my-4 border bg-light-color1 text-light-color2 dark:bg-color1 dark:text-color2 border-color5">
            {/* فیلترها */}
            <div className="bg-light-color6 p-4 rounded-xl shadow-md mb-6 flex flex-col justify-between md:flex-row gap-4 flex-wrap border dark:bg-color6 dark:border-color5 border-light-color5">
                {/* دسته‌بندی */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full md:w-1/4 dark:bg-color5 dark:text-color2"
                >
                    <option value="">دسته‌بندی</option>
                    <option value="فریلنسر">فریلنسر</option>
                    <option value="کارفرما">کارفرما</option>
                </select>

                {/* محدوده قیمت */}
                <PriceRangeSelector onPriceRangeChange={handlePriceRangeChange} />

                {/* مرتب‌سازی */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full md:w-1/4 dark:bg-color5 dark:text-color2"
                >
                    <option value="">مرتب‌سازی بر اساس</option>
                    <option value="createdDate,desc">جدیدترین</option>
                    <option value="createdDate,asc">قدیمی‌ترین</option>
                </select>
            </div>

            {/* نمایش وضعیت بارگذاری یا خطا */}
            {loading && <div className="text-center text-light-color3 dark:text-color3">در حال بارگذاری...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* نمایش پروژه‌ها */}
            {!loading && projects.length > 0 ? (
                projects
                    .filter((item: Project) => item.active === true)
                    .map((item: Project, index: number) => (
                        <div
                            key={item.id || index}
                            className="flex flex-col md:flex-row gap-6 justify-between border border-light-color6 dark:border-color5 rounded-2xl shadow-lg p-4 md:p-6 my-4"
                        >
                            <div className="flex-1">
                                <h1 className="font-primaryDemibold text-2xl mb-2 text-light-color4 dark:text-color4">
                                    {item.subject || "بدون عنوان"}
                                </h1>
                                <p className="font-primaryMedium text-light-color3 dark:text-color3 leading-relaxed mb-4 text-justify">
                                    {item.description || "توضیحات در دسترس نیست"}
                                </p>
                                <ul className="flex flex-wrap gap-2 text-sm font-primaryMedium">
                                    {(item.skills || []).map((skill: Skill, skillIndex: number) => (
                                        <li
                                            key={skillIndex}
                                            className="px-3 py-1 dark:bg-color4 bg-light-color4 dark:text-color5 text-light-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300"
                                        >
                                            {skill.name || "نامشخص"}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-primaryMedium text-sm text-light-color3 dark:text-color3 mt-4">
                                    تاریخ ایجاد: {formatDate(item.createdDate)}
                                </p>
                                <p className="font-primaryMedium text-sm text-light-color3 dark:text-color3">
                                    تاریخ پایان: {formatDate(item.endDate)}
                                </p>
                            </div>

                            <div className="bg-light-color5 p-4 rounded-xl shadow-md flex flex-col items-start dark:bg-color5">
                                <ul className="font-primaryMedium text-light-color7 dark:text-color7 space-y-3">
                                    <li className="flex items-center gap-2">
                                        <FaClock className="dark:text-color4 text-light-color4" />
                                        {item.deadline || "نامشخص"} روز
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaRegCommentDots className="dark:text-color4 text-light-color4" />
                                        {item.suggested || 0} پیشنهاد
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaDollarSign className="dark:text-color4 text-light-color4" />
                                        از {item.priceStarted ? item.priceStarted.toLocaleString('fa-IR') : "نامشخص"} تا{" "}
                                        {item.priceEnded ? item.priceEnded.toLocaleString('fa-IR') : "نامشخص"} تومان
                                    </li>
                                </ul>
                                <button className="w-full mt-4 py-2 rounded-lg dark:bg-color4 dark:text-color5 font-primaryMedium text-md md:text-lg dark:hover:bg-color8 dark:hover:text-color1 hover:bg-light-color9 hover:text-light-color1 transition bg-light-color8 text-light-color5">
                                    <Link href={`/projects/${item.id}`}>
                                        مشاهده پروژه
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))
            ) : (
                !loading && <div className="text-center text-light-color3 dark:text-color3">پروژه‌ای موجود نیست</div>
            )}
        </div>
    );
};

export default Project;