    "use client"
    import { useState } from "react";
    import { FaProjectDiagram, FaRegStickyNote, FaTools, FaMoneyBillWave, FaDollarSign, FaCheckCircle, FaTimes } from "react-icons/fa";
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

        const removeSkill = (index: number) => {
            setTechnologies(technologies.filter((_, i) => i !== index));
        };

        const nextStep = () => {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const prevStep = () => {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const progressPercentage = (step / 6) * 100;

        return (
            <div className="min-h-screen bg-black text-color2">
                <div className="max-w-screen-md mx-auto py-8 px-4 md:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <div className="inline-block p-3 rounded-full bg-color5/20 mb-4">
                            <FaProjectDiagram className="text-3xl text-color4" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-primaryBold mb-2 text-color4">
                            میخوای پروژه‌ای ثبت کنی؟
                        </h1>
                        <p className="text-lg font-primaryMedium">
                            ما راهنماییت می‌کنیم که چجوری بتونی پروژه‌ات رو داخل سایت ثبت کنی
                        </p>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2 text-xs font-primaryMedium">
                            <span className="text-color2">مرحله {step} از 6</span>
                            <span className="text-color4">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="h-2 w-full bg-color6 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: `${((step-1)/6) * 100}%` }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.3 }}
                                className="h-full bg-color4 rounded-full"
                            />
                        </div>
                    </div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-black border border-color5 rounded-2xl shadow-lg p-6"
                    >
                        {/* Step 1: Project Name */}
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-white mb-3">1 از 6</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaRegStickyNote className="text-color4 text-xl" /> اسم پروژه‌ات چی باشه؟
                                </h2>
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="مثال: طراحی وبسایت فروشگاهی"
                                    className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-color4"
                                />
                                <p className="text-color4 font-primaryLight my-2">
                                    نام پروژه برای فریلنسر ها خیلی مهم است در کوتاه ترین جمله نام آن را بنویسید.
                                </p>
                            </motion.div>
                        )}

                        {/* Step 2: Description */}
                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-white mb-3">2 از 6</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaRegStickyNote className="text-color4 text-xl" /> توضیحاتی در مورد پروژه‌ات بگو...
                                </h2>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="جزئیات پروژه را اینجا بنویسید..."
                                    className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm min-h-[150px] focus:outline-none focus:ring-2 focus:ring-color4"
                                />
                            </motion.div>
                        )}

                        {/* Step 3: Technologies */}
                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-white mb-3">3 از 6</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaTools className="text-color4 text-xl" /> تکنولوژی‌ها و مهارت‌های مورد نیاز
                                </h2>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => setSkill(e.target.value)}
                                        placeholder="تا پنج مهارت میتونی اضافه کنی!"
                                        className="flex-1 p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-color4"
                                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                    />
                                    <button
                                        onClick={addSkill}
                                        disabled={!skill || technologies.length >= 5}
                                        className="bg-yellow-400 text-color1 p-3 rounded-lg font-primaryBold hover:bg-yellow-600 transition-all delay-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <IoMdAddCircle className="text-color5 text-2xl" />
                                    </button>
                                </div>

                                <p className="text-color4 font-primaryLight mb-3">
                                    مهارت‌های اضافه شده: {technologies.length}/5
                                </p>

                                {technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {technologies.map((tech, index) => (
                                            <div key={index} className="bg-blue-500 text-color1 px-3 py-2 rounded-lg font-primaryBold shadow-md flex items-center gap-2">
                                                {tech}
                                                <button
                                                    onClick={() => removeSkill(index)}
                                                    className="text-color1 hover:text-white transition-colors"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Step 4: Payment Method */}
                        {step === 4 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-white mb-3">4 از 6</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaMoneyBillWave className="text-color4 text-xl" /> چجوری می‌خوای هزینه رو پرداخت کنی؟
                                </h2>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full p-3 bg-color6 text-color3 border border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-color4"
                                >
                                    <option value="بر اساس ساعت">بر اساس ساعت</option>
                                    <option value="توافقی">توافقی</option>
                                    <option value="نصف اول">نصف اول</option>
                                    <option value="پرداخت یکجا">پرداخت یکجا بعداً</option>
                                </select>
                            </motion.div>
                        )}

                        {/* Step 5: Currency */}
                        {step === 5 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-white mb-3">5 از 6</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaDollarSign className="text-color4 text-xl" /> نوع ارز پرداختی رو مشخص کن
                                </h2>
                                <div className="grid grid-cols-3 gap-3">
                                    {["ریالی", "دلار", "ارز دیجیتال"].map((curr) => (
                                        <button
                                            key={curr}
                                            onClick={() => setCurrency(curr)}
                                            className={`p-3 rounded-lg border font-primaryMedium ${
                                                currency === curr
                                                    ? "bg-color8 border-color5 text-color1"
                                                    : "bg-color6 border-color5 text-color3 hover:bg-color5/20"
                                            } transition-all duration-300`}
                                        >
                                            {curr}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 6: Summary */}
                        {step === 6 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-color5 p-6 rounded-2xl shadow-lg font-primaryMedium relative overflow-hidden"
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

                        {/* Navigation Buttons */}
                        {step < 6 && (
                            <div className="mt-8 flex flex-col md:flex-row gap-3">
                                {step > 1 && (
                                    <button
                                        onClick={prevStep}
                                        className="md:w-1/3 py-3 px-6 bg-transparent border border-color5 text-color2 rounded-lg font-primaryMedium hover:bg-color5/10 transition-all duration-300"
                                    >
                                        بازگشت
                                    </button>
                                )}
                                <button
                                    onClick={nextStep}
                                    disabled={(step === 1 && !projectName) || (step === 2 && !description) || (step === 3 && technologies.length === 0)}
                                    className={`flex-1 py-3 px-6 bg-color8 hover:bg-color9 text-color1 rounded-lg font-primaryBold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${
                                        ((step === 1 && !projectName) || (step === 2 && !description) || (step === 3 && technologies.length === 0))
                                            ? "opacity-50 cursor-not-allowed hover:scale-100"
                                            : ""
                                    }`}
                                >
                                    ثبت <FaCheckCircle className="text-color5 text-xl" />
                                </button>
                            </div>
                        )}

                        {step === 6 && (
                            <div className="mt-6">
                                <button
                                    className="w-full py-4 bg-color8 hover:bg-color9 text-color1 rounded-lg font-primaryBold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    ثبت نهایی پروژه <FaCheckCircle className="text-color5 text-xl" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        );
    };

    export default Room;