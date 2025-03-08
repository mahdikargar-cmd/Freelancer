'use client'
import Image from 'next/image';
import { useState } from 'react';
import r_c from '../../img/right-corner.png';
import Rules from '@/components/rules';
import WorkHireToggle from '@/components/SVG/workHireToggle';

const Panel = () => {
    const [username, setUsername] = useState("");
    const [warning, setWarning] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const englishRegex = /^[a-zA-Z0-9_]+$/;

        if (value.length === 0) {
            setWarning(""); 
            setUsername("");
            setIsValid(false);
            return;
        }

        if (value.length < 8 || value.length > 15) {
            setWarning("نام کاربری باید بین ۸ تا ۱۵ کاراکتر باشد.");
            setIsValid(false);
        } else if (!englishRegex.test(value)) {
            setWarning("نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد.");
            setIsValid(false);
        } else {
            setWarning("");
            setIsValid(true);
        }

        setUsername(value);
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="relative w-full md:w-2/3 lg:w-2/3 xl:w-1/3 aspect-square flex flex-col justify-center bg-black rounded-3xl border border-color5 my-10 text-center px-6 py-8 space-y-6 md:mx-0 mx-4">
                <Image
                    className="absolute top-0 right-0 transform rotate-0 w-[200px] h-[200px] pointer-events-none z-0"
                    src={r_c}
                    alt="corner"
                    width={200}
                    height={200}
                />
                <h1 className='text-color4 md:font-primaryDemibold font-primaryMedium text-xl md:text-3xl'>
                    ثبت نام به عنوان :
                </h1>
                <div className="w-full">
                    <input 
                        type="text" 
                        value={username}
                        onChange={handleInputChange}
                        placeholder="نام کاربری خود را وارد کنید" 
                        className={`w-full p-3 border text-white text-center rounded-full font-primaryMedium transition-all duration-300 z-20
                        ${warning ? 'border-red-500 focus:ring-2 focus:ring-red-500 outline-red-500 bg-color6' : 'border-white bg-color6 focus:ring-2 focus:ring-green-700 outline-none'}`}
                    />
                    {warning && (
                        <p className="text-red-500 text-sm mt-2 font-primaryMedium">{warning}</p>
                    )}
                </div>
                <div className='grid grid-cols1'>
                    <WorkHireToggle  />
                </div>
                <Rules />
                <button
                    className={`w-full py-3 mt-4 rounded-full font-primaryMedium text-lg transition-all duration-300 
                    ${isValid ? 'bg-color4 text-black hover:bg-green-500' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                    disabled={!isValid}
                >
                    ادامه
                </button>
            </div>
        </div>
    );
}

export default Panel;
