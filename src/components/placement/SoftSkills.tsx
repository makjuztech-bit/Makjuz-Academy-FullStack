import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Brain, Clock, PlayCircle, CheckSquare, Zap, Target } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SoftSkills: React.FC = () => {
    const { isDarkMode } = useTheme();

    const modules = [
        { title: "Communication", desc: "Speak clearly & confidently.", icon: <MessageSquare className="text-blue-400" />, progress: 65, color: "blue" },
        { title: "Interview Prep", desc: "HR & Behavioral Q&A.", icon: <Users className="text-purple-400" />, progress: 40, color: "purple" },
        { title: "Aptitude", desc: "Logical & Quant reasoning.", icon: <Brain className="text-emerald-400" />, progress: 80, color: "emerald" },
        { title: "Workplace", desc: "Etiquette & Time mgmt.", icon: <Clock className="text-amber-400" />, progress: 25, color: "amber" },
    ];

    const badges = [
        { name: "Interview Ready", icon: <Target size={16} />, color: "bg-emerald-500" },
        { name: "Comm. Pro", icon: <MessageSquare size={16} />, color: "bg-blue-500" },
        { name: "Quick Solver", icon: <Zap size={16} />, color: "bg-amber-500" },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Header Stats */}
            <div className={`p-8 rounded-3xl border relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'}`}>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Soft Skills Mastery</h2>
                        <p className="text-gray-400 max-w-lg">Improve your communication, confidence, and professional behavior to become placement-ready.</p>
                        <div className="flex gap-2 mt-4">
                            {badges.map((badge, i) => (
                                <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 ${badge.color} shadow-lg`}>
                                    {badge.icon} {badge.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">725</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">XP Points</div>
                        </div>
                        <div className="w-px h-12 bg-gray-700 mx-4"></div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-emerald-400 mb-1">Lvl 4</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Current Level</div>
                        </div>
                    </div>
                </div>
                {/* Decorative bg elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-0 -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Learning Modules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {modules.map((mod, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-${mod.color}-500/10 flex items-center justify-center mb-4`}>
                            {mod.icon}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{mod.title}</h3>
                        <p className="text-xs text-gray-500 mb-4 h-8">{mod.desc}</p>

                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${mod.color}-600 bg-${mod.color}-200`}>
                                        In Progress
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-semibold inline-block text-${mod.color}-400`}>
                                        {mod.progress}%
                                    </span>
                                </div>
                            </div>
                            <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${mod.color}-200/20`}>
                                <div style={{ width: `${mod.progress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${mod.color}-500`}></div>
                            </div>
                        </div>

                        <button className={`w-full py-2 rounded-lg font-bold text-sm bg-${mod.color}-500/10 text-${mod.color}-500 hover:bg-${mod.color}-500 hover:text-white transition-all`}>
                            Continue
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Daily Practice & Interactive */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className={`md:col-span-2 p-6 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <PlayCircle className="text-red-500" /> Video Lessons
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((v) => (
                            <div key={v} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="w-32 h-20 rounded-lg bg-gray-800 relative overflow-hidden flex-shrink-0">
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                                        <PlayCircle className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" size={32} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-200 group-hover:text-white mb-1">Mastering Self-Introduction in 5 Steps</h4>
                                    <p className="text-xs text-gray-500 mb-2">10 mins • Communication</p>
                                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden w-24">
                                        <div className="h-full bg-red-500 w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <CheckSquare className="text-green-500" /> Daily Tasks
                    </h3>
                    <div className="space-y-3">
                        {[
                            { task: "Speak English for 10 mins", completed: true },
                            { task: "Solve 5 Aptitude Qs", completed: false },
                            { task: "Record 1 Mock Answer", completed: false },
                        ].map((t, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${t.completed ? 'bg-green-500/10 border-green-500/20' : 'bg-gray-800/10 border-gray-700'}`}>
                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${t.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-500 text-transparent'}`}>
                                    <CheckSquare size={12} />
                                </div>
                                <span className={`text-sm font-medium ${t.completed ? 'text-green-400 line-through' : 'text-gray-400'}`}>{t.task}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all text-sm">
                        View All Tasks
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SoftSkills;
