import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import { Loader2 } from 'lucide-react';

interface TrendingCourse {
  _id: string;
  title: string;
  description: string;
}

const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, boxShadow: '0 25px 50px rgba(103, 58, 183, 0.15)', transition: { duration: 0.2 } },
};

const TrendingCourses: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState<TrendingCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const titleColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subtitleColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-white/5 border-purple-500/20' : 'bg-white shadow-md border-gray-100';
  const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-900';

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await api.get('/courses');
        // Take first 6 for now
        setCourses(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch trending courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className={`py-20 flex justify-center ${isDarkMode ? 'bg-[#1A0033]' : 'bg-white'}`}>
        <Loader2 className="animate-spin text-purple-600" size={32} />
      </div>
    );
  }

  if (courses.length === 0) return null;

  return (
    <section
      id="trending-courses"
      className={`gap-8 items-center px-6 lg:px-20 py-20 relative overflow-hidden ${isDarkMode
          ? 'bg-gradient-to-br from-[#1A0033] via-[#2D1B69] to-[#1A0033]'
          : 'bg-gradient-to-br from-violet-50 via-purple-50 to-white'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold inline-block relative ${titleColor}`}>
            Trending Courses
            <span
              aria-hidden="true"
              className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"
            />
          </h2>
          <p className={`mt-3 text-large sm:text-lg max-w-2xl mx-auto ${subtitleColor}`}>
            Upskill with industry-relevant programs curated to accelerate your career.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              className={`relative flex flex-col justify-between p-6 rounded-2xl ${cardBg} ${textPrimary} transform transition hover:scale-105`}
              tabIndex={0}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-sm leading-relaxed line-clamp-3">{course.description}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (window.location.href = `/courses/${course._id}`)}
                  aria-label={`Know more about ${course.title}`}
                  className={`px-5 py-2 rounded-full font-medium bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white hover:opacity-90 transition`}
                >
                  Details
                </motion.button>
              </div>
              <div className="absolute bottom-4 left-6 w-16 h-1 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;
