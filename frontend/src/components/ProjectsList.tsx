'use client'

import React, { JSX, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FiClock, FiDollarSign, FiCalendar, FiFolder, FiAlertCircle, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { CategorySelect } from "./CategoryCustom";

interface Skill {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  parentCategory: Category | null;
}

interface Employer {
  id: number;
  email: string;
  password: string;
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
  type: "FIXED" | "HOURLY";
  suggestions: any[];
  createdDate: string;
  endDate: string;
  status: "OPEN" | "CLOSED";
  employerId: Employer;
}

const ProjectsList: React.FC = () => {
  const token = Cookies.get("token");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const fetchProjects = async (page: number) => {
    try {
      const res = await fetch(`/api/app/getProjects?page=${page}&size=10`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("مشکلی در دریافت پروژه‌ها پیش آمد.");
      }

      const data = await res.json();

      const newProjects: Project[] = data.content || [];

      setProjects(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const filteredNewProjects = newProjects.filter(p => !existingIds.has(p.id));
        return [...prev, ...filteredNewProjects];
      });
      setHasMore(!data.last); // اگه صفحه آخره، دیگه "بارگذاری بیشتر" نشون داده نشه
      setCurrentPage(data.number + 1); // افزایش شماره صفحه برای بعدی

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects(0); // بار اول صفحه 0
    fetchCategories(); // دسته‌بندی‌ها جداگانه
  }, []);
  
  const fetchCategories = async () => {
    try {
      const categoriesRes = await fetch("/api/app/getCategories", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!categoriesRes.ok) {
        throw new Error("مشکلی در دریافت دسته‌بندی‌ها پیش آمد.");
      }
  
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCategoriesLoading(false);
    }
  };
  

  const handleDelete = async (id: number) => {
    console.log('Attempting to delete project with ID:', id);
    console.log('Current token:', token);

    if (!window.confirm("آیا از حذف این پروژه مطمئن هستید؟")) return;

    try {
      const res = await fetch(`/api/app/deleteProject/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Delete response status:', res.status);

      // اگر وضعیت پاسخ 204 باشد، نیازی به پارس کردن JSON نیست.
      let data = null;
      if (res.status !== 204) {
        data = await res.json();
        console.log('Delete response data:', data);
      }

      if (!res.ok) {
        throw new Error((data && data.message) || 'خطا در حذف پروژه');
      }

      setProjects(prev => prev.filter(item => item.id !== id));
      alert("پروژه با موفقیت حذف شد");
    } catch (err: any) {
      console.error('Error details:', err);
      alert(err.message || 'خطا در حذف پروژه');
    }
  };

  const getChildCategories = (parentId: number): Category[] => {
    return categories.filter(category =>
      category.parentCategory && category.parentCategory.id === parentId
    );
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null || project.category.id === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" ||
      project.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-color6 to-color5">
        <div className="bg-color5 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4">
          <FiAlertCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-primaryDemibold text-color3 mb-2">خطا در دریافت داده‌ها</h2>
          <p className="text-color7 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-color4 hover:bg-color9 text-white font-primaryMedium py-2 px-6 rounded-full transition-all"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }
  const renderCategoryOptions = (categories: Category[], level = 0): JSX.Element[] => {
    return categories.map((category: Category) => (
      <React.Fragment key={category.id}>
        <option
          value={category.id.toString()}
          className={`pr-${level * 4}`}
        >
          {'\u00A0'.repeat(level * 2)}{category.name}
        </option>
        {renderCategoryOptions(getChildCategories(category.id), level + 1)}
      </React.Fragment>
    ));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-color6 to-color5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-primaryDemibold text-color4 mb-6"
          >
            پروژه‌های موجود
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-color5 rounded-xl p-4 shadow-lg mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در پروژه‌ها..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-color2 border border-color3 rounded-lg py-3 px-4 pr-10 text-color6 focus:outline-none focus:ring-2 focus:ring-color4 font-primaryMedium"
                />
                <svg
                  className="absolute right-3 top-3.5 h-5 w-5 text-color7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="relative">
                {categoriesLoading ? (
                  <p className="text-sm text-gray-500 font-primaryMedium text-center">در حال بارگذاری دسته‌بندی‌ها...</p>
                ) : (
                  <CategorySelect
                    categories={categories}
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                  />
                )}
                <div className="absolute left-3 top-3.5 pointer-events-none">
                  <FiChevronDown className="text-color7" />
                </div>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-color2 font-primaryMedium border border-color3 rounded-lg py-3 px-4 text-color6 focus:outline-none focus:ring-2 focus:ring-color4"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="open">باز</option>
                <option value="closed">بسته</option>
              </select>
            </div>
          </motion.div>
        </div>
        {
          hasMore && loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-primaryMedium">
              در حال بارگذاری
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-color5 rounded-full mb-4">
                <FiAlertCircle className="text-color7 text-3xl" />
              </div>
              <h3 className="text-xl font-primaryMedium text-color4 mb-2">پروژه‌ای یافت نشد</h3>
              <p className="text-color7 font-primaryMedium">با تغییر فیلترها دوباره امتحان کنید</p>
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-color5 rounded-2xl p-6 shadow-lg border border-color3/10 hover:border-color4/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-primaryDemibold text-color4 line-clamp-2">
                      {project.subject}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-primaryDemibold ${project.status === "OPEN"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}>
                      {project.status === "OPEN" ? "باز" : "بسته"}
                    </span>
                  </div>

                  <p className="text-color7 mb-6 line-clamp-3 font-primaryMedium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 ">
                    {project.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-color4/10 text-color4 px-3 py-1 rounded-full text-xs font-primaryMedium"
                      >
                        {skill.name.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 text-sm font-primaryMedium">
                    <div className="flex items-center text-color7">
                      <FiDollarSign className="ml-2 text-color4" />
                      <span>بودجه: </span>
                      <span className="text-color4 mr-1">
                        {project.priceStarted.toLocaleString()} - {project.priceEnded.toLocaleString()} تومان
                      </span>
                    </div>

                    <div className="flex items-center text-color7 font-primaryMedium">
                      <FiClock className="ml-2 text-color4" />
                      <span>ددلاین: </span>
                      <span className="text-color4 mr-1">
                        {project.deadline} روز
                      </span>
                    </div>

                    <div className="flex items-center text-color7 font-primaryMedium">
                      <FiCalendar className="ml-2 text-color4" />
                      <span>تاریخ ایجاد: </span>
                      <span className="font-medium text-color4 mr-1">
                        {new Date(project.createdDate).toLocaleDateString('fa-IR')}
                      </span>
                    </div>

                    <div className="flex items-center text-color7 font-primaryMedium">
                      <FiFolder className="ml-2 text-color4" />
                      <span>دسته‌بندی: </span>
                      <span className="font-medium text-color4 mr-1">
                        {project.category?.parentCategory
                          ? `${project.category.parentCategory.name} / ${project.category.name}`
                          : project.category?.name}
                      </span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-gradient-to-r from-color4 to-color9 hover:from-color9 hover:to-color4 text-white font-primaryMedium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                    مشاهده جزئیات
                  </button>
                  <button
                    className="mt-6 w-full bg-red-500 text-white font-primaryMedium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => handleDelete(project.id)}
                  >
                    {project.id}
                    حذف پروژه
                  </button>
                </motion.div>
              ))}
            </div>
          )
        }

      </div >
    </div >
  );
};

export default ProjectsList;