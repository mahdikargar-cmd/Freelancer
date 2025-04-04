import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaUniversity,
    FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "@/components/context/AuthContext";
import React, { JSX, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import Success from "./Toast/success";
import ProfileLoadingSkeleton from "./loading/lsF-P";
interface ProfileData {
    id: number | null;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImageUrl: string;
    address: string;
    placeOfStudy: string;
    user: {
        id: string | null;
    };
    status?: string;
    message?: string;
}

type ProfileResponse = ProfileData & {
    error?: string;
    status?: string;
    message?: string;
};

const Profile = () => {
    const { isLoggedIn, userId } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [profileExists, setProfileExists] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        id: null,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        profileImageUrl: "",
        address: "",
        placeOfStudy: "",
        user: {
            id: null,
        },
    });
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");

    const handleShowToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };
    const api = axios.create({
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("token");
                if (!token) {
                    console.log("توکن یافت نشد");
                    setLoading(false);
                    return;
                }

                const response: AxiosResponse<ProfileResponse> = await api.get("http://localhost:8080/api/getProfileInformation");

                if (response.data && response.data.status === "new_user") {
                    console.log(response.data.message);
                    setProfileExists(false);
                    setProfileData((prev) => ({
                        ...prev,
                        user: {
                            id: userId,
                        },
                    }));
                } else if (response.data && !response.data.error) {
                    const profile = response.data;
                    setProfileData({
                        id: profile.id,
                        firstName: profile.firstName || "",
                        lastName: profile.lastName || "",
                        phoneNumber: profile.phoneNumber || "",
                        profileImageUrl: profile.profileImageUrl || "",
                        address: profile.address || "",
                        placeOfStudy: profile.placeOfStudy || "",
                        user: {
                            id: profile.user?.id || userId,
                        },
                    });
                    setProfileExists(true);
                }
            } catch (error: any) {
                console.error("خطا در دریافت اطلاعات پروفایل:", error);

                if (error.response && error.response.status === 404) {
                    console.log("پروفایل وجود ندارد - کاربر می‌تواند پروفایل ایجاد کند");
                    setProfileExists(false);
                    setProfileData((prev) => ({
                        ...prev,
                        user: {
                            id: userId,
                        },
                    }));
                    setError(null);
                } else {
                    setError(error.response?.data?.error || "خطا در بارگذاری اطلاعات پروفایل");
                }
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, userId]);

    const handleSaveProfile = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                console.log("توکن یافت نشد");
                return;
            }

            const url =
                profileExists && profileData.id
                    ? `http://localhost:8080/api/ProfileInformation/${profileData.id}`
                    : "http://localhost:8080/api/createProfileInformation";

            const method = profileExists && profileData.id ? "put" : "post";

            const requestData = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                phoneNumber: profileData.phoneNumber,
                address: profileData.address,
                placeOfStudy: profileData.placeOfStudy,
            };

            const response: AxiosResponse<ProfileData> = await api[method](url, requestData);

            if (response.data) {
                const responseData = response.data;

                setProfileData((prev) => ({
                    ...prev,
                    id: responseData.id,
                    firstName: responseData.firstName || prev.firstName,
                    lastName: responseData.lastName || prev.lastName,
                    phoneNumber: responseData.phoneNumber || prev.phoneNumber,
                    profileImageUrl: responseData.profileImageUrl || prev.profileImageUrl,
                    address: responseData.address || prev.address,
                    placeOfStudy: responseData.placeOfStudy || prev.placeOfStudy,
                    user: {
                        id: responseData.user?.id || prev.user.id,
                    },
                }));

                setProfileExists(true);
                setIsEditing(false);

                handleShowToast(profileExists ? "پروفایل بروزرسانی شد" : "پروفایل با موفقیت ایجاد شد");
            }
        } catch (error: any) {
            console.error("خطا در ذخیره پروفایل:", error);
            handleShowToast(`خطا: ${error.response?.data?.error || error.message}`);
        }
    };

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (!file) return;

        const formData = new FormData();
        formData.append("profileImageUrl", file);

        try {
            const token = Cookies.get("token");
            if (!token) {
                alert("توکن احراز هویت یافت نشد");
                return;
            }

            if (!profileData.id && !profileExists) {
                alert("لطفا ابتدا پروفایل خود را ذخیره کنید");
                return;
            }

            const url = `http://localhost:8080/api/${profileExists ? "updateProfileImage" : "uploadProfileImage"}/${profileData.id}`;
            let response: AxiosResponse<any>;
            if (profileExists) {
                response = await api.put(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                response = await api.post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            if (response.data) {
                handleShowToast("تصویر پروفایل با موفقیت آپلود شد");

                try {
                    const profileResponse: AxiosResponse<ProfileData> = await api.get("http://localhost:8080/api/getProfileInformation");
                    console.log("پروفایل به‌روزرسانی‌شده پس از آپلود تصویر:", profileResponse.data);

                    if (profileResponse.data) {
                        const updatedProfile = profileResponse.data;
                        setProfileData((prev) => ({
                            ...prev,
                            profileImageUrl: updatedProfile.profileImageUrl || prev.profileImageUrl,
                        }));
                    }
                } catch (error: any) {
                    console.error("خطا در دریافت پروفایل به‌روز:", error);
                    throw new Error(`Error ${error.response?.status}: ${error.response?.data?.error || error.message}`);
                }
            }
        } catch (error: any) {
            console.error("خطا در آپلود:", error);
            handleShowToast(`خطا در آپلود تصویر: ${error.response?.data?.error || error.message}`);
        }
    };
    if (loading) return <ProfileLoadingSkeleton />

    if (error) {
        return (
            <div className="text-white max-w-screen-xl mx-auto my-8 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }
    const fields: { icon: JSX.Element; placeholder: string; key: keyof ProfileData }[] = [
        { icon: <FaUser />, placeholder: "نام", key: "firstName" },
        { icon: <FaUser />, placeholder: "نام خانوادگی", key: "lastName" },
        { icon: <FaPhone />, placeholder: "شماره تلفن", key: "phoneNumber" },
        { icon: <FaMapMarkerAlt />, placeholder: "آدرس", key: "address" },
        { icon: <FaUniversity />, placeholder: "محل تحصیل", key: "placeOfStudy" },
        { icon: <FaUniversity />, placeholder: "تصویر پروفایل", key: "profileImageUrl" }
    ];

    const calculateProfileCompletion = () => {
        const requiredFields: (keyof ProfileData)[] = ["firstName", "lastName", "phoneNumber", "address", "placeOfStudy"];
        let filledFields = requiredFields.filter(field => typeof profileData[field] === "string" && profileData[field].trim()).length;
        if (profileData.profileImageUrl) {
            filledFields += 1;
        }
        return Math.round((filledFields / (requiredFields.length + 1)) * 100);
    };

    const profileCompletion = calculateProfileCompletion();
    const incompleteFields = fields
        .filter(({ key }) => typeof profileData[key] === "string" && profileData[key]?.trim() === "")
        .map(({ placeholder }) => placeholder);

    return (
        <div className="text-white max-w-screen-xl mx-auto my-8 relative dark:bg-color1 dark:text-color2">
        {showToast && <Success showToast={() => setShowToast(false)} text={toastMessage} />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
            <div
                className="bg-light-color1 text-light-color2 p-4 rounded-2xl shadow-xl border border-light-color5 transition-all hover:shadow-2xl md:mx-2 mx-auto self-start w-full dark:bg-color1 dark:text-color2 dark:border-color5">
                <div className="grid grid-cols-1 items-center font-primaryMedium">
                    <div className="flex flex-col justify-center items-center border-b-2 border-light-color3 mb-4 pb-4 dark:border-color3">
                        <img
                            src={
                                profileData.profileImageUrl
                                    ? `http://localhost:8080/api/profileImages/${profileData.profileImageUrl}`
                                    : "/file.svg"
                            }
                            alt="عکس پروفایل"
                            className="w-32 h-32 rounded-full shadow-md object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/file.svg";
                            }}
                        />
                        {profileExists ? (
                            <label
                                className="mt-3 bg-light-color4 text-black px-5 py-2 rounded-lg text-sm font-bold transition-all hover:bg-opacity-80 cursor-pointer dark:bg-light-color8 dark:text-light-color1">
                                تغییر عکس
                                <input type="file" accept="image/jpeg,image/png" onChange={handleUploadImage}
                                    className="hidden" />
                            </label>
                        ) : (
                            <p className="text-sm text-light-color7 mt-2 dark:text-light-color7">در ابتدا اطلاعات شخصی خود را تکمیل کنید .</p>
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
                                        item.key !== "profileImageUrl" && (
                                            <div key={index} className="relative">
                                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light-color4 text-lg dark:text-color4">
                                                    {item.icon}
                                                </span>
                                                <input
                                                    type="text"
                                                    placeholder={item.placeholder}
                                                    value={String(profileData[item.key] ?? "")}
                                                    onChange={(e) => setProfileData({ ...profileData, [item.key]: e.target.value })}
                                                    className="border border-light-color5 shadow-md py-3 pr-12 pl-4 rounded-full w-full text-black focus:outline-none focus:ring-2 focus:ring-light-color4 dark:border-color5 dark:bg-light-color5 dark:text-light-color2"
                                                />
                                            </div>
                                        )
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {[{ icon: <FaUser />, label: profileData.firstName },
                                      { icon: <FaUser />, label: profileData.lastName },
                                      { icon: <FaPhone />, label: profileData.phoneNumber },
                                      { icon: <FaMapMarkerAlt />, label: profileData.address },
                                      { icon: <FaUniversity />, label: profileData.placeOfStudy }
                                    ].map((item, index) => (
                                        <div key={index} className="cursor-pointer transition-transform duration-300 hover:-translate-y-1 flex items-center gap-2 shadow-md dark:bg-light-color6 dark:text-light-color1">
                                            <span className="text-light-color4 text-lg dark:text-light-color4">
                                                {item.icon}
                                            </span>
                                            <p className="bg-light-color6 border border-light-color5 text-light-color3 text-lg rounded-full block w-full py-3 pl-4 pr-10 font-primaryMedium text-center min-h-[44px] dark:bg-light-color5 dark:text-light-color2">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-light-color8 hover:bg-light-color9 text-light-color1 font-semibold px-4 py-2 rounded-lg transition-all duration-200 dark:bg-light-color8 dark:hover:bg-light-color9">
                            ویرایش
                        </button>
    
                        <button
                            disabled={!isEditing}
                            onClick={handleSaveProfile}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200
                            ${isEditing ? "bg-light-color4 hover:bg-light-color9 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"} dark:bg-light-color8 dark:text-light-color1 dark:hover:bg-light-color9`}>
                            ذخیره
                        </button>
    
                    </div>
                </div>
            </div>
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
            </div>
        </div>
    </div>
    


    );
};

export default Profile;
