import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, MapPin, ArrowRight, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';

// Interface for Internship
interface Internship {
    _id: string;
    company: string;
    role: string;
    location: string;
    stipend: string;
    duration: string;
    tags: string[]; // Backend uses tags
    description: string;
    status: 'Active' | 'Closed'; // Backend uses status string
}

const Internships: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [internships, setInternships] = useState<Internship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
    const [applicationLoading, setApplicationLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form State
    const [coverLetter, setCoverLetter] = useState('');
    // For now we assume resume is from user profile, or simple file input (needs multer on backend)
    // Since backend for internships.applyForInternship expects `internshipId` in body.

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            const { data } = await api.get('/internships');
            setInternships(data);
        } catch (err) {
            console.error(err);
            setError('Failed to load internships.');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        if (!selectedInternship) return;
        setApplicationLoading(true);
        try {
            await api.post('/internships/apply', {
                internshipId: selectedInternship._id,
                // Backend currently doesn't save cover letter but we send it anyway for future
                coverLetter: coverLetter
            });
            setSuccessMessage(`Successfully applied to ${selectedInternship.company}!`);
            setSelectedInternship(null);
            setCoverLetter('');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to apply.");
        } finally {
            setApplicationLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen pt-24 flex items-center justify-center ${isDarkMode ? 'bg-[#1A0033] text-white' : 'bg-gray-50'}`}>
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#1A0033] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Launch Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Premium Internships</span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Gain real-world experience, work on live projects, and get mentored by industry experts.
                    </p>
                </motion.div>

                {successMessage && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3">
                        <CheckCircle size={20} /> {successMessage}
                    </motion.div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {internships.map((internship) => (
                        <motion.div
                            key={internship._id}
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-2xl border transition-all duration-300 ${isDarkMode
                                ? 'bg-[#2D1B69]/40 border-purple-500/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                                    <Building size={24} />
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${internship.status === 'Closed' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                    {internship.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-1">{internship.role}</h3>
                            <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{internship.company}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <div className="flex items-center text-xs text-gray-400 gap-1"><MapPin size={12} /> {internship.location}</div>
                                <div className="flex items-center text-xs text-gray-400 gap-1"><Briefcase size={12} /> {internship.duration}</div>
                                <div className="flex items-center text-xs text-green-400 gap-1">💰 {internship.stipend}</div>
                            </div>

                            <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{internship.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {internship.tags?.map((tag, idx) => (
                                    <span key={idx} className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-700'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                disabled={internship.status === 'Closed'}
                                className={`w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${internship.status === 'Closed'
                                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                    }`}
                                onClick={() => setSelectedInternship(internship)}
                            >
                                {internship.status === 'Closed' ? 'Applications Closed' : 'Apply Now'} <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Application Modal */}
                {selectedInternship && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className={`w-full max-w-lg p-6 md:p-8 rounded-2xl shadow-2xl relative ${isDarkMode ? 'bg-[#1A0033] border border-purple-500/30 text-white' : 'bg-white text-gray-900'}`}
                        >
                            <button onClick={() => setSelectedInternship(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><XCircle size={24} /></button>

                            <h2 className="text-2xl font-bold mb-4">Apply to {selectedInternship.company}</h2>
                            <p className="mb-6 text-sm text-gray-400">Fill out the details below to apply for the {selectedInternship.role} position.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Resume (Optional)</label>
                                    <div className={`w-full p-2 rounded-lg border flex items-center justify-center text-sm text-gray-500 ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                                        Profile Resume will be used
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Why should we hire you? (Cover Letter)</label>
                                    <textarea
                                        rows={4}
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        placeholder="Briefly describe your skills and motivation..."
                                        className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${isDarkMode ? 'bg-black/20 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                                    ></textarea>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => setSelectedInternship(null)} className="flex-1 py-2 rounded-lg border border-gray-600 hover:bg-white/5 transition-colors">Cancel</button>
                                    <button
                                        onClick={handleApply}
                                        disabled={applicationLoading}
                                        className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {applicationLoading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Application'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Internships;
