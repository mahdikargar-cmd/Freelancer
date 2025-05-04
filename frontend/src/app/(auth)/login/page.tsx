'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Success from '@/components/Toast/success';
import Failed from '@/components/Toast/failed';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import r_c from '../../../img/right-corner.png';
import API from "@/components/utils/api";

const Login = () => {
    const router = useRouter();
    const [info, setInfo] = useState({ email: '', password: '' });
    const [warning, setWarning] = useState('');
    const [showToast, setShowToast] = useState({ success: false, failed: false });
    const [isLoading, setIsLoading] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleSubmit = async () => {
        if (!emailRegex.test(info.email)) {
            setWarning('ایمیل نامعتبر است!');
            setShowToast({ success: false, failed: true });
            setTimeout(() => setShowToast({ success: false, failed: false }), 3000);
            return;
        }
        if (!passwordRegex.test(info.password)) {
            setWarning(
                'رمز عبور باید حداقل 8 کاراکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد خاص باشد.'
            );
            setShowToast({ success: false, failed: true });
            setTimeout(() => setShowToast({ success: false, failed: false }), 3000);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(info),
                credentials: 'include',
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'رمز عبور یا ایمیل اشتباه است.');
            }

            if (data.token && data.userId) {
                const userId = String(data.userId).trim();
                if (!userId || userId === 'undefined' || userId === 'null') {
                    console.error('❌ Invalid userId:', userId);
                    throw new Error('شناسه کاربر نامعتبر است.');
                }

                Cookies.set('token', data.token, { expires: 1, path: '/', sameSite: 'strict' });
                Cookies.set('userId', userId, { expires: 1, path: '/', sameSite: 'strict' });
                setWarning('خوش آمدید.');
                setShowToast({ success: true, failed: false });
                setTimeout(() => {
                    setShowToast({ success: false, failed: false });
                    router.push('/dashboard');
                }, 2000);
            } else {
                throw new Error('اطلاعات توکن یا شناسه کاربر دریافت نشد.');
            }
        } catch (error: any) {
            console.error('❌ Login error:', error);
            setWarning(error.message);
            setShowToast({ success: false, failed: true });
            setTimeout(() => setShowToast({ success: false, failed: false }), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-color6 bg-light-color1">
            <div className="relative w-full max-w-[600px] flex flex-col justify-center dark:bg-color1 bg-light-color6 rounded-3xl border dark:border-color5 border-light-color5 my-10 text-center px-6 py-12 space-y-8 mx-4 shadow-xl transition-all duration-300 dark:hover:shadow-color4/20 hover:shadow-light-color4/20">
                {showToast.success && (
                    <Success
                        showToast={() => setShowToast({ success: false, failed: false })}
                        text={warning}
                    />
                )}
                {showToast.failed && (
                    <Failed
                        showToast={() => setShowToast({ success: false, failed: false })}
                        text={warning}
                    />
                )}
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[150px] h-[150px] pointer-events-none opacity-70"
                    src={r_c}
                    alt="corner"
                    width={150}
                    height={150}
                />
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-primaryBold dark:text-color4 text-light-color4 tracking-wider">
                        ورود به سیستم
                    </h1>
                    <p className="dark:text-color7 text-light-color7 font-primaryLight text-md md:text-xl">
                        خوش آمدید! لطفاً اطلاعات خود را وارد کنید
                    </p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="grid gap-6 w-full max-w-[500px]">
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl dark:text-color7 text-light-color7" />
                            <input
                                type="email"
                                className="dark:bg-color6 bg-light-color1 border-2 dark:border-color5 border-light-color5 dark:text-color3 text-light-color3 text-sm rounded-xl w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70 focus:outline-none focus:ring-2 focus:ring-color4"
                                placeholder="ایمیل خود را وارد کنید..."
                                value={info.email}
                                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                required
                            />
                            {info.email && !emailRegex.test(info.email) && (
                                <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">
                                    ایمیل نامعتبر است
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl dark:text-color7 text-light-color7" />
                            <input
                                type="password"
                                className="dark:bg-color6 bg-light-color1 border-2 dark:border-color5 border-light-color5 dark:text-color3 text-light-color3 text-sm rounded-xl w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70 focus:outline-none focus:ring-2 focus:ring-color4"
                                placeholder="رمز خود را وارد کنید..."
                                value={info.password}
                                onChange={(e) => setInfo({ ...info, password: e.target.value })}
                                required
                            />
                            {info.password && !passwordRegex.test(info.password) && (
                                <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">
                                    رمز عبور باید حداقل 8 کاراکتر با حروف بزرگ، کوچک، عدد و نماد باشد
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-[500px] mx-auto justify-center">
                    <Link
                        href="/forgetPassword"
                        className="dark:text-color3 font-primaryMedium dark:hover:text-color4 text-light-color3 hover:text-light-color4 transition-colors text-sm"
                    >
                        رمز عبور خود را فراموش کرده‌اید؟
                    </Link>
                </div>
                <div className="flex justify-center w-full">
                    <div className="grid gap-4 w-full max-w-[500px] py-4">
                        <button
                            className={`rounded-xl text-color1 font-primaryMedium p-4 w-full flex items-center justify-center gap-2 transition-all duration-300 text-lg ${
                                !info.email || !info.password || isLoading
                                    ? 'dark:bg-color7/50 bg-light-color7/50 cursor-not-allowed'
                                    : 'dark:bg-color4 bg-light-color4 dark:hover:bg-color8 hover:bg-light-color8 active:scale-98'
                            }`}
                            onClick={handleSubmit}
                            disabled={!info.email || !info.password || isLoading}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-color1 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    ورود به سیستم
                                    <FiArrowRight className="text-lg" />
                                </>
                            )}
                        </button>
                        <div className="flex items-center w-full my-2">
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5" />
                            <span className="px-4 dark:text-color7 text-light-color7 text-sm">یا</span>
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5" />
                        </div>
                        <button
                            className="bg-transparent rounded-xl border-2 dark:border-color5 border-light-color5 text-center dark:text-color3 text-light-color3 font-primaryMedium p-4 w-full dark:hover:border-color4 hover:border-light-color4 dark:hover:text-color4 hover:text-light-color4 transition-all duration-300 text-lg"
                            onClick={() => router.push('/signUp')}
                        >
                            ثبت‌نام کنید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;