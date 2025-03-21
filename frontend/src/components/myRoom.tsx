"use client"
import { useState } from "react";
import { FaProjectDiagram, FaRegStickyNote, FaTools, FaMoneyBillWave, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdLibraryAddCheck } from "react-icons/md";
import { motion } from "framer-motion";

const Room = () => {
    const [step, setStep] = useState(1);
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [skill, setSkill] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("بر اساس ساعت");
    const [currency, setCurrency] = useState("ریالی");

    const addSkill = () => {
        if (skill && technologies.length < 5) {
            setTechnologies([...technologies, skill]);
            setSkill("");
        }
    };

    return (
        <div className="max-w-screen-md mx-auto my-8 p-8 bg-black text-color2 rounded-2xl shadow-lg border border-color5 min-h-screen relative">
            <h1 className="md:text-3xl text-2xl font-primaryBold text-center mb-6 text-color4 flex items-center justify-center gap-2">
                <FaProjectDiagram /> میخوای پروژه‌ای ثبت کنی؟
            </h1>
            <h2 className="text-lg md:text-xl font-primaryMedium text-center mb-6">ما راهنماییت می‌کنیم که چجوری بتونی پروژه‌ات رو داخل سایت ثبت کنی.</h2>

            <div className="space-y-6">
                {step >= 1 && (
                    <div>
                        <h1 className="font-primaryDemibold text-xl text-white">1 از 6</h1>
                        <h2 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaRegStickyNote className="text-color4 text-xl" /> اسم پروژه‌ات چی باشه؟
                        </h2>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm"
                        />
                        <p className="text-color4 font-primaryLight my-2">
                            نام پروژه برای فریلنسر ها خیلی مهم است در کوتاه ترین جمله نام آن را بنویسید .
                        </p>
                        <button onClick={() => setStep(2)} className={`mt-2 w-3/4 md:w-2/3 lg:max-w-sm text-color1 p-3 rounded-lg font-primaryBold flex items-center justify-center gap-2 mx-auto transition-all duration-300 ease-in-out transform  ${(projectName ? "bg-color8 hover:bg-color9 hover:scale-[1.02]" : "bg-green-100 cursor-not-allowed")}`} disabled={!projectName}>
                            ثبت <FaCheckCircle className="text-color5 text-xl" />
                        </button>
                    </div>
                )}

                {step >= 2 && (
                    <div>
                        <h1 className="font-primaryDemibold text-xl text-white">2 از 6</h1>
                        <h2 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaRegStickyNote className="text-color4 text-xl" /> توضیحاتی در مورد پروژه‌ات بگو...
                        </h2>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm"
                        />
                        <button onClick={() => setStep(3)} className={`mt-2 w-3/4 md:w-2/3 lg:max-w-sm text-color1 p-3 rounded-lg font-primaryBold flex items-center justify-center gap-2 mx-auto transition-all duration-300 ease-in-out transform ${(description ? "bg-color8 hover:bg-color9 hover:scale-[1.02]" : "bg-green-100 cursor-not-allowed")}`} disabled={!description}>
                            ثبت <FaCheckCircle className="text-color5 text-xl" />
                        </button>
                    </div>
                )}

                {step >= 3 && (
                    <div>
                        <h1 className="font-primaryDemibold text-xl text-white">3 از 6</h1>
                        <h2 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaTools className="text-color4 text-xl" /> تکنولوژی‌ها و مهارت‌های استفاده شده
                        </h2>
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            placeholder="تا پنج مهارت میتونی اضافه کنی !"
                            className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm"
                        />
                        <button onClick={addSkill} className="mt-2 w-3/4 md:w-2/3 lg:max-w-sm bg-yellow-400 text-color1 p-3 rounded-lg font-primaryBold flex items-center justify-center gap-2 mx-auto hover:bg-yellow-600 transition-all delay-150">
                            افزودن مهارت <IoMdAddCircle className="text-color5 text-2xl" />
                        </button>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {technologies.map((tech, index) => (
                                <span key={index} className="bg-blue-500 text-color1 px-4 py-2 rounded-lg font-primaryBold shadow-md flex items-center justify-center gap-2">{tech} <MdLibraryAddCheck className="text-color5 text-2xl" /></span>
                            ))}
                        </div>
                        {technologies.length === 5 && <button onClick={() => setStep(4)} className="mt-2 w-3/4 md:w-2/3 lg:max-w-sm bg-color8 hover:bg-color9 text-color1 p-3 rounded-lg font-primaryBold flex items-center justify-center gap-2 mx-auto transition-all duration-300 ease-in-out transform hover:scale-[1.02]">ثبت <FaCheckCircle className="text-color5 text-xl" /></button>}
                    </div>
                )}

                {step >= 4 && (
                    <div>
                        <h1 className="font-primaryDemibold text-xl text-white">4 از 6</h1>
                        <h2 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaMoneyBillWave className="text-color4 text-xl" /> چجوری می‌خوای هزینه رو پرداخت کنی؟
                        </h2>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm"
                        >
                            <option value="بر اساس ساعت">بر اساس ساعت</option>
                            <option value="توافقی">توافقی</option>
                            <option value="نصف اول">نصف اول</option>
                            <option value="پرداخت یکجا">پرداخت یکجا بعداً</option>
                        </select>
                        <button onClick={() => setStep(5)} className="mt-2 w-3/4 md:w-2/3 lg:max-w-sm bg-color8 hover:bg-color9 text-color1 p-3 rounded-lg font-primaryBold flex justify-center items-center gap-2 mx-auto transition-all duration-300 ease-in-out transform hover:scale-[1.02]">ثبت <FaCheckCircle className="text-color5 text-xl" /></button>
                    </div>
                )}

                {step >= 5 && (
                    <div>
                        <h1 className="font-primaryDemibold text-xl text-white">5 از 6</h1>
                        <h2 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaDollarSign className="text-color4 text-xl" /> نوع ارز پرداختی رو مشخص کن
                        </h2>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm"
                        >
                            <option value="ریالی">ریالی</option>
                            <option value="ارز دیجیتال">ارز دیجیتال</option>
                            <option value="دلار">دلار</option>
                        </select>
                        <button onClick={() => setStep(6)} className="mt-2 w-3/4 md:w-2/3 lg:max-w-sm bg-color8 hover:bg-color9 text-color1 p-3 rounded-lg font-primaryBold flex justify-center items-center gap-2 mx-auto transition-all duration-300 ease-in-out transform hover:scale-[1.02]">ثبت <FaCheckCircle className="text-color5 text-xl" /></button>
                    </div>
                )}
                {step >= 6 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-color5 p-6 rounded-2xl shadow-lg mt-6 font-primaryMedium relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 left-0 h-2 bg-color4 rounded-t-2xl"></div>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="font-primaryRegular text-white text-lg flex items-center gap-2">
                                <FaCheckCircle className="text-green-400 text-2xl" />
                                ۶ از ۶
                            </h1>
                            <h2 className="text-xl font-primaryBold text-color3 flex items-center gap-2">
                                <FaProjectDiagram className="text-color4 text-2xl" />
                                اطلاعات پروژه
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <p className="flex items-center gap-2">
                                <FaRegStickyNote className="text-color4 text-xl" />
                                <strong>نام پروژه:</strong> {projectName}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaRegStickyNote className="text-color4 text-xl" />
                                <strong>توضیحات:</strong> {description}
                            </p>
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-primaryBold">
                                    <FaTools className="text-color4 text-xl" />
                                    تکنولوژی‌ها:
                                </h3>
                                <ul className="flex flex-wrap gap-2 mt-2">
                                    {technologies.map((tech, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-primaryBold shadow-md flex items-center gap-2"
                                        >
                                            {tech} <MdLibraryAddCheck className="text-white text-lg" />
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <p className="flex items-center gap-2">
                                <FaMoneyBillWave className="text-color4 text-xl" />
                                <strong>روش پرداخت:</strong> {paymentMethod}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaDollarSign className="text-color4 text-xl" />
                                <strong>ارز پرداختی:</strong> {currency}
                            </p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 opacity-20">
                            <FaProjectDiagram className="text-color4 text-9xl" />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Room;
