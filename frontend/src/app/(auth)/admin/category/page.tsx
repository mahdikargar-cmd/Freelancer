'use client'

import CreateCategoryForm from "@/components/CreateCategoryForm";
import Skill from "@/app/(auth)/admin/category/Skill";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CategorySetting = () => {
  const [activeTab, setActiveTab] = useState<string>('CreateCategoryForm');

  const tabs = [
    { id: 'CreateCategoryForm', label: ' مدیریت دسته بندی' },
    { id: 'Skill', label: 'مدیریت مهارت ها' },
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
      <div className="w-full max-w-4xl mx-auto mt-10 p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-color1/90 to-color5/50 border border-color5/30 shadow-2xl shadow-color9/10">
        {/* Header tabs */}
        <div className="border-b border-color5/20 pb-3 mb-8">
          <ul className="flex gap-8 justify-center">
            {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-3 text-xl font-primaryMedium transition-colors
                  ${activeTab === tab.id ? 'text-color4' : 'text-color7 hover:text-color2'}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            className="absolute bottom-[-13px] left-0 right-0 h-[3px] bg-gradient-to-r from-color4 to-color8"
                            layoutId="underline"
                            transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                        />
                    )}
                  </button>
                </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="bg-color1/20 p-8 rounded-2xl border border-color5/20 backdrop-blur-lg">
          <AnimatePresence mode='wait'>
            <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabVariants}
                transition={{ duration: 0.25 }}
            >
              {activeTab === 'CreateCategoryForm' ? (
                  <CreateCategoryForm />
              ) : (
                  <Skill />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
  );
}

export default CategorySetting;