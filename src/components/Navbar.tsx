import React, { useState, useEffect } from "react";
import { Switch, Dropdown, Space, Avatar } from "antd";
// ✅ No import needed - image is in public folder

import {
  MenuOutlined,
  CloseOutlined,
  SunOutlined,
  MoonOutlined,
  UserOutlined,
  LoginOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { key: "/", label: "Home" },
    { key: "/courses", label: "Courses" },
    {
      key: "programs",
      label: "Programs",
      isDropdown: true,
      children: [
        { key: '/certificates', label: "Certificates" },
        { key: '/internships', label: "Internships" },
        { key: '/projects', label: "Project Hub" },
        { key: '/placement', label: "Placement" },
      ]
    },
    { key: "/placement", label: "Jobs" },
    { key: "/about", label: "About" },
    { key: "/mock", label: "Mock" },
    { key: "/contact", label: "Contact" },
  ];

  // Auth dropdown items
  const userItems = [
    {
      key: "1",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "2",
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: "3",
      label: (
        <span onClick={logout}>
          Logout
        </span>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? isDarkMode
          ? "bg-[#1A0033]/90 backdrop-blur-xl border-b border-purple-500/30"
          : "bg-white/90 backdrop-blur-xl border-b border-purple-200/30"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="w-55 h-12 flex items-center space-x-2">
              <div className="w-55 h-12">
                <img
                  src="/Assets/Logo_transparent.png"
                  alt="Makjuz Academy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu - Items */}
          <div className={`hidden md:flex items-center space-x-2 lg:space-x-6 ${user ? "absolute left-1/2 transform -translate-x-1/2" : ""}`}>
            {menuItems.map((item) => (
              <motion.div
                key={item.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.key === 'programs' ? (
                  <Dropdown
                    dropdownRender={() => (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`mt-2 w-64 rounded-2xl shadow-2xl p-2 border backdrop-blur-xl ${isDarkMode
                          ? "bg-[#1A0033]/95 border-purple-500/30"
                          : "bg-white/95 border-violet-100"
                          }`}
                      >
                        {item.children?.map((sub, idx) => (
                          <Link to={sub.key} key={sub.key}>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${isDarkMode
                                ? "hover:bg-purple-500/20 text-gray-200 hover:text-white"
                                : "hover:bg-violet-50 text-gray-700 hover:text-violet-700"
                                }`}
                            >
                              {/* Icon placeholder or dot */}
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-purple-500/20 text-purple-300" : "bg-violet-100 text-violet-600"
                                }`}>
                                {idx === 0 && <span className="text-lg">🏆</span>} {/* Certificates */}
                                {idx === 1 && <span className="text-lg">💼</span>} {/* Internships */}
                                {idx === 2 && <span className="text-lg">🚀</span>} {/* Projects */}
                                {idx === 3 && <span className="text-lg">🎯</span>} {/* Placement */}
                              </div>
                              <div>
                                <div className="font-semibold">{sub.label}</div>
                                <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                  {idx === 0 && "Earn credentials"}
                                  {idx === 1 && "Gain experience"}
                                  {idx === 2 && "Build portfolio"}
                                  {idx === 3 && "Get hired"}
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  >
                    <div className={`relative px-2 lg:px-3 py-2 font-medium text-sm lg:text-base transition-all duration-300 group cursor-pointer ${isDarkMode
                      ? "text-gray-300 hover:text-purple-400"
                      : "text-gray-700 hover:text-violet-600"
                      }`}>
                      {item.label}
                    </div>
                  </Dropdown>
                ) : (
                  <Link
                    to={item.key}
                    className={`relative px-2 lg:px-3 py-2 font-medium text-sm lg:text-base transition-all duration-300 group ${location.pathname === item.key
                      ? isDarkMode
                        ? "text-purple-400"
                        : "text-violet-600"
                      : isDarkMode
                        ? "text-gray-300 hover:text-purple-400"
                        : "text-gray-700 hover:text-violet-600"
                      }`}
                  >
                    {item.label}
                    {location.pathname === item.key && (
                      <motion.span
                        layoutId="activeNavItem"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-violet-600 to-purple-700"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Menu - Auth & Theme (Right Aligned) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Auth Buttons */}
            {user ? (
              <Dropdown menu={{ items: userItems }} placement="bottomRight">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Space className="cursor-pointer">
                    <Avatar
                      size="default"
                      src={user.image}
                      className={`transition-all ${isDarkMode
                        ? "bg-purple-600 hover:bg-purple-500"
                        : "bg-violet-500 hover:bg-violet-400"
                        }`}
                      icon={!user.image && <UserOutlined />}
                    />
                  </Space>
                </motion.div>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all flex items-center gap-1 ${isDarkMode
                      ? "text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/50"
                      : "text-violet-600 hover:text-white hover:bg-violet-500 border border-violet-300"
                      }`}
                  >
                    <LoginOutlined /> Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-3 py-1.5 rounded-lg font-medium text-sm transition-all flex items-center gap-1 bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-500 hover:to-purple-600"
                  >
                    <FormOutlined /> Register
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                className={isDarkMode ? "bg-purple-600" : "bg-violet-400"}
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                size="small"
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
            </motion.div>
            {user && (
              <Dropdown menu={{ items: userItems }} placement="bottomRight">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Space className="cursor-pointer">
                    <Avatar
                      size="default"
                      src={user.image}
                      className={`transition-all ${isDarkMode
                        ? "bg-purple-600 hover:bg-purple-500"
                        : "bg-violet-500 hover:bg-violet-400"
                        }`}
                      icon={!user.image && <UserOutlined />}
                    />
                  </Space>
                </motion.div>
              </Dropdown>
            )}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode
                ? "text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                : "text-gray-700 hover:text-violet-600 hover:bg-violet-100/50"
                }`}
            >
              {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${isDarkMode
              ? "bg-[#1A0033]/95 backdrop-blur-xl border-t border-purple-500/30"
              : "bg-white/95 backdrop-blur-xl border-t border-purple-200/30"
              }`}
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <div key={item.key}>
                  {item.key === 'programs' ? (
                    <div className="space-y-1">
                      <div className={`px-4 py-2 font-semibold ${isDarkMode ? "text-purple-300" : "text-violet-700"}`}>
                        {item.label}
                      </div>
                      <div className="pl-8 space-y-1 border-l-2 border-gray-600 ml-4">
                        {item.children?.map(sub => (
                          <Link
                            key={sub.key}
                            to={sub.key}
                            className={`block py-2 px-2 text-sm rounded transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-violet-600"}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.key}
                        className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${location.pathname === item.key
                          ? isDarkMode
                            ? "text-purple-400 bg-purple-500/10"
                            : "text-violet-600 bg-violet-100/50"
                          : isDarkMode
                            ? "text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                            : "text-gray-700 hover:text-violet-600 hover:bg-violet-100/50"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}

              {!user && (
                <>
                  <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/login"
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${isDarkMode
                        ? "text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/50"
                        : "text-violet-600 hover:text-white hover:bg-violet-500 border border-violet-300"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LoginOutlined /> Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/register"
                      className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-500 hover:to-purple-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FormOutlined /> Register
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav >
  );
};

export default Navbar;