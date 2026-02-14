import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Briefcase, Link as LinkIcon, CheckCircle, AlertCircle, Users } from 'lucide-react';
import api from '../../api/axios';
import { useTheme } from '../../context/ThemeContext';

interface Job {
    _id: string;
    title: string;
    company: string;
    role: string;
    type: string;
    salaryRange: { min: number; max: number; currency: string };
    requirements: string[];
    techStack: string[];
    description?: string;
    applyLink?: string;
    isActive: boolean;
    applicants: Applicant[];
}

interface Applicant {
    _id: string;
    user: { _id: string, name: string, email: string };
    status: string;
    matchScore: number;
    appliedAt: string;
}

const AdminJobs: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        role: 'Fullstack',
        type: 'Full-time',
        salaryMin: '',
        salaryMax: '',
        requirements: '',
        techStack: '',
        description: '',
        applyLink: '',
    });

    // Application Management State
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/placement/jobs');
            setJobs(data);
        } catch (err: any) {
            setError("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await api.delete(`/placement/jobs/${id}`);
            setJobs(jobs.filter(j => j._id !== id));
            setSuccess("Job deleted successfully");
        } catch (err: any) {
            setError("Failed to delete job");
        }
    };

    const handleUpdateStatus = async (jobId: string, userId: string, newStatus: string) => {
        try {
            await api.put(`/placement/applications/${jobId}/${userId}/status`, { status: newStatus });

            // Optimistic Update
            setJobs(jobs.map(job => {
                if (job._id === jobId) {
                    return {
                        ...job,
                        applicants: job.applicants.map(app =>
                            app.user._id === userId ? { ...app, status: newStatus } : app
                        )
                    };
                }
                return job;
            }));
            setSuccess(`Status updated to ${newStatus}`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError("Failed to update status");
            setTimeout(() => setError(null), 3000);
        }
    };

    const openModal = (job?: Job) => {
        if (job) {
            setEditingJob(job);
            setFormData({
                title: job.title,
                company: job.company,
                role: job.role,
                type: job.type,
                salaryMin: job.salaryRange?.min?.toString() || '',
                salaryMax: job.salaryRange?.max?.toString() || '',
                requirements: job.requirements?.join('\n') || '',
                techStack: job.techStack?.join(', ') || '',
                description: job.description || '',
                applyLink: job.applyLink || '',
            });
        } else {
            setEditingJob(null);
            setFormData({
                title: '',
                company: '',
                role: 'Fullstack',
                type: 'Full-time',
                salaryMin: '',
                salaryMax: '',
                requirements: '',
                techStack: '',
                description: '',
                applyLink: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title: formData.title,
                company: formData.company,
                role: formData.role,
                type: formData.type,
                salaryRange: {
                    min: Number(formData.salaryMin),
                    max: Number(formData.salaryMax),
                    currency: 'INR'
                },
                requirements: formData.requirements.split('\n').filter(s => s.trim()),
                techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s),
                description: formData.description,
                applyLink: formData.applyLink,
            };

            if (editingJob) {
                const { data } = await api.put(`/placement/jobs/${editingJob._id}`, payload);
                setJobs(jobs.map(j => j._id === editingJob._id ? data : j));
                setSuccess("Job updated successfully");
            } else {
                const { data } = await api.post('/placement/jobs', payload);
                setJobs([data, ...jobs]);
                setSuccess("Job created successfully");
            }
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to save job");
        } finally {
            setLoading(false);
            setTimeout(() => { setError(null); setSuccess(null); }, 3000);
        }
    };

    const bgClass = isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm";
    const textClass = isDarkMode ? "text-gray-200" : "text-gray-700";
    const inputClass = `w-full p-3 rounded-xl border ${isDarkMode ? 'bg-black/20 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-purple-500 outline-none`;

    return (
        <div className="relative p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        Placement Admin
                    </h1>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-800'}`}
                        >
                            Job Postings
                        </button>
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'applications' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-gray-800'}`}
                        >
                            Applications
                        </button>
                    </div>
                </div>

                {activeTab === 'jobs' && (
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all"
                    >
                        <Plus size={20} /> Add Job
                    </button>
                )}
            </div>

            {/* Feedback Messages */}
            <AnimatePresence>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed top-24 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3">
                        <AlertCircle size={20} /> {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3">
                        <CheckCircle size={20} /> {success}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Jobs View */}
            {activeTab === 'jobs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-6 rounded-2xl border ${bgClass} flex flex-col`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className={`text-lg font-bold ${textClass}`}>{job.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Briefcase size={12} /> {job.company}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${job.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {job.isActive ? 'Active' : 'Closed'}
                                </span>
                            </div>

                            <div className="flex-1 space-y-2 mb-4">
                                <p className="text-xs text-gray-500 truncate">{job.role} • {job.type}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Users size={14} className="text-purple-400" />
                                    <span className="text-xs font-medium text-gray-400">{job.applicants?.length || 0} Applicants</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-auto pt-4 border-t border-gray-700/20">
                                <button
                                    onClick={() => openModal(job)}
                                    className="flex-1 px-3 py-2 bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                                >
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="px-3 py-2 bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-lg"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Applications View */}
            {activeTab === 'applications' && (
                <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                    {/* Job Selector Sidebar */}
                    <div className={`col-span-1 rounded-2xl border overflow-y-auto ${bgClass}`}>
                        <div className="p-4 border-b border-gray-700/50">
                            <h3 className="font-bold text-lg">Select Job Role</h3>
                        </div>
                        <div className="p-2 space-y-2">
                            {jobs.map(job => (
                                <div
                                    key={job._id}
                                    onClick={() => setSelectedJobId(job._id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all ${selectedJobId === job._id ? 'bg-purple-600 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                                >
                                    <h4 className="font-bold text-sm">{job.title}</h4>
                                    <div className="flex justify-between items-center mt-2 text-xs opacity-70">
                                        <span>{job.company}</span>
                                        <span className="bg-white/20 px-2 py-0.5 rounded-full">{job.applicants?.length || 0}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Applicants List */}
                    <div className={`col-span-2 rounded-2xl border overflow-y-auto ${bgClass} p-6`}>
                        {!selectedJobId ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <Users size={48} className="mb-4 opacity-50" />
                                <p>Select a job to view applicants</p>
                            </div>
                        ) : (
                            <div>
                                <h3 className="font-bold text-xl mb-6">Applicants for {jobs.find(j => j._id === selectedJobId)?.title}</h3>
                                <div className="space-y-4">
                                    {(jobs.find(j => j._id === selectedJobId)?.applicants || []).length === 0 ? (
                                        <p className="text-gray-500 text-center py-10">No applicants yet.</p>
                                    ) : (
                                        jobs.find(j => j._id === selectedJobId)?.applicants.map((app) => (
                                            <div key={app._id} className={`p-4 rounded-xl border flex justify-between items-center ${isDarkMode ? 'bg-white/5 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                                                <div>
                                                    <h4 className="font-bold">{app.user?.name || "Unknown User"}</h4>
                                                    <p className="text-xs text-gray-400">{app.user?.email}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Match: {app.matchScore}%</span>
                                                        <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <select
                                                        value={app.status}
                                                        onChange={(e) => handleUpdateStatus(selectedJobId, app.user._id, e.target.value)}
                                                        className={`p-2 rounded-lg text-xs font-bold border outline-none ${app.status === 'Hired' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                                            app.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                                'bg-gray-700 text-gray-300 border-gray-600'
                                                            }`}
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="Under Review">Under Review</option>
                                                        <option value="Interview Scheduled">Interview</option>
                                                        <option value="Hired">Hired</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Edit/Add Modal - Same as before but kept inside component */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 border ${isDarkMode ? 'bg-[#1A0033] border-purple-500/30' : 'bg-white border-gray-200'} shadow-2xl`}
                        >
                            <div className="flex justify-between items-center mb-6 border-b border-gray-700/50 pb-4">
                                <h2 className="text-2xl font-bold text-white">
                                    {editingJob ? 'Edit Job' : 'Post New Job'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className={inputClass}
                                            placeholder="e.g. Senior React Developer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className={inputClass}
                                            placeholder="e.g. TechCorp Inc."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Role Category</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className={inputClass}
                                        >
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Fullstack">Fullstack</option>
                                            <option value="DevOps">DevOps</option>
                                            <option value="AI/ML">AI/ML</option>
                                            <option value="Data Science">Data Science</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Job Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className={inputClass}
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="On-site">On-site</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Min Salary</label>
                                        <input
                                            type="number"
                                            value={formData.salaryMin}
                                            onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                                            className={inputClass}
                                            placeholder="e.g. 500000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Max Salary</label>
                                        <input
                                            type="number"
                                            value={formData.salaryMax}
                                            onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                                            className={inputClass}
                                            placeholder="e.g. 1500000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Application Link (Optional)</label>
                                    <input
                                        type="url"
                                        value={formData.applyLink}
                                        onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                                        className={inputClass}
                                        placeholder="https://company.com/careers/apply/123"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">If provided, the 'Apply' button will redirect here.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Job Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className={`${inputClass} min-h-[100px]`}
                                        placeholder="Detailed job description..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Requirements (One per line)</label>
                                    <textarea
                                        value={formData.requirements}
                                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                        className={`${inputClass} min-h-[100px]`}
                                        placeholder="- React.js experience&#10;- Knowledge of Node.js"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Tech Stack (Comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.techStack}
                                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                        className={inputClass}
                                        placeholder="React, Node.js, MongoDB, AWS"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-gray-700/50">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Saving...' : <><Save size={20} /> Save Job</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminJobs;
