import { motion } from "framer-motion";
import { JSX } from "react";

const StepCard = ({ step }: { step: { title: string, description: string, icon: JSX.Element } }) => {
  return (
    <motion.div
      className="dark:bg-color5 bg-light-color5 p-6 rounded-xl shadow-md border-l-4 dark:border-color4 border-light-color4 text-center"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
    >
      <motion.div
        className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 dark:bg-color1 bg-light-color1 dark:text-color4 text-light-color4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {step.icon}
      </motion.div>
      <h3 className="font-primaryDemibold text-xl mb-2 dark:text-color2 text-light-color2">{step.title}</h3>
      <p className="dark:text-color7 text-light-color7 font-primaryLight">{step.description}</p>
    </motion.div>
  );
};

export default StepCard;
