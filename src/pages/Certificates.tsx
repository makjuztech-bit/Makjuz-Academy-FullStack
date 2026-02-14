import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, ShieldCheck, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';

interface Certificate {
    _id: string;
    courseId: {
        _id: string;
        title: string;
    };
    issueDate: string;
    certificateId: string;
    downloadUrl: string;
}

const Certificates: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const { data } = await api.get('/certificates/my-certs');
                setCertificates(data);
            } catch (err: any) {
                console.error(err);
                setError('Failed to fetch certificates.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    const handleDownload = async (certId: string, title: string) => {
        try {
            // In a real app, this would trigger a download.
            // For now, we'll open the generate endpoint or download URL
            const response = await api.post('/certificates/generate', {
                courseId: certId, // Assuming certId maps effectively or pass correct ID
                userName: "Student Name" // This should ideally come from auth context
            }, { responseType: 'blob' });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}_Certificate.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            alert("Download failed or certificate not ready");
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen pt-24 flex items-center justify-center ${isDarkMode ? 'bg-[#1A0033] text-white' : 'bg-gray-50'}`}>
                <Loader2 className="animate-spin text-purple-600" size={48} />
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#1A0033] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Your Achievements
                        </span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Verify your skills and showcase your expertise with our industry-recognized certifications.
                    </p>
                </motion.div>

                {error && (
                    <div className="flex items-center justify-center text-red-500 mb-8 gap-2">
                        <AlertCircle size={20} /> {error}
                    </div>
                )}

                {certificates.length === 0 && !error ? (
                    <div className="text-center py-12">
                        <Award size={64} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-500">No certificates yet</h3>
                        <p className="text-gray-400">Complete courses to earn your first certificate!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {certificates.map((cert) => (
                            <motion.div
                                key={cert._id}
                                whileHover={{ scale: 1.02 }}
                                className={`p-6 md:p-8 rounded-2xl shadow-xl border ${isDarkMode ? 'bg-white/5 border-purple-500/30' : 'bg-white border-purple-100'}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
                                        <Award size={32} />
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                                        Verified
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{cert.courseId?.title || "Course Certificate"}</h3>

                                <div>
                                    <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Issued on {new Date(cert.issueDate).toLocaleDateString()} • ID: {cert.certificateId}
                                    </p>
                                    <button
                                        onClick={() => handleDownload(cert.courseId?._id, cert.courseId?.title)}
                                        className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Download size={20} /> Download PDF
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Verification Section */}
                <div className="mt-16">
                    <div className={`p-8 rounded-2xl shadow-xl border flex flex-col justify-center items-center text-center ${isDarkMode ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'}`}>
                        <ShieldCheck size={48} className="text-indigo-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Employer Verification</h3>
                        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Employers can verify your certificates instantly using your unique Certificate ID.
                        </p>
                        <div className={`w-full max-w-md p-4 rounded-xl mb-4 text-left ${isDarkMode ? 'bg-black/30' : 'bg-white'}`}>
                            <p className="text-xs text-gray-400 mb-1">Your Public Verification URL</p>
                            <p className="text-sm font-mono truncate text-indigo-400">https://makjuz.academy/verify</p>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Why Our Certificates Matter</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Industry Recognized', desc: 'Validated by top tech companies and industry leaders.' },
                            { title: 'Blockchain Secured', desc: 'Tamper-proof digital credentials that last forever.' },
                            { title: 'Skill Validated', desc: 'Earned only after completing rigorous hands-on projects.' }
                        ].map((item, idx) => (
                            <div key={idx} className={`p-6 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-md'}`}>
                                <CheckCircle className="text-green-500 mb-4" size={24} />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificates;
