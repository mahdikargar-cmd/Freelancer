import React, {useState, useEffect} from "react";
import {Check, X, ChevronLeft, ChevronRight, AlertCircle, Clock, ArrowUpDown, Filter, FileText} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import {useAdminAuth} from "@/components/lib/useAdminAuth";

// Interfaces (as defined above)
interface File {
    id: number;
    name: string;
    url: string;
}

interface Skill {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    parentCategory?: Category | null;
}

interface User {
    id: number;
    username: string;
    email?: string;
}

interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    skills: Skill[];
    category?: Category | null;
    suggested: number;
    deadline: number;
    active: boolean;
    type: string;
    suggestions: string[];
    createdDate: string;
    endDate?: string | null;
    status: "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    employerId: User;
    files?: File[];
}

interface ProjectsResponse {
    content: Project[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

const ProjectCheckOut = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filterActive, setFilterActive] = useState("all");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false); // New state for details modal
    const router = useRouter();
    const {userId, isLoggedIn, isLoading: authLoading} = useAdminAuth();

    // Axios setup (unchanged)
    const api = axios.create({
        baseURL: "http://localhost:8080/app",
        headers: {
            "Content-Type": "application/json",
        },
    });

    api.interceptors.request.use((config) => {
        const token = Cookies.get("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        if (authLoading) return;

        if (!isLoggedIn) {
            toast.error("لطفاً ابتدا وارد پنل ادمین شوید", {position: "bottom-right", rtl: true});
            router.push("/adminlog");
            return;
        }

        console.log("Admin ID:", userId);
        fetchProjects();
    }, [currentPage, sortField, sortDirection, filterActive, isLoggedIn, authLoading, router, userId]);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: currentPage,
                size: 6,
                sort: `${sortField},${sortDirection}`,
                ...(filterActive !== "all" && {active: filterActive === "active"}),
            };

            const response = await api.get<ProjectsResponse>("/getProjects", {params});

            setProjects(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
        } catch (err: any) {
            let errorMessage = "خطا در دریافت پروژه‌ها";
            if (err.response) {
                if (err.response.status === 401) {
                    errorMessage = "لطفاً دوباره وارد شوید";
                    Cookies.remove("adminToken");
                    router.push("/adminlog");
                } else {
                    errorMessage = err.response.data?.message || err.message;
                }
            } else {
                errorMessage = err.message || "خطا در ارتباط با سرور";
            }
            setError(errorMessage);
            toast.error(errorMessage, {position: "bottom-right", rtl: true});
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveProject = async (project: Project) => {
        try {
            await api.put(`/updateProjectStatus/${project.id}`, { active: true });
            setProjects(projects.map((p) => (p.id === project.id ? { ...p, active: true, status: "OPEN" } : p)));
            setShowConfirmModal(false);
            toast.success("پروژه با موفقیت تأیید شد", { position: "bottom-right", rtl: true });
        } catch (err: any) {
            let errorMessage = "خطا در تأیید پروژه";
            if (err.response) {
                errorMessage = err.response.data?.message || err.response.data || err.message;
            }
            toast.error(errorMessage, { position: "bottom-right", rtl: true });
            console.error("Error approving project:", err);
        }
    };

    const handleRejectProject = async (project: Project) => {
        try {
            await api.put(`/updateProjectStatus/${project.id}`, {active: false});
            setProjects(projects.map((p) => (p.id === project.id ? {...p, active: false,status:"PENDING"} : p)));
            setShowConfirmModal(false);
            toast.warn("پروژه رد شد", {position: "bottom-right", rtl: true});
        } catch (err: any) {
            let errorMessage = "خطا در رد پروژه";
            if (err.response) {
                errorMessage = err.response.data?.message || err.message;
            }
            toast.error(errorMessage, {position: "bottom-right", rtl: true});
        }
    };

    const confirmAction = () => {
        if (actionType === "approve" && selectedProject) {
            handleApproveProject(selectedProject);
        } else if (actionType === "reject" && selectedProject) {
            handleRejectProject(selectedProject);
        }
    };

    const openConfirmModal = (project: Project, action: "approve" | "reject") => {
        setSelectedProject(project);
        setActionType(action);
        setShowConfirmModal(true);
    };

    // New function to open details modal
    const openDetailsModal = (project: Project) => {
        setSelectedProject(project);
        setShowDetailsModal(true);
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("fa-IR");
    };

    const formatNumber = (number: number) => {
        return number.toLocaleString("fa-IR");
    };

    // Existing EmptyState, LoadingState, ConfirmModal, renderPagination (unchanged)
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-color5 p-6 rounded-xl">
                <AlertCircle size={60} className="mx-auto mb-4 text-color7"/>
                <h3 className="text-xl font-primaryBold mb-2">پروژه‌ای برای بررسی یافت نشد</h3>
                <p className="text-color7 mb-6">
                    در حال حاضر پروژه‌ای برای بررسی وجود ندارد یا فیلتر انتخابی شما نتیجه‌ای ندارد.
                </p>
                <button
                    onClick={() => {
                        setFilterActive("all");
                        setCurrentPage(0);
                    }}
                    className="bg-color4 hover:bg-color8 text-color1 font-primaryMedium py-2 px-4 rounded-lg transition-colors"
                >
                    نمایش همه پروژه‌ها
                </button>
            </div>
        </div>
    );

    const LoadingState = () => (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color4"></div>
        </div>
    );

    const ConfirmModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                className="bg-color5 rounded-xl p-6 max-w-md w-full mx-4"
            >
                <h3 className="text-xl font-primaryBold mb-4">
                    {actionType === "approve" ? "تأیید پروژه" : "رد پروژه"}
                </h3>
                <p className="text-color7 mb-6">
                    {actionType === "approve"
                        ? "آیا از تأیید این پروژه اطمینان دارید؟ پس از تأیید، پروژه برای کاربران قابل مشاهده خواهد بود."
                        : "آیا از رد این پروژه اطمینان دارید؟ پس از رد، پروژه برای کاربران قابل مشاهده نخواهد بود."}
                </p>
                <div className="flex justify-end space-x-3 space-x-reverse">
                    <button
                        onClick={() => setShowConfirmModal(false)}
                        className="py-2 px-4 rounded-lg text-color7 hover:bg-color6 transition-colors"
                    >
                        انصراف
                    </button>
                    <button
                        onClick={confirmAction}
                        className={`py-2 px-4 rounded-lg font-primaryMedium transition-colors ${
                            actionType === "approve"
                                ? "bg-color4 hover:bg-color8 text-color1"
                                : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                    >
                        {actionType === "approve" ? "تأیید" : "رد"}
                    </button>
                </div>
            </motion.div>
        </div>
    );

    // New Details Modal Component
    const DetailsModal = () => (
        <AnimatePresence>
            {showDetailsModal && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.9, opacity: 0}}
                        className="bg-color5 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                    >
                        <h3 className="text-2xl font-primaryBold mb-4">جزئیات پروژه</h3>
                        <div className="space-y-4 text-sm">
                            {/* Project Info */}
                            <div>
                                <h4 className="font-primaryMedium text-color2 mb-2">اطلاعات پروژه</h4>
                                <div className="grid grid-cols-2 gap-4 bg-color6 p-4 rounded-lg">
                                    <div>
                                        <span className="text-color7">شناسه:</span>
                                        <p>{selectedProject.id}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">عنوان:</span>
                                        <p>{selectedProject.subject}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">دسته‌بندی:</span>
                                        <p>{selectedProject.category?.name || "بدون دسته‌بندی"}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">نوع پروژه:</span>
                                        <p>{selectedProject.type}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">وضعیت پروژه:</span>
                                        <p>{selectedProject.status}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">فعال:</span>
                                        <p>{selectedProject.active ? "تأیید شده" : "در انتظار تأیید"}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Price and Deadline */}
                            <div>
                                <h4 className="font-primaryMedium text-color2 mb-2">مالی و زمانی</h4>
                                <div className="grid grid-cols-2 gap-4 bg-color6 p-4 rounded-lg">
                                    <div>
                                        <span className="text-color7">محدوده قیمت:</span>
                                        <p>
                                            {formatNumber(selectedProject.priceStarted)} -{" "}
                                            {formatNumber(selectedProject.priceEnded)} تومان
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-color7">مهلت:</span>
                                        <p>{selectedProject.deadline} روز</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">تاریخ ایجاد:</span>
                                        <p>{formatDate(selectedProject.createdDate)}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">تاریخ پایان:</span>
                                        <p>{selectedProject.endDate ? formatDate(selectedProject.endDate) : "-"}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">تعداد پیشنهاد:</span>
                                        <p>{formatNumber(selectedProject.suggested)}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            <div>
                                <h4 className="font-primaryMedium text-color2 mb-2">توضیحات</h4>
                                <div className="bg-color6 p-4 rounded-lg">
                                    <p className="text-color2">{selectedProject.description}</p>
                                </div>
                            </div>
                            {/* Skills */}
                            <div>
                                <h4 className="font-primaryMedium text-color2 mb-2">مهارت‌ها</h4>
                                <div className="bg-color6 p-4 rounded-lg">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.skills?.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="bg-color5 text-color2 text-xs px-2 py-1 rounded-full"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                        {!selectedProject.skills?.length && (
                                            <span className="text-color7">بدون مهارت</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Suggestions */}
                            <div>
                                <h4 className="font-primaryMedium text-color2 mb-2">پیشنهادات</h4>
                                <div className="bg-color6 p-4 rounded-lg">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.suggestions?.map((suggestion, index) => (
                                            <span
                                                key={index}
                                                className="bg-color5 text-color2 text-xs px-2 py-1 rounded-full"
                                            >
                                                {suggestion}
                                            </span>
                                        ))}
                                        {!selectedProject.suggestions?.length && (
                                            <span className="text-color7">بدون پیشنهاد</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Employer Info */}
                            <div>
                                <h4 className="font-primaryMedium text-color2 mb-2">اطلاعات کارفرما</h4>
                                <div className="grid grid-cols-2 gap-4 bg-color6 p-4 rounded-lg">
                                    <div>
                                        <span className="text-color7">نام کاربری:</span>
                                        <p>{selectedProject.employerId?.username || "نامشخص"}</p>
                                    </div>
                                    <div>
                                        <span className="text-color7">ایمیل:</span>
                                        <p>{selectedProject.employerId?.email || "نامشخص"}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Files */}
                            <div>
                                <h4 className="font-primaryMedium text-color2 mb-2">فایل‌ها</h4>
                                <div className="bg-color6 p-4 rounded-lg">
                                    {selectedProject.files?.length ? (
                                        <ul className="space-y-2">
                                            {selectedProject.files.map((file) => (
                                                <li key={file.id}>
                                                    <a
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-color4 hover:underline"
                                                    >
                                                        <FileText size={16} className="ml-2"/>
                                                        {file.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-color7">فایلی بارگذاری نشده است</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Modal Actions */}
                        <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="py-2 px-4 rounded-lg text-color7 hover:bg-color6 transition-colors"
                            >
                                بستن
                            </button>
                            {!selectedProject.active && (
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        openConfirmModal(selectedProject, "approve");
                                    }}
                                    className="py-2 px-4 bg-color4 hover:bg-color8 text-color1 rounded-lg transition-colors"
                                >
                                    تأیید
                                </button>
                            )}
                            {selectedProject.active && (
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        openConfirmModal(selectedProject, "reject");
                                    }}
                                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                >
                                    رد
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="bg-color1 rounded-xl">
            <div className="bg-color5 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-primaryBold">بررسی پروژه‌ها</h2>
                    <div className="flex space-x-3 space-x-reverse">
                        <div className="bg-color6 rounded-lg flex items-center p-2">
                            <Filter size={18} className="text-color7 ml-2"/>
                            <select
                                value={filterActive}
                                onChange={(e) => {
                                    setFilterActive(e.target.value);
                                    setCurrentPage(0);
                                }}
                                className="bg-transparent text-color2 focus:outline-none"
                            >
                                <option value="all">همه</option>
                                <option value="active">تأیید شده</option>
                                <option value="inactive">تأیید نشده</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 bg-color6 rounded-lg mb-3 font-primaryBold text-sm">
                    <div className="col-span-1">#</div>
                    <div
                        className="col-span-3 flex items-center cursor-pointer"
                        onClick={() => handleSort("subject")}
                    >
                        عنوان
                        <ArrowUpDown size={16} className="mr-1 text-color7"/>
                    </div>
                    <div className="col-span-2">دسته‌بندی</div>
                    <div
                        className="col-span-2 flex items-center cursor-pointer"
                        onClick={() => handleSort("createdDate")}
                    >
                        تاریخ ایجاد
                        <ArrowUpDown size={16} className="mr-1 text-color7"/>
                    </div>
                    <div className="col-span-2">وضعیت</div>
                    <div className="col-span-2 text-center">عملیات</div>
                </div>
                {loading && <LoadingState/>}
                {error && (
                    <div className="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg text-center">
                        <p>{error}</p>
                        <button
                            onClick={() =>
                                error.includes("وارد شوید") ? router.push("/adminlog") : fetchProjects()
                            }
                            className="mt-2 bg-color4 hover:bg-color8 text-color1 font-primaryMedium py-2 px-4 rounded-lg"
                        >
                            {error.includes("وارد شوید") ? "ورود" : "تلاش مجدد"}
                        </button>
                    </div>
                )}
                {!loading && !error && projects.length === 0 && <EmptyState/>}
                {!loading && !error && projects.length > 0 && (
                    <div className="space-y-3">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                className="bg-color5 border border-color6 rounded-lg p-4 hover:border-color4 transition-colors cursor-pointer"
                                onClick={() => openDetailsModal(project)} // Click row/card to open modal
                            >
                                <div className="hidden md:grid grid-cols-12 gap-4 items-center text-sm">
                                    <div className="col-span-1 font-primaryBold">{project.id}</div>
                                    <div className="col-span-3 font-primaryMedium truncate">{project.subject}</div>
                                    <div className="col-span-2 text-color7">
                                        {project.category?.name || "بدون دسته‌بندی"}
                                    </div>
                                    <div className="col-span-2 flex items-center text-color7">
                                        <Clock size={16} className="ml-2"/>
                                        {formatDate(project.createdDate)}
                                    </div>
                                    <div className="col-span-2">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-primaryMedium ${
                                                project.active
                                                    ? "bg-green-500 bg-opacity-20 text-green-500"
                                                    : "bg-yellow-500 bg-opacity-20 text-yellow-500"
                                            }`}
                                        >
                                            {project.active ? "تأیید شده" : "در انتظار تأیید"}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex justify-center space-x-2 space-x-reverse">
                                        {!project.active && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent modal from opening
                                                    openConfirmModal(project, "approve");
                                                }}
                                                className="p-2 bg-color4 hover:bg-color8 text-color1 rounded-lg transition-colors"
                                                title="تأیید پروژه"
                                            >
                                                <Check size={18}/>
                                            </button>
                                        )}
                                        {project.active && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent modal from opening
                                                    openConfirmModal(project, "reject");
                                                }}
                                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                title="رد پروژه"
                                            >
                                                <X size={18}/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="md:hidden space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-primaryMedium truncate">{project.subject}</h3>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-primaryMedium ${
                                                project.active
                                                    ? "bg-green-500 bg-opacity-20 text-green-500"
                                                    : "bg-yellow-500 bg-opacity-20 text-yellow-500"
                                            }`}
                                        >
                                            {project.active ? "تأیید شده" : "در انتظار تأیید"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-color7">
                                            {project.category?.name || "بدون دسته‌بندی"}
                                        </span>
                                        <span className="flex items-center text-color7">
                                            <Clock size={14} className="ml-1"/>
                                            {formatDate(project.createdDate)}
                                        </span>
                                    </div>
                                    <div className="flex justify-end space-x-2 space-x-reverse pt-2">
                                        {!project.active && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openConfirmModal(project, "approve");
                                                }}
                                                className="py-1.5 px-3 bg-color4 hover:bg-color8 text-color1 rounded-lg transition-colors text-sm flex items-center"
                                            >
                                                <Check size={16} className="ml-1"/>
                                                تأیید
                                            </button>
                                        )}
                                        {project.active && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openConfirmModal(project, "reject");
                                                }}
                                                className="py-1.5 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm flex items-center"
                                            >
                                                <X size={16} className="ml-1"/>
                                                رد
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                {!loading && !error && totalPages > 0}
                {showConfirmModal && <ConfirmModal/>}
                <DetailsModal/>
            </div>
        </div>
    );
};

export default ProjectCheckOut;