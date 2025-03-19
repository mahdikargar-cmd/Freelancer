import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaUniversity,
    FaCheckCircle,
} from "react-icons/fa";
import {useAuth} from "@/components/context/AuthContext";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios, {AxiosResponse} from "axios";

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
}

const Profile = () => {
    const {isLoggedIn, userId} = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [profileExists, setProfileExists] = useState<boolean>(false);
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

                const response: AxiosResponse<ProfileData & {
                    error?: string
                }> = await api.get("http://localhost:8080/api/getProfileInformation");
                console.log("GET Response:", response.data);


                if (response.data && response.data.status === "new_user") {
                    // Handle new user scenario
                    console.log(response.data.message);
                    setProfileExists(false);
                    setProfileData((prev) => ({
                        ...prev,
                        user: {
                            id: userId,
                        },
                    }));
                }else if (response.data && !response.data.error) {
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
                alert(profileExists ? "پروفایل بروزرسانی شد" : "پروفایل با موفقیت ایجاد شد");
                setProfileExists(true);

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
            }
        } catch (error: any) {
            console.error("خطا در ذخیره پروفایل:", error);
            alert(`خطا: ${error.response?.data?.error || error.message}`);
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
                alert("تصویر پروفایل با موفقیت آپلود شد");

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
            alert(`خطا در آپلود تصویر: ${error.response?.data?.error || error.message}`);
        }
    };
    if (loading) {
        return (
            <div className="text-white max-w-screen-xl mx-auto my-8 text-center">
                <p>در حال بارگذاری اطلاعات پروفایل...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-white max-w-screen-xl mx-auto my-8 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="text-white max-w-screen-xl mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
                {/* کادر اطلاعات کاربر */}
                <div
                    className="bg-color1 text-color2 p-8 rounded-2xl shadow-xl border border-color5 transition-all hover:shadow-2xl mx-auto self-start">
                    <div className="grid grid-cols-1 items-center font-primaryMedium">
                        <div className="flex flex-col justify-center items-center border-b-2 border-color3 mb-4 pb-4">
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
                                    className="mt-3 bg-color4 text-black px-5 py-2 rounded-lg text-sm font-bold transition-all hover:bg-opacity-80 cursor-pointer">
                                    تغییر عکس
                                    <input type="file" accept="image/jpeg,image/png" onChange={handleUploadImage}
                                           className="hidden"/>
                                </label>
                            ) : (
                                <p className="text-sm text-gray-300 mt-2">ابتدا پروفایل خود را ایجاد کنید</p>
                            )}
                        </div>
                        <div className="flex flex-col justify-center space-y-3">
                            <h2 className="text-2xl font-primaryBold mb-3 text-color4">
                                {profileExists ? "اطلاعات پروفایل" : "ایجاد پروفایل جدید"}
                            </h2>
                            {/* فیلدهای قابل ویرایش */}
                            <div className="relative">
                                <FaUser className="absolute right-2 top-3 text-color4"/>
                                <input
                                    type="text"
                                    placeholder="نام"
                                    value={profileData.firstName}
                                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                                    className="border border-color5 shadow-md p-2 pr-8 rounded-full w-full text-black"
                                />
                            </div>

                            <div className="relative">
                                <FaUser className="absolute right-2 top-3 text-color4"/>
                                <input
                                    type="text"
                                    placeholder="نام خانوادگی"
                                    value={profileData.lastName}
                                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                                    className="border border-color5 shadow-md p-2 pr-8 rounded-full w-full text-black"
                                />
                            </div>

                            <div className="relative">
                                <FaPhone className="absolute right-2 top-3 text-color4"/>
                                <input
                                    type="text"
                                    placeholder="شماره تلفن"
                                    value={profileData.phoneNumber}
                                    onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                                    className="border border-color5 shadow-md p-2 pr-8 rounded-full w-full text-black"
                                />
                            </div>

                            <div className="relative">
                                <FaMapMarkerAlt className="absolute right-2 top-3 text-color4"/>
                                <input
                                    type="text"
                                    placeholder="آدرس"
                                    value={profileData.address}
                                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                    className="border border-color5 shadow-md p-2 pr-8 rounded-full w-full text-black"
                                />
                            </div>

                            <div className="relative">
                                <FaUniversity className="absolute right-2 top-3 text-color4"/>
                                <input
                                    type="text"
                                    placeholder="محل تحصیل"
                                    value={profileData.placeOfStudy}
                                    onChange={(e) => setProfileData({...profileData, placeOfStudy: e.target.value})}
                                    className="border border-color5 shadow-md p-2 pr-8 rounded-full w-full text-black"
                                />
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                className="bg-color4 text-black px-5 py-2 rounded-lg text-sm font-bold transition-all hover:bg-opacity-80 mt-4"
                            >
                                {profileExists ? "ذخیره تغییرات" : "ایجاد پروفایل"}
                            </button>
                        </div>
                    </div>
                </div>
                {/* کادر اعلانات */}
                <div className="col-span-2 border border-color5 shadow-md p-4 rounded-xl">
                    <div className="bg-color1 text-color2 p-6 rounded-2xl shadow-lg border border-color5">
                        <div className="flex items-center gap-4 mb-4 p-4 border border-color5 rounded-xl shadow-md">
                            <FaCheckCircle className="text-color4 text-xl"/>
                            <div>
                                <h1 className="text-lg font-primaryDemibold">
                                    {profileExists ? "تکمیل اطلاعات پروفایل" : "ایجاد پروفایل"}
                                </h1>
                                <p className="text-sm text-gray-300 my-2">
                                    {profileExists
                                        ? "لطفا اطلاعات خود را تکمیل کنید"
                                        : "برای استفاده از تمامی امکانات سایت، لطفا پروفایل خود را تکمیل کنید"}
                                </p>
                                <button
                                    onClick={handleSaveProfile}
                                    className="bg-color4 text-black px-4 py-2 rounded-lg text-sm transition-all hover:bg-opacity-80"
                                >
                                    {profileExists ? "تکمیل پروفایل" : "ایجاد پروفایل"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
