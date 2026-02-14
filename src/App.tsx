import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import TrendingCourses from './components/TrendingCourses';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonial';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseDetails from './components/newCourseDetails';
import CoursesSection from './components/CoursesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ReasonsSection from './components/ReasonSection';
import MockUp from './components/MockUp';
import FeaturesSection from './components/FeaturesSection';
import StudentProfile from './components/StudentProfile.tsx';
import Profile from './pages/Profile';
import Certificates from './pages/Certificates';
import Internships from './pages/Internships';
import ProjectHub from './pages/ProjectHub';
import Placement from './pages/Placement';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJobs from './pages/admin/AdminJobs';

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#8A2BE2',
          colorBgContainer: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
          colorBorder: isDarkMode ? 'rgba(138, 43, 226, 0.3)' : 'rgba(138, 43, 226, 0.2)',
          borderRadius: 12,
        },
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-500 ${isDarkMode
          ? 'bg-gradient-to-br from-[#1A0033] via-[#2D1B69] to-[#1A0033]'
          : 'bg-gradient-to-br from-violet-50 via-purple-50 to-white'
          }`}
      >
        <Navbar />

        {/* Main content wrapper with top padding to account for the fixed/sticky Navbar */}
        <div className="pt-16"> {/* This div applies top padding to all content within Routes */}
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <WhyChooseUs />
                  <TrendingCourses />
                  <ReasonsSection />
                  <FeaturesSection />
                  <Testimonials />
                  <Footer />
                </>
              }
            />
            {/* Courses */}
            <Route
              path="/courses"
              element={
                <>
                  <CoursesSection />
                  <Footer />
                </>
              }
            />

            {/* Course Details */}
            <Route
              path="/courses/:id"
              element={
                <>
                  <CourseDetails />
                </>
              }
            />
            {/* About */}
            <Route
              path="/about"
              element={
                <>
                  <AboutSection />
                  <Footer />
                </>
              }
            />
            {/* Contact */}
            <Route
              path="/contact"
              element={
                <>
                  <ContactSection />
                  <Footer />
                </>
              }
            />
            {/* Login */}
            <Route
              path="/login"
              element={
                <>
                  <Login />
                  <Footer />
                </>
              }
            />
            {/* New Register Page */}
            <Route
              path="/register"
              element={
                <>
                  <Signup />
                  <Footer />
                </>
              }
            />
            {/* Profile Page */}
            <Route
              path="/profile"
              element={
                <>
                  <Profile />
                  <Footer />
                </>
              }
            />
            {/* Route for the /mock page, rendering the Mock component */}
            <Route
              path="/mock"
              element={
                <>
                  <MockUp />
                  <Footer />
                </>
              }
            />

            {/* Specialized Tracks */}
            <Route path="/certificates" element={<><Certificates /><Footer /></>} />
            <Route path="/internships" element={<><Internships /><Footer /></>} />
            <Route path="/projects" element={<><ProjectHub /><Footer /></>} />
            <Route path="/placement" element={<><Placement /><Footer /></>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="jobs" element={<AdminJobs />} />
            </Route>

            {/* Existing dynamic route for Student Profile */}
            <Route
              path="/students/:studentId"
              element={
                <>
                  <StudentProfile />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>

      </div>
    </ConfigProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;