import { motion } from "framer-motion";

const CTA = () => {
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
    return (
        < motion.section
            className="py-16 dark:bg-color6 bg-light-color1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }
            }
            variants={fadeIn}
        >
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    className="text-3xl font-primaryBold dark:text-color2 text-light-color2 mb-6"
                    variants={slideUp}
                >
                    آماده شروع هستید؟
                </motion.h2>
                <motion.p
                    className="dark:text-color7 text-light-color7 mb-8 max-w-2xl mx-auto font-primaryRegular"
                    variants={slideUp}
                >
                    به هزاران کارفرما بپیوندید که بهترین فریلنسرها را برای پروژه‌های خود استخدام کرده‌اند.
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={staggerChildren}
                >
                    <motion.button
                        className="dark:bg-color4 bg-light-color4 dark:text-color1 text-light-color1 font-primaryDemibold px-8 py-3 rounded-lg dark:hover:bg-color8 hover:bg-light-color8 transition"
                        variants={slideUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        استخدام فریلنسر
                    </motion.button>
                    <motion.button
                        className="bg-transparent dark:text-color2 text-light-color2 font-primaryMedium px-8 py-3 rounded-lg border dark:border-color7 border-light-color7 dark:hover:border-color4 hover:border-light-color4 dark:hover:text-color4 hover:text-light-color4 transition"
                        variants={slideUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        فریلنسر شوید
                    </motion.button>
                </motion.div>
            </div>
        </motion.section >
    )
}

export default CTA;