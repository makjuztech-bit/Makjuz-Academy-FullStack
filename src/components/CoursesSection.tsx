import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import CourseCard, { Course } from "./CourseCard";
import { useTheme } from "../context/ThemeContext";
import {
  BookOpen,
  Brain,
  BarChart,
  FlaskConical,
  Database,
  Sparkles,
  Cloud,
  Trophy,
  Gift,
  Share2,
  Loader2,
  AlertCircle
} from "lucide-react";

const navItems = [
  { label: "All Courses", icon: <BookOpen size={20} /> },
  { label: "Machine Learning", icon: <Brain size={20} /> },
  { label: "Data Analytics", icon: <BarChart size={20} /> },
  { label: "Data Science", icon: <FlaskConical size={20} /> },
  { label: "SQL", icon: <Database size={20} /> },
  { label: "Generative AI", icon: <Sparkles size={20} /> },
  { label: "Cloud", icon: <Cloud size={20} /> },
  //{ label: "Leaderboard", icon: <Trophy size={20} /> },
  //{ label: "Rewards", icon: <Gift size={20} /> },
  //{ label: "Referral", icon: <Share2 size={20} /> },
];

const CoursesSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sidebarClasses = isDarkMode
    ? "bg-gradient-to-b from-[#1A0033] via-[#2D1B69] to-[#1A0033] border-r border-purple-500/20"
    : "bg-gradient-to-b from-violet-50 via-purple-50 to-white border-r border-gray-200";

  const navText = isDarkMode ? "text-gray-300" : "text-gray-700";
  const navHover = isDarkMode ? "hover:bg-purple-700/40" : "hover:bg-purple-100";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get('/courses');
        setCourses(res.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === "All Courses"
    ? courses
    : courses.filter(course =>
      course.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      course.title.toLowerCase().includes(selectedCategory.toLowerCase())
    );

  return (
    <section
      id="courses"
      className={`min-h-screen py-20 flex ${isDarkMode
        ? "bg-gradient-to-b from-[#1A0033] to-[#2D1B69]"
        : "bg-gradient-to-b from-violet-50 to-white"
        }`}
    >
      {/* Sidebar */}
      <div
        className={`${sidebarClasses} shadow-lg transition-all duration-300 ${isOpen ? "w-64" : "w-20"
          } hidden md:block shrink-0`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 m-4 rounded-lg flex items-center justify-center ${isDarkMode
            ? "hover:bg-purple-700/40 text-purple-300"
            : "hover:bg-purple-100 text-purple-600"
            }`}
        >
          ☰
        </button>

        <ul className="mt-4 space-y-2 px-2">
          {navItems.map((item, index) => {
            const isActive = selectedCategory === item.label;
            return (
              <li
                key={index}
                onClick={() => setSelectedCategory(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 whitespace-nowrap overflow-hidden ${isActive
                  ? isDarkMode
                    ? "bg-purple-800/60 text-purple-300 shadow-lg shadow-purple-500/30"
                    : "bg-purple-200 text-purple-900 shadow-md"
                  : `${navText} ${navHover}`
                  }`}
              >
                <div className="shrink-0">{item.icon}</div>
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-3xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"
                }`}
            >
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {selectedCategory === "All Courses" ? "Featured Courses" : selectedCategory}
              </span>
            </h2>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
              Explore our comprehensive curriculum designed by industry experts
              to accelerate your career!
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-purple-600" size={48} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 flex flex-col items-center gap-2">
              <AlertCircle size={32} />
              <p>{error}</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>No courses found in this category.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10"
            >
              {filteredCourses.map((course, index) => (
                <CourseCard key={course._id} course={course} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
