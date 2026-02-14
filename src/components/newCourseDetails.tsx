import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Users, Star, CheckCircle, Award, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from '../context/ThemeContext';
import Navbar from './Navbar';
// @ts-ignore
import ContactPopup from './contactPopUp';
import api from "../api/axios";



// Using the expanded course data you provided
// Using the expanded course data you provided

// Interface for Course Data
interface CourseData {
    _id: string;
    id?: string | number;
    title: string;
    description: string;
    longDescription: string;
    duration: string;
    students: number;
    rating: number;
    level: string;
    price: string;
    image: string;
    tags: string[];
    syllabus: { week: string | number; topic: string; content: string }[];
    prerequisites: string[];
    outcomes: string[];
    resources: string[];
    certification: string;
}


const CourseDetails: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const [showContactPopup, setShowContactPopup] = useState(false);
    // const course = allCourses.find((c) => c.id === Number(id)); // Old logic
    const [course, setCourse] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeModule, setActiveModule] = useState(1);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (!id) return;
                const res = await api.get(`/courses/${id}`);
                setCourse(res.data);
            } catch (error) {
                console.error("Failed to fetch course details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center text-center py-20 font-bold text-xl ${isDarkMode ? 'bg-gradient-to-br from-[#1A0033] to-[#2D1B69] text-white' : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'}`}>
                Loading...
            </div>
        );
    }


    if (!course) {
        return (
            <div className={`min-h-screen flex items-center justify-center text-center py-20 font-bold text-xl ${isDarkMode ? 'bg-gradient-to-br from-[#1A0033] to-[#2D1B69] text-red-400' : 'bg-gradient-to-br from-gray-50 to-white text-red-600'
                }`}>
                Course not found. Please check the URL or return to the courses page.
            </div>
        );
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-[#1A0033] to-[#2D1B69]' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
            <Navbar /> {/* This should include your logo */}

            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                >
                    {/* Left Content */}
                    <div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 leading-snug ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">Job-Ready {course.title} Expert</span>
                        </h1>

                        <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Learn from the best mentors, build real-world projects, and get placement-ready with our comprehensive {course.title} program.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? "bg-purple-600/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                                <Star size={16} className="inline mr-1 text-yellow-400" /> {course.rating} Rating
                            </div>
                            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? "bg-purple-600/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                                <Users size={16} className="inline mr-1" /> {course.students.toLocaleString()}+ Students
                            </div>
                            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? "bg-purple-600/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                                <Clock size={16} className="inline mr-1" /> {course.duration}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className={`rounded-lg p-3 text-center font-medium ${isDarkMode ? "bg-[#2D1B69]/50" : "bg-purple-50 text-purple-800"}`}>Live Classes</div>
                            <div className={`rounded-lg p-3 text-center font-medium ${isDarkMode ? "bg-[#2D1B69]/50" : "bg-purple-50 text-purple-800"}`}>Expert Mentors</div>
                            <div className={`rounded-lg p-3 text-center font-medium ${isDarkMode ? "bg-[#2D1B69]/50" : "bg-purple-50 text-purple-800"}`}>1:1 Doubt Support</div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center items-center">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`rounded-2xl shadow-2xl overflow-hidden border-4 ${isDarkMode ? "border-purple-500/30" : "border-white"}`}
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-auto max-h-[400px] object-cover"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Why It’s Booming Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2
                        className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        {course.title} : Why is it Booming? ✨
                    </h2>
                    <p
                        className={`max-w-3xl mx-auto mb-12 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        {course.title} is revolutionizing industries worldwide — driving innovation,
                        automation, and high-paying career opportunities. With increasing demand for
                        {` ${course.title.toLowerCase()}`} experts, now is the perfect time to start.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Average Salary */}
                        {/* Average Salary Card */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={`rounded-2xl p-6 shadow-lg ${isDarkMode ? "bg-[#2D1B69]/60" : "bg-white"
                                }`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Average Annual Salary</h3>
                            <p
                                className={`text-3xl font-bold mb-1 ${isDarkMode ? "text-purple-300" : "text-purple-700"
                                    }`}
                            >
                                ₹12.5 LPA
                            </p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Source: Glassdoor
                            </p>

                            {/* Graph */}
                            <div className="relative mt-6 h-40 w-full">
                                <svg viewBox="0 0 300 160" className="w-full h-full">
                                    {/* Axes */}
                                    <line
                                        x1="40"
                                        y1="10"
                                        x2="40"
                                        y2="140"
                                        stroke={isDarkMode ? "#6B21A8" : "#E5E7EB"}
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="40"
                                        y1="140"
                                        x2="280"
                                        y2="140"
                                        stroke={isDarkMode ? "#6B21A8" : "#E5E7EB"}
                                        strokeWidth="1.5"
                                    />

                                    {/* Y-axis labels */}
                                    {["16", "14", "12", "10", "8", "6"].map((val, i) => (
                                        <text
                                            key={i}
                                            x="10"
                                            y={30 + i * 18}
                                            fontSize="10"
                                            fill={isDarkMode ? "#D8B4FE" : "#6B21A8"}
                                        >
                                            {val} LPA
                                        </text>
                                    ))}

                                    {/* Gradient under curve */}
                                    <defs>
                                        <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop
                                                offset="0%"
                                                stopColor={isDarkMode ? "#A855F7" : "#8B5CF6"}
                                                stopOpacity="0.3"
                                            />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>

                                    {/* Area under curve */}
                                    <motion.path
                                        d="M40 130 Q100 70, 160 90 T280 40 L280 140 L40 140 Z"
                                        fill="url(#salaryGradient)"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    />

                                    {/* Main curve */}
                                    <motion.path
                                        d="M40 130 Q100 70, 160 90 T280 40"
                                        fill="none"
                                        stroke={isDarkMode ? "#C084FC" : "#7C3AED"}
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    />

                                    {/* Highlight point */}
                                    <motion.circle
                                        cx="160"
                                        cy="90"
                                        r="5"
                                        fill={isDarkMode ? "#E9D5FF" : "#7C3AED"}
                                        animate={{ r: [5, 7, 5] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    />

                                    {/* Vertical line & label */}
                                    <line
                                        x1="160"
                                        y1="90"
                                        x2="160"
                                        y2="140"
                                        stroke={isDarkMode ? "#A78BFA" : "#A855F7"}
                                        strokeDasharray="4 4"
                                    />
                                    <text
                                        x="150"
                                        y="155"
                                        fontSize="10"
                                        fill={isDarkMode ? "#D8B4FE" : "#6B21A8"}
                                    >
                                        12.5 LPA
                                    </text>
                                </svg>
                            </div>
                        </motion.div>


                        {/* Growth */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={`rounded-2xl p-6 shadow-lg ${isDarkMode ? "bg-[#2D1B69]/60" : "bg-white"
                                }`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Explosive Growth in India</h3>
                            <p
                                className={`text-3xl font-bold mb-1 ${isDarkMode ? "text-purple-300" : "text-purple-700"
                                    }`}
                            >
                                300%
                            </p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Surge in demand from 2022–2030 driven by AI adoption (Source: NASSCOM)
                            </p>

                            {/* Animated upward line */}
                            <div className="mt-4 relative h-32 w-full">
                                <svg viewBox="0 0 300 100" className="w-full h-full">
                                    <motion.path
                                        d="M0 90 Q60 70, 120 50 T300 10"
                                        fill="none"
                                        stroke={isDarkMode ? "#A78BFA" : "#8B5CF6"}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2.2, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Opportunities */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={`rounded-2xl p-6 shadow-lg ${isDarkMode ? "bg-[#2D1B69]/60" : "bg-white"
                                }`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Diverse Opportunities</h3>
                            <p
                                className={`text-3xl font-bold mb-1 ${isDarkMode ? "text-purple-300" : "text-purple-700"
                                    }`}
                            >
                                90%
                            </p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {course.title} roles available across healthcare, finance, and tech.
                            </p>

                            {/* Simple icon illustration */}
                            <div className="mt-4 flex justify-center">
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className={`p-4 rounded-full ${isDarkMode
                                        ? "bg-purple-700/20 text-purple-300"
                                        : "bg-purple-100 text-purple-700"
                                        }`}
                                >
                                    <BarChart2 size={36} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Industry-Aligned Curriculum Section (GUVI-style Fixed Box) */}
            <section className="py-10 px-3 sm:px-5 lg:px-6 max-w-6xl mx-auto text-center rounded-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2
                        className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Explore Our Industry-Aligned Curriculum ✨
                    </h2>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl p-4 md:p-6 ${isDarkMode ? "bg-[#2D1B69]/50" : "bg-white shadow-md"
                            }`}
                    >
                        {/* Left Sidebar — Module List */}
                        <div className="flex flex-col gap-2">
                            {course.syllabus.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveModule(index + 1)}
                                    className={`py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${activeModule === index + 1
                                        ? isDarkMode
                                            ? "bg-violet-600 text-white border-violet-500"
                                            : "bg-violet-100 text-violet-700 border-violet-300"
                                        : isDarkMode
                                            ? "bg-transparent border-purple-500/40 text-purple-200 hover:bg-purple-900/30"
                                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-purple-50"
                                        }`}
                                >
                                    Module {index + 1}
                                </button>
                            ))}
                        </div>

                        {/* Right Content — Fixed Height Box */}
                        <div className="md:col-span-2 text-left">
                            <div
                                className={`rounded-2xl p-5 md:p-6 border transition-all duration-300 ${isDarkMode
                                    ? "border-purple-500/20 bg-[#1A0033]/40"
                                    : "border-gray-200 bg-gray-50"
                                    }`}
                                style={{
                                    height: "440px", // fixed height like GUVI
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <motion.div
                                    key={activeModule}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-y-auto pr-2"
                                    style={{ scrollbarWidth: "thin" }}
                                >
                                    {/* Module Header */}
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {course.syllabus[activeModule - 1]?.topic || "Module Title"}
                                        </h3>
                                        <div
                                            className={`flex items-center gap-1 text-xs sm:text-sm ${isDarkMode ? "text-purple-300" : "text-purple-600"
                                                }`}
                                        >
                                            <Clock size={14} /> {Math.floor(Math.random() * 5) + 4} Hrs
                                        </div>
                                    </div>

                                    {/* Main Module Points */}
                                    <ul className="space-y-1 mb-4 text-sm">
                                        {(course.syllabus[activeModule - 1]?.content || "")
                                            .split(",")
                                            .map((point, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 leading-relaxed text-sm"
                                                >
                                                    <span
                                                        className={`${isDarkMode ? "text-green-400" : "text-green-600"
                                                            } mt-0.5`}
                                                    >
                                                        ✓
                                                    </span>
                                                    {point.trim()}
                                                </li>
                                            ))}
                                    </ul>

                                    {/* What You'll Learn */}
                                    {course.outcomes && (
                                        <div className="mb-4">
                                            <h4
                                                className={`font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"
                                                    }`}
                                            >
                                                What You’ll Learn
                                            </h4>
                                            <ul className="space-y-1">
                                                {course.outcomes.map((outcome, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <CheckCircle
                                                            size={12}
                                                            className={`mt-0.5 ${isDarkMode ? "text-green-400" : "text-green-600"
                                                                }`}
                                                        />
                                                        <span>{outcome}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Prerequisites */}
                                    {course.prerequisites && (
                                        <div className="mb-4">
                                            <h4
                                                className={`font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"
                                                    }`}
                                            >
                                                Prerequisites
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {course.prerequisites.map((req, i) => (
                                                    <span
                                                        key={i}
                                                        className={`px-2 py-1 rounded text-xs ${isDarkMode
                                                            ? "bg-purple-900/50 text-purple-200"
                                                            : "bg-purple-100 text-purple-700"
                                                            }`}
                                                    >
                                                        {req}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Resources */}
                                    {course.resources && (
                                        <div className="mb-4">
                                            <h4
                                                className={`font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"
                                                    }`}
                                            >
                                                Resources Included
                                            </h4>
                                            <ul className="space-y-1">
                                                {course.resources.map((res, i) => (
                                                    <li
                                                        key={i}
                                                        className={`flex items-start gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                            }`}
                                                    >
                                                        <span className="text-purple-400">•</span>
                                                        {res}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Certification */}
                                    {course.certification && (
                                        <div className="flex items-center gap-2 text-sm mb-4">
                                            <Award
                                                className={`${isDarkMode ? "text-yellow-300" : "text-yellow-600"
                                                    }`}
                                                size={14}
                                            />
                                            <span>{course.certification}</span>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Fixed Bottom Button */}
                                <div className="flex justify-center mt-3 pt-2 border-t border-purple-500/20">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setShowContactPopup(true)}
                                        className={`py-2 px-5 rounded-lg font-semibold text-sm transition-all duration-300 ${isDarkMode
                                            ? "bg-green-500 text-white hover:bg-green-400"
                                            : "bg-green-500 text-white hover:bg-green-400"
                                            }`}
                                    >
                                        Download Syllabus
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Demo Video Section */}
            <section className={`py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? "bg-[#130026]" : "bg-gray-50"}`}>
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Watch a Demo Class 🎥
                    </h2>
                    <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
                        {/* Placeholder Video - Using a valid Youtube Embed or similar */}
                        <iframe
                            width="100%"
                            height="500"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=6mG7-j5F5Z5Z5Z5Z" // Replace with actual demo video if available
                            title="Course Demo Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>






            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <div className="max-w-6xl mx-auto">
                    {/* Heading */}
                    <h2
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-12 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Get Hired with Our End-to-End Placement Support ✨
                    </h2>

                    {/* Card Layout */}
                    <div className="flex flex-col items-center gap-5">
                        {/* Top Row — 3 cards, tighter gap */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                            {[
                                { title: "One-on-One Mock Interviews", icon: "👥" },
                                { title: "One-on-One Resume Evaluation", icon: "📄" },
                                { title: "One-on-One Mentor Guidance", icon: "💬" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)",
                                    }}
                                    className={`w-[260px] md:w-[270px] p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-center justify-between ${isDarkMode
                                        ? "bg-[#2D1B69]/70 border-purple-500/20 text-white"
                                        : "bg-white/80 border-purple-100 text-gray-800"
                                        }`}
                                >
                                    <div className="text-left">
                                        <p className="font-semibold leading-snug text-sm sm:text-base">
                                            {item.title}
                                        </p>
                                    </div>
                                    <div
                                        className={`text-3xl ${isDarkMode ? "text-purple-400" : "text-purple-600"
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom Row — 2 cards, visually centered */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center -mt-1">
                            {[
                                { title: "Interview Preparation Support", icon: "🧠" },
                                { title: "Job Opportunities", icon: "💼" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)",
                                    }}
                                    className={`w-[260px] md:w-[270px] p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-center justify-between ${isDarkMode
                                        ? "bg-[#2D1B69]/70 border-purple-500/20 text-white"
                                        : "bg-white/80 border-purple-100 text-gray-800"
                                        }`}
                                >
                                    <div className="text-left">
                                        <p className="font-semibold leading-snug text-sm sm:text-base">
                                            {item.title}
                                        </p>
                                    </div>
                                    <div
                                        className={`text-3xl ${isDarkMode ? "text-purple-400" : "text-purple-600"
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-6xl mx-auto">
                    {/* Heading */}
                    <h2
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Success Stories of Our Learners ✨
                    </h2>

                    <p
                        className={`max-w-3xl mx-auto mb-10 text-sm sm:text-base leading-relaxed text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        Our students upskilled, worked on real projects, and achieved career breakthroughs. Now it’s your turn!
                    </p>



                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Vinoth",
                                position: "ML Engineer @ Urbanrise",
                                message:
                                    "I shared my interview experience with MAKJUZ ACADEMY, trained accordingly, and landed a job with a 135% hike!",
                            },
                            {
                                name: "Prashanth",
                                position: "DS & AI Engineer @ Medical Global Solutions",
                                message:
                                    "I requested MAKJUZ ACADEMY to forward job roles that matched my updated skills. I attended interviews and got selected!",
                            },
                            {
                                name: "Shubham Chavan",
                                position: "Data Scientist @ Fipsar Solutions",
                                message:
                                    "MAKJUZ ACADEMY’s teaching in my native language and mock interviews helped me grasp real interview scenarios easily.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                                className={`rounded-2xl border p-6 text-left backdrop-blur-md transition-all duration-300 ${isDarkMode
                                    ? "bg-[#2D1B69]/70 border-purple-500/20 text-gray-100"
                                    : "bg-white/80 border-purple-100 text-gray-800 shadow-md"
                                    }`}
                            >
                                {/* Name and Position */}
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p
                                        className={`text-sm ${isDarkMode ? "text-purple-300" : "text-purple-700"
                                            }`}
                                    >
                                        {item.position}
                                    </p>
                                </div>

                                {/* Message */}
                                <p className="text-sm leading-relaxed italic">
                                    “{item.message}”
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10 px-4 sm:px-6 lg:px-8">

                <div className="max-w-4xl mx-auto text-center">
                    {/* Heading */}
                    <h2
                        className={`text-xl sm:text-2xl md:text-3xl font-bold mb-10 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Why Choose{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
                            MAKJUZ ACADEMY
                        </span>{" "}
                        Over the Rest ✨
                    </h2>
                    <div className="py-5 px-4 sm:px-6 lg:px-8"> </div>
                    <div className="relative flex justify-center">
                        {/* Floating Card */}
                        <div
                            className={`absolute z-20 -top-8 w-[33.3%] rounded-t-2xl py-3 font-semibold text-white text-sm ${isDarkMode ? "bg-[#7C3AED]" : "bg-[#7C3AED]"
                                }`}
                        >
                            MAKJUZ ACADEMY
                        </div>

                        {/* Table Container */}
                        <div
                            className={`w-full overflow-hidden rounded-2xl border shadow-lg ${isDarkMode
                                ? "border-purple-500/20 bg-[#2D1B69]/40"
                                : "border-purple-200 bg-white"
                                }`}
                        >
                            <div className="grid grid-cols-3 text-xs sm:text-sm md:text-base">
                                {/* Column Headers */}
                                <div className="py-3 font-semibold"></div>
                                <div
                                    className={`py-3 font-semibold text-white text-center ${isDarkMode ? "bg-violet-600" : "bg-violet-600"
                                        }`}
                                ></div>
                                <div
                                    className={`py-3 font-semibold text-center ${isDarkMode ? "text-purple-200" : "text-gray-700"
                                        }`}
                                >
                                    Others
                                </div>

                                {/* Data Rows */}
                                {[
                                    ["Learning Languages", "English, Hindi, Telugu & தமிழ்", "Only English"],
                                    ["After Class Support", "Mail, Chat & Call - 24/7", "Chat Support Only"],
                                    ["Future Ready Training", "✔", "✖"],
                                    ["1:1 Doubt Solving Sessions", "✔", "✖"],
                                    ["Softskills Training", "✔", "✖"],
                                    ["Access to Recordings", "Lifetime Access", "Limited Access"],
                                    ["Inbuilt Practise Platforms", "✔", "✖"],
                                ].map(([feature, guvi, others], i) => (
                                    <React.Fragment key={i}>
                                        {/* Left Column — Centered vertically */}
                                        <div
                                            className={`py-3 px-3 text-left flex items-center justify-center ${isDarkMode ? "text-gray-300" : "text-gray-800"
                                                }`}
                                        >
                                            {feature}
                                        </div>

                                        {/* Middle Column (MAKJUZ ACADEMY) */}
                                        <div
                                            className={`py-3 px-3 text-center flex items-center justify-center ${isDarkMode
                                                ? "bg-violet-600 text-white"
                                                : "bg-violet-600 text-white"
                                                }`}
                                        >
                                            {guvi === "✔" ? (
                                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-sm shadow">
                                                    ✓
                                                </span>
                                            ) : guvi === "✖" ? (
                                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-sm shadow">
                                                    ✕
                                                </span>
                                            ) : (
                                                guvi
                                            )}
                                        </div>

                                        {/* Right Column — Centered vertically */}
                                        <div
                                            className={`py-3 px-3 text-center flex items-center justify-center ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                }`}
                                        >
                                            {others === "✔" ? (
                                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-sm shadow">
                                                    ✓
                                                </span>
                                            ) : others === "✖" ? (
                                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-sm shadow">
                                                    ✕
                                                </span>
                                            ) : (
                                                others
                                            )}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Watch Demo Class Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Watch Our Demo Class
                    </h2>
                    <p className={`max-w-2xl mx-auto mb-10 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Get a glimpse of our teaching methodology and course content.
                    </p>
                    <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-xl border border-purple-500/20">
                        <iframe
                            src="https://www.youtube.com/embed/your-demo-video-id" // Replace with actual YouTube video ID
                            title="Demo Class"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>


            {/* Registration Form / Application Section (Moved to Bottom) */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className={`rounded-3xl shadow-2xl p-8 md:p-12 ${isDarkMode ? "bg-[#2D1B69] border border-purple-500/30" : "bg-white border border-gray-100"}`}>
                    <div className="text-center mb-10">
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Ready to Start Your Journey? 🚀
                        </h2>
                        <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Fill out the form below to apply for {course.title}. Our team will contact you shortly.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Full Name" className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-white/5 border-purple-500/30 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                            <input type="email" placeholder="Email Address" className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-white/5 border-purple-500/30 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="tel" placeholder="Mobile Number" className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-white/5 border-purple-500/30 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                            <select className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-white/5 border-purple-500/30 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}>
                                <option value="">Education Qualification</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="B.Sc">B.Sc</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <select className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-white/5 border-purple-500/30 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}>
                                <option value="">Current Profile</option>
                                <option value="Student">Student</option>
                                <option value="Working Professional">Working Professional</option>
                                <option value="Other">Other</option>
                            </select>
                            <select className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-white/5 border-purple-500/30 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}>
                                <option value="">Year of Graduation</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="Before 2023">Before 2023</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Complete Registration
                        </button>
                    </form>
                </div>
            </section>

            {/* Popup Form (same as hero form) */}
            {showContactPopup && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                    <div
                        className={`w-full max-w-md rounded-2xl shadow-xl p-6 md:p-8 relative ${isDarkMode ? "bg-[#2D1B69]" : "bg-white"
                            }`}
                    >
                        <button
                            onClick={() => setShowContactPopup(false)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                        >
                            ×
                        </button>

                        <h2
                            className={`text-xl font-semibold mb-4 text-center ${isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Apply now to Unlock Offer!
                        </h2>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent"
                            />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent"
                            />
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent">
                                <option value="">Education Qualification</option>
                            </select>
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent">
                                <option value="">Current Profile</option>
                            </select>
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent">
                                <option value="">Year of Graduation</option>
                            </select>
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${isDarkMode
                                    ? "bg-violet-600 hover:bg-violet-500"
                                    : "bg-violet-600 hover:bg-violet-500"
                                    }`}
                            >
                                Apply Now
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CourseDetails;