'use client'
import { useState } from 'react';
import Image from 'next/image';
import r_c from '../../img/right-corner.png';
import API from '@/components/api';
import { useRouter } from 'next/navigation'

const SignUp = () => {
    const route = useRouter();
    const [Info, SetInfo] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Info)
            });
            console.log(JSON.stringify(Info))

            if (!response.ok) {
                throw new Error("مشکلی در ثبت نام رخ داد.");
            }

            const data = await response.json();
            console.log("ثبت نام موفقیت آمیز بود:", data);
            alert("ثبت نام انجام شد!");
            route.push('/panel');

        } catch (error) {
            console.error("خطا در ثبت نام:", error);
            alert("خطایی رخ داد، لطفا دوباره امتحان کنید.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full md:w-3/4 lg:w-3/4 xl:w-1/2 aspect-square flex flex-col justify-center bg-black rounded-3xl border border-color5 my-10 text-center px-6 py-8 space-y-6 md:mx-0 mx-4"> 
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[200px] h-[200px]"
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
                                className="bg-color6 border border-color5 text-color3 text-sm rounded-full focus:ring-color4 focus:border-color4 block w-full p-4 font-primaryRegular"
                                placeholder="ایمیل خود را وارد کنید."
                                required
                                value={Info.email}
                                onChange={(e) => SetInfo({ ...Info, email: e.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                className="bg-color6 border border-color5 text-color3 text-sm rounded-full focus:ring-color4 focus:border-color4 block w-full p-4 font-primaryRegular"
                                placeholder="رمز خود را وارد کنید."
                                required
                                value={Info.password}
                                onChange={(e) => SetInfo({ ...Info, password : e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="grid gap-4 my-6 w-full md:w-1/2 px-4 place-items-center py-4">
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
