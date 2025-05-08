'use client';
import { useState } from 'react';
import Image from 'next/image';
import r_c from '../../../img/right-corner.png';
import { useRouter } from 'next/navigation';
import Success from '@/components/Toast/success';
import { FiMail, FiLock, FiUserPlus, FiArrowLeft, FiKey } from 'react-icons/fi';
import { useAuth } from '@/components/lib/useAuth';
import Cookies from "js-cookie";
import API from "@/components/utils/api";

const SignUp = () => {
    const router = useRouter();
    const { register } = useAuth();
    const [info, setInfo] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });
    const [verificationCode, setVerificationCode] = useState<string>(''); // برای ذخیره کد تأیید
    const [showVerificationForm, setShowVerificationForm] = useState<boolean>(false); // برای نمایش فرم کد تأیید
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [emailWarning, setEmailWarning] = useState<string>('');
    const [passwordWarning, setPasswordWarning] = useState<string>('');
    const [codeWarning, setCodeWarning] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const validateEmail = (email: string) => {
        if (email.length === 0) {
            setEmailWarning('');
        } else if (!emailRegex.test(email)) {
            setEmailWarning('ایمیل نامعتبر است!');
        } else {
            setEmailWarning('');
        }
    };

    const validatePassword = (password: string) => {
        if (password.length === 0) {
            setPasswordWarning('');
        } else if (!passwordRegex.test(password)) {
            setPasswordWarning(
                'رمز عبور باید حداقل 8 کاراکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد خاص باشد.'
            );
        } else {
            setPasswordWarning('');
        }
    };

    const validateCode = (code: string) => {
        if (code.length === 0) {
            setCodeWarning('');
        } else if (!/^\d{6}$/.test(code)) {
            setCodeWarning('کد تأیید باید 6 رقم باشد!');
        } else {
            setCodeWarning('');
        }
    };

    const handleInitiateRegistration = () => {
        if (emailWarning || passwordWarning || !info.email || !info.password) return;

        setIsLoading(true);
        fetch(`${API}/auth/register/initiate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('ایمیل قبلاً ثبت شده است.');
                    }
                    throw new Error('خطایی در ارسال کد تأیید رخ داد.');
                }
                return response.json();
            })
            .then((data) => {
                setToastMessage(data.message || 'کد تأیید به ایمیل شما ارسال شد');
                setShowToast(true);
                setShowVerificationForm(true);
                setTimeout(() => setShowToast(false), 3000);
            })
            .catch((error: any) => {
                setEmailWarning(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleVerifyCode = () => {
        if (codeWarning || !verificationCode) return;

        setIsLoading(true);
        const cleanedCode = verificationCode.trim();
        const cleanedEmail = info.email.trim().toLowerCase();
        fetch(`${API}/auth/register/verify?code=${encodeURIComponent(cleanedCode)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: cleanedEmail, password: info.password }),
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || 'خطایی در تأیید کد رخ داد.');
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.token && data.userId) {
                    Cookies.set('token', data.token, { expires: 7, path: '/', sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
                    Cookies.set('userId', String(data.userId), { expires: 7, path: '/', sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
                   const res= register(data.token, String(data.userId));
                    setToastMessage('ثبت‌نام با موفقیت انجام شد');
                    setShowToast(true);
                 console.log("res: ",res)
                    setTimeout(() => {
                        setShowToast(false);
                        window.location.href = '/dashboard';
                        }, 3000);
                } else {
                    throw new Error('اطلاعات توکن یا شناسه کاربر دریافت نشد!');
                }
            })
            .catch((error: any) => {
                setCodeWarning(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex items-center  justify-center mt-10 dark:bg-color6 bg-light-color1">
            <div className="relative w-full md:w-3/4 lg:w-3/4 xl:w-1/2 flex flex-col justify-center dark:bg-color1 bg-light-color6 rounded-3xl border dark:border-color5 border-light-color5  text-center px-6 py-4 space-y-8 md:mx-0 mx-4 shadow-xl transition-all duration-300 dark:hover:shadow-color4/20 hover:shadow-light-color4/20">
                {showToast && <Success showToast={() => setShowToast(false)} text={toastMessage} />}
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[200px] h-[200px] pointer-events-none opacity-70"
                    src={r_c}
                    alt="corner"
                    width={200}
                    height={200}
                />
                <div className="space-y-4">
                    <h1 className="md:text-4xl text-3xl font-primaryBold dark:text-color4 text-light-color4 tracking-wider">
                        {showVerificationForm ? 'تأیید کد' : 'ثبت نام'}
                    </h1>
                    <p className="dark:text-color7 text-light-color7 font-primaryLight text-md md:text-xl">
                        {showVerificationForm ? 'کد تأیید ارسال‌شده به ایمیل خود را وارد کنید' : 'حساب جدید ایجاد کنید'}
                    </p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="grid gap-8 mb-6 md:grid-cols-1 place-items-center w-full max-w-[500px]">
                        {!showVerificationForm ? (
                            <>
                                <div className="w-full relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                        <FiMail className="text-xl" />
                                    </div>
                                    <input
                                        type="email"
                                        className={`dark:bg-color6 bg-light-color1 border-2 dark:text-color3 text-light-color3 text-sm rounded-xl block w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70
                                        ${emailWarning ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                            : info.email ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                                                : 'dark:border-color5 border-light-color5 focus:ring-2 dark:focus:ring-color4 focus:ring-light-color4'}`}
                                        placeholder="ایمیل خود را وارد کنید..."
                                        value={info.email}
                                        onChange={(e) => {
                                            setInfo({ ...info, email: e.target.value });
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
                                            : info.password ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                                                : 'dark:border-color5 border-light-color5 focus:ring-2 dark:focus:ring-color4 focus:ring-light-color4'}`}
                                        placeholder="رمز خود را وارد کنید..."
                                        value={info.password}
                                        onChange={(e) => {
                                            setInfo({ ...info, password: e.target.value });
                                            validatePassword(e.target.value);
                                        }}
                                    />
                                    {passwordWarning && (
                                        <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">{passwordWarning}</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="w-full relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                    <FiKey className="text-xl" />
                                </div>
                                <input
                                    type="text"
                                    className={`dark:bg-color6 bg-light-color1 border-2 dark:text-color3 text-light-color3 text-sm rounded-xl block w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70
                                    ${codeWarning ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                        : verificationCode ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                                            : 'dark:border-color5 border-light-color5 focus:ring-2 dark:focus:ring-color4 focus:ring-light-color4'}`}
                                    placeholder="کد تأیید را وارد کنید..."
                                    value={verificationCode}
                                    onChange={(e) => {
                                        setVerificationCode(e.target.value);
                                        validateCode(e.target.value);
                                    }}
                                />
                                {codeWarning && (
                                    <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">{codeWarning}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center w-full">
                    <div className="grid gap-4 my-4 w-full max-w-[500px] place-items-center py-4">
                        <button
                            className={`rounded-xl dark:text-color1 text-light-color1 font-primaryMedium p-4 w-full flex items-center justify-center gap-2 transition-all duration-300 text-lg
                            ${(showVerificationForm ? !verificationCode || !!codeWarning : !info.email || !info.password || !!emailWarning || !!passwordWarning) || isLoading
                                ? 'dark:bg-color7/50 bg-light-color7/50 cursor-not-allowed'
                                : 'dark:bg-color4 bg-light-color4 dark:hover:bg-color8 hover:bg-light-color8 active:scale-98'}`}
                            onClick={showVerificationForm ? handleVerifyCode : handleInitiateRegistration}
                            disabled={(showVerificationForm ? !verificationCode || !!codeWarning : !info.email || !info.password || !!emailWarning || !!passwordWarning) || isLoading}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 dark:border-color1 border-light-color1 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {showVerificationForm ? 'تأیید کد' : 'ثبت نام کنید'}
                                    {showVerificationForm ? <FiKey className="text-lg" /> : <FiUserPlus className="text-lg" />}
                                </>
                            )}
                        </button>
                        <div className="flex items-center w-full my-2">
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5"></div>
                            <span className="px-4 dark:text-color7 text-light-color7 text-sm">یا</span>
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5"></div>
                        </div>
                        <button
                            className="bg-transparent rounded-xl border-2 dark:border-color5 border-light-color5 text-center dark:text-color3 text-light-color3 font-primaryMedium p-4 w-full dark:hover:border-color4 hover:border-light-color4 dark:hover:text-color4 hover:text-light-color4 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                            onClick={() => (showVerificationForm ? setShowVerificationForm(false) : router.push('/login'))}
                        >
                            {showVerificationForm ? 'بازگشت به فرم ثبت‌نام' : 'بازگشت به صفحه ورود'}
                            <FiArrowLeft className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;