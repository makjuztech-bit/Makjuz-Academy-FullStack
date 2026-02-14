import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock, Mic, MessageSquare, Play, CheckCircle, BarChart2, Star, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const MockInterviews: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState<'ai' | 'expert' | 'self'>('ai');
    const [chatMessages, setChatMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
        { role: 'ai', text: "Hello! I'm your AI Interviewer. Let's start with a basic question: Tell me about yourself and your experience with React." }
    ]);
    const [userInput, setUserInput] = useState("");

    const handleSendMessage = () => {
        if (!userInput.trim()) return;
        setChatMessages([...chatMessages, { role: 'user', text: userInput }]);
        setUserInput("");
        setTimeout(() => {
            setChatMessages(prev => [...prev, { role: 'ai', text: "That's a good start. Can you explain the difference between state and props?" }]);
        }, 1000);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Interviews Taken", value: 12, icon: <Video size={20} className="text-blue-400" />, change: "+2 this week" },
                    { label: "Avg. Score", value: "78%", icon: <BarChart2 size={20} className="text-emerald-400" />, change: "+5% improvement" },
                    { label: "Strong Area", value: "React", icon: <Star size={20} className="text-amber-400" />, change: "Top 10%" },
                    { label: "Needs Focus", value: "DSA", icon: <Zap size={20} className="text-red-400" />, change: "Practice Arrays" },
                ].map((stat, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-gray-700' : 'bg-white border-gray-200 shadow-sm'} flex flex-col justify-between h-32`}>
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-gray-800/50 rounded-lg">{stat.icon}</div>
                            <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-bold">{stat.change}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <p className="text-xs text-gray-500 uppercase font-semibold">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mode Selection Tabs */}
            <div className="flex justify-center border-b border-gray-700/50">
                {[
                    { id: 'ai', label: 'AI Mock Interview', icon: <MessageSquare size={18} /> },
                    { id: 'expert', label: 'Expert Scheduled', icon: <Calendar size={18} /> },
                    { id: 'self', label: 'Self Practice', icon: <Clock size={18} /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition-all ${activeTab === tab.id ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'ai' && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className={`md:col-span-2 rounded-2xl border flex flex-col h-[500px] overflow-hidden ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <div className="p-4 border-b border-gray-700/50 bg-gray-800/30 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="font-bold text-sm">AI Interviewer is Active</span>
                                </div>
                                <button className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold hover:bg-red-500/30">End Session</button>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                {chatMessages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-gray-700 text-gray-200 rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-700/50 bg-gray-800/30 flex gap-2">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500"
                                    placeholder="Type your answer..."
                                />
                                <button onClick={handleSendMessage} className="p-2 bg-emerald-600 rounded-full hover:bg-emerald-500 text-white shadow-lg"><Play size={16} /></button>
                                <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 text-white"><Mic size={16} /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50'}`}>
                                <h4 className="font-bold text-emerald-400 text-sm mb-2">Real-time Feedback</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 text-gray-400">
                                            <span>Confidence</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[85%]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 text-gray-400">
                                            <span>Clarity</span>
                                            <span>92%</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[92%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50'}`}>
                                <h4 className="font-bold text-blue-400 text-sm mb-2">Suggested Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React Hooks', 'State Management', 'Lifecycle'].map(topic => (
                                        <span key={topic} className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">{topic}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'expert' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className={`p-8 rounded-3xl border border-dashed border-emerald-500/30 bg-emerald-900/5`}>
                            <h3 className="text-2xl font-bold mb-4 text-emerald-400">Schedule with Mentors</h3>
                            <ul className="space-y-4 mb-8 text-gray-400">
                                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-emerald-500" /> 1-on-1 Session with Industry Experts</li>
                                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-emerald-500" /> Detailed Performance Report</li>
                                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-emerald-500" /> Mock HR & Technical Rounds</li>
                            </ul>
                            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                                <Calendar size={18} /> Book a Slot
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg mb-2">Upcoming Available Slots</h3>
                            {['Tomorrow, 10:00 AM', 'Tomorrow, 2:00 PM', 'Fri, 11:00 AM'].map((slot, i) => (
                                <div key={i} className={`flex justify-between items-center p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-gray-700' : 'bg-white border-gray-200'} hover:border-emerald-500/50 transition-colors cursor-pointer`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">EX</div>
                                        <div>
                                            <p className="font-bold text-sm">Senior Frontend Dev</p>
                                            <p className="text-xs text-gray-500">{slot}</p>
                                        </div>
                                    </div>
                                    <span className="text-emerald-400 text-sm font-bold">Book</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'self' && (
                    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-4 border-gray-700 animate-pulse">
                            <Clock size={48} className="text-gray-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Self-Paced Practice</h3>
                            <p className="text-gray-400 max-w-md mx-auto">Record yourself answering common interview questions. Review your recordings to improve body language and confidence.</p>
                        </div>
                        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                            <Play size={18} /> Start Session
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MockInterviews;
