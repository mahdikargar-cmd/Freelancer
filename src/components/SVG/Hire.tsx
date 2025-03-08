import { useState } from "react";
const Hire = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };
    return (
        <div className={`flex flex-col items-center justify-center rounded-xl p-6 cursor-pointer hover:bg-color5 focus:ring-2 focus:ring-green-700 transition duration-300 ${isActive ? 'bg-color4' : 'bg-color6'} `}
        onClick={handleClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#CAFF33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase mb-3">
                <rect width="18" height="14" x="3" y="7" rx="2" ry="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span className='text-color4 font-primaryMedium text-xl'>کار فرما</span>
        </div>
    )
}

export default Hire;