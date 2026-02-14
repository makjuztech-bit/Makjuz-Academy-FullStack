import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Upload, Users, Database, Lightbulb, Download, Loader2, GitBranch } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';

interface ProjectResource {
    _id: string;
    title: string;
    techStack: string[];
    description: string;
    type: 'Template' | 'Document' | 'Guide'; // Backend uses 'type'
    fileUrl: string;
    downloads: number;
}

const ProjectHub: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('templates');
    const [resources, setResources] = useState<ProjectResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const { data } = await api.get('/projects');
                setResources(data);
            } catch (err: any) {
                console.error(err);
                setError('Failed to fetch project resources.');
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    const handleDownload = async (resourceId: string, title: string) => {
        try {
            // Backend returns { url: "..." }
            const { data } = await api.post(`/projects/download/${resourceId}`);

            if (data.url) {
                window.open(data.url, '_blank');
            } else {
                alert("Download URL not found.");
            }
        } catch (error) {
            console.error("Download failed", error);
            alert("Failed to download resource.");
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen pt-24 flex items-center justify-center ${isDarkMode ? 'bg-[#1A0033] text-white' : 'bg-gray-50'}`}>
                <Loader2 className="animate-spin text-pink-500" size={48} />
            </div>
        );
    }

    // Filter resources based on active tab
    const templates = resources.filter(r => r.type === 'Template');
    const docs = resources.filter(r => r.type === 'Document');

    return (
        <div className={`min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 ${isDarkMode ? 'bg-[#1A0033] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Final Year <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Project Hub</span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Everything you need to ace your final year project: Ideas, Templates, Documentation, and Mentor Support.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button
                            onClick={() => setActiveTab('templates')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'templates' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30' : 'bg-transparent border border-gray-600 hover:bg-white/5'}`}
                        >
                            Project Templates
                        </button>
                        <button
                            onClick={() => setActiveTab('docs')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'docs' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30' : 'bg-transparent border border-gray-600 hover:bg-white/5'}`}
                        >
                            Documentation
                        </button>
                        <button
                            onClick={() => setActiveTab('mentorship')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'mentorship' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30' : 'bg-transparent border border-gray-600 hover:bg-white/5'}`}
                        >
                            Mentorship
                        </button>
                    </div>
                </motion.div>

                {error && <div className="text-center text-red-500 mb-8">{error}</div>}

                {/* Content Area */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Project Templates */}
                    {activeTab === 'templates' && (
                        templates.length > 0 ? templates.map((project) => (
                            <motion.div
                                key={project._id}
                                layoutId={`template-${project._id}`}
                                whileHover={{ scale: 1.02 }}
                                className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-[#2D1B69]/40 border-purple-500/20' : 'bg-white shadow-md'}`}
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isDarkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600'}`}>
                                    <Database />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.techStack?.map(t => (
                                        <span key={t} className={`text-xs font-mono px-2 py-1 rounded inline-block ${isDarkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-50 text-purple-700'}`}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <p className={`text-sm mb-6 line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {project.description}
                                </p>
                                <button
                                    onClick={() => handleDownload(project._id, project.title)}
                                    className="w-full py-2 rounded-lg border border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white transition-all font-semibold flex items-center justify-center gap-2"
                                >
                                    <Download size={16} /> Download Template
                                </button>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center text-gray-500 py-10">No project templates available at the moment.</div>
                        ))}

                    {/* Documentation Tab */}
                    {activeTab === 'docs' && (
                        docs.length > 0 ? docs.map((doc) => (
                            <motion.div
                                key={doc._id}
                                whileHover={{ scale: 1.02 }}
                                className={`p-6 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-[#2D1B69]/40 border-purple-500/20' : 'bg-white shadow-md'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <FileCode className="text-blue-400" size={32} />
                                    <div>
                                        <h3 className="font-bold">{doc.title}</h3>
                                        <p className="text-xs text-gray-400">Downloads: {doc.downloads}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDownload(doc._id, doc.title)}
                                    className="p-2 rounded-full hover:bg-white/10 transition"
                                >
                                    <Upload size={20} className="text-gray-400 hover:text-white" />
                                </button>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center text-gray-500 py-10">No documentation resources available.</div>
                        ))}

                    {/* Mentorship Tab (Mock -> Still useful as interaction) */}
                    {activeTab === 'mentorship' && (
                        <div className="col-span-full text-center py-12 border border-dashed border-gray-600 rounded-2xl">
                            <Users size={48} className="mx-auto text-gray-500 mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Schedule a Code Review</h3>
                            <p className="text-gray-400 max-w-lg mx-auto mb-6">Get 1-on-1 feedback from senior developers on your project architecture and code quality.</p>
                            <button
                                onClick={() => alert("Mentorship request sent! We will contact you.")}
                                className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-semibold text-white shadow-lg shadow-pink-500/20 transition-all"
                            >
                                Book a Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectHub;
