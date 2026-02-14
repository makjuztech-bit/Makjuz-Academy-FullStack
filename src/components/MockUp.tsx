import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FileText,
  BookOpen,
  Cpu,
  MessageSquare,
  Briefcase,
  DollarSign,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  Star,
  Sparkles,
  Zap,
  Target,
  Trophy,
  Clock,
  ArrowRight,
  Play,
  Shield,
  Users,
  Send,
  Mic,
  Settings,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  isNew?: boolean;
  gradient?: string;
  description?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: <User size={18} />,
    label: "Interview Copilot",
    gradient: "from-blue-500 to-cyan-500",
    description: "AI-powered interview assistance"
  },
  {
    icon: <MessageSquare size={18} />,
    label: "Mock Interview",
    gradient: "from-emerald-500 to-teal-500",
    description: "Practice with AI interviewer"
  },
  {
    icon: <BookOpen size={18} />,
    label: "Preparation Hub",
    gradient: "from-purple-500 to-violet-500",
    description: "Study materials & resources"
  },
  {
    icon: <FileText size={18} />,
    label: "AI Resume Builder",
    gradient: "from-orange-500 to-red-500",
    description: "Create ATS-optimized resumes"
  },
  {
    icon: <Zap size={18} />,
    label: "Stealth Mode",
    isNew: true,
    gradient: "from-pink-500 to-rose-500",
    description: "Private job search mode"
  },
  {
    icon: <Cpu size={18} />,
    label: "AI Material Generator",
    gradient: "from-indigo-500 to-blue-500",
    description: "Generate interview content"
  },
  {
    icon: <Briefcase size={18} />,
    label: "AI Career Coach",
    gradient: "from-green-500 to-emerald-500",
    description: "Personalized career guidance"
  },
  {
    icon: <Users size={18} />,
    label: "Speak with Recruiters",
    gradient: "from-amber-500 to-orange-500",
    description: "Connect with hiring managers"
  },
  {
    icon: <DollarSign size={18} />,
    label: "AI Salary Calculator",
    gradient: "from-violet-500 to-purple-500",
    description: "Know your market value"
  },
  {
    icon: <HelpCircle size={18} />,
    label: "Interview Question Bank",
    gradient: "from-cyan-500 to-blue-500",
    description: "Thousands of practice questions"
  },
];

const stats = [
  { icon: Trophy, value: "98%", label: "Success Rate" },
  { icon: Clock, value: "30", label: "Days Average" },
  { icon: Users, value: "50K+", label: "Users Hired" },
  { icon: Star, value: "4.9", label: "User Rating" }
];

const MockUp: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null); // null means Home/Dashboard

  const renderContent = () => {
    if (activeItem === null) {
      // Default Landing / Home View
      return (
        <div className="flex flex-col justify-center items-center text-center max-w-5xl mx-auto w-full">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-8"
          >
            <Shield className="w-4 h-4 text-violet-500" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-violet-300' : 'text-violet-700'}`}>
              Trusted by 50,000+ Job Seekers
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Land Your Next Job in{" "}
            <motion.span
              className="relative inline-block bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              30 Days*
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-2xl blur-xl -z-10"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              or Less with Makjuz AI
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl mb-12 max-w-2xl leading-relaxed mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            AI-powered tools to help you ace interviews, apply faster, and land
            offers with confidence. Join thousands who've transformed their careers.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 ${isDarkMode
                  ? 'bg-white/5 border border-purple-500/20'
                  : 'bg-white/80 border border-violet-200/50 shadow-xl'
                  }`}
              >
                <stat.icon
                  size={24}
                  className={`mx-auto mb-3 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`}
                />
                <div className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: isDarkMode
                  ? '0 0 40px rgba(139, 92, 246, 0.5)'
                  : '0 0 40px rgba(139, 92, 246, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-violet-500/25 overflow-hidden"
            >
              <div className="relative flex items-center gap-3">
                <Play size={20} />
                Get Started for Free
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-200"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </div>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-xl transition-all duration-300 border ${isDarkMode
                ? "bg-white/5 border-purple-500/30 hover:bg-white/10 hover:border-purple-400/50 text-gray-200"
                : "bg-white/70 border-violet-200/70 hover:bg-white/90 hover:border-violet-300/80 text-gray-700 shadow-xl"
                }`}
            >
              🚀 Start free with Google
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`mt-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            ⭐ 4.9/5 rating • 🔒 GDPR Compliant • ✨ No credit card required
          </motion.div>
        </div>
      );
    }

    // Specific Content Logic based on activeItem
    const item = sidebarItems[activeItem];

    // Interface for Chat / Interaction
    return (
      <div className="w-full max-w-6xl mx-auto h-[80vh] flex flex-col">
        <header className="mb-6 flex justify-between items-center">
          <div className="text-left">
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
          </div>
        </header>

        <div className={`flex-1 rounded-3xl border overflow-hidden flex flex-col relative ${isDarkMode ? 'bg-[#150a2e]/60 border-purple-500/20' : 'bg-white border-gray-200'}`}>
          {/* Mock Chat / Content Area */}
          {activeItem === 0 || activeItem === 1 ? (
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto pr-4">
                <div className="flex justify-start">
                  <div className={`p-4 rounded-2xl rounded-tl-none max-w-[80%] text-left ${isDarkMode ? 'bg-purple-900/40 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                    Hello! I'm your {item.label}. How can I help you prepare today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className={`p-4 rounded-2xl rounded-tr-none max-w-[80%] text-left bg-gradient-to-r ${item.gradient} text-white`}>
                    I'd like to practice some common behavior questions.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className={`p-4 rounded-2xl rounded-tl-none max-w-[80%] text-left ${isDarkMode ? 'bg-purple-900/40 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                    Great choice. Let's start with: "Tell me about a time you faced a challenge and how you overcame it."
                  </div>
                </div>
              </div>
              {/* Input Area */}
              <div className={`mt-4 p-2 rounded-xl flex items-center gap-2 border ${isDarkMode ? 'bg-black/20 border-purple-500/30' : 'bg-gray-50 border-gray-200'}`}>
                <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>
                  <Settings size={20} className="text-gray-400" />
                </button>
                <input
                  type="text"
                  placeholder="Type your answer..."
                  className={`flex-1 bg-transparent border-none outline-none px-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                />
                <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>
                  <Mic size={20} className="text-gray-400" />
                </button>
                <button className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} text-white shadow-lg`}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center opacity-80 flex-col">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r ${item.gradient} mb-6`}>
                <div className="text-white scale-150">{item.icon}</div>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.label} Module
              </h3>
              <p className="max-w-md mx-auto">
                This feature shows {item.description?.toLowerCase()}. Interactive demo content coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex min-h-screen relative overflow-hidden transition-colors duration-500 ${isDarkMode
        ? "bg-gradient-to-br from-[#0F0728] via-[#1A0033] to-[#2D1B69] text-gray-100"
        : "bg-gradient-to-br from-slate-50 via-white to-violet-50 text-gray-900"
        }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl ${isDarkMode
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
              : 'bg-gradient-to-r from-violet-300/30 to-purple-300/30'
              }`}
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Sparkle effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className={`absolute ${isDarkMode ? 'text-purple-400/40' : 'text-violet-400/60'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={12} />
          </motion.div>
        ))}
      </div>

      {/* Enhanced Sidebar */}
      <motion.aside
        animate={{ width: isOpen ? 320 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`relative z-10 backdrop-blur-2xl border-r transition-all duration-300 ${isDarkMode
          ? "bg-black/20 border-purple-500/20"
          : "bg-white/70 border-violet-200/50"
          }`}
      >
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between h-20 px-6 border-b border-opacity-20 cursor-pointer"
          onClick={() => setActiveItem(null)} // Reset to Home on click
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Makjuz AI
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-violet-600'}`}>
                    Career Assistant
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
            className={`p-2 rounded-lg transition-colors ${isDarkMode
              ? 'hover:bg-purple-500/20 text-purple-300'
              : 'hover:bg-violet-100 text-violet-600'
              }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-100px)]">
          {sidebarItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveItem(idx)}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative group cursor-pointer rounded-2xl transition-all duration-300 ${isOpen ? 'p-4' : 'p-3 mx-auto w-fit'
                } ${activeItem === idx
                  ? isDarkMode ? "bg-white/10 text-white" : "bg-violet-100/80 text-violet-900"
                  : isDarkMode ? "hover:bg-white/5 text-gray-200" : "hover:bg-violet-50 text-gray-700"
                }`}
            >
              {/* Hover background effect */}
              {activeItem !== idx && (
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  whileHover={{ scale: 1.02 }}
                />
              )}

              {/* Active Indicator */}
              {activeItem === idx && (
                <motion.div
                  layoutId="activeSidebar"
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full my-3 bg-gradient-to-b ${item.gradient}`}
                />
              )}


              <div className="relative flex items-center gap-4">
                {/* Icon with gradient background */}
                <motion.div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${item.gradient} shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-white">
                    {item.icon}
                  </div>
                </motion.div>

                {/* Label and description */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm ${activeItem === idx ? 'font-bold' : ''}`}>{item.label}</span>
                        {item.isNew && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-2 py-0.5 text-xs bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium"
                          >
                            NEW
                          </motion.span>
                        )}
                      </div>
                      {item.description && (
                        <p className={`text-xs mt-1 opacity-70 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                          {item.description}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Arrow indicator */}
                <AnimatePresence>
                  {isOpen && hoveredItem === idx && activeItem !== idx && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`}
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Enhanced Main Content */}
      <main className="flex-1 flex flex-col px-4 md:px-8 relative z-10 overflow-y-auto text-center">
        <div className="flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto py-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MockUp;