import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Briefcase, FileText, Loader2, Shield } from "lucide-react";
import { useTheme } from '../context/ThemeContext'; // Adjusted import path

import api from "../api/axios";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Use the theme hook here!

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    placeCity: "",
    qualification: "",
    selectProgramme: "",
    resumeFile: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    qualification: '',
    selectProgramme: '',
    resumeFile: '',
    general: ''
  });

  const qualifications = [
    { value: '', label: 'Select Qualification' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'Ph.D.' },
    { value: 'other', label: 'Other' },
  ];


  const programmes = [
    { value: '', label: 'Select Programme' },
    { value: 'azure_data_engineering', label: 'AZURE DATA ENGINEERING' },
    { value: 'cloud_computing_engineering', label: 'CLOUD COMPUTING & ENGINEERING' },
    { value: 'machine_learning', label: 'MACHINE LEARNING' },
    { value: 'sql_database_management', label: 'SQL DATABASE MANAGEMENT' },
    { value: 'generative_ai', label: 'GENERATIVE AI' },
    { value: 'data_sciences', label: 'DATA SCIENCES' },
    { value: 'data_analytics', label: 'DATA ANALYTICS' },
    { value: 'cloud_engineering', label: 'CLOUD ENGINEERING' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData(prev => ({ ...prev, resumeFile: file }));
    setErrors(prev => ({ ...prev, resumeFile: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      fullName: '', email: '', password: '', phone: '', qualification: '', selectProgramme: '', resumeFile: '', general: ''
    });

    let hasError = false;
    const newErrors = { ...errors };

    if (!formData.fullName) { newErrors.fullName = "Full Name is required."; hasError = true; }
    if (!formData.email) { newErrors.email = "Email is required."; hasError = true; }
    if (!formData.password) { newErrors.password = "Password is required."; hasError = true; }
    if (!formData.phone) { newErrors.phone = "Phone number is required."; hasError = true; }
    if (!formData.qualification) { newErrors.qualification = "Qualification is required."; hasError = true; }
    if (!formData.selectProgramme) { newErrors.selectProgramme = "Programme selection is required."; hasError = true; }
    if (!formData.resumeFile) { newErrors.resumeFile = "Resume is required."; hasError = true; }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key as keyof typeof formData]) {
          data.append(key, formData[key as keyof typeof formData] as any);
        }
      });

      // Import api locally if not at top, or assume it's imported
      // Need to import api at top

      const response = await api.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Registration successful", response.data);
      // login user automatically or redirect to login?
      // navigate("/login");
      // Actually login usually returns token, so could login directly.
      // But let's navigate to login for now or use the token directly if available.
      // The backend returns { token, user }.

      // We should probably login immediately if using AuthContext
      // But let's just redirect to login for simplicity or success page
      // navigate("/login");

      // Let's use the login function from context if available, or just navigate
      navigate("/login");

    } catch (err: any) {
      console.error(err);
      setErrors(prev => ({ ...prev, general: err.response?.data?.message || "Registration failed. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex justify-center px-4 py-20 relative overflow-hidden ${isDarkMode
      ? 'bg-gradient-to-b from-[#1A0033] to-[#2D1B69]'
      : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Signup card container */}
      <div className={`relative z-10 p-8 rounded-3xl shadow-2xl w-full max-w-md border ${isDarkMode
        ? 'bg-gray-900/95 dark:border-white/20' // Apply dark background and border for dark mode
        : 'bg-white/95 border-gray-200' // Apply light background and border for light mode
        } backdrop-blur-sm`}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Join Us
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Courses Registration</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.fullName ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.email ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.password ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Mobile number (10-digit)"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.phone ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Place / City (Optional) */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Place / City</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="placeCity"
                placeholder="e.g., Chennai"
                value={formData.placeCity}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  }`}
              />
            </div>
          </div>

          {/* Qualification (Dropdown) */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Highest Academic Qualification</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.qualification ? 'border-red-500' : ''}`}
                required
              >
                {qualifications.map(option => (
                  <option key={option.value} value={option.value} disabled={!option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
          </div>

          {/* Select Programme (Dropdown) */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Internship Programme</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="selectProgramme"
                value={formData.selectProgramme}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.selectProgramme ? 'border-red-500' : ''}`}
                required
              >
                {programmes.map(option => (
                  <option key={option.value} value={option.value} disabled={!option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.selectProgramme && <p className="text-red-500 text-sm mt-1">{errors.selectProgramme}</p>}
          </div>

          {/* Resume Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Resume Upload (PDF or DOCX)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="file"
                name="resumeFile"
                onChange={handleFileChange}
                accept=".pdf,.docx"
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${isDarkMode
                  ? 'bg-gray-800 text-white border-gray-700 file:bg-purple-600 file:text-white'
                  : 'bg-white text-gray-900 border-gray-300 file:bg-purple-50 file:text-purple-700'
                  } transition-all ${errors.resumeFile ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.resumeFile && <p className="text-red-500 text-sm mt-1">{errors.resumeFile}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Briefcase className="w-5 h-5 mr-2" />
            )}
            {isLoading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
