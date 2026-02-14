import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, FileText, StickyNote, Download, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import { useTheme } from '../../context/ThemeContext';

interface Application {
    jobId: string;
    title: string;
    company: string;
    appliedAt: string;
    status: string;
    matchScore: number;
    skillGap?: string[]; // Mocked for now
    notes?: string;      // Mocked for now
}

const MyApplications: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [noteInput, setNoteInput] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data } = await api.get('/placement/my-applications');
            setApplications(data);
        } catch (err) {
            console.error("Failed to fetch applications");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Applied': return 'text-blue-400 bg-blue-500/10';
            case 'Under Review': return 'text-purple-400 bg-purple-500/10';
            case 'Interview Scheduled': return 'text-amber-400 bg-amber-500/10';
            case 'Hired': return 'text-emerald-400 bg-emerald-500/10';
            case 'Rejected': return 'text-red-400 bg-red-500/10';
            default: return 'text-gray-400 bg-gray-500/10';
        }
    };

    const getTimeline = (status: string) => {
        const stages = ['Applied', 'Under Review', 'Interview Scheduled', 'Hired'];
        const currentIdx = stages.indexOf(status) === -1 ? 0 : stages.indexOf(status);

        return (
            <div className="flex items-center justify-between w-full mt-6 relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10 rounded-full"></div>
                <div
                    className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-500"
                    style={{ width: `${(currentIdx / (stages.length - 1)) * 100}%` }}
                ></div>

                {stages.map((stage, i) => {
                    const isCompleted = i <= currentIdx;
                    const isCurrent = i === currentIdx;

                    return (
                        <div key={stage} className="flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-500'}`}>
                                {isCompleted ? <CheckCircle size={14} /> : <div className="w-2 h-2 rounded-full bg-gray-500" />}
                            </div>
                            <span className={`text-xs font-medium ${isCurrent ? 'text-emerald-400' : 'text-gray-500'}`}>{stage}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Dashboard Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Applied", value: applications.length, color: "blue" },
                    { label: "Interviews", value: applications.filter(a => a.status === 'Interview Scheduled').length, color: "amber" },
                    { label: "Offers", value: applications.filter(a => a.status === 'Hired').length, color: "emerald" },
                    { label: "Rejected", value: applications.filter(a => a.status === 'Rejected').length, color: "red" },
                ].map((stat, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-gray-700' : 'bg-white border-gray-200 shadow-sm'} flex flex-col items-center justify-center text-center`}>
                        <span className={`text-3xl font-bold text-${stat.color}-500 mb-1`}>{stat.value}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</span>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Applications List */}
                <div className={`md:col-span-1 rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="p-4 border-b border-gray-700/50 bg-gray-800/30">
                        <h3 className="font-bold text-lg">Detailed List</h3>
                    </div>
                    <div className="max-h-[600px] overflow-y-auto">
                        {applications.map(app => (
                            <div
                                key={app.jobId}
                                onClick={() => setSelectedApp(app)}
                                className={`p-4 border-b border-gray-700/30 cursor-pointer transition-colors hover:bg-white/5 ${selectedApp?.jobId === app.jobId ? 'bg-blue-500/10 border-l-4 border-l-blue-500' : ''}`}
                            >
                                <h4 className="font-bold text-sm mb-1">{app.title}</h4>
                                <p className="text-xs text-gray-500 mb-2">{app.company}</p>
                                <div className="flex justify-between items-center">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusColor(app.status)}`}>{app.status}</span>
                                    <span className="text-xs font-mono text-gray-400">{new Date(app.appliedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details View */}
                <div className="md:col-span-2 space-y-6">
                    {selectedApp ? (
                        <motion.div
                            key={selectedApp.jobId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#2D1B69]/20 border-purple-500/20' : 'bg-white border-gray-200'}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{selectedApp.title}</h2>
                                    <h3 className="text-xl text-gray-500 font-medium">{selectedApp.company}</h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-emerald-400">{selectedApp.matchScore}%</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Match Score</div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="mb-8 p-4 rounded-xl bg-black/10 border border-gray-800">
                                <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Application Timeline</h4>
                                {getTimeline(selectedApp.status)}
                            </div>

                            {/* Skill Gap & Notes Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Skill Gap Analysis (Mock) */}
                                <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50'}`}>
                                    <h4 className="font-bold text-red-400 flex items-center gap-2 mb-3">
                                        <AlertCircle size={18} /> Skill Gap Analysis
                                    </h4>
                                    <p className="text-sm text-gray-400 mb-3">Based on the job requirements, you should focus on improving:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['System Design', 'GraphQL', 'AWS'].map(skill => (
                                            <span key={skill} className="px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">{skill}</span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 italic">"Completing a System Design course could boost your match score to 92%"</p>
                                </div>

                                {/* Smart Notes */}
                                <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-yellow-50'}`}>
                                    <h4 className="font-bold text-yellow-400 flex items-center gap-2 mb-3">
                                        <StickyNote size={18} /> Personal Notes
                                    </h4>
                                    <textarea
                                        className="w-full h-24 bg-transparent border border-yellow-500/30 rounded-lg p-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                                        placeholder="Add notes about interview questions, HR details, etc..."
                                        value={noteInput}
                                        onChange={(e) => setNoteInput(e.target.value)}
                                    ></textarea>
                                    <button className="mt-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 uppercase tracking-wider">Save Note</button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700/50">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold transition-all">
                                    <Download size={16} /> Offer Letter
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-bold transition-all ml-auto">
                                    <Trash2 size={16} /> Withdraw
                                </button>
                            </div>

                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 border rounded-2xl border-dashed border-gray-700/50 p-12">
                            <FileText size={48} className="mb-4 opacity-20" />
                            <p>Select an application to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MyApplications;
