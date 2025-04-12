import React, { useState, RefObject } from 'react';
import { motion } from 'framer-motion';
import {
    FaRegStickyNote,
    FaTools,
    FaMoneyBillWave,
    FaDollarSign,
    FaCheckCircle
} from "react-icons/fa";
import { IoTime, IoAddCircle } from "react-icons/io5";
import { CategorySelect } from './CategoryCustom';
import ProjectSummary from './ProjectSummary';

interface MultiStepFormProps {
    step: number;
    onCategoryChange: (val: number | null) => void;
    formData: {
        subject: string;
        description: string;
        priceStarted: string;
        priceEnded: string;
        skill: string;
        deadline: string;
        type: 'FIXED' | 'HOURLY';
        categoryId: number | null;
    };
    skills: string[];
    categories: Category[];
    filteredSkills: string[];
    showSuggestions: boolean;
    loading: boolean;
    disable: boolean;
    message: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSelectSkill: (skill: string) => void;
    handleRemoveSkill: (skill: string) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    setShowSuggestions: (show: boolean) => void;
    autocompleteRef: React.RefObject<HTMLDivElement | null>;
}

type Category = {
    id: number;
    name: string;
    parentCategory: Category | null;
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({
    step,
    formData,
    skills,
    categories,
    filteredSkills,
    showSuggestions,
    loading,
    disable,
    message,
    handleChange,
    handleSelectSkill,
    handleRemoveSkill,
    handleKeyDown,
    setShowSuggestions,
    autocompleteRef,
    onCategoryChange
}) => {
    return (
        <div className="space-y-4">
            {/* Step 1: Project Name */}
            {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

            {/* Step 3: Skills */}
            {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">3 از 8</h1>
                    <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                        <FaTools className="text-light-color4 dark:text-color4 text-xl" /> تکنولوژی‌ها و مهارت‌ها
                    </h2>
                    <div className="flex gap-2 mb-4 relative" ref={autocompleteRef}>
                        <input
                            type="text"
                            name="skill"
                            placeholder="مهارت را جستجو و انتخاب کنید"
                            value={formData.skill}
                            onChange={handleChange}
                            onFocus={() => formData.skill.trim() !== '' && setShowSuggestions(true)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                        />
                        {showSuggestions && filteredSkills.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-light-color6 dark:bg-color6 border border-light-color5 dark:border-color5 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                {filteredSkills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="p-3 hover:bg-light-color5/20 dark:hover:bg-color5/20 cursor-pointer flex items-center justify-between font-primaryMedium"
                                        onClick={() => handleSelectSkill(skill)}
                                    >
                                        <span>{skill}</span>
                                        <IoAddCircle className="text-green-500 text-xl" />
                                    </div>
                                ))}
                            </div>
                        )}
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
                </motion.div>
            )}

            {/* Step 4: Payment Type */}
            {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

            {/* Step 5: Price */}
            {step === 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">5 از 8</h1>
                    <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                        <FaDollarSign className="text-light-color4 dark:text-color4 text-xl" /> قیمت پروژه رو تعیین کن
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 min-w-0">
                            <input
                                type="number"
                                name="priceStarted"
                                placeholder="حداقل قیمت (تومان)"
                                value={formData.priceStarted}
                                onChange={handleChange}
                                className="w-full p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                required
                            />
                            <div className='font-primaryMedium mt-2 text-center'>
                                {formData.priceStarted && !isNaN(parseInt(formData.priceStarted)) && (
                                    <p className="truncate">{parseInt(formData.priceStarted).toLocaleString()}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <input
                                type="number"
                                name="priceEnded"
                                placeholder="حداکثر قیمت (تومان)"
                                value={formData.priceEnded}
                                onChange={handleChange}
                                className="w-full p-3 bg-light-color6 dark:bg-color6 text-light-color3 dark:text-color3 border border-light-color5 dark:border-color5 rounded-lg font-primaryMedium shadow-sm focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                required
                            />
                            <div className='font-primaryMedium mt-2 text-center'>
                                {formData.priceEnded && !isNaN(parseInt(formData.priceEnded)) && (
                                    <p className="truncate">{parseInt(formData.priceEnded).toLocaleString()}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Step 6: Deadline */}
            {step === 6 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">6 از 8</h1>
                    <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                        <IoTime className="text-light-color4 dark:text-color4 text-xl" /> مهلت انجام پروژه رو تعیین کن
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

            {/* Step 7: Category */}
            {step === 7 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h1 className="font-primaryDemibold text-xl text-light-color1 dark:text-white mb-3">7 از 8</h1>
                    <h2 className="text-lg font-primaryMedium mb-4 flex items-center gap-2">
                        <FaMoneyBillWave className="text-light-color4 dark:text-color4 text-xl" /> مهارت های مرتبط با پروژه رو تعیین کن
                    </h2>
                    <CategorySelect
                        categories={categories}
                        value={formData.categoryId}
                        onChange={onCategoryChange}
                    />
                </motion.div>
            )}

            {/* Step 8: Summary */}
            {step === 8 && (
                <>
                    <ProjectSummary formData={formData} skills={skills} categories={categories} />
                    <div className="mt-6">
                        <button
                            className="w-full py-4 bg-light-color8 dark:bg-color8 hover:bg-light-color9 dark:hover:bg-color9 text-light-color1 dark:text-color1 rounded-lg font-primaryBold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                            type="submit"
                            disabled={disable}
                        >
                            {loading ? 'در حال ارسال...' : 'ثبت پروژه'}
                            <FaCheckCircle className="text-light-color5 dark:text-color5 text-xl" />
                        </button>
                        {message && <p className="mt-4 text-center text-lg font-primaryMedium">{message}</p>}
                    </div>
                </>
            )}
        </div>
    );
};

export default MultiStepForm;