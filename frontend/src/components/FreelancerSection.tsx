// FreelancerSection.tsx
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Freelancer {
  id: number;
  name: string;
  rating: number;
  specialty: string;
  projects: number;
  image: string;
}

const topFreelancers: Freelancer[] = [
  { id: 1, name: "سارا صکاک", rating: 4.9, specialty: "طراحی وب", projects: 87, image: "/api/placeholder/64/64" },
  { id: 2, name: "علی شقاقی", rating: 4.8, specialty: "UI/UX دیزاینر", projects: 65, image: "/api/placeholder/64/64" },
  { id: 3, name: "مینا محمدی", rating: 4.9, specialty: "توسعه دهنده اپلیکیشن موبایل", projects: 54, image: "/api/placeholder/64/64" },
];

const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const FreelancerSection = () => {
  return (
    <motion.section
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={slideUp}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <motion.h2
            className="text-3xl font-primaryBold dark:text-color2 text-light-color2"
            variants={slideUp}
          >
            فریلنسرهای برتر
          </motion.h2>
          <motion.a
            href="#"
            className="dark:text-color4 text-light-color4 font-primaryMedium dark:hover:text-color8 hover:text-light-color8 transition"
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
              className="dark:bg-color5 bg-light-color5 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-color6 dark:hover:border-color4 hover:border-light-color4"
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
                    className="w-16 h-16 rounded-full mr-4 object-cover border-2 dark:border-color4 border-light-color4"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <h3 className="font-primaryDemibold text-lg text-color2">{freelancer.name}</h3>
                    <p className="dark:text-color7 text-light-color7 font-primaryRegular">{freelancer.specialty}</p>
                  </div>
                </div>

                <div className="flex justify-between text-sm dark:text-color7 text-light-color7 mb-4 font-primaryLight">
                  <span className="flex items-center">
                    <motion.span
                      animate={{ rotate: [0, 20, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Star size={16} className="dark:text-color4 text-light-color4 mr-1" fill="currentColor" />
                    </motion.span>
                    {freelancer.rating}
                  </span>
                  <span>{freelancer.projects} پروژه</span>
                </div>

                <motion.button
                  className="w-full dark:bg-color6 bg-light-color6 dark:text-color4 text-light-color4 font-primaryMedium py-2 rounded-lg dark:hover:bg-color4 hover:bg-light-color4 dark:hover:text-color1 hover:text-light-color1 transition"
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
  );
};

export default FreelancerSection;
