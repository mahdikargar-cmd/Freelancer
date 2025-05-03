import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaProjectDiagram,
  FaRegStickyNote,
  FaTools,
  FaMoneyBillWave,
  FaDollarSign
} from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { IoTime } from "react-icons/io5";
import { MdLibraryAddCheck } from "react-icons/md";

interface ProjectSummaryProps {
  formData: {
    subject: string;
    description: string;
    priceStarted: string;
    priceEnded: string;
    type: 'FIXED' | 'HOURLY';
    deadline: string;
    categoryId: number | null;
  };
  skills: string[];
  categories: Array<{
    id: number;
    name: string;
    parentCategory: {
      id: number;
      name: string;
      parentCategory: any;
    } | null;
  }>;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ formData, skills, categories }) => {
  const getFullCategoryPath = (categoryId: number | null): string => {
    if (!categoryId) return "انتخاب نشده";
    
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return "نامشخص";
    
    const pathParts: string[] = [category.name];
    let currentCategory = category;
    
    while (currentCategory.parentCategory) {
      pathParts.unshift(currentCategory.parentCategory.name);
      currentCategory = currentCategory.parentCategory;
    }
    
    return pathParts.join(" > ");
  };

  return (
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
          <strong>قیمت پرداختی:</strong> {parseInt(formData.priceStarted).toLocaleString()} تومان تا{' '}
          {parseInt(formData.priceEnded).toLocaleString()} تومان
        </p>
        <p className="flex items-center gap-2">
          <IoTime className="text-light-color4 dark:text-color4 text-xl" />
          <strong>مهلت انجام پروژه:</strong> {formData.deadline} روز
        </p>
        <p className="flex items-center gap-2">
          <GoPackage className="text-light-color4 dark:text-color4 text-xl" />
          <strong>دسته بندی:</strong> {getFullCategoryPath(formData.categoryId)}
        </p>
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-20">
        <FaProjectDiagram className="text-light-color4 dark:text-color4 text-9xl" />
      </div>
    </motion.div>
  );
};

export default ProjectSummary;