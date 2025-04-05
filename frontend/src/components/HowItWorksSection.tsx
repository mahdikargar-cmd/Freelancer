import { motion } from "framer-motion";
import StepCard from "./StepCard"; 
import { Search, Star, Users } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "۱. ثبت پروژه",
    description:
      "پروژه خود را توضیح دهید و با فریلنسرهای ماهر مطابقت داده شوید.",
    icon: <Search size={24} />,
  },
  {
    id: 2,
    title: "۲. استخدام بهترین‌ها",
    description:
      "پروفایل‌ها و نمونه‌کارها را بررسی کرده و بهترین گزینه را انتخاب کنید.",
    icon: <Users size={24} />,
  },
  {
    id: 3,
    title: "۳. دریافت کار باکیفیت",
    description:
      "به‌صورت مؤثر همکاری کرده و پروژه خود را کامل تحویل بگیرید.",
    icon: <Star size={24} />,
  },
];

const HowItWorksSection = () => {
  return (
    <motion.section
      className="py-16 dark:bg-color6 bg-light-color1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-primaryBold text-center mb-12 dark:text-color2 text-light-color2"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          ددلاین چگونه کار می‌کند؟
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
