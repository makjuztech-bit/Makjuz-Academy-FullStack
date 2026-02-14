import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Download, Edit2, Plus, Award, Briefcase, BookOpen, PenTool } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const ResumeProfile: React.FC = () => {
    const { user } = useAuth();
    const { isDarkMode } = useTheme();

    // Mock Data State (Replace with API calls)
    const [profile] = useState({
        name: user?.name || "Student Name",
        role: "Full Stack Developer",
        bio: "Passionate developer with experience in MERN stack.",
        location: "Mumbai, India",
        email: user?.email || "student@example.com",
        skills: ["React", "Node.js", "MongoDB", "TypeScript"],
        education: [
            { degree: "B.Tech Computer Science", university: "XYZ University", year: "2024", score: "8.5 CGPA" }
        ],
        experience: [
            { role: "Frontend Intern", company: "TechCorp", duration: "Jun 2023 - Aug 2023", desc: "Worked on React components." }
        ],
        projects: [
            { title: "E-commerce App", tech: "React, Node, Mongo", desc: "Full stack shopping platform." }
        ]
    });

    const SectionHeader = ({ title, icon }: { title: string, icon: any }) => (
        <div className="flex justify-between items-center mb-4 border-b border-gray-700/50 pb-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
                {icon} {title}
            </h3>
            <button className="text-emerald-400 hover:text-emerald-300 p-1 rounded-full hover:bg-emerald-500/10 transition-colors">
                <Plus size={18} />
            </button>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Personal Info */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div className={`p-6 rounded-3xl border text-center relative ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-white"><Edit2 size={16} /></button>
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg shadow-emerald-500/20">
                        {profile.name[0]}
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                    <p className="text-emerald-400 font-medium mb-4">{profile.role}</p>

                    <div className="space-y-3 text-sm text-gray-400 text-left">
                        <div className="flex items-center gap-3"><Mail size={16} className="text-gray-500" /> {profile.email}</div>
                        <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-500" /> {profile.location}</div>
                        <div className="flex items-center gap-3"><Linkedin size={16} className="text-blue-500" /> linkedin.com/in/student</div>
                        <div className="flex items-center gap-3"><Github size={16} className="text-white" /> github.com/student</div>
                    </div>

                    <button className="w-full py-3 mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                        <Download size={18} /> Download Resume
                    </button>
                </div>

                {/* Skills */}
                <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <SectionHeader title="Skills" icon={<PenTool size={20} className="text-purple-400" />} />
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map(skill => (
                            <span key={skill} className="px-3 py-1.5 rounded-lg bg-gray-700/50 text-gray-300 text-sm font-medium border border-gray-600 hover:border-purple-500/50 transition-colors">
                                {skill}
                            </span>
                        ))}
                        <button className="px-3 py-1.5 rounded-lg border border-dashed border-gray-600 text-gray-500 text-sm hover:text-white hover:border-gray-500 transition-colors">
                            + Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Content - Detailed Info */}
            <div className="w-full lg:w-2/3 space-y-6">

                {/* Education */}
                <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <SectionHeader title="Education" icon={<BookOpen size={20} className="text-blue-400" />} />
                    <div className="space-y-6">
                        {profile.education.map((edu, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div></div>
                                <div>
                                    <h4 className="font-bold text-lg">{edu.degree}</h4>
                                    <p className="text-gray-400">{edu.university} • <span className="text-gray-500">{edu.year}</span></p>
                                    <p className="text-emerald-400 text-sm font-medium mt-1">Score: {edu.score}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <SectionHeader title="Experience" icon={<Briefcase size={20} className="text-amber-400" />} />
                    <div className="space-y-6">
                        {profile.experience.map((exp, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1"><div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div></div>
                                <div>
                                    <h4 className="font-bold text-lg">{exp.role}</h4>
                                    <p className="text-gray-400">{exp.company} • <span className="text-gray-500">{exp.duration}</span></p>
                                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">{exp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects */}
                <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <SectionHeader title="Projects" icon={<Award size={20} className="text-pink-400" />} />
                    <div className="grid md:grid-cols-2 gap-4">
                        {profile.projects.map((proj, i) => (
                            <div key={i} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                                <h4 className="font-bold text-base mb-1">{proj.title}</h4>
                                <p className="text-xs text-gray-500 mb-2">{proj.tech}</p>
                                <p className="text-sm text-gray-400 leading-relaxed">{proj.desc}</p>
                            </div>
                        ))}
                        <button className="flex items-center justify-center p-4 rounded-2xl border border-dashed border-gray-600 text-gray-500 hover:text-white hover:border-gray-500 transition-colors">
                            <Plus size={24} />
                            <span className="ml-2 font-medium">Add Project</span>
                        </button>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ResumeProfile;
