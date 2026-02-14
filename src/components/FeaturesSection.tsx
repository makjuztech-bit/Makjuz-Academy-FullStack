import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Calendar, Briefcase, MessageCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const features = [
  {
    icon: <Briefcase className="w-8 h-8 text-purple-400" />,
    title: "Premium Internships",
    description:
      "Access exclusive internship opportunities with top tech companies. Gain real-world experience and get hired faster.",
  },
  {
    icon: <ClipboardList className="w-8 h-8 text-purple-400" />,
    title: "Project Mentorship",
    description:
      "Struggling with your final year project? Get access to premium templates, documentation, and 1-on-1 expert guidance.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-purple-400" />,
    title: "Placement Success",
    description:
      "From AI-powered resume building to mock interviews with industry veterans, we prepare you to crack any interview.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-purple-400" />,
    title: "Soft Skills Training",
    description:
      "Master workplace communication, leadership, and emotional intelligence. Stand out in any interview.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const FeaturesSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const titleColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-300" : "text-gray-600";

  return (
    <section
      id="features"
      className={`px-6 lg:px-20 py-20 relative overflow-hidden ${isDarkMode
        ? "bg-gradient-to-br from-[#1A0033] via-[#2D1B69] to-[#1A0033]"
        : "bg-gradient-to-br from-violet-50 via-purple-50 to-white"
        }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Subtitle */}
        <h3
          className={`text-sm uppercase tracking-wider font-semibold ${subtitleColor}`}
        >
          Join us to elevate
        </h3>

        {/* Title */}
        <h2
          className={`text-3xl sm:text-4xl font-extrabold mt-2 leading-snug ${titleColor}`}
        >
          Your <span className="text-purple-500">IT career</span> with unparalleled
          <br /> Training and Support!
        </h2>

        {/* Feature cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`p-8 rounded-2xl shadow-lg ${isDarkMode
                ? "bg-purple-950/40 hover:shadow-purple-500/30"
                : "bg-white hover:shadow-purple-200"
                } transition duration-300`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${titleColor}`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed ${subtitleColor}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
