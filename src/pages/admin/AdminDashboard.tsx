import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Briefcase,
    BookOpen,
    Award,
    TrendingUp,
    ArrowUpRight
} from 'lucide-react';
import api from '../../api/axios';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalUsers: 10,
        activeJobs: 5,
        applications: 25,
        internships: 3
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Mocking for now, replace with real endpoint like /admin/stats
                // const users = await api.get('/users/count');
                // const jobs = await api.get('/jobs/count');
                // setStats({ ...stats, totalUsers: users.data, activeJobs: jobs.data });
            } catch (error) {
                console.error("Failed to load admin stats");
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: "Total Users", value: stats.totalUsers, icon: <Users size={24} className="text-blue-500" />, change: "+12%" },
        { title: "Active Jobs", value: stats.activeJobs, icon: <Briefcase size={24} className="text-purple-500" />, change: "+5%" },
        { title: "Applications", value: stats.applications, icon: <TrendingUp size={24} className="text-green-500" />, change: "+24%" },
        { title: "Internships", value: stats.internships, icon: <Award size={24} className="text-orange-500" />, change: "+2%" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Dashboard Overview
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between h-40"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                {card.icon}
                            </div>
                            <span className="text-xs font-medium text-green-400 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                                {card.change} <ArrowUpRight size={12} />
                            </span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-gray-200">{card.value}</h3>
                            <p className="text-sm text-gray-400 font-medium">{card.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity / Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg h-96">
                    <h3 className="text-xl font-bold mb-4 text-gray-200">Recent Applications</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-300">Candidate {i} applied for React Dev</h4>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                                <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Pending</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg h-96 flex flex-col items-center justify-center text-gray-500">
                    <TrendingUp size={48} className="opacity-20 mb-4" />
                    <p>Placement Analytics Chart (Coming Soon)</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
