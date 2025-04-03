'use client'
import { useState } from 'react';
import Image from 'next/image';
import r_c from '../../img/right-corner.png';
import { useRouter } from 'next/navigation';
import Success from '@/components/Toast/success';
import {useAuth} from "@/components/context/AuthContext";

const SignUp = () => {
    const route = useRouter();
    const [Info, SetInfo] = useState<{ email: string; password: string }>({
        email: "",
        password: ""
    });
    const { register } = useAuth();

    const [showToast, setShowToast] = useState<boolean>(false);
    const [correct, setCorrect] = useState<string>("");
    const [emailWarning, setEmailWarning] = useState<string>("");
    const [passwordWarning, setPasswordWarning] = useState<string>("");


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const validateEmail = (email: string) => {
        if (email.length === 0) {
            setEmailWarning("");
        } else if (!emailRegex.test(email)) {
            setEmailWarning("ایمیل نامعتبر است!");
        } else {
            setEmailWarning("");
        }
    };

    const validatePassword = (password: string) => {
        if (password.length === 0) {
            setPasswordWarning("");
        } else if (!passwordRegex.test(password)) {
            setPasswordWarning("مز عبور باید حداقل 8 کاراکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد خاص باشد.");
        } else {
            setPasswordWarning("");
        }
    };



    const handleSubmit = () => {
        if (emailWarning || passwordWarning || !Info.email || !Info.password) return;

        fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Info),
            credentials: "include",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("شما قبلا ثبت نام کرده‌اید.");
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    // ذخیره توکن بدون userId
                    register(data.token, ""); // می‌توان اینجا userId را خالی گذاشت
                } else {
                    throw new Error("مشکلی در دریافت توکن پیش آمد!");
                }
            })
            .catch(error => {
                setEmailWarning(error.message);
            });
    };
    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="relative w-full md:w-3/4 lg:w-3/4 xl:w-1/2 aspect-square flex flex-col justify-center bg-black rounded-3xl border border-color5 my-10 text-center px-6 py-8 space-y-6 md:mx-0 mx-4">
                {showToast && <Success showToast={() => setShowToast(true)} text={correct} />}
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[200px] h-[200px] pointer-events-none"
                    src={r_c}
                    alt="corner"
                    width={200}
                    height={200}
                />
                <div className="space-y-3">
                    <h1 className="md:text-3xl text-2xl font-primaryDemibold text-color4">ورود به سیستم</h1>
                    <p className="text-color7 font-primaryLight text-md md:text-xl">خوش آمدید لطفا اطلاعات خود را وارد کنید</p>
                </div>
                <div className="flex justify-center">
                    <div className="grid gap-6 mb-6 md:grid-cols-2 place-items-center w-full max-w-[600px]">
                        <div className="w-full">
                            <input
                                type="email"
                                className={`bg-color6 border text-color3 text-sm rounded-full block w-full p-4 font-primaryRegular 
                                ${emailWarning ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                        : Info.email ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                                            : 'border-white focus:ring-2 focus:ring-gray-300'}`}
                                placeholder="ایمیل خود را وارد کنید."
                                value={Info.email}
                                onChange={(e) => {
                                    SetInfo({ ...Info, email: e.target.value });
                                    validateEmail(e.target.value);
                                }}
                            />
                            {emailWarning && <p className="text-red-500 font-primaryMedium mt-2">{emailWarning}</p>}
                        </div>
                        <div className="w-full">
                            <input
                                type="password"
                                className={`bg-color6 border text-color3 text-sm rounded-full block w-full p-4 font-primaryRegular 
                                ${passwordWarning ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                        : Info.password ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                                            : 'border-white focus:ring-2 focus:ring-gray-300'}`}
                                placeholder="رمز خود را وارد کنید."
                                value={Info.password}
                                onChange={(e) => {
                                    SetInfo({ ...Info, password: e.target.value });
                                    validatePassword(e.target.value);
                                }}
                            />
                            {passwordWarning && <p className="text-red-500 font-primaryMedium mt-2">{passwordWarning}</p>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="grid gap-4 my-4 w-full md:w-1/2 px-4 place-items-center py-4">
                        <button
                            className={`rounded-full text-color1 font-primaryMedium p-4 w-full 
                            ${!!emailWarning || !!passwordWarning || !Info.email || !Info.password ? 'bg-gray-500 cursor-not-allowed' : 'bg-color4'}`}
                            onClick={handleSubmit}
                            disabled={!!emailWarning || !!passwordWarning || !Info.email || !Info.password}
                        >
                            ثبت نام کنید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
