'use client'

import Image from 'next/image';
import r_c from '../../img/right-corner.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Success from '@/components/Toast/success';
import Failed from '@/components/Toast/failed';
import { useAuth } from '@/components/context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login = () => {
    const { login } = useAuth();
    const route = useRouter();
    const [Info, SetInfo] = useState({
        email: "",
        password: ""
    });
    const [warning, setWarning] = useState("");
    const [showToast, setShowToast] = useState({
        Success: false,
        Failed: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleSubmit = () => {
        if (!emailRegex.test(Info.email)) {
            setWarning("ایمیل نامعتبر است!");
            setShowToast({ Success: false, Failed: true });
            setTimeout(() => setShowToast({ Success: false, Failed: false }), 3000);
            return;
        }
        if (!passwordRegex.test(Info.password)) {
            setWarning("رمز عبور باید حداقل 8 کاراکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد خاص باشد.");
            setShowToast({ Success: false, Failed: true });
            setTimeout(() => setShowToast({ Success: false, Failed: false }), 3000);
            return;
        }

        setIsLoading(true);
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Info),
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("رمز عبور یا ایمیل اشتباه است.");
                }
                return response.json();
            })
            .then((data) => {
                if (data.token) {
                    document.cookie = `token=${data.token}; path=/; max-age=3600`;
                    login(data.token, data.id);
                    setWarning("خوش آمدید.");
                    setShowToast({ Success: true, Failed: false });

                    setTimeout(() => {
                        setShowToast({ Success: false, Failed: false });
                        setWarning("");
                        route.push('/dashboard');
                    }, 3000);
                }
            })
            .catch((error) => {
                setWarning(error.message);
                setShowToast({ Success: false, Failed: true });
                setTimeout(() => setShowToast({ Success: false, Failed: false }), 3000);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-color6 bg-light-color1">
            <div className="relative w-full md:w-3/4 lg:w-3/4 xl:w-1/2 flex flex-col justify-center dark:bg-color1 bg-light-color6 rounded-3xl border dark:border-color5 border-light-color5 my-10 text-center px-6 py-12 space-y-8 md:mx-0 mx-4 shadow-xl transition-all duration-300 dark:hover:shadow-color4/20 hover:shadow-light-color4/20">
                {showToast.Success && <Success showToast={() => setShowToast({ Success: false, Failed: false })} text={warning} />}
                {showToast.Failed && <Failed showToast={() => setShowToast({ Success: false, Failed: false })} text={warning} />}
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[200px] h-[200px] pointer-events-none opacity-70"
                    src={r_c}
                    alt="corner"
                    width={200}
                    height={200}
                />
                <div className="space-y-4">
                    <h1 className="md:text-4xl text-3xl font-primaryBold dark:text-color4 text-light-color4 tracking-wider">ورود به سیستم</h1>
                    <p className="dark:text-color7 text-light-color7 font-primaryLight text-md md:text-xl">خوش آمدید لطفا اطلاعات خود را وارد کنید</p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="grid gap-8 mb-6 md:grid-cols-1 place-items-center w-full max-w-[500px]">
                        <div className="w-full relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                <FiMail className="text-xl" />
                            </div>
                            <input
                                type="email"
                                className="dark:bg-color6 bg-light-color1 border-2 dark:text-color3 text-light-color3 text-sm rounded-xl block w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70"
                                placeholder="ایمیل خود را وارد کنید..."
                                required
                                value={Info.email}
                                onChange={(e) => SetInfo({ ...Info, email: e.target.value })}
                            />
                            {Info.email && !emailRegex.test(Info.email) && (
                                <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">ایمیل نامعتبر است</p>
                            )}
                        </div>
                        <div className="w-full relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none dark:text-color7 text-light-color7">
                                <FiLock className="text-xl" />
                            </div>
                            <input
                                type="password"
                                className="dark:bg-color6 bg-light-color1 border-2 dark:text-color3 text-light-color3 text-sm rounded-xl block w-full p-4 pl-12 font-primaryRegular transition duration-300 dark:placeholder-color7/70 placeholder-light-color7/70"
                                placeholder="رمز خود را وارد کنید..."
                                required
                                value={Info.password}
                                onChange={(e) => SetInfo({ ...Info, password: e.target.value })}
                            />
                            {Info.password && !passwordRegex.test(Info.password) && (
                                <p className="text-red-500 text-xs mt-1 text-left font-primaryLight">رمز عبور باید حداقل 8 کاراکتر با حروف بزرگ، کوچک، عدد و نماد باشد</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-[500px] mx-auto justify-center">
                    <Link href='/forgetPassword' className="dark:text-color3 font-primaryMedium dark:hover:text-color4 text-light-color3 hover:text-light-color4 transition-colors text-sm">
                        رمز عبور خود را فراموش کرده اید؟
                    </Link>
                </div>
                <div className="flex justify-center w-full">
                    <div className="grid gap-4 my-4 w-full max-w-[500px] place-items-center py-4">
                        <button
                            className={`rounded-xl text-color1 font-primaryMedium p-4 w-full flex items-center justify-center gap-2 transition-all duration-300 text-lg
                            ${!Info.email || !Info.password || isLoading
                                ? 'dark:bg-color7/50 bg-light-color7/50 cursor-not-allowed'
                                : 'dark:bg-color4 bg-light-color4 dark:hover:bg-color8 hover:bg-light-color8  active:scale-98'}`}
                            onClick={handleSubmit}
                            disabled={!Info.email || !Info.password || isLoading}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-color1 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    ورود به سیستم
                                    <FiArrowRight className="text-lg" />
                                </>
                            )}
                        </button>
                        <div className="flex items-center w-full my-2">
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5"></div>
                            <span className="px-4 dark:text-color7 text-light-color7 text-sm">یا</span>
                            <div className="flex-grow h-px dark:bg-color5 bg-light-color5"></div>
                        </div>
                        <button
                            className="bg-transparent rounded-xl border-2 dark:border-color5 border-light-color5 text-center dark:text-color3 text-light-color3 font-primaryMedium p-4 w-full dark:hover:border-color4 hover:border-light-color4 dark:hover:text-color4 hover:text-light-color4 transition-all duration-300 text-lg"
                            onClick={() => route.push('/signUp')}
                        >
                            ثبت نام کنید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;