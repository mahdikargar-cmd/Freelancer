import Link from "next/link";
import r_c from '../../img/right-corner.png';
import Image from "next/image";

const ForPass = () => {
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
                    <h1 className="md:text-3xl text-2xl font-primaryDemibold text-color4">فراموشی رمز عبور</h1>
                    <p className="text-color7 font-primaryLight text-md md:text-xl">لطفا ایمیل خود را وارد کنید</p>
                </div>
                <div className="flex justify-center">
                    <div className="w-4/5 sm:w-4/5 md:w-3/5 lg:w-2/5">
                        <div className="w-full flex justify-center">
                            <input
                                type="email"
                                className="bg-color6 border border-color5 text-color3 text-sm rounded-full focus:ring-color4 focus:border-color4 block p-4 font-primaryRegular w-full"
                                placeholder="google@gmail.com"
                                required
                            />
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="bg-color4 rounded-full text-color1 font-primaryMedium p-4 w-full">
                                ارسال رمز عبور
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForPass;