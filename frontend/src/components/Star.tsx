import { motion } from "framer-motion";
import { Star } from "lucide-react";
const StarAnime = () => {
    return (
        <motion.div
            className="fixed bottom-8 left-8 dark:bg-color4 bg-light-color4 dark:text-color1 text-light-color1 p-4 rounded-full shadow-lg cursor-pointer z-50"
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
    )
}

export default StarAnime;