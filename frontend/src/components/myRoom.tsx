'use client'
import React, { useState, useEffect, useRef, JSX } from 'react'
import Cookies from 'js-cookie'
import {
    FaRegStickyNote,
    FaTools,
    FaMoneyBillWave,
    FaDollarSign,
    FaCheckCircle,
} from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { CategorySelect } from './CategoryCustom';
import HeaderProject from './headerProject';
import ProgressBarProject from './ProgressBarProject';
import ProjectSummary from './ProjectSummary';
import NavigationButtons from './NavigationButton';
import MultiStepForm from './MultiStepForm';
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
    categoryId: number | null
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
        categoryId: null,
    })
    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState<Category[]>([])
    const [skills, setSkills] = useState<string[]>([]) // آرایه‌ای برای ذخیره مهارت‌ها
    const [allSkills, setAllSkills] = useState<string[]>([]) // لیست تمام مهارت‌های سیستم
    const [filteredSkills, setFilteredSkills] = useState<string[]>([]) // مهارت‌های فیلتر شده براساس متن ورودی
    const [showSuggestions, setShowSuggestions] = useState(false) // نمایش پنل پیشنهادها
    const autocompleteRef = useRef<HTMLDivElement>(null) // رفرنس برای کنترل کلیک خارج از پنل
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [disable, setDisable] = useState<boolean>(false)

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

    // کنترل کلیک خارج از پنل پیشنهادها
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // دریافت تمام مهارت‌ها از API
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
                setAllSkills(skillNames); // ذخیره تمام مهارت‌ها
            })
            .catch((err) => {
                alert(err); // در صورت خطا نمایش داده می‌شود
            });
    }, [token]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target

        if (name === 'skill') {
            // فیلتر کردن مهارت‌ها براساس متن ورودی
            const filtered = allSkills.filter(skill =>
                skill.toLowerCase().includes(value.toLowerCase()) &&
                !skills.includes(skill)
            );
            setFilteredSkills(filtered);
            setShowSuggestions(value.trim() !== '');
        }

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectSkill = (selectedSkill: string) => {
        if (!skills.includes(selectedSkill) && skills.length < 5) {
            setSkills(prevSkills => [...prevSkills, selectedSkill]);
        }
        setFormData(prev => ({ ...prev, skill: '' }));
        setShowSuggestions(false);
    }

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        const selectedCategory = categories.find(
            cat => cat.id === formData.categoryId
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
    // کنترل کلیدهای صفحه کلید برای پیمایش در لیست پیشنهادها
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && showSuggestions && filteredSkills.length > 0) {
            e.preventDefault();
            handleSelectSkill(filteredSkills[0]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };
    const renderCategoryOptions = (
        categories: Category[],
        parentId: number | null = null,
        level: number = 0
    ): JSX.Element[] => {
        return categories
            .filter(cat => (cat.parentCategory ? cat.parentCategory.id : null) === parentId)
            .flatMap(cat => {
                const isTopLevel = level === 0;
                const indent = '\u00A0\u00A0'.repeat(level); // هر level دوتا فاصله
                const icon = isTopLevel ? '📁' : '🔖';

                return [
                    <option key={cat.id} value={cat.id}>
                        {`${indent}${icon} ${cat.name}`}
                    </option>,
                    ...renderCategoryOptions(categories, cat.id, level + 1)
                ];
            });
    };
    return (
        <div className="min-h-screen bg-light-color1 dark:bg-black text-light-color2 dark:text-color2">
            <div className="max-w-screen-md mx-auto py-8 px-4 md:px-8">
                {/* Header */}
                <HeaderProject />
                {/* Progress Bar */}
                <ProgressBarProject step={step} progressPercentage={progressPercentage} />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-light-color6 dark:bg-black border border-light-color5 dark:border-color5 rounded-2xl shadow-lg p-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <MultiStepForm
                            step={step}
                            formData={formData}
                            skills={skills}
                            categories={categories}
                            filteredSkills={filteredSkills}
                            showSuggestions={showSuggestions}
                            loading={loading}
                            disable={disable}
                            message={message}
                            handleChange={handleChange}
                            handleSelectSkill={handleSelectSkill}
                            handleRemoveSkill={handleRemoveSkill}
                            handleKeyDown={handleKeyDown}
                            setShowSuggestions={setShowSuggestions}
                            autocompleteRef={autocompleteRef}
                            onCategoryChange={(val) => setFormData(prev => ({ ...prev, categoryId: val }))}
                        />
                    </form>
                    {step < 8 && (
                        <NavigationButtons
                            step={step}
                            formData={formData}
                            skills={skills}
                            prevStep={prevStep}
                            nextStep={nextStep}
                        />
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default Room;