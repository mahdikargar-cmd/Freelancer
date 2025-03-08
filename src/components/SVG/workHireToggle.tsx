import { useState } from "react";

const WorkHireToggle = () => {
    const [selected, setSelected] = useState<"hire" | "work" | null>(null);

    return (
        <div className="flex flex-wrap justify-center items-center gap-8 w-full z-10">
            <div
                className={`flex flex-col items-center justify-center w-44 h-44 md:w-52 md:h-52 rounded-2xl p-8 cursor-pointer 
                focus:ring-4 focus:ring-green-700 transition duration-300 
                ${selected === "hire" ? "bg-color4" : "bg-color6 hover:bg-color5"}`}
                onClick={() => setSelected("hire")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60" height="60" viewBox="0 0 24 24"
                    fill="none"
                    stroke={selected === "hire" ? "#101010" : "#CAFF33"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-briefcase mb-4"
                >
                    <rect width="18" height="14" x="3" y="7" rx="2" ry="2" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span className={`font-primaryMedium md:text-2xl text-lg ${selected === "hire" ? "text-color6" : "text-color4"}`}>کارفرما</span>
            </div>
            <div
                className={`flex flex-col items-center justify-center w-44 h-44 md:w-52 md:h-52 rounded-2xl p-8 cursor-pointer 
                focus:ring-4 focus:ring-green-700 transition duration-300 
                ${selected === "work" ? "bg-color4" : "bg-color6 hover:bg-color5"}`}
                onClick={() => setSelected("work")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="" height="60" viewBox="0 0 24 24"
                    fill="none"
                    stroke={selected === "work" ? "#101010" : "#CAFF33"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user mb-4"
                >
                    <path d="M20 21a8 8 0 1 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                <span className={`font-primaryMedium md:text-2xl text-lg ${selected === "work" ? "text-color6" : "text-color4"}`}>فریلنسر</span>
            </div>
        </div>
    );
};

export default WorkHireToggle;
