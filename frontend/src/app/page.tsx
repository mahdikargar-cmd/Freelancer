"use client"
import { Search, Briefcase, Code, Star, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [darkMode, setDarkMode] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const categories = [
        { name: "طراح وب", icon: <Code size={20} /> },
        { name: "گرافیست", icon: <Star size={20} /> },
        { name: "بازاریابی", icon: <TrendingUp size={20} /> },
        { name: "تولید محتوا", icon: <Briefcase size={20} /> },
    ];

    const topFreelancers = [
        { id: 1, name: "سارا صکاک", rating: 4.9, specialty: "طراحی وب", projects: 87, image: "/api/placeholder/64/64" },
        { id: 2, name: "علی شقاقی", rating: 4.8, specialty: "UI/UX دیزاینر", projects: 65, image: "/api/placeholder/64/64" },
        { id: 3, name: "مینا محمدی", rating: 4.9, specialty: "توسعه دهنده اپلیکیشن موبایل", projects: 54, image: "/api/placeholder/64/64" },
    ];

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
    };

    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-color1' : 'bg-light-color5'}`}>
            {/* Hero Section */}
            <motion.section
                className="bg-color1 py-20 relative overflow-hidden"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-color6 to-color5 opacity-80"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h1
                            className="text-4xl md:text-5xl font-primaryBold text-color2 mb-6"
                            variants={slideUp}
                        >
                            بهترین فریلنسر بیزینس خود را پیدا کنید
                        </motion.h1>
                        <motion.p
                            className="text-lg font-primaryRegular text-color3 mb-10"
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
                                className="w-full py-4 px-6 rounded-full shadow-lg bg-color5 text-color2 border border-color7 focus:outline-none focus:border-color4"
                            />
                            <motion.button
                                className="absolute right-2 top-2 bg-color4 text-color1 p-2 rounded-full hover:bg-color8 transition"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <Search size={24} />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Categories Section */}
            <motion.section
                className="py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerChildren}
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-primaryBold text-center mb-12 text-color2"
                        variants={slideUp}
                    >
                        دسته بندی عناوین
                    </motion.h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="bg-color5 rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:border-color4 hover:border transition cursor-pointer"
                                variants={slideUp}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px -5px rgba(202, 255, 51, 0.2)",
                                    borderColor: "#CAFF33"
                                }}
                            >
                                <motion.div
                                    className="bg-color6 p-3 rounded-full mb-4 text-color4"
                                    animate={pulseAnimation}
                                >
                                    {category.icon}
                                </motion.div>
                                <h3 className="font-primaryMedium text-color2">{category.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* بخش چگونه کار می‌کند */}
            <motion.section
                className="py-16 bg-color6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerChildren}
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-primaryBold text-center mb-12 text-color2"
                        variants={slideUp}
                    >
                        ددلاین چگونه کار می‌کند؟
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            className="bg-color5 p-6 rounded-xl shadow-md border-l-4 border-color4 text-center"
                            variants={slideUp}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                        >
                            <motion.div
                                className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 bg-color1 text-color4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Search size={24} />
                            </motion.div>
                            <h3 className="font-primaryDemibold text-xl mb-2 text-color2">۱. ثبت پروژه</h3>
                            <p className="text-color7 font-primaryLight">پروژه خود را توضیح دهید و با فریلنسرهای ماهر مطابقت داده شوید.</p>
                        </motion.div>

                        <motion.div
                            className="bg-color5 p-6 rounded-xl shadow-md border-l-4 border-color4 text-center"
                            variants={slideUp}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                        >
                            <motion.div
                                className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 bg-color1 text-color4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Users size={24} />
                            </motion.div>
                            <h3 className="font-primaryDemibold text-xl mb-2 text-color2">۲. استخدام بهترین‌ها</h3>
                            <p className="text-color7 font-primaryLight">پروفایل‌ها و نمونه‌کارها را بررسی کرده و بهترین گزینه را انتخاب کنید.</p>
                        </motion.div>

                        <motion.div
                            className="bg-color5 p-6 rounded-xl shadow-md border-l-4 border-color4 text-center"
                            variants={slideUp}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                        >
                            <motion.div
                                className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 bg-color1 text-color4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Star size={24} />
                            </motion.div>
                            <h3 className="font-primaryDemibold text-xl mb-2 text-color2">۳. دریافت کار باکیفیت</h3>
                            <p className="text-color7 font-primaryLight">به‌صورت مؤثر همکاری کرده و پروژه خود را کامل تحویل بگیرید.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* بخش فریلنسرهای برتر */}
            <motion.section
                className="py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerChildren}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-10">
                        <motion.h2
                            className="text-3xl font-primaryBold text-color2"
                            variants={slideUp}
                        >
                            فریلنسرهای برتر
                        </motion.h2>
                        <motion.a
                            href="#"
                            className="text-color4 font-primaryMedium hover:text-color8 transition"
                            variants={slideUp}
                            whileHover={{ scale: 1.05, x: -5 }}
                        >
                            مشاهده همه
                        </motion.a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {topFreelancers.map((freelancer, index) => (
                            <motion.div
                                key={freelancer.id}
                                className="bg-color5 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-color6 hover:border-color4"
                                variants={slideUp}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: index * 0.2, duration: 0.5 }
                                }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(202, 255, 51, 0.2)" }}
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <motion.img
                                            src={freelancer.image}
                                            alt={freelancer.name}
                                            className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-color4"
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                        <div>
                                            <h3 className="font-primaryDemibold text-lg text-color2">{freelancer.name}</h3>
                                            <p className="text-color7 font-primaryRegular">{freelancer.specialty}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm text-color7 mb-4 font-primaryLight">
                                        <span className="flex items-center">
                                            <motion.span
                                                animate={{ rotate: [0, 20, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                            >
                                                <Star size={16} className="text-color4 mr-1" fill="currentColor" />
                                            </motion.span>
                                            {freelancer.rating}
                                        </span>
                                        <span>{freelancer.projects} پروژه</span>
                                    </div>

                                    <motion.button
                                        className="w-full bg-color6 text-color4 font-primaryMedium py-2 rounded-lg hover:bg-color4 hover:text-color1 transition"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        مشاهده پروفایل
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* بخش دعوت به اقدام (CTA) */}
            <motion.section
                className="py-16 bg-color5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        className="text-3xl font-primaryBold text-color2 mb-6"
                        variants={slideUp}
                    >
                        آماده شروع هستید؟
                    </motion.h2>
                    <motion.p
                        className="text-color7 mb-8 max-w-2xl mx-auto font-primaryRegular"
                        variants={slideUp}
                    >
                        به هزاران کارفرما بپیوندید که بهترین فریلنسرها را برای پروژه‌های خود استخدام کرده‌اند.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        variants={staggerChildren}
                    >
                        <motion.button
                            className="bg-color4 text-color1 font-primaryDemibold px-8 py-3 rounded-lg hover:bg-color8 transition"
                            variants={slideUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            استخدام فریلنسر
                        </motion.button>
                        <motion.button
                            className="bg-transparent text-color2 font-primaryMedium px-8 py-3 rounded-lg border border-color7 hover:border-color4 hover:text-color4 transition"
                            variants={slideUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            فریلنسر شوید
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            <motion.div
                className="fixed bottom-8 left-8 bg-color4 text-color1 p-4 rounded-full shadow-lg cursor-pointer z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 25px -5px rgba(202, 255, 51, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <Star size={24} />
                </motion.div>
            </motion.div>
        </div>
    );
}