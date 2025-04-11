import { motion } from "framer-motion"
import { FaProjectDiagram } from "react-icons/fa"

const HeaderProject = () => {
    return (
        <div>
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
        </div>
    )
}

export default HeaderProject;