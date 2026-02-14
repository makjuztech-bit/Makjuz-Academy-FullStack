import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    Users,
    Briefcase,
    BookOpen,
    LayoutDashboard,
    FileText,
    LogOut,
    Menu,
    X,
    Award,
    Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { logout, user } = useAuth();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    // Check if user is admin (simple check, ideally robust backend check)
    // if (user?.role !== 'admin') return <Navigate to="/" />;

    const sidebarVariants: Variants = {
        open: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { width: "4rem", transition: { type: "spring", stiffness: 300, damping: 30 } }
    };

    const navItems = [
        { path: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { path: "/admin/jobs", icon: <Briefcase size={20} />, label: "Jobs & Placements" },
        { path: "/admin/internships", icon: <Award size={20} />, label: "Internships" },
        { path: "/admin/courses", icon: <BookOpen size={20} />, label: "Courses" },
        { path: "/admin/users", icon: <Users size={20} />, label: "Users" },
        { path: "/admin/applications", icon: <FileText size={20} />, label: "Applications" },
        { path: "/admin/settings", icon: <Settings size={20} />, label: "Settings" },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const bgClass = isDarkMode ? "bg-[#1A0033]" : "bg-gray-50";
    const sidebarClass = isDarkMode ? "bg-[#2D1B69]/40 border-r border-purple-500/20" : "bg-white border-r border-gray-200";
    const textClass = isDarkMode ? "text-gray-200" : "text-gray-700";
    const hoverClass = isDarkMode ? "hover:bg-purple-500/20 hover:text-white" : "hover:bg-purple-50 hover:text-purple-600";
    const activeClass = isDarkMode ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" : "bg-purple-600 text-white shadow-lg shadow-purple-200";

    return (
        <div className={`flex h-screen overflow-hidden ${bgClass} ${textClass}`}>

            {/* Sidebar */}
            <motion.aside
                variants={sidebarVariants}
                animate={isSidebarOpen ? "open" : "closed"}
                className={`${sidebarClass} backdrop-blur-xl flex flex-col justify-between py-6 z-50`}
            >
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 mb-8">
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent"
                            >
                                Admin Panel
                            </motion.span>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className={`p-1.5 rounded-lg transition-colors ${hoverClass}`}
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1 px-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium
                                    ${isActive ? activeClass : hoverClass}
                                `}
                            >
                                <span className="shrink-0">{item.icon}</span>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Footer / User */}
                <div className="px-3">
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-gray-100"}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shrink-0">
                            {user?.name?.[0] || 'A'}
                        </div>
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="overflow-hidden"
                            >
                                <p className="text-sm font-semibold truncate">{user?.name || 'Admin'}</p>
                                <p className="text-xs opacity-60 truncate">{user?.email || 'admin@makjuz.com'}</p>
                            </motion.div>
                        )}
                    </div>
                    <button
                        onClick={handleLogout}
                        className={`w-full mt-2 flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors ${!isSidebarOpen && "justify-center"}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative no-scrollbar">
                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default AdminLayout;
