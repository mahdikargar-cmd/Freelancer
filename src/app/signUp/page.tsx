'use client'
import { useState } from 'react';
import Image from 'next/image';
import r_c from '../../img/right-corner.png';
import { useRouter } from 'next/navigation';
import Success from '@/components/Toast/success';
import Failed from '@/components/Toast/failed';

const SignUp = () => {
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const handleSubmit = async () => {
        if (!emailRegex.test(Info.email)) {
            setWarning("ایمیل نامعتبر است!");
            setShowToast({ Success: false, Failed: true });
            setTimeout(() => setShowToast({ Success: false, Failed: false }), 3000);
            return;
        }

        if (!passwordRegex.test(Info.password)) {
            setWarning("رمز عبور باید حداقل ۸ کاراکتر، شامل عدد و حروف انگلیسی باشد!");
            setShowToast({ Success: false, Failed: true });
            setTimeout(() => setShowToast({ Success: false, Failed: false }), 3000);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Info)
            });

            if (!response.ok) {
                throw new Error("شما قبلا ثبت نام کرده اید.");
            }
            const data = await response.json();
            setWarning("ثبت نام شما با موفقیت انجام شد .");
            setShowToast({ Success: true, Failed: false });

            setTimeout(() => {
                setShowToast({ Success: false, Failed: false });
                route.push('/panel');
            }, 3000);

        } catch (error: any) {
            setWarning(error.message);
            setShowToast({ Success: false, Failed: true });
            setTimeout(() => setShowToast({ Success: false, Failed: false }), 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="relative w-full md:w-3/4 lg:w-3/4 xl:w-1/2 aspect-square flex flex-col justify-center bg-black rounded-3xl border border-color5 my-10 text-center px-6 py-8 space-y-6 md:mx-0 mx-4">
                {showToast.Success && <Success showToast={() => setShowToast({ Success: false, Failed: false })} text={warning} />}
                {showToast.Failed && <Failed showToast={() => setShowToast({ Success: false, Failed: false })} text={warning} />}
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
                                className="bg-color6 border border-color5 text-color3 text-sm rounded-full focus:outline-color4 focus:border-color4 block w-full p-4 font-primaryRegular"
                                placeholder="ایمیل خود را وارد کنید."
                                required
                                value={Info.email}
                                onChange={(e) => SetInfo({ ...Info, email: e.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="password"
                                className="bg-color6 border border-color5 text-color3 text-sm rounded-full focus:outline-color4 focus:border-color4 block w-full p-4 font-primaryRegular"
                                placeholder="رمز خود را وارد کنید."
                                required
                                value={Info.password}
                                onChange={(e) => SetInfo({ ...Info, password: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="grid gap-4 my-4 w-full md:w-1/2 px-4 place-items-center py-4">
                        <button
                            className="bg-color4 rounded-full text-color1 font-primaryMedium p-4 w-full"
                            onClick={handleSubmit}
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
