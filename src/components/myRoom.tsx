"use client"
import { useState } from "react";
import { FaProjectDiagram, FaRegStickyNote, FaTools, FaMoneyBillWave, FaDollarSign, FaCheckCircle } from "react-icons/fa";

const Room = () => {
    const [step, setStep] = useState(1);
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState([]);
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
        <div className="max-w-screen-md mx-auto my-8 p-8 bg-color1 text-color2 rounded-2xl shadow-lg border border-color5 min-h-screen relative">
            <h1 className="text-3xl font-primaryBold text-center mb-6 text-color4 flex items-center justify-center gap-2">
                <FaProjectDiagram /> میخوای پروژه‌ای ثبت کنی؟
            </h1>
            <h2 className="text-lg md:text-xl font-primaryMedium text-center mb-6">ما راهنماییت می‌کنیم که چجوری بتونی پروژه‌ات رو داخل سایت ثبت کنی.</h2>
            
            <div className="space-y-6">
                {step >= 1 && (
                    <div>
                        <h3 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaRegStickyNote className="text-color4 text-xl"/> اسم پروژه‌ات چی باشه؟
                        </h3>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full p-3 bg-color5 text-color3 border border-color3 rounded-lg font-primaryMedium shadow-sm"
                        />
                        <button onClick={() => setStep(2)} className={`mt-2 w-full text-color1 p-3 rounded-lg font-primaryBold flex items-center justify-center gap-2 ${(projectName ? "bg-color4" : "bg-green-100 cursor-not-allowed")}`} disabled={!projectName}>
                            ثبت <FaCheckCircle className="text-color4 text-xl"/>
                        </button>
                    </div>
                )}
                
                {step >= 2 && (
                    <div>
                        <h3 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaRegStickyNote className="text-color4 text-xl"/> توضیحاتی در مورد پروژه‌ات بگو...
                        </h3>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-color5 text-color3 border border-color3 rounded-lg font-primaryMedium shadow-sm"
                        />
                        <button onClick={() => setStep(3)} className={`mt-2 w-full text-color1 p-3 rounded-lg font-primaryBold flex items-center justify-center gap-2 ${(description ? "bg-color4" : "bg-green-100 cursor-not-allowed")}`} disabled={!description}>
                            ثبت <FaCheckCircle className="text-color4 text-xl"/>
                        </button>
                    </div>
                )}
                
                {step >= 3 && (
                    <div>
                        <h3 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaTools className="text-color4 text-xl"/> تکنولوژی‌ها و مهارت‌های استفاده شده
                        </h3>
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            placeholder="تا پنج مهارت میتونی اضافه کنی !"
                            className="w-full p-3 bg-color5 text-color3 border border-color3 rounded-lg font-primaryMedium shadow-sm"
                        />
                        <button onClick={addSkill} className="mt-2 w-full bg-color4 text-color1 p-3 rounded-lg font-primaryBold flex items-center justify-center gap-2">
                            افزودن مهارت <FaCheckCircle className="text-color4 text-xl"/>
                        </button>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {technologies.map((tech, index) => (
                                <span key={index} className="bg-color4 text-color1 px-4 py-2 rounded-lg font-primaryBold shadow-md">{tech}</span>
                            ))}
                        </div>
                        {technologies.length === 5 && <button onClick={() => setStep(4)} className="mt-2 w-full bg-color4 text-color1 p-3 rounded-lg font-primaryBold">ثبت</button>}
                    </div>
                )}
                
                {step >= 4 && (
                    <div>
                        <h3 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaMoneyBillWave className="text-color4 text-xl"/> چجوری می‌خوای هزینه رو پرداخت کنی؟
                        </h3>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3 bg-color5 text-color3 border border-color3 rounded-lg font-primaryMedium shadow-sm"
                        >
                            <option value="hourly">بر اساس ساعت</option>
                            <option value="fixed">توافقی</option>
                            <option value="half-now">نصف اول</option>
                            <option value="full-later">پرداخت یکجا بعداً</option>
                        </select>
                        <button onClick={() => setStep(5)} className="mt-2 w-full bg-color4 text-color1 p-3 rounded-lg font-primaryBold">ثبت</button>
                    </div>
                )}
                
                {step >= 5 && (
                    <div>
                        <h3 className="text-lg font-primaryMedium mb-2 flex items-center gap-2">
                            <FaDollarSign className="text-color4 text-xl"/> نوع ارز پرداختی رو مشخص کن
                        </h3>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full p-3 bg-color5 text-color3 border border-color3 rounded-lg font-primaryMedium shadow-sm"
                        >
                            <option value="rial">ریالی</option>
                            <option value="crypto">ارز دیجیتال</option>
                            <option value="usd">دلار</option>
                        </select>
                        <button onClick={() => setStep(6)} className="mt-2 w-full bg-color4 text-color1 p-3 rounded-lg font-primaryBold">ثبت</button>
                    </div>
                )}
                
                {step >= 6 && (
                    <div className="bg-color5 p-4 rounded-lg shadow-lg mt-6">
                        <h3 className="text-xl font-primaryBold text-color3">اطلاعات پروژه</h3>
                        <p><strong>نام پروژه:</strong> {projectName}</p>
                        <p><strong>توضیحات:</strong> {description}</p>
                        <p><strong>تکنولوژی‌ها:</strong> {technologies.join(", ")}</p>
                        <p><strong>روش پرداخت:</strong> {paymentMethod}</p>
                        <p><strong>ارز پرداختی:</strong> {currency}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Room;
