'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { FaProjectDiagram, FaRegStickyNote, FaTools, FaMoneyBillWave, FaDollarSign, FaCheckCircle, FaTimes } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdLibraryAddCheck } from "react-icons/md";
import { motion } from "framer-motion";

// نوع داده‌ای برای دسته‌بندی‌ها
type Category = {
    id: number
    name: string
    parentCategory: Category | null
}

// انواع داده‌ای فرم
type ProjectFormData = {
    subject: string
    description: string
    priceStarted: string
    priceEnded: string
    skill: string
    deadline: string
    type: 'FIXED' | 'HOURLY'
    categoryId: string
}

// نوع داده‌ای نهایی که به سرور ارسال می‌شود
type ProjectPayload = {
    subject: string
    description: string
    priceStarted: number
    priceEnded: number
    skills: { id: number; name: string }[]
    category: Category
    suggested: number
    deadline: number
    type: 'FIXED' | 'HOURLY'
    suggestions: any[]
    createdDate: string
    endDate: string
    status: 'OPEN'
}

interface Data {
    name: string; // فرض بر این است که هر مهارت یک شیء با خصوصیت name دارد
}

const Room = () => {
    const token = Cookies.get('token');
    const [formData, setFormData] = useState<ProjectFormData>({
        subject: '',
        description: '',
        priceStarted: '',
        priceEnded: '',
        skill: '',
        deadline: '',
        type: 'FIXED',
        categoryId: '',
    })
    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState<Category[]>([])
    const [skills, setSkills] = useState<string[]>([]) // آرایه‌ای برای ذخیره مهارت‌ها
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [disable, setDisable] = useState<boolean>(false);
    // دریافت دسته‌بندی‌ها از API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/app/getCategories', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!res.ok) throw new Error('خطا در دریافت دسته‌بندی‌ها')
                const data: Category[] = await res.json()
                setCategories(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchCategories()
    }, [token])

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleAddSkill = () => {
        if (formData.skill.trim()) {
            setSkills(prevSkills => [...prevSkills, formData.skill])
            setFormData(prev => ({ ...prev, skill: '' })) // پاک کردن فیلد پس از اضافه کردن مهارت
        }
    }
    useEffect(() => {
        fetch("/api/app/skills", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data: Data[]) => {
                // فقط نام مهارت‌ها را از داده‌ها استخراج می‌کنیم
                const skillNames = data.map((skill) => skill.name);
                setSkills(skillNames); // مهارت‌ها به صورت آرایه‌ای از رشته‌ها ذخیره می‌شود
            })
            .catch((err) => {
                alert(err); // در صورت خطا نمایش داده می‌شود
            });
    }, []);

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const selectedCategory = categories.find(
            cat => cat.id === parseInt(formData.categoryId)
        )

        if (!selectedCategory) {
            setMessage('لطفاً یک دسته‌بندی معتبر انتخاب کنید.')
            setLoading(false)
            return
        }

        const payload: ProjectPayload = {
            subject: formData.subject,
            description: formData.description,
            priceStarted: parseFloat(formData.priceStarted),
            priceEnded: parseFloat(formData.priceEnded),
            skills: skills.map(skill => ({ id: 1, name: skill })), // تبدیل آرایه مهارت‌ها
            category: selectedCategory,
            suggested: 0,
            deadline: parseInt(formData.deadline),
            type: formData.type,
            suggestions: [],
            createdDate: new Date().toISOString().split('T')[0],
            endDate: new Date(
                Date.now() + parseInt(formData.deadline) * 24 * 60 * 60 * 1000
            )
                .toISOString()
                .split('T')[0],
            status: 'OPEN',
        }

        try {
            const res = await fetch('/api/app/createProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error('Server error')

            setMessage('پروژه با موفقیت ثبت شد ✅')
            setFormData({
                subject: '',
                description: '',
                priceStarted: '',
                priceEnded: '',
                skill: '',
                deadline: '',
                type: 'FIXED',
                categoryId: '',
            })
            setSkills([]) // پاک کردن مهارت‌ها بعد از ثبت پروژه
        } catch (err) {
            setMessage('❌ خطا در ارسال اطلاعات')
        } finally {
            setLoading(false);
            setDisable(true);
        }
    }
    const nextStep = () => {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const progressPercentage = (step / 8) * 100;
    return (
        <div className="min-h-screen bg-light-color1 dark:bg-black text-light-color2 dark:text-color2">
            <div className="max-w-screen-md mx-auto py-8 px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <div className="inline-block p-3 rounded-full bg-light-color5/20 dark:bg-color5/20 mb-4">
                        <FaProjectDiagram className="text-3xl text-light-color4 dark:text-color4" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-primaryBold mb-2 text-light-color4 dark:text-color4">
                        میخوای پروژه‌ای ثبت کنی؟
                    </h1>
                    <p className="text-lg font-primaryMedium text-light-color3 dark:text-color3">
                        ما راهنماییت می‌کنیم که چجوری بتونی پروژه‌ات رو داخل سایت ثبت کنی
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2 text-xs font-primaryMedium">
                        <span className="text-light-color2 dark:text-color2">مرحله {step} از 8</span>
                        <span className="text-light-color4 dark:text-color4">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="h-2 w-full bg-light-color6 dark:bg-color6 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: `${((step - 1) / 8) * 100}%` }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-light-color4 dark:bg-color4 rounded-full"
                        />
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-light-color6 dark:bg-black border border-light-color5 dark:border-color5 rounded-2xl shadow-lg p-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">1 از 8</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaRegStickyNote className="text-light-color4 dark:text-color4 text-xl" /> اسم پروژه‌ات چی باشه؟
                                </h2>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="عنوان پروژه"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                    required
                                />
                                <p className="text-light-color4 dark:text-color4 font-primaryLight my-2">
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
                                <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">2 از 8</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaRegStickyNote className="text-light-color4 dark:text-color4 text-xl" /> توضیحات پروژه‌ات
                                </h2>
                                <textarea
                                    name="description"
                                    placeholder="توضیحات پروژه"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm min-h-[150px] focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                    required
                                />
                            </motion.div>
                        )}
                        {step === 3 && ( // فرض بر این است که step برابر با 3 است
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">
                                    3 از 8
                                </h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaTools className="text-light-color4 dark:text-color4 text-xl" /> تکنولوژی‌ها و مهارت‌ها
                                </h2>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        name="skill"
                                        placeholder="تا پنج مهارت میتونی اضافه کنید"
                                        value={formData.skill}
                                        onChange={handleChange}
                                        className="flex-1 p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className="bg-yellow-400 text-light-color1 dark:text-color1 p-3 rounded-lg font-primaryBold hover:bg-yellow-600 transition-all delay-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <IoMdAddCircle className="text-light-color5 dark:text-color5 text-2xl" />
                                    </button>
                                </div>
                                <p className="text-light-color4 dark:text-color4 font-primaryLight mb-3">
                                    مهارت‌های اضافه شده: {skills.length}/5
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {skills.length > 0 ? (
                                        skills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="bg-blue-500 text-light-color1 dark:text-color1 px-3 py-2 rounded-lg font-primaryBold shadow-md flex items-center gap-2"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    className="text-light-color1 dark:text-color1 hover:text-white transition-colors"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-light-color4 dark:text-color4">هیچ مهارتی اضافه نشده است.</p>
                                    )}
                                </div>
                                {message && <p className="mt-4 text-center text-lg text-green-500">{message}</p>}
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">4 از 8</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaMoneyBillWave className="text-light-color4 dark:text-color4 text-xl" /> چجوری می‌خوای هزینه رو پرداخت کنی؟
                                </h2>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                >
                                    <option value="FIXED">پروژه‌ای (FIXED)</option>
                                    <option value="HOURLY">ساعتی (HOURLY)</option>
                                </select>
                            </motion.div>
                        )}

                        {step === 5 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">5 از 8</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaDollarSign className="text-light-color4 dark:text-color4 text-xl" /> قیمت پروژه رو تعیین کن
                                </h2>
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        type="number"
                                        name="priceStarted"
                                        placeholder="حداقل قیمت (تومان)"
                                        value={formData.priceStarted}
                                        onChange={handleChange}
                                        className="flex-1 p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                        required
                                    />

                                    <input
                                        type="number"
                                        name="priceEnded"
                                        placeholder="حداکثر قیمت (تومان)"
                                        value={formData.priceEnded}
                                        onChange={handleChange}
                                        className="flex-1 p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                        required
                                    />
                                </div>
                            </motion.div>
                        )}
                        {step === 6 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">6 از 8</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaDollarSign className="text-light-color4 dark:text-color4 text-xl" /> مهلت انجام پروژه رو تعیین کن
                                </h2>
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        type="number"
                                        name="deadline"
                                        placeholder="مهلت انجام (به روز)"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className="flex-1 p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                        required
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 7 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">7 از 8</h1>
                                <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                                    <FaMoneyBillWave className="text-light-color4 dark:text-color4 text-xl" /> مهارت های مرتبط با پروژه رو تعیین کن
                                </h2>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                    required
                                >
                                    <option value="">-- انتخاب دسته‌بندی --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.parentCategory
                                                ? `${cat.parentCategory.name} > ${cat.name}`
                                                : cat.name}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>
                        )}
                        {step === 8 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-light-color5 dark:bg-color5 p-6 rounded-2xl shadow-lg font-primaryMedium relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 left-0 h-2 bg-light-color4 dark:bg-color4 rounded-t-2xl"></div>
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="font-primaryRegular text-light-color1 dark:text-white text-lg flex items-center gap-2">
                                        <FaCheckCircle className="text-green-400 text-2xl" />
                                        8 از 8
                                    </h1>
                                    <h2 className="text-xl font-primaryBold text-light-color3 dark:text-color3 flex items-center gap-2">
                                        <FaProjectDiagram className="text-light-color4 dark:text-color4 text-2xl" />
                                        اطلاعات پروژه
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    <p className="flex items-center gap-2">
                                        <FaRegStickyNote className="text-light-color4 dark:text-color4 text-xl" />
                                        <strong>نام پروژه:</strong> {formData.subject}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaRegStickyNote className="text-light-color4 dark:text-color4 text-xl" />
                                        <strong>توضیحات:</strong> {formData.description}
                                    </p>
                                    <div>
                                        <h3 className="flex items-center gap-2 text-lg font-primaryBold">
                                            <FaTools className="text-light-color4 dark:text-color4 text-xl" />
                                            تکنولوژی‌ها:
                                        </h3>
                                        <ul className="flex flex-wrap gap-2 mt-2">
                                            {skills.map((tech, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-blue-500 text-light-color1 dark:text-color1 px-4 py-2 rounded-lg font-primaryBold shadow-md flex items-center gap-2"
                                                >
                                                    {tech} <MdLibraryAddCheck className="text-white text-lg" />
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="flex items-center gap-2">
                                        <FaMoneyBillWave className="text-light-color4 dark:text-color4 text-xl" />
                                        <strong>روش پرداخت:</strong> {formData.type}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaDollarSign className="text-light-color4 dark:text-color4 text-xl" />
                                        <strong>قیمت پرداختی:</strong> {formData.priceStarted} تا {formData.priceEnded}
                                    </p>
                                </div>
                                <div className="absolute -bottom-10 -right-10 opacity-20">
                                    <FaProjectDiagram className="text-light-color4 dark:text-color4 text-9xl" />
                                </div>
                            </motion.div>
                        )}
                        {step === 8 && (
                            <div className="mt-6">
                                <button
                                    className="w-full py-4 bg-light-color8 dark:bg-color8 hover:bg-light-color9 dark:hover:bg-color9 text-light-color1 dark:text-color1 rounded-lg font-primaryBold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                    type='submit'
                                    onClick={() => setLoading(true)}
                                    disabled={disable}
                                >
                                    {loading ? 'در حال ارسال...' : 'ثبت پروژه'} <FaCheckCircle className="text-light-color5 dark:text-color5 text-xl" />
                                </button>
                                {message && <p className="mt-4 text-center text-lg font-primaryMedium">{message}</p>}
                            </div>
                        )}
                    </form>
                    {step < 8 && (
                        <div className="mt-8 flex flex-col md:flex-row gap-3">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="md:w-1/3 py-3 px-6 bg-transparent border border-light-color5 dark:border-color5 text-light-color2 dark:text-color2 rounded-lg font-primaryMedium hover:bg-light-color5/10 dark:hover:bg-color5/10 transition-all duration-300"
                                >
                                    بازگشت
                                </button>
                            )}
                            <button
                                onClick={nextStep}
                                disabled={(step === 1 && !formData.subject) || (step === 2 && !formData.description) || (step === 3 && skills.length === 0)}
                                className={`flex-1 py-3 px-6 bg-light-color8 dark:bg-color8 hover:bg-light-color9 dark:hover:bg-color9 text-light-color1 dark:text-color1 rounded-lg font-primaryBold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${((step === 1 && !formData.subject) || (step === 2 && !formData.description) || (step === 3 && skills.length === 0))
                                    ? "opacity-50 cursor-not-allowed hover:scale-100"
                                    : ""
                                    }`}
                            >
                                ثبت <FaCheckCircle className="text-light-color5 dark:text-color5 text-xl" />
                            </button>
                        </div>
                    )}


                </motion.div>
            </div>
        </div>
    )
}

export default Room;