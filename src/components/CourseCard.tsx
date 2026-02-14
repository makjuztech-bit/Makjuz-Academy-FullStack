import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Users, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export interface Course {
  _id: string; // MongoDB uses _id
  id?: string | number; // For backward compatibility if needed, or optional
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  image: string;
  tags: string[];
}

export interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  // Prefer spring / 3D hover effect unless user opts for reduced motion
  const hoverAnim = reduce
    ? { opacity: 0.95 }
    : { y: -8, rotateY: 5, scale: 1.02 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={hoverAnim}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${isDarkMode
        ? "bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/50"
        : "bg-white/70 backdrop-blur-xl border border-violet-200/50 hover:border-violet-300/70"
        }`}
      style={{
        transform: "perspective(1000px)",
        boxShadow: isDarkMode
          ? "0 4px 20px rgba(138, 43, 226, 0.1)"
          : "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Hover Glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode
          ? "bg-gradient-to-br from-purple-500/10 to-violet-500/10"
          : "bg-gradient-to-br from-violet-100/50 to-purple-100/50"
          }`}
      />

      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Course Content */}
      <div className="p-6 relative z-10">
        <h3
          className={`text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
            }`}
        >
          {course.title}
        </h3>

        <p
          className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
        >
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className={`px-2 py-1 text-xs rounded-md ${isDarkMode
                ? "bg-purple-500/20 text-purple-300"
                : "bg-violet-100 text-violet-600"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div
          className={`flex items-center justify-between text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
        >
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={14} />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Button */}
        <div
          role="group"
          aria-label={`Course actions for ${course.title}`}
          className="flex flex-col sm:flex-row gap-2 mt-4"
        >
          <motion.button
            type="button"
            whileHover={hoverAnim}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/courses/${course._id}`)}
            aria-label={`Know more about ${course.title}`}
            className={`flex-1 py-3 rounded-xl font-semibold ${isDarkMode
              ? "bg-blue-500 text-white hover:bg-blue-400"
              : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
          >
            Know More
          </motion.button>
        </div>
      </div>

      {/* Animated Border */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode
          ? "shadow-[0_0_25px_rgba(186,85,211,0.3)]"
          : "shadow-[0_0_25px_rgba(138,43,226,0.2)]"
          }`}
      />
    </motion.div>
  );
};

export default CourseCard;