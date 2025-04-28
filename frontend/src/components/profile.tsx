'use client';
import React, { JSX, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaUniversity,
    FaCheckCircle,
    FaProjectDiagram,
    FaClipboardList,
    FaWallet,
    FaEnvelope,
    FaBell
} from 'react-icons/fa';
import Success from './Toast/success';
import ProfileLoadingSkeleton from './loading/lsF-P';
import API from "@/components/utils/api";
import { useAuth } from "@/components/lib/useAuth";

interface ProfileData {
    id: number | null;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImageUrl: string;
    address: string;
    placeOfStudy: string;
    user: { id: string | number | null };
    status?: string;
    message?: string;
    projectsPosted: number;
    activeProjects: number;
    completedProjects: number;
    unreadMessages: number;
    notifications: number;
}

type ProfileResponse = ProfileData & {
    error?: string;
    status?: string;
    message?: string;
};

const Profile = () => {
    const { userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profileExists, setProfileExists] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        id: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profileImageUrl: '',
        address: '',
        placeOfStudy: '',
        user: { id: null },
        projectsPosted: 0,
        activeProjects: 0,
        completedProjects: 0,
        unreadMessages: 0,
        notifications: 0,
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleShowToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const api = axios.create({
        baseURL: API,
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        const token = Cookies.get('token');
        console.log('🔍 Adding token to request:', token ? token.substring(0, 20) + '...' : 'No token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                console.log('🔍 Fetching profile for userId:', userId);
                const response: AxiosResponse<ProfileResponse> = await api.get('/api/getProfileInformation');
                console.log('🔍 Profile response:', response.data);

                if (response.data.status === 'new_user') {
                    setProfileExists(false);
                    setProfileData({ ...profileData, user: { id: userId } });
                } else if (!response.data.error) {
                    setProfileData({
                        id: response.data.id,
                        firstName: response.data.firstName || '',
                        lastName: response.data.lastName || '',
                        phoneNumber: response.data.phoneNumber || '',
                        profileImageUrl: response.data.profileImageUrl || '',
                        address: response.data.address || '',
                        placeOfStudy: response.data.placeOfStudy || '',
                        user: { id: response.data.user?.id || userId },
                        projectsPosted: response.data.projectsPosted || 0,
                        activeProjects: response.data.activeProjects || 0,
                        completedProjects: response.data.completedProjects || 0,
                        unreadMessages: response.data.unreadMessages || 0,
                        notifications: response.data.notifications || 0,
                    });
                    setProfileExists(true);
                }
            } catch (error: any) {
                console.error('❌ Error fetching profile:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    setError('لطفاً دوباره وارد شوید.');
                } else if (error.response?.status === 404) {
                    setProfileExists(false);
                    setProfileData({ ...profileData, user: { id: userId } });
                    setError(null);
                } else {
                    setError(error.response?.data?.error || 'خطا در بارگذاری اطلاعات پروفایل');
                }
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    const handleSaveProfile = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                handleShowToast('توکن یافت نشد');
                return;
            }

            const url = profileExists && profileData.id
                ? `/api/ProfileInformation/${profileData.id}`
                : `/api/createProfileInformation`;
            const method = profileExists && profileData.id ? 'put' : 'post';

            const response: AxiosResponse<ProfileData> = await api[method](url, {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                phoneNumber: profileData.phoneNumber,
                address: profileData.address,
                placeOfStudy: profileData.placeOfStudy,
                user: { id: userId }
            });

            setProfileData({
                ...profileData,
                id: response.data.id,
                firstName: response.data.firstName || profileData.firstName,
                lastName: response.data.lastName || profileData.lastName,
                phoneNumber: response.data.phoneNumber || profileData.phoneNumber,
                profileImageUrl: response.data.profileImageUrl || profileData.profileImageUrl,
                address: response.data.address || profileData.address,
                placeOfStudy: response.data.placeOfStudy || profileData.placeOfStudy,
            });

            setProfileExists(true);
            setIsEditing(false);
            handleShowToast(profileExists ? 'پروفایل به‌روزرسانی شد' : 'پروفایل با موفقیت ایجاد شد');
        } catch (error: any) {
            console.error('❌ Error saving profile:', error);
            if (error.response?.status === 409) {
                handleShowToast('پروفایل برای این کاربر قبلاً ثبت شده است. لطفاً اطلاعات موجود را ویرایش کنید.');
                setProfileExists(true);
                setIsEditing(true); // هدایت کاربر به حالت ویرایش
            } else {
                handleShowToast(`خطا: ${error.response?.data?.error || error.message}`);
            }
        }
    };

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profileImageUrl', file);

        try {
            const token = Cookies.get('token');
            if (!token) {
                handleShowToast('توکن احراز هویت یافت نشد');
                return;
            }

            if (!profileData.id && !profileExists) {
                handleShowToast('لطفاً ابتدا پروفایل خود را ذخیره کنید');
                return;
            }

            const url = `/api/${profileExists ? 'updateProfileImage' : 'uploadProfileImage'}/${profileData.id}`;
            const response = await api[profileExists ? 'put' : 'post'](url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data) {
                // Refetch profile to get updated image URL
                const profileResponse = await api.get('/api/getProfileInformation');
                setProfileData({
                    ...profileData,
                    profileImageUrl: profileResponse.data.profileImageUrl,
                });
                handleShowToast('تصویر پروفایل با موفقیت آپلود شد');
            }
        } catch (error: any) {
            console.error('❌ Error uploading image:', error);
            handleShowToast(`خطا در آپلود تصویر: ${error.response?.data?.error || error.message}`);
        }
    };

    if (loading) return <ProfileLoadingSkeleton />;
    if (error) {
        return (
            <div className="text-white max-w-screen-xl mx-auto my-8 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const fields: { icon: JSX.Element; placeholder: string; key: keyof ProfileData }[] = [
        { icon: <FaUser />, placeholder: 'نام', key: 'firstName' },
        { icon: <FaUser />, placeholder: 'نام خانوادگی', key: 'lastName' },
        { icon: <FaPhone />, placeholder: 'شماره تلفن', key: 'phoneNumber' },
        { icon: <FaMapMarkerAlt />, placeholder: 'آدرس', key: 'address' },
        { icon: <FaUniversity />, placeholder: 'محل تحصیل', key: 'placeOfStudy' },
    ];

    const calculateProfileCompletion = () => {
        const requiredFields: (keyof ProfileData)[] = ['firstName', 'lastName', 'phoneNumber', 'address', 'placeOfStudy'];
        let filledFields = requiredFields.filter((field) => {
            const value = profileData[field];
            return typeof value === 'string' && value.trim().length > 0;
        }).length;
        if (profileData.profileImageUrl && profileData.profileImageUrl.trim().length > 0) filledFields += 1;
        return Math.round((filledFields / (requiredFields.length + 1)) * 100);
    };

    const profileCompletion = calculateProfileCompletion();
    const incompleteFields = fields.filter(({ key }) => {
        const value = profileData[key];
        return !(typeof value === 'string' && value.trim().length > 0);
    }).map(({ placeholder }) => placeholder);

    return (
        <div className="text-white max-w-screen-xl mx-auto my-8 relative dark:bg-color1 dark:text-color2">
            {showToast && <Success showToast={() => setShowToast(false)} text={toastMessage} />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
                {/*start profile Information*/}
                <div className="bg-light-color1 text-light-color2 p-4 rounded-2xl shadow-xl border border-light-color5 transition-all hover:shadow-2xl md:mx-2 mx-auto self-start w-full dark:bg-color1 dark:text-color2 dark:border-color5">
                    <div className="grid grid-cols-1 items-center font-primaryMedium">
                        <div className="flex flex-col justify-center items-center border-b-2 border-light-color3 mb-4 pb-4 dark:border-color3">
                            <img
                                src={
                                    profileData.profileImageUrl
                                        ? `${API}/api/profileImages/${profileData.profileImageUrl}`
                                        : "/file.svg"
                                }
                                alt="عکس پروفایل"
                                className="w-32 h-32 rounded-full shadow-md object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/file.svg";
                                }}
                            />
                            <label
                                className="mt-3 bg-light-color4 text-light-color1 px-5 py-2 rounded-lg text-sm font-bold transition-all hover:bg-opacity-80 cursor-pointer dark:bg-color4 dark:text-color1">
                                {profileExists ? "تغییر عکس" : "افزودن عکس"}
                                <input type="file" accept="image/jpeg,image/png" onChange={handleUploadImage}
                                       className="hidden" disabled={!profileExists} />
                            </label>
                            {!profileExists && (
                                <p className="text-sm text-light-color7 mt-2 dark:text-light-color7">در ابتدا اطلاعات شخصی خود را تکمیل کنید.</p>
                            )}
                        </div>
                        <div className="flex flex-col justify-center space-y-3">
                            <h2 className="text-xl font-primaryBold mb-3 text-light-color4 text-center dark:text-color4">
                                {profileExists ? "اطلاعات پروفایل" : "تکمیل اطلاعات"}
                            </h2>
                            {
                                isEditing ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        {fields.map((item, index) => (
                                            <div key={index} className="relative">
                                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light-color4 text-lg dark:text-color4">
                                                    {item.icon}
                                                </span>
                                                <input
                                                    type="text"
                                                    placeholder={item.placeholder}
                                                    value={String(profileData[item.key] || "")}
                                                    onChange={(e) => setProfileData({ ...profileData, [item.key]: e.target.value })}
                                                    className="border border-light-color5 shadow-md py-3 pr-12 pl-4 rounded-full w-full text-black focus:outline-none focus:ring-2 focus:ring-color4 dark:border-color5 dark:bg-color5 bg-light-color5 dark:text-color2"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { icon: <FaUser />, label: profileData.firstName || "نام", key: 'firstName' },
                                            { icon: <FaUser />, label: profileData.lastName || "نام خانوادگی", key: 'lastName' },
                                            { icon: <FaPhone />, label: profileData.phoneNumber || "شماره تلفن", key: 'phoneNumber' },
                                            { icon: <FaMapMarkerAlt />, label: profileData.address || "آدرس", key: 'address' },
                                            { icon: <FaUniversity />, label: profileData.placeOfStudy || "محل تحصیل", key: 'placeOfStudy' }
                                        ].map((item, index) => (
                                            <div key={index} className="cursor-pointer transition-transform duration-300 hover:-translate-y-1 flex items-center gap-2 dark:bg-color6 bg-light-color1 dark:text-color1 text-light-color1">
                                                <span className="text-light-color4 text-lg dark:text-color4">
                                                    {item.icon}
                                                </span>
                                                <p className="bg-light-color6 border border-light-color5 text-light-color3 text-lg rounded-full block w-full py-3 pl-4 pr-10 font-primaryMedium text-center min-h-[44px] dark:bg-color6 dark:border-color5 dark:text-color3">
                                                    {item.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                            <div className="flex space-x-2 space-x-reverse mt-4">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSaveProfile}
                                            className="flex-1 bg-light-color4 text-light-color1 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-light-color9 dark:bg-color4 dark:text-color1 dark:hover:bg-color9">
                                            ذخیره
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 bg-light-color8 text-light-color1 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-light-color9 dark:bg-color8 dark:text-color1 dark:hover:bg-color9">
                                            انصراف
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full bg-light-color8 hover:bg-light-color9 text-light-color1 font-semibold px-4 py-2 rounded-lg transition-all duration-200 dark:bg-color8 dark:hover:bg-color9 dark:text-color1">
                                        ویرایش
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/*end profile Information*/}
                <div className="col-span-2 border border-light-color5 shadow-md p-4 rounded-xl dark:border-color5">
                    <div className="bg-light-color1 text-light-color2 p-4 rounded-xl shadow-lg mb-4 border border-light-color5 dark:bg-color1 dark:text-color2 dark:border-color5">
                        <h2 className="text-xl font-primaryBold mb-4">پیشرفت تکمیل پروفایل</h2>
                        <div className="w-full bg-light-color7 rounded-full h-2.5">
                            <div className="bg-light-color4 h-2.5 rounded-full transition-all duration-300 dark:bg-color4" style={{ width: `${profileCompletion}%` }}></div>
                        </div>
                        <p className="mt-2 text-sm font-primaryRegular dark:text-color3">{profileCompletion}% تکمیل شده</p>
                    </div>
                    {incompleteFields.length > 0 && (
                        <div className="bg-light-color1 text-light-color2 p-6 rounded-2xl shadow-lg border border-light-color5 dark:bg-color1 dark:text-color1 dark:border-color5">
                            {incompleteFields.map((field, index) => (
                                <div key={index} className="flex items-center gap-4 mb-4 p-4 border border-light-color5 rounded-xl shadow-md dark:border-color5">
                                    <FaCheckCircle className="text-light-color4 text-xl dark:text-color4" />
                                    <div>
                                        <h1 className="text-lg font-primaryDemibold dark:text-color4">تکمیل {field}</h1>
                                        <p className="text-sm text-light-color7 my-2 font-primaryMedium dark:text-color7">لطفا {field} خود را وارد کنید.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stats Overview Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                        <div className="bg-light-color1 dark:bg-color1 p-4 rounded-xl border border-light-color5 dark:border-color5 shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-light-color7 dark:text-color7">پروژه‌های فعال</p>
                                <p className="text-xl font-bold">{profileData.activeProjects}</p>
                            </div>
                            <div className="text-light-color4 dark:text-color4 text-2xl">
                                <FaProjectDiagram />
                            </div>
                        </div>

                        <div className="bg-light-color1 dark:bg-color1 p-4 rounded-xl border border-light-color5 dark:border-color5 shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-light-color7 dark:text-color7">پروژه‌های منتشر شده</p>
                                <p className="text-xl font-bold">{profileData.projectsPosted}</p>
                            </div>
                            <div className="text-light-color4 dark:text-color4 text-2xl">
                                <FaClipboardList />
                            </div>
                        </div>

                        <div className="bg-light-color1 dark:bg-color1 p-4 rounded-xl border border-light-color5 dark:border-color5 shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-light-color7 dark:text-color7">پروژه‌های تکمیل شده</p>
                                <p className="text-xl font-bold">{profileData.completedProjects}</p>
                            </div>
                            <div className="text-light-color4 dark:text-color4 text-2xl">
                                <FaClipboardList />
                            </div>
                        </div>

                        <div className="bg-light-color1 dark:bg-color1 p-4 rounded-xl border border-light-color5 dark:border-color5 shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-light-color7 dark:text-color7">موجودی کیف پول</p>
                                <p className="text-xl font-bold">0 تومان</p>
                            </div>
                            <div className="text-light-color4 dark:text-color4 text-2xl">
                                <FaWallet />
                            </div>
                        </div>

                        <div className="bg-light-color1 dark:bg-color1 p-4 rounded-xl border border-light-color5 dark:border-color5 shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-light-color7 dark:text-color7">پیام‌های جدید</p>
                                <p className="text-xl font-bold">{profileData.unreadMessages}</p>
                            </div>
                            <div className="text-light-color4 dark:text-color4 text-2xl">
                                <FaEnvelope />
                            </div>
                        </div>

                        <div className="bg-light-color1 dark:bg-color1 p-4 rounded-xl border border-light-color5 dark:border-color5 shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-light-color7 dark:text-color7">اعلان‌ها</p>
                                <p className="text-xl font-bold">{profileData.notifications}</p>
                            </div>
                            <div className="text-light-color4 dark:text-color4 text-2xl">
                                <FaBell />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;