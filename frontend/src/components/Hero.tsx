"use client";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
    };

    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    return (
        <div className="dark:bg-color6 bg-light-color1 mt-2">
            <motion.section
                className="py-20 relative overflow-hidden"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
            >
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h1
                            className="text-2xl md:text-3xl lg:text-5xl font-primaryBold dark:text-color2 text-light-color2 mb-6"
                            variants={slideUp}
                        >
                            بهترین فریلنسر بیزینس خود را پیدا کنید
                        </motion.h1>
                        <motion.p
                            className="text-lg font-primaryRegular dark:text-color3 text-light-color3 mb-10"
                            variants={slideUp}
                        >
                            طبق مهارت های مورد نیاز انتخاب کنید
                        </motion.p>
                        {/* Search Box */}
                        <motion.div
                            className="relative max-w-2xl mx-auto"
                            variants={slideUp}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="جستجو براساس مهارت"
                                className="w-full py-4 px-6 rounded-full shadow-lg dark:bg-color5 bg-light-color5 dark:text-color2 text-light-color2 border dark:border-color7 border-light-color7 focus:outline-none dark:focus:border-color4 focus:border-light-color4 font-primaryMedium text-center"
                            />
                            <motion.button
                                className="absolute right-2 top-2 dark:bg-color4 bg-light-color4 dark:text-color1 text-light-color1 p-2 rounded-full dark:hover:bg-color8 hover:bg-light-color8 transition"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <Search size={24} />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
