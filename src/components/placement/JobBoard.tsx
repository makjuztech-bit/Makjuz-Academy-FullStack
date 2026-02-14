import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, ChevronRight, X, Clock, MapPin, DollarSign, ExternalLink, Building } from 'lucide-react';
import api from '../../api/axios';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface Job {
    _id: string;
    title: string;
    company: string;
    role: string;
    type: string;
    salaryRange: { min: number; max: number; currency: string };
    requirements: string[];
    techStack: string[];
    companyDetails?: {
        logo?: string;
        website?: string;
    };
    description?: string;
    applyLink?: string;
    isActive: boolean;
    createdAt: string;
}

const JobBoard: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        role: '',
        type: '',
        search: '',
        sortBy: 'newest'
    });
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.role) params.append('role', filters.role);
            if (filters.type) params.append('type', filters.type);

            const { data } = await api.get('/placement/jobs', { params });

            let filteredJobs = data;
            if (filters.search) {
                const lowerSearch = filters.search.toLowerCase();
                filteredJobs = filteredJobs.filter((job: Job) =>
                    job.title.toLowerCase().includes(lowerSearch) ||
                    job.company.toLowerCase().includes(lowerSearch) ||
                    job.techStack?.some(t => t.toLowerCase().includes(lowerSearch))
                );
            }

            if (filters.sortBy === 'newest') {
                filteredJobs.sort((a: Job, b: Job) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }

            setJobs(filteredJobs);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId: string) => {
        try {
            await api.post('/placement/jobs/apply', { jobId });
            alert("Application submitted successfully!");
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to apply");
        }
    };

    const bgClass = isDarkMode ? 'bg-[#2D1B69]/40 border-purple-500/20' : 'bg-white border-gray-200 shadow-sm';
    const textClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Advanced Filters */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search role or company..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className={`w-full pl-10 p-3 rounded-xl border bg-transparent ${isDarkMode ? 'border-gray-600 text-white focus:border-purple-500' : 'border-gray-300 focus:border-blue-500'} outline-none transition-all`}
                        />
                    </div>

                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 text-gray-500" size={18} />
                        <select
                            value={filters.role}
                            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                            className={`w-full pl-10 p-3 rounded-xl border bg-transparent appearance-none ${isDarkMode ? 'border-gray-600 text-gray-300 focus:border-purple-500' : 'border-gray-300 text-gray-700 focus:border-blue-500'} outline-none transition-all`}
                        >
                            <option value="">All Roles</option>
                            <option value="Frontend">Frontend Developer</option>
                            <option value="Backend">Backend Developer</option>
                            <option value="Fullstack">Full Stack Developer</option>
                            <option value="DevOps">DevOps Engineer</option>
                            <option value="AI/ML">AI / ML Engineer</option>
                            <option value="Data Science">Data Analyst</option>
                        </select>
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-500" size={18} />
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className={`w-full pl-10 p-3 rounded-xl border bg-transparent appearance-none ${isDarkMode ? 'border-gray-600 text-gray-300 focus:border-purple-500' : 'border-gray-300 text-gray-700 focus:border-blue-500'} outline-none transition-all`}
                        >
                            <option value="">Any Work Mode</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="On-site">On-site</option>
                        </select>
                    </div>

                    <div className="relative">
                        <Clock className="absolute left-3 top-3 text-gray-500" size={18} />
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            className={`w-full pl-10 p-3 rounded-xl border bg-transparent appearance-none ${isDarkMode ? 'border-gray-600 text-gray-300 focus:border-purple-500' : 'border-gray-300 text-gray-700 focus:border-blue-500'} outline-none transition-all`}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.length === 0 && !loading && (
                    <div className="col-span-3 text-center py-20 text-gray-500">
                        <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No jobs found matching your criteria.</p>
                    </div>
                )}

                {jobs.map((job) => (
                    <motion.div
                        key={job._id}
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-2xl border transition-all hover:shadow-xl group flex flex-col ${bgClass}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg overflow-hidden">
                                    {job.companyDetails?.logo ? (
                                        <img src={job.companyDetails.logo} alt={job.company} className="w-full h-full object-cover" />
                                    ) : (
                                        job.company[0]
                                    )}
                                </div>
                                <div>
                                    <h4 className={`text-lg font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{job.company}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${job.type === 'Remote' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                {job.type}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-green-500/10 text-green-400">
                                {job.salaryRange ? `₹${(job.salaryRange.min / 100000)}-${(job.salaryRange.max / 100000)} LPA` : 'Salary disclosed'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {job.techStack?.slice(0, 3).map(tech => (
                                <span key={tech} className={`px-2 py-1 text-xs rounded border ${isDarkMode ? 'bg-white/5 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                                    {tech}
                                </span>
                            ))}
                            {(job.techStack?.length || 0) > 3 && (
                                <span className="px-2 py-1 text-xs text-gray-500">+{job.techStack.length - 3}</span>
                            )}
                        </div>

                        <div className="mt-auto flex gap-3 pt-4 border-t border-dashed border-gray-700/50">
                            <button
                                onClick={() => setSelectedJob(job)}
                                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                            >
                                Details
                            </button>
                            <button
                                onClick={() => {
                                    if (job.applyLink) window.open(job.applyLink, '_blank');
                                    else handleApply(job._id);
                                }}
                                className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all"
                            >
                                Apply
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Job Details Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 border ${isDarkMode ? 'bg-[#1A0033] border-emerald-500/30 text-white' : 'bg-white border-gray-200 text-gray-900'} shadow-2xl`}
                        >
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                                    {selectedJob.company[0]}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                                        <Building size={16} />
                                        <span>{selectedJob.company}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-8">
                                <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-bold flex items-center gap-2">
                                    <Briefcase size={14} /> {selectedJob.type}
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-sm font-bold flex items-center gap-2">
                                    <Building size={14} /> {selectedJob.role}
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 text-sm font-bold flex items-center gap-2">
                                    <DollarSign size={14} /> ₹{(selectedJob.salaryRange?.min || 0) / 100000}-{(selectedJob.salaryRange?.max || 0) / 100000} LPA
                                </span>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold mb-3 border-b border-gray-700/50 pb-2">Job Description</h3>
                                    <p className={`whitespace-pre-wrap leading-relaxed ${textClass}`}>
                                        {selectedJob.description || "No description provided."}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-3 border-b border-gray-700/50 pb-2">Requirements</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedJob.requirements?.map((req, i) => (
                                            <li key={i} className={`flex items-start gap-2 ${textClass}`}>
                                                <ChevronRight size={16} className="text-emerald-500 shrink-0 mt-1" />
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-3 border-b border-gray-700/50 pb-2">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedJob.techStack?.map(tech => (
                                            <span key={tech} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDarkMode ? 'bg-white/5 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-700/30">
                                <button
                                    onClick={() => {
                                        if (selectedJob.applyLink) window.open(selectedJob.applyLink, '_blank');
                                        else {
                                            handleApply(selectedJob._id);
                                            setSelectedJob(null);
                                        }
                                    }}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-lg"
                                >
                                    {selectedJob.applyLink ? (
                                        <>Apply Externally <ExternalLink size={20} /></>
                                    ) : (
                                        <>Apply Now <ChevronRight size={20} /></>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default JobBoard;
