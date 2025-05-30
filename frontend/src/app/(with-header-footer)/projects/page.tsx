'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { FaClock, FaRegCommentDots, FaDollarSign, FaTag, FaList, FaCheckCircle } from 'react-icons/fa';
import { api } from '@/components/lib/api';
import PriceRangeSelector from '@/components/PriceRangeSelector';

// ==== Interfaces ====

interface Skill {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    parentCategory: { id: number; name: string; parentCategory: null } | null;
}

interface Employer {
    id: number;
    email: string;
    role: string;
    password?: string;
    rating?: number | null;
    ratingCount?: number | null;
    phone?: string;
    createdAt?: string | null;
}

interface Suggestion {
    id: number;
    email: string;
    role: string;
    password?: string;
    rating?: number | null;
    ratingCount?: number | null;
    phone?: string;
    createdAt?: string | null;
}

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    skills: Skill[];
    category: Category;
    suggested: number;
    deadline: number;
    active: boolean;
    type: string;
    status: 'PENDING' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    createdDate: [number, number, number];
    endDate: [number, number, number];
    employerId: Employer;
    suggestions: Suggestion[];
}

interface ApiResponse {
    content: Project[];
    pageable: unknown;
    last: boolean;
    totalPages: number;
    totalElements: number;
}

// ==== Utility Functions ====

const formatDate = (date: [number, number, number]): string => {
    try {
        const [year, month, day] = date;
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(year, month - 1, day));
    } catch (error) {
        return 'نامشخص';
    }
};

const truncateDescription = (description: string, wordLimit: number = 20): string => {
    const words = description.split(/\s+/);
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(' ') + '...';
};

// ==== Component ====

const Project = () => {
    const [category, setCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<ApiResponse>('/pro/getProjects', {
                params: {
                    category: category || undefined,
                    priceRange: priceRange || undefined,
                    sortBy: sortBy || undefined,
                    active: true,
                },
                withCredentials: true,
            });
            setProjects(response.data.content);
        } catch (error) {
            console.error('خطا در دریافت پروژه‌ها:', error);
            setProjects([]);
            setError('خطا در بارگذاری پروژه‌ها. لطفاً دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
    }, [category, priceRange, sortBy]);

    const debouncedGetProjects = useCallback(debounce(getProjects, 500), [getProjects]);

    useEffect(() => {
        debouncedGetProjects();
        return () => debouncedGetProjects.cancel();
    }, [category, priceRange, sortBy, debouncedGetProjects]);

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

            {/* نمایش وضعیت */}
            {loading && <div className="text-center text-light-color3 dark:text-color3">در حال بارگذاری...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* لیست پروژه‌ها */}
            {!loading && projects.length > 0 ? (
                projects
                    .filter((item) => item.active)
                    .map((item, index) => (
                        <div
                            key={item.id || index}
                            className="flex flex-col md:flex-row gap-6 justify-between border border-light-color6 dark:border-color5 rounded-2xl shadow-lg p-4 md:p-6 my-4"
                        >
                            <div className="flex-1">
                                <h1 className="font-primaryDemibold text-2xl mb-2 text-light-color4 dark:text-color4">
                                    {item.subject || 'بدون عنوان'}
                                </h1>
                                <p className="font-primaryMedium text-light-color3 dark:text-color3 leading-relaxed mb-4 text-justify">
                                    {truncateDescription(item.description, 20)}{' '}
                                    <Link href={`/projects/${item.id}`} className="text-light-color4 dark:text-color4 hover:underline">
                                        ادامه
                                    </Link>
                                </p>
                                <div className="mb-4 space-y-1">
                                    <p className="font-primaryMedium text-sm flex items-center gap-2 text-light-color3 dark:text-color3">
                                        <FaTag className="text-light-color4 dark:text-color4" />
                                        دسته‌بندی: {item.category?.name || 'نامشخص'}{' '}
                                        {item.category?.parentCategory && `(${item.category.parentCategory.name})`}
                                    </p>
                                    <p className="font-primaryMedium text-sm flex items-center gap-2 text-light-color3 dark:text-color3">
                                        <FaList className="text-light-color4 dark:text-color4" />
                                        نوع پروژه: {item.type || 'نامشخص'}
                                    </p>
                                    <p className="font-primaryMedium text-sm flex items-center gap-2 text-light-color3 dark:text-color3">
                                        <FaCheckCircle className="text-light-color4 dark:text-color4" />
                                        وضعیت: {
                                        item.status === 'OPEN' ? 'باز' :
                                            item.status === 'PENDING' ? 'در انتظار' :
                                                item.status === 'IN_PROGRESS' ? 'در حال انجام' :
                                                    item.status === 'COMPLETED' ? 'تکمیل شده' : 'لغو شده'
                                    }
                                    </p>
                                </div>
                                <ul className="flex flex-wrap gap-2 text-sm font-primaryMedium mb-4">
                                    {item.skills.map((skill, i) => (
                                        <li key={i} className="px-3 py-1 dark:bg-color4 bg-light-color4 dark:text-color5 text-light-color5 rounded-lg cursor-pointer hover:translate-y-1 transition-transform duration-300">
                                            {skill.name || 'نامشخص'}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-primaryMedium text-sm text-light-color3 dark:text-color3">تاریخ ایجاد: {formatDate(item.createdDate)}</p>
                                <p className="font-primaryMedium text-sm text-light-color3 dark:text-color3">تاریخ پایان: {formatDate(item.endDate)}</p>
                            </div>

                            <div className="bg-light-color5 p-4 rounded-xl shadow-md flex flex-col items-start dark:bg-color5">
                                <ul className="font-primaryMedium text-light-color7 dark:text-color7 space-y-3">
                                    <li className="flex items-center gap-2"><FaClock className="dark:text-color4 text-light-color4" />{item.deadline || 'نامشخص'} روز</li>
                                    <li className="flex items-center gap-2"><FaRegCommentDots className="dark:text-color4 text-light-color4" />{item.suggested || 0} پیشنهاد</li>
                                    <li className="flex items-center gap-2"><FaDollarSign className="dark:text-color4 text-light-color4" />از {item.priceStarted?.toLocaleString('fa-IR') || 'نامشخص'} تا {item.priceEnded?.toLocaleString('fa-IR') || 'نامشخص'} تومان</li>
                                </ul>
                                <button className="w-full mt-4 py-2 rounded-lg dark:bg-color4 dark:text-color5 font-primaryMedium text-md md:text-lg dark:hover:bg-color8 dark:hover:text-color1 hover:bg-light-color9 hover:text-light-color1 transition bg-light-color8 text-light-color5">
                                    <Link href={`/projects/${item.id}`}>مشاهده پروژه</Link>
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
