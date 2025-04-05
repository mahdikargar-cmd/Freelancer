"use client";
import { motion } from "framer-motion";
import { Code, Star, TrendingUp, Briefcase } from "lucide-react";
import { ReactNode } from "react";

const categories = [
    { name: "طراح وب", icon: <Code size={20} /> },
    { name: "گرافیست", icon: <Star size={20} /> },
    { name: "بازاریابی", icon: <TrendingUp size={20} /> },
    { name: "تولید محتوا", icon: <Briefcase size={20} /> },
];

type Category = {
    name: string;
    icon: ReactNode;
};

type Props = {
    categories: Category[];
};

export default function CategoriesSection() {
    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity },
    };

    return (
        <motion.section
            className="py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-primaryBold text-center mb-12 dark:text-color2 text-light-color2"
                    variants={slideUp}
                >
                    دسته بندی عناوین
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="dark:bg-color5 bg-light-color5 rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:border-color4  hover:border transition cursor-pointer"
                            variants={slideUp}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 25px -5px rgba(202, 255, 51, 0.2)",
                                borderColor: "#CAFF33",
                            }}
                        >
                            <motion.div
                                className="dark:bg-color6 bg-light-color6 p-3 rounded-full mb-4 dark:text-color4 text-light-color4"
                                animate={pulseAnimation}
                            >
                                {category.icon}
                            </motion.div>
                            <h3 className="font-primaryMedium dark:text-color2 text-light-color4">{category.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
