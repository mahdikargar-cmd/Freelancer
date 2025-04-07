'use client'
import { useState } from 'react';
import Image from 'next/image';
import r_c from '../../img/right-corner.png';
import { useRouter } from 'next/navigation';
import Success from '@/components/Toast/success';
import { useAuth } from "@/components/context/AuthContext";
import { FiMail, FiLock, FiUserPlus, FiArrowLeft } from 'react-icons/fi';

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
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            setPasswordWarning("رمز عبور باید حداقل 8 کاراکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد خاص باشد.");
        } else {
            setPasswordWarning("");
        }
    };

    const handleSubmit = () => {
        if (emailWarning || passwordWarning || !Info.email || !Info.password) return;

        setIsLoading(true);
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
                    register(data.token, "");
                    setCorrect("ثبت نام با موفقیت انجام شد");
                    setShowToast(true);

                    setTimeout(() => {
                        setShowToast(false);
                        route.push('/dashboard');
                    }, 3000);
                } else {
                    throw new Error("مشکلی در دریافت توکن پیش آمد!");
                }
            })
            .catch(error => {
                setEmailWarning(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-color6 bg-light-color1">
            <div className="relative w-full md:w-3/4 lg:w-3/4 xl:w-1/2 flex flex-col justify-center dark:bg-color1 bg-light-color6 rounded-3xl border dark:border-color5 border-light-color5 my-10 text-center px-6 py-12 space-y-8 md:mx-0 mx-4 shadow-xl transition-all duration-300 dark:hover:shadow-color4/20 hover:shadow-light-color4/20">
                {showToast && <Success showToast={() => setShowToast(false)} text={correct} />}
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[200px] h-[200px] pointer-events-none opacity-70"
                    src={r_c}
                    alt="corner"
                    width={200}
                    height={200}
                />
                <div className="space-y-4">
                    <h1 className="md:text-4xl text-3xl font-primaryBold dark:text-color4 text-light-color4 tracking-wider">ثبت نام</h1>
                    <p className="dark:text-color7 text-light-color7 font-primaryLight text-md md:text-xl">حساب جدید ایجاد کنید</p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="grid gap-8 mb-6 md:grid-cols-1 place-items-center w-full max-w-[500px]">
                        <div className="w-full relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                <FiMail className="text-xl" />
                            </div>
                            <input
                                type="email"
                                className={`dark:bg-color6 bg-light-color1 border-2 dark:text-color3 text-light-color3 text-sm rounded-xl block w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70
                                ${emailWarning ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                    : Info.email ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                                        : 'dark:border-color5 border-light-color5 focus:ring-2 dark:focus:ring-color4 focus:ring-light-color4'}`}
                                placeholder="ایمیل خود را وارد کنید..."
                                value={Info.email}
                                onChange={(e) => {
                                    SetInfo({ ...Info, email: e.target.value });
                                    validateEmail(e.target.value);
                                }}
                            />
                            {emailWarning && (
                                <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">{emailWarning}</p>
                            )}
                        </div>
                        <div className="w-full relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-color7">
                                <FiLock className="text-xl" />
                            </div>
                            <input
                                type="password"
                                className={`dark:bg-color6 bg-light-color1 border-2 dark:text-color3 text-light-color3 text-sm rounded-xl block w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70
                                ${passwordWarning ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                    : Info.password ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                                        : 'dark:border-color5 border-light-color5 focus:ring-2 dark:focus:ring-color4 focus:ring-light-color4'}`}
                                placeholder="رمز خود را وارد کنید..."
                                value={Info.password}
                                onChange={(e) => {
                                    SetInfo({ ...Info, password: e.target.value });
                                    validatePassword(e.target.value);
                                }}
                            />
                            {passwordWarning && (
                                <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">{passwordWarning}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center w-full">
                    <div className="grid gap-4 my-4 w-full max-w-[500px] place-items-center py-4">
                        <button
                            className={`rounded-xl dark:text-color1 text-light-color1  font-primaryMedium p-4 w-full flex items-center justify-center gap-2 transition-all duration-300 text-lg
                            ${!!emailWarning || !!passwordWarning || !Info.email || !Info.password || isLoading
                                ? 'dark:bg-color7/50 bg-light-color7/50 cursor-not-allowed'
                                : 'dark:bg-color4 bg-light-color4 dark:hover:bg-color8 hover:bg-light-color8 active:scale-98'}`}
                            onClick={handleSubmit}
                            disabled={!!emailWarning || !!passwordWarning || !Info.email || !Info.password || isLoading}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 dark:border-color1 border-light-color1  border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    ثبت نام کنید
                                    <FiUserPlus className="text-lg" />
                                </>
                            )}
                        </button>
                        <div className="flex items-center w-full my-2">
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5"></div>
                            <span className="px-4 dark:text-color7 text-light-color7 text-sm">یا</span>
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5"></div>
                        </div>
                        <button
                            className="bg-transparent rounded-xl border-2 dark:border-color5 border-light-color5 text-center dark:text-color3 text-light-color3 font-primaryMedium p-4 w-full dark:hover:border-color4 hover:border-light-color4  dark:hover:text-color4 hover:text-light-color4 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                            onClick={() => route.push('/login')}
                        >
                            بازگشت به صفحه ورود
                            <FiArrowLeft className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;