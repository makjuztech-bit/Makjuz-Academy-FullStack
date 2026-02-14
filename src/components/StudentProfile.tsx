import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface StudentProfileData {
  _id: string; // Updated to match backend
  name: string;
  photoUrl: string;
  program: string;
  quote: string;
  githubUrl: string;
  expectedGraduation: string;
  sections: {
    myStory: string;
    whyThisAcademy: string;
    myExperience: string;
    whatNext: string;
  };
  progress: string[];
  mockExamSpotlight: {
    title: string;
    challenge: string;
    solution: string;
    projectImage: string;
    githubLink: string;
    liveProjectLink: string;
  };
  pullQuote: {
    mentorName: string;
    quote: string;
  };
}

interface StudentProfileProps {
  className?: string; // Optional className prop
}

const StudentProfile: React.FC<StudentProfileProps> = ({ className }) => {
  const { studentId } = useParams<{ studentId: string }>();
  const [profile, setProfile] = useState<StudentProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!studentId) {
        setIsLoading(false);
        return;
      }
      try {
        const { data: user } = await api.get(`/users/${studentId}`);

        // Default mock exam data if user hasn't filled it
        const defaultMockExam = {
          title: 'E-Commerce Platform',
          challenge: 'Building a scalable backend with high concurrency.',
          solution: 'Implemented microservices architecture using Node.js and Docker.',
          projectImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=400',
          githubLink: user.githubUrl || '#',
          liveProjectLink: user.portfolioUrl || '#'
        };

        const mappedProfile: StudentProfileData = {
          _id: user._id,
          name: user.name,
          photoUrl: user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
          program: user.program || user.qualification || "Full-Stack Development",
          quote: user.quote || "Learning is a lifelong journey.",
          githubUrl: user.githubUrl || "#",
          expectedGraduation: user.expectedGraduation || "2025",
          sections: {
            myStory: user.studentProfile?.myStory || user.bio || "Student has not added a story yet.",
            whyThisAcademy: user.studentProfile?.whyThisAcademy || "The curriculum seemed very comprehensive and practical.",
            myExperience: user.studentProfile?.myExperience || "It has been a challenging but rewarding experience.",
            whatNext: user.studentProfile?.whatNext || "I plan to work as a Senior Developer."
          },
          progress: user.progress || user.skills || ['React', 'Node.js', 'MongoDB', 'Express'],
          mockExamSpotlight: (user.studentProfile?.mockExamSpotlight?.title) ? user.studentProfile.mockExamSpotlight : defaultMockExam,
          pullQuote: (user.studentProfile?.pullQuote?.quote) ? user.studentProfile.pullQuote : {
            mentorName: 'Senior Mentor',
            quote: 'This student shows exceptional promise and dedication.'
          }
        };
        setProfile(mappedProfile);
      } catch (err) {
        console.error("Failed to fetch student profile", err);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [studentId]);

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-[#1A0033]' : 'bg-gray-50'}`}>
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`text-center text-xl p-8 min-h-screen pt-24 ${isDarkMode ? 'text-white bg-[#1A0033]' : 'text-gray-900 bg-gray-50'}`}>
        Profile not found.
      </div>
    );
  }

  const bgClass = isDarkMode ? 'bg-[#1A0033]' : 'bg-gray-50';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const cardBg = isDarkMode ? 'bg-white/5 border border-purple-500/20' : 'bg-white shadow-lg';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pt-24 pb-12 ${bgClass} ${textClass} ${className || ''}`}
    >
      <div className="container mx-auto px-4 md:px-8">

        {/* Header Section */}
        <div className={`flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 p-8 rounded-2xl ${cardBg}`}>
          <motion.img
            src={profile.photoUrl}
            alt={`Photo of ${profile.name}`}
            className="w-48 h-48 rounded-full border-4 border-purple-500 shadow-xl object-cover"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">{profile.name}</h1>
            <p className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{profile.program}</p>
            <p className="italic my-4 text-lg max-w-2xl opacity-80">"{profile.quote}"</p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm mt-4">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 hover:underline">
                  GitHub Profile
                </a>
              )}
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">
                Expected Graduation: <span className="font-semibold text-purple-400">{profile.expectedGraduation}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Section title="My Story" content={profile.sections.myStory} isDarkMode={isDarkMode} />
          <Section title="Why this Academy?" content={profile.sections.whyThisAcademy} isDarkMode={isDarkMode} />
          <Section title="My Experience" content={profile.sections.myExperience} isDarkMode={isDarkMode} />
          <Section title="What's Next?" content={profile.sections.whatNext} isDarkMode={isDarkMode} />
        </div>

        {/* Skills / Progress */}
        <div className={`p-8 rounded-2xl mb-12 ${cardBg}`}>
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Technical Skills</h2>
          <div className="flex flex-wrap gap-3">
            {profile.progress.map((item, index) => (
              <span key={index} className={`px-4 py-2 rounded-full font-medium ${isDarkMode ? 'bg-purple-900/40 text-purple-200' : 'bg-purple-100 text-purple-700'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Mock Exam Spotlight */}
        <div className={`p-8 rounded-2xl mb-12 ${cardBg}`}>
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Project Spotlight</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{profile.mockExamSpotlight.title}</h3>
              <div className="mb-4 space-y-2">
                <p><span className="font-semibold text-purple-400">The Challenge:</span> <span className="opacity-80">{profile.mockExamSpotlight.challenge}</span></p>
                <p><span className="font-semibold text-green-400">The Solution:</span> <span className="opacity-80">{profile.mockExamSpotlight.solution}</span></p>
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href={profile.mockExamSpotlight.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                  View Code
                </a>
                <a
                  href={profile.mockExamSpotlight.liveProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                >
                  Live Demo
                </a>
              </div>
            </div>
            <div>
              <img
                src={profile.mockExamSpotlight.projectImage}
                alt="Project Screenshot"
                className="rounded-xl shadow-lg border border-gray-700 hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Mentor Quote */}
        <div className={`p-8 rounded-2xl mb-12 text-center border-l-4 border-purple-500 ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-white shadow-lg'}`}>
          <blockquote className="text-2xl italic font-serif opacity-90">"{profile.pullQuote.quote}"</blockquote>
          <p className="mt-4 text-purple-400 font-bold">- {profile.pullQuote.mentorName}</p>
        </div>

      </div>
    </motion.div>
  );
};

// Reusable section component
const Section: React.FC<{ title: string; content: string; isDarkMode: boolean }> = ({ title, content, isDarkMode }) => (
  <div className={`p-6 rounded-xl h-full ${isDarkMode ? 'bg-white/5 border border-purple-500/10' : 'bg-white shadow-md'}`}>
    <h3 className="text-xl font-bold text-purple-400 mb-3">{title}</h3>
    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{content}</p>
  </div>
);

export default StudentProfile;