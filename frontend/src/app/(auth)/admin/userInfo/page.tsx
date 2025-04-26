"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import API from "@/components/utils/api";

// تعریف تایپ‌ها
interface Profile {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profileImageUrl?: string;
    address?: string;
    placeOfStudy?: string;
}

interface User {
    id: number;
    email: string;
    role: "FREELANCER" | "EMPLOYER";
    rating?: number;
    ratingCount?: number;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    profile?: Profile | null;
}

export default function UserInfo() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterRole, setFilterRole] = useState<"all" | "FREELANCER" | "EMPLOYER">("all");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = Cookies.get("adminToken");
                console.log("Token:", token);

                if (!token) {
                    throw new Error("توکن احراز هویت یافت نشد. لطفاً دوباره وارد شوید.");
                }

                const usersResponse = await fetch(`${API}/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!usersResponse.ok) {
                    if (usersResponse.status === 401) {
                        throw new Error("عدم دسترسی: توکن نامعتبر است.");
                    }
                    throw new Error(`خطا در دریافت لیست کاربران: ${usersResponse.statusText}`);
                }

                const usersData: User[] = await usersResponse.json();

                const usersWithProfile = await Promise.all(
                    usersData.map(async (user: User) => {
                        try {
                            const profileResponse = await fetch(`${API}/api/profileByUserId/${user.id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                            });

                            if (profileResponse.ok) {
                                const profileData: Profile = await profileResponse.json();
                                return { ...user, profile: profileData };
                            } else {
                                return { ...user, profile: null };
                            }
                        } catch (profileError) {
                            console.error(`خطا در دریافت پروفایل کاربر ${user.id}:`, profileError);
                            return { ...user, profile: null };
                        }
                    })
                );

                setUsers(usersWithProfile);
                setLoading(false);
            } catch (error: any) {
                console.error("خطا در دریافت داده‌ها:", error);
                setError(error.message || "خطا در دریافت اطلاعات کاربران. لطفاً دوباره تلاش کنید.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.profile?.firstName &&
                user.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.profile?.lastName &&
                user.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRole = filterRole === "all" || user.role === filterRole;

        return matchesSearch && matchesRole;
    });

    return (
        <div className="rtl">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
            )}
            {/* Filters and search */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="relative">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
                    <input
                        type="text"
                        className="w-full py-2 pr-10 text-sm bg-white dark:bg-color6 border border-light-color6 dark:border-color5 text-color5 dark:text-color3 rounded-md focus:outline-none focus:ring-2 focus:ring-color4"
                        placeholder="جستجو بر اساس نام یا ایمیل..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="w-full py-2 pr-4 text-sm bg-white dark:bg-color6 border border-light-color6 dark:border-color5 text-color5 dark:text-color3 rounded-md focus:outline-none focus:ring-2 focus:ring-color4"
                        value={filterRole}
                        onChange={(e) =>
                            setFilterRole(e.target.value as "all" | "FREELANCER" | "EMPLOYER")
                        }
                    >
                        <option value="all">همه کاربران</option>
                        <option value="FREELANCER">فریلنسر</option>
                        <option value="EMPLOYER">کارفرما</option>
                    </select>
                </div>
                <div className="text-left">
                    <button className="bg-color4 hover:bg-color8 text-color1 font-primaryMedium py-2 px-4 rounded">
                        دانلود گزارش
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color4"></div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Users list */}
                    <div className="lg:w-1/2">
                        <div className="bg-white dark:bg-color5 shadow overflow-hidden rounded-lg">
                            <div className="px-4 py-5 sm:px-6 border-b border-light-color6 dark:border-color6">
                                <h3 className="text-lg font-primaryBold text-color5 dark:text-color2">
                                    لیست کاربران ({filteredUsers.length})
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-light-color6 dark:divide-color6">
                                    <thead className="bg-light-color5 dark:bg-color6">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-primaryMedium text-light-color7 dark:text-color7 uppercase tracking-wider"
                                        >
                                            نام
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-primaryMedium text-light-color7 dark:text-color7 uppercase tracking-wider"
                                        >
                                            ایمیل
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-primaryMedium text-light-color7 dark:text-color7 uppercase tracking-wider"
                                        >
                                            نقش
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-primaryMedium text-light-color7 dark:text-color7 uppercase tracking-wider"
                                        >
                                            امتیاز
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-primaryMedium text-light-color7 dark:text-color7 uppercase tracking-wider"
                                        >
                                            وضعیت
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-color5 divide-y divide-light-color6 dark:divide-color6">
                                    {filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className={`hover:bg-light-color5 dark:hover:bg-color6 cursor-pointer ${
                                                selectedUser?.id === user.id ? "bg-light-color5 dark:bg-color6" : ""
                                            }`}
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={user.profile?.profileImageUrl || "/api/placeholder/40/40"}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="mr-4 text-sm font-primaryMedium text-color5 dark:text-color2">
                                                        {user.profile
                                                            ? `${user.profile.firstName} ${user.profile.lastName}`
                                                            : "پروفایل ناقص"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-color5 dark:text-color3">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                          <span
                              className={`px-2 inline-flex text-xs leading-5 font-primaryMedium rounded-full ${
                                  user.role === "FREELANCER"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              }`}
                          >
                            {user.role === "FREELANCER" ? "فریلنسر" : "کارفرما"}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-color5 dark:text-color3">
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 text-yellow-400 ml-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {user.rating || "بدون امتیاز"} ({user.ratingCount || 0})
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-color5 dark:text-color3">
                          <span
                              className={`px-2 inline-flex text-xs leading-5 font-primaryMedium rounded-full ${
                                  user.status === "APPROVED"
                                      ? "bg-green-100 text-green-800"
                                      : user.status === "REJECTED"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {user.status === "APPROVED"
                                ? "تأیید شده"
                                : user.status === "REJECTED"
                                    ? "رد شده"
                                    : "در انتظار"}
                          </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* User details */}
                    <div className="lg:w-1/2">
                        {selectedUser ? (
                            <div className="bg-white dark:bg-color5 shadow overflow-hidden rounded-lg">
                                <div className="px-4 py-5 sm:px-6 border-b border-light-color6 dark:border-color6">
                                    <h3 className="text-lg font-primaryBold text-color5 dark:text-color2">
                                        اطلاعات پروفایل
                                    </h3>
                                </div>
                                <div className="px-4 py-5">
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="w-24 h-24 mb-3">
                                            <img
                                                src={selectedUser.profile?.profileImageUrl || "/api/placeholder/96/96"}
                                                className="w-24 h-24 rounded-full object-cover border-4 border-light-color6 dark:border-color6"
                                                alt="Profile"
                                            />
                                        </div>
                                        <h2 className="text-xl font-primaryBold text-color5 dark:text-color2">
                                            {selectedUser.profile
                                                ? `${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`
                                                : "پروفایل ناقص"}
                                        </h2>
                                        <p className="text-color7 dark:text-color7">{selectedUser.email}</p>
                                        <div className="mt-2">
                      <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-primaryMedium rounded-full ${
                              selectedUser.role === "FREELANCER"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          }`}
                      >
                        {selectedUser.role === "FREELANCER" ? "فریلنسر" : "کارفرما"}
                      </span>
                                        </div>
                                        <div className="mt-2">
                      <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-primaryMedium rounded-full ${
                              selectedUser.status === "APPROVED"
                                  ? "bg-green-100 text-green-800"
                                  : selectedUser.status === "REJECTED"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {selectedUser.status === "APPROVED"
                            ? "تأیید شده"
                            : selectedUser.status === "REJECTED"
                                ? "رد شده"
                                : "در انتظار"}
                      </span>
                                        </div>
                                    </div>

                                    {selectedUser.profile ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-light-color5 dark:bg-color6 p-3 rounded-lg">
                                                    <p className="text-sm text-light-color7 dark:text-color7">شماره تماس</p>
                                                    <p className="font-primaryMedium text-color5 dark:text-color2">
                                                        {selectedUser.profile.phoneNumber || "ثبت نشده"}
                                                    </p>
                                                </div>
                                                <div className="bg-light-color5 dark:bg-color6 p-3 rounded-lg">
                                                    <p className="text-sm text-light-color7 dark:text-color7">آدرس</p>
                                                    <p className="font-primaryMedium text-color5 dark:text-color2">
                                                        {selectedUser.profile.address || "ثبت نشده"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-light-color5 dark:bg-color6 p-3 rounded-lg">
                                                <p className="text-sm text-light-color7 dark:text-color7">محل تحصیل</p>
                                                <p className="font-primaryMedium text-color5 dark:text-color2">
                                                    {selectedUser.profile.placeOfStudy || "ثبت نشده"}
                                                </p>
                                            </div>

                                            <div className="bg-light-color5 dark:bg-color6 p-3 rounded-lg">
                                                <p className="text-sm text-light-color7 dark:text-color7">امتیازات</p>
                                                <div className="flex items-center">
                                                    <div className="flex items-center mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-5 h-5 ${
                                                                    i < Math.floor(selectedUser.rating || 0)
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="mr-2 font-primaryMedium text-color5 dark:text-color2">
                            {selectedUser.rating || "بدون امتیاز"} ({selectedUser.ratingCount || 0} نظر)
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg
                                                        className="h-5 w-5 text-yellow-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="mr-3">
                                                    <h3 className="text-sm font-primaryMedium text-yellow-800 dark:text-yellow-200">
                                                        اطلاعات پروفایل تکمیل نشده است
                                                    </h3>
                                                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                                        <p>این کاربر هنوز اطلاعات پروفایل خود را تکمیل نکرده است.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-color5 shadow rounded-lg flex items-center justify-center h-64">
                                <div className="text-center p-5">
                                    <svg
                                        className="mx-auto h-12 w-12 text-color7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-primaryMedium text-color5 dark:text-color2">
                                        کاربری انتخاب نشده است
                                    </h3>
                                    <p className="mt-1 text-sm text-color7">
                                        برای مشاهده جزئیات، یک کاربر را از لیست انتخاب کنید.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}