import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Code,
  Layers,
  Monitor,
  X,
  Play,
  MapPin,
  Lock,
  Smartphone,
  Palette,
  Share2,
  Activity,
  Link,
  Shield,
  Recycle,
  Leaf,
  Award,
  Database,
  Brain,
  LineChart,
  Search,
  List,
  Grid,
  Film,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoUrl: string; // URL for the embedded demo
  previewType: "iframe" | "video" | "interactive";
  interactiveDemo?: React.ReactNode; // For custom interactive components
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: "frontend" | "fullstack" | "other";
  features: { icon: JSX.Element; text: string }[];
  techStack: string[];
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  contributions: ContributionDay[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Medical Prediction System",
    description:
      "A machine learning-powered web application that predicts breast cancer and diabetes risks using Flask and Scikit-learn. It provides real-time results with a user-friendly interface.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028",
    demoUrl: "https://your-demo-url.com/ecommerce",
    previewType: "interactive",
    interactiveDemo: (
      <div className="w-full h-full bg-dark-card rounded-lg p-4">
        {/* Add your interactive demo component here */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-dark-accent rounded-lg animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-dark-accent rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-dark-accent/50 rounded w-1/2 mt-2 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-neon-blue/20 text-neon-blue p-2 rounded-lg hover:bg-neon-blue/30 transition-colors">
              Add to Cart
            </button>
            <button className="bg-dark-accent p-2 rounded-lg hover:bg-dark-accent/70 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    ),
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Priyanshuraj21030/Prediction-System",
    category: "fullstack",
    features: [
      { icon: <Brain size={18} />, text: "ML-Powered Predictions" },
      { icon: <Activity size={18} />, text: "Real-time Analysis" },
      { icon: <Database size={18} />, text: "Multiple Disease Prediction" },
      { icon: <LineChart size={18} />, text: "Accurate Results" },
    ],
    techStack: [
      "Python",
      "Flask",
      "Scikit-learn",
      "TensorFlow",
      "HTML/CSS",
      "JavaScript",
    ],
  },
  {
    id: 2,
    title: "Real-time Location Tracking",
    description:
      "A modern web application built with Vue.js that allows users to share their location with friends and family in real-time.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://real-time-tracker-chi.vercel.app/",
    previewType: "iframe",
    tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://real-time-tracker-chi.vercel.app/",
    githubUrl: "https://github.com/Priyanshuraj21030/Real-Time-Tracker",
    category: "frontend",
    features: [
      { icon: <MapPin size={18} />, text: "Real-time Tracking" },
      { icon: <Share2 size={18} />, text: "One-Click Sharing" },
      { icon: <Lock size={18} />, text: "Privacy Controls" },
      { icon: <Smartphone size={18} />, text: "Cross-Platform" },
      { icon: <Palette size={18} />, text: "Modern UI" },
    ],
    techStack: [
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Leaflet",
      "Web Share API",
    ],
  },
  {
    id: 3,
    title: "GreenBin - Waste Management",
    description:
      "A modern and efficient web application designed to tackle waste management challenges with technology and sustainability. The platform empowers users to manage waste effectively while promoting eco-friendly practices.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://your-demo-url.com/task-app",
    previewType: "iframe",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Priyanshuraj21030/GreenBin",
    category: "fullstack",
    features: [
      { icon: <Recycle size={18} />, text: "Smart Waste Management" },
      { icon: <Leaf size={18} />, text: "Eco-friendly Solutions" },
      { icon: <Shield size={18} />, text: "Secure Platform" },
      { icon: <Award size={18} />, text: "Sustainability Tracking" },
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "Certify",
    description:
      "A comprehensive certificate management and verification system.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://certificate-nine-delta.vercel.app/",
    previewType: "iframe",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT" , "Typescript" , "Next.js"],
    liveUrl: "https://certificate-nine-delta.vercel.app/",
    githubUrl: "https://github.com/Priyanshuraj21030/Certificate-Generator",
    category: "fullstack",
    features: [
      { icon: <Award size={18} />, text: "Certificate Generation" },
      { icon: <Shield size={18} />, text: "Secure Verification" },
      { icon: <Link size={18} />, text: "Easy Sharing" },
      { icon: <Database size={18} />, text: "Certificate Storage" },
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express", "JWT"],
  },
  {
    id: 5,
    title: "Movie Database Application",
    description:
      "A React-based movie database application that allows users to browse and search movies using The Movie Database (TMDB) API. Features include popular movie listings, search functionality, pagination, and detailed movie information with a responsive design.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://movie-database-react.vercel.app",
    previewType: "iframe",
    tags: ["React", "TMDB API", "CSS Grid", "Responsive Design"],
    liveUrl: "https://movie-database-react.vercel.app",
    githubUrl: "https://github.com/Priyanshuraj21030/Movie",
    category: "frontend",
    features: [
      { icon: <Search size={18} />, text: "Movie Search" },
      { icon: <List size={18} />, text: "Popular Movies" },
      { icon: <Grid size={18} />, text: "Responsive Grid" },
      { icon: <Film size={18} />, text: "Movie Details" },
    ],
    techStack: [
      "React.js",
      "TMDB API",
      "CSS Grid",
      "CSS Flexbox",
      "Environment Variables",
      "Responsive Design",
    ],
  },
  {
    id: 6,
    title: "AI Q&A Application",
    description:
      "A full-stack application that enables users to ask questions and receive AI-powered responses. Features include conversation history, rate limiting, paginated history view, and integration with Hugging Face API for intelligent responses.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://ai-five-coral.vercel.app",
    previewType: "iframe",
    tags: ["React", "FastAPI", "SQLite", "Hugging Face API"],
    liveUrl: "https://ai-five-coral.vercel.app",
    githubUrl: "https://github.com/Priyanshuraj21030/ai",
    category: "fullstack",
    features: [
      { icon: <Brain size={18} />, text: "AI-powered Q&A" },
      { icon: <Database size={18} />, text: "Persistent History" },
      { icon: <LineChart size={18} />, text: "Rate Limiting" },
      { icon: <Activity size={18} />, text: "Real-time Responses" },
    ],
    techStack: [
      "React + Vite",
      "FastAPI",
      "SQLite",
      "Hugging Face API",
      "aiohttp",
      "CORS",
    ],
  },
];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const filterOptions = [
    { value: "all", label: "All Projects", icon: <Layers size={16} /> },
    { value: "frontend", label: "Frontend", icon: <Monitor size={16} /> },
    { value: "fullstack", label: "Full Stack", icon: <Code size={16} /> },
    { value: "other", label: "Other", icon: <ExternalLink size={16} /> },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const handlePreviewClick = (project: Project) => {
    setSelectedProject(project);
    setIsPreviewActive(true);
  };

  const handlePreviewLoad = () => {
    setIsPreviewLoading(false);
  };

  const handleScaleChange = (scale: number) => {
    setPreviewScale(Math.max(0.5, Math.min(2, scale)));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const fetchGitHubStats = async () => {
    setIsLoading(true);
    try {
      // Replace with your GitHub username
      const username = "Priyanshuraj21030";
      const response = await fetch(
        `https://api.github.com/users/${username}/events`
      );
      const data = await response.json();
      console.log(data);

      // Process the data to create the stats object
      // This is a simplified version - you'll need to implement the actual data processing
      const mockStats: GitHubStats = {
        totalContributions: 847,
        currentStreak: 12,
        longestStreak: 30,
        contributions: Array.from({ length: 365 }, (_, i) => ({
          date: new Date(
            Date.now() - (364 - i) * 24 * 60 * 60 * 1000
          ).toISOString(),
          count: Math.floor(Math.random() * 10),
          level: Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4,
        })),
      };

      setGithubStats(mockStats);
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <div className="w-20 h-1 bg-neon-blue mb-8"></div>
        <p className="text-gray-300 max-w-2xl mb-12">
          Here are some of my recent projects that showcase my skills in web
          development, machine learning, and full-stack applications.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        {filterOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === option.value
                ? "bg-neon-blue/20 text-neon-blue neon-border"
                : "bg-dark-card hover:bg-dark-accent text-gray-300 border border-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.icon}
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              className="project-card glass rounded-xl overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent" />

                {/* Preview Button */}
                <motion.button
                  onClick={() => handlePreviewClick(project)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-neon-blue text-dark-bg px-4 py-2 rounded-full font-medium
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} />
                  Live Preview
                </motion.button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Features */}
                <div className="space-y-6">
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    {project.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="text-neon-blue">{feature.icon}</span>
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium text-neon-blue bg-neon-blue/10 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-neon-blue hover:underline text-sm"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-300 hover:text-white hover:underline text-sm"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {selectedProject && isPreviewActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm ${
              isFullscreen ? "p-0" : "p-4"
            }`}
            onClick={() => setIsPreviewActive(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative bg-dark-bg rounded-xl overflow-hidden ${
                isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-5xl"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-dark-card">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-neon-blue">
                      {selectedProject.title}
                    </span>
                    <span className="text-gray-400 text-sm">Live Preview</span>
                  </h3>
                  {isPreviewLoading && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-gray-400">
                        Loading preview...
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {/* Preview Controls */}
                  <div className="flex items-center gap-2 bg-dark-bg rounded-lg p-1">
                    <button
                      onClick={() => handleScaleChange(previewScale - 0.1)}
                      className="p-2 hover:bg-dark-accent rounded-lg transition-colors text-gray-400 hover:text-white"
                      title="Zoom Out"
                    >
                      <span className="text-xl">-</span>
                    </button>
                    <span className="text-sm text-gray-400 min-w-[3rem] text-center">
                      {Math.round(previewScale * 100)}%
                    </span>
                    <button
                      onClick={() => handleScaleChange(previewScale + 0.1)}
                      className="p-2 hover:bg-dark-accent rounded-lg transition-colors text-gray-400 hover:text-white"
                      title="Zoom In"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-dark-accent rounded-lg transition-colors text-gray-400 hover:text-white"
                    title={
                      isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                    }
                  >
                    <Monitor size={20} />
                  </button>
                  <button
                    onClick={() => setIsPreviewActive(false)}
                    className="p-2 hover:bg-dark-accent rounded-lg transition-colors text-gray-400 hover:text-white"
                    title="Close Preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div
                className={`relative bg-dark-card ${
                  isFullscreen ? "h-[calc(100vh-8rem)]" : "aspect-video"
                }`}
              >
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
                      <p className="text-gray-400">Loading preview...</p>
                    </div>
                  </div>
                )}
                <div
                  className="w-full h-full overflow-auto"
                  style={{
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top left",
                    transition: "transform 0.2s ease-out",
                  }}
                >
                  {selectedProject.previewType === "iframe" ? (
                    <iframe
                      src={selectedProject.demoUrl}
                      className="w-full h-full border-0"
                      title={`${selectedProject.title} preview`}
                      onLoad={handlePreviewLoad}
                      onError={() => setIsPreviewLoading(false)}
                    />
                  ) : selectedProject.previewType === "interactive" ? (
                    <div className="w-full h-full">
                      {selectedProject.interactiveDemo}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">
                        Preview not available
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Footer */}
              <div className="p-4 border-t border-gray-800 bg-dark-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neon-blue hover:underline bg-neon-blue/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-neon-blue/20"
                    >
                      <ExternalLink size={16} />
                      Open Live Site
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white bg-dark-accent/50 px-3 py-1.5 rounded-lg transition-colors hover:bg-dark-accent"
                    >
                      <Github size={16} />
                      View Source
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-dark-accent/50 px-2 py-1 rounded-md text-xs font-medium text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GitHub Activity Section - Compact Version */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <div className="bg-dark-card rounded-xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Github className="text-neon-blue" size={20} />
              <h2 className="text-lg font-bold">GitHub Activity</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{githubStats?.currentStreak} day streak</span>
              <span>•</span>
              <span>{githubStats?.totalContributions} contributions</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-24">
              <div className="w-6 h-6 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : githubStats ? (
            <div className="overflow-x-auto">
              <div className="flex gap-0.5">
                {/* Show only last 30 days of activity */}
                {githubStats.contributions.slice(-30).map((day, index) => (
                  <div
                    key={index}
                    className={`w-2 h-8 transition-colors duration-200
                      ${
                        day.level === 0
                          ? "bg-dark-bg border-t border-b border-gray-800"
                          : day.level === 1
                          ? "bg-neon-blue/20"
                          : day.level === 2
                          ? "bg-neon-blue/40"
                          : day.level === 3
                          ? "bg-neon-blue/60"
                          : "bg-neon-blue"
                      }`}
                    title={`${new Date(day.date).toLocaleDateString()}: ${
                      day.count
                    } commits`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>Last 30 days</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-sm ${
                          level === 0
                            ? "bg-dark-bg border border-gray-800"
                            : level === 1
                            ? "bg-neon-blue/20"
                            : level === 2
                            ? "bg-neon-blue/40"
                            : level === 3
                            ? "bg-neon-blue/60"
                            : "bg-neon-blue"
                        }`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4 text-sm">
              Failed to load GitHub activity
            </div>
          )}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Want to see more?</h2>
        <p className="text-gray-400 mb-6">
          Check out my GitHub profile for more projects and contributions.
        </p>
        <a
          href="https://github.com/Priyanshuraj21030"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-dark-card hover:bg-dark-accent px-6 py-3 rounded-full font-medium transition-colors border border-gray-700"
        >
          <Github size={18} />
          View GitHub Profile
        </a>
      </motion.div>
    </div>
  );
};

export default Projects;
