import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Kickstart Your Career with Makjuz Academy';
  const navigate = useNavigate();
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className={`min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 lg:px-20 py-20 relative overflow-hidden ${isDarkMode
        ? 'bg-gradient-to-br from-[#1A0033] via-[#2D1B69] to-[#1A0033]'
        : 'bg-gradient-to-br from-violet-50 via-purple-50 to-white'
        }`}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute top-20 left-10 w-72 h-72 ${isDarkMode ? 'bg-purple-500/10' : 'bg-violet-200/30'
            } rounded-full mix-blend-multiply filter blur-xl animate-pulse`}
        />
        <div
          className={`absolute top-40 right-10 w-96 h-96 ${isDarkMode ? 'bg-pink-500/10' : 'bg-purple-200/30'
            } rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000`}
        />
        <div
          className={`absolute -bottom-32 left-20 w-80 h-80 ${isDarkMode ? 'bg-indigo-500/10' : 'bg-blue-200/30'
            } rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000`}
        />
      </div>

      {/* Floating Icons */}
      {[
        { Icon: BookOpen, delay: 0, x: -20, y: 20, top: '15%', left: '10%' },
        { Icon: Users, delay: 0.5, x: 30, y: -15, top: '30%', left: '80%' },
        { Icon: Award, delay: 1, x: -25, y: -10, top: '60%', left: '20%' },
        { Icon: TrendingUp, delay: 1.5, x: 20, y: 25, top: '75%', left: '75%' }
      ].map(({ Icon, delay, x, y, top, left }, i) => (
        <motion.div
          key={i}
          className={`absolute ${isDarkMode ? 'text-purple-400/30' : 'text-violet-400/40'
            }`}
          style={{ top, left }}
          animate={{ y: [0, y, 0], x: [0, x, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      {/* Left Content */}
      <div className="z-10 space-y-6 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
        >
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {typewriterText}
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
          >
            |
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`text-lg md:text-xl max-w-xl mx-auto md:mx-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
        >
          Your all-in-one platform for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Premium Internships</span>, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Project Mentorship</span>, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Placement Success</span>, and <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Soft Skills Mastery</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <button
            className="px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg hover:scale-105 transition"
            onClick={() => navigate('/internships')}
          >
            Get Hired
          </button>
          <button
            className="px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 shadow-lg hover:scale-105 transition"
            onClick={() => navigate('/projects')}
          >
            Start Project
          </button>
          <button
            className="px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg hover:scale-105 transition"
            onClick={() => navigate('/placement')}
          >
            Placement Prep
          </button>
        </motion.div>
      </div>

      {/* Right Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 50 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="z-10 w-full flex justify-center md:justify-end"
      >
        <img
          src="/Assets/hero.jpg"
          alt="Learning illustration"
          className="max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-2xl shadow-purple-500/20"
        />
      </motion.div>
    </section>



  );
};

export default Hero;