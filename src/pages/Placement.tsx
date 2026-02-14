import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, UserCheck, Search, Briefcase, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import JobBoard from '../components/placement/JobBoard';
import MyApplications from '../components/placement/MyApplications';
import MockInterviews from '../components/placement/MockInterviews';
import ResumeProfile from '../components/placement/ResumeProfile';
import SoftSkills from '../components/placement/SoftSkills';

const Placement: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [activeSection, setActiveSection] = useState('jobs');

    return (
        <div className={`min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 ${isDarkMode ? 'bg-[#1A0033] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Career Portal</span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Prepare for interviews, build your resume, and land your dream job with our comprehensive placement support.
                    </p>

                    <div className="flex justify-center flex-wrap gap-3 mb-12 p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 inline-flex mx-auto">
                        {[
                            { id: 'jobs', label: 'Job Board', icon: <Briefcase className="w-4 h-4" /> },
                            { id: 'applications', label: 'My Applications', icon: <Search className="w-4 h-4" /> },
                            { id: 'interview', label: 'Mock Interviews', icon: <Video className="w-4 h-4" /> },
                            { id: 'resume', label: 'Resume Profile', icon: <UserCheck className="w-4 h-4" /> },
                            { id: 'softskills', label: 'Soft Skills', icon: <Brain className="w-4 h-4" /> }, // New Tab
                        ].map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all text-sm ${activeSection === section.id
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                {section.icon} {section.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Area with Animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="min-h-[400px]"
                    >
                        {activeSection === 'jobs' && <JobBoard />}
                        {activeSection === 'applications' && <MyApplications />}
                        {activeSection === 'interview' && <MockInterviews />}
                        {activeSection === 'resume' && <ResumeProfile />}
                        {activeSection === 'softskills' && <SoftSkills />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Placement;
