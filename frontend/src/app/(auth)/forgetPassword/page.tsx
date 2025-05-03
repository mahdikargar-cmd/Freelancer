"use client";

import React, { useState } from 'react';
import { FiMail, FiKey, FiLock } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import r_c from '../../../img/right-corner.png';
import { api } from "@/components/lib/api";

const ForPass = () => {
    const [step, setStep] = useState(1); // 1 برای مرحله ایمیل، 2 برای مرحله کد و رمز جدید
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // مدیریت ارسال ایمیل (مرحله 1)
    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/password-reset/initiate', { email });
            if (response.status === 200) {
                setStep(2); // انتقال به مرحله دوم
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطایی رخ داد. لطفاً دوباره امتحان کنید.');
        } finally {
            setLoading(false);
        }
    };

    // مدیریت تأیید کد و رمز جدید (مرحله 2)
    const handleVerifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post(
                `/auth/password-reset/verify?code=${code}`,
                { email, newPassword }
            );
            if (response.status === 200) {
                router.push('/login'); // هدایت به صفحه ورود پس از موفقیت
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطایی رخ داد. لطفاً دوباره امتحان کنید.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full md:w-3/4 lg:w-3/4 xl:w-1/2 aspect-square flex flex-col justify-center bg-light-color5 dark:bg-color1 rounded-3xl border border-light-color6 dark:border-color5 my-10 text-center px-6 py-8 space-y-6 md:mx-0 mx-4">
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[200px] h-[200px]"
                    src={r_c}
                    alt="corner"
                    width={200}
                    height={200}
                />
                <div className="space-y-3">
                    <h1 className="md:text-3xl text-2xl font-primaryDemibold text-light-color4 dark:text-color4">
                        {step === 1 ? 'فراموشی رمز عبور' : 'تأیید بازنشانی رمز عبور'}
                    </h1>
                    <p className="text-light-color7 dark:text-color7 font-primaryLight text-md md:text-xl">
                        {step === 1 ? 'لطفا ایمیل خود را وارد کنید' : 'کد تأیید و رمز جدید را وارد کنید'}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="w-4/5 sm:w-4/5 md:w-3/5 lg:w-2/5">
                        {step === 1 ? (
                            // فرم مرحله اول: وارد کردن ایمیل
                            <form onSubmit={handleEmailSubmit}>
                                <div className="w-full flex relative justify-center mb-4">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                        <FiMail className="text-xl" />
                                    </div>
                                    <input
                                        type="email"
                                        className="bg-light-color6 dark:bg-color6 border border-light-color5 dark:border-color5 text-light-color3 dark:text-color3 text-sm rounded-xl focus:ring-light-color4 dark:focus:ring-color4 focus:border-light-color4 dark:focus:border-color4 block p-4 font-primaryRegular w-full"
                                        placeholder="google@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                <div className="flex justify-center mt-4">
                                    <button
                                        type="submit"
                                        className="bg-light-color4 dark:bg-color4 rounded-xl text-light-color1 dark:text-color1 font-primaryMedium p-4 w-full disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? 'در حال ارسال...' : 'ارسال کد تأیید'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // فرم مرحله دوم: وارد کردن کد و رمز جدید
                            <form onSubmit={handleVerifySubmit}>
                                <div className="w-full flex relative justify-center mb-4">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                        <FiKey className="text-xl" />
                                    </div>
                                    <input
                                        type="text"
                                        className="bg-light-color6 dark:bg-color6 border border-light-color5 dark:border-color5 text-light-color3 dark:text-color3 text-sm rounded-xl focus:ring-light-color4 dark:focus:ring-color4 focus:border-light-color4 dark:focus:border-color4 block p-4 font-primaryRegular w-full"
                                        placeholder="کد تأیید"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full flex relative justify-center mb-4">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                        <FiLock className="text-xl" />
                                    </div>
                                    <input
                                        type="password"
                                        className="bg-light-color6 dark:bg-color6 border border-light-color5 dark:border-color5 text-light-color3 dark:text-color3 text-sm rounded-xl focus:ring-light-color4 dark:focus:ring-color4 focus:border-light-color4 dark:focus:border-color4 block p-4 font-primaryRegular w-full"
                                        placeholder="رمز عبور جدید"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                <div className="flex justify-center mt-4">
                                    <button
                                        type="submit"
                                        className="bg-light-color4 dark:bg-color4 rounded-xl text-light-color1 dark:text-color1 font-primaryMedium p-4 w-full disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? 'در حال ارسال...' : 'تأیید و بازنشانی'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForPass;