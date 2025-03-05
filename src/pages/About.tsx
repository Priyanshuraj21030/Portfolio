import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Award,
  BookOpen,
  Briefcase,
  User,
} from "lucide-react";
import axios from "axios";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiJavascript,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiVuedotjs,
  SiHtml5,
  SiBootstrap,
  SiNestjs,
  SiExpress,
  SiOpenjdk as SiJava,
  SiMysql,
  SiDocker,
  SiAmazon as SiAmazonaws,
  SiVercel,
  SiNetlify,
  SiPostman,
} from "react-icons/si";
import { TbBug } from "react-icons/tb";
import { ArrowRight } from "lucide-react";

interface GithubStats {
  publicRepos: number;
  followers: number;
  following: number;
}

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  category: "frontend" | "backend" | "database" | "tools";
}

const skills: Skill[] = [
  {
    name: "React.js",
    icon: SiReact,
    color: "#61DAFB",
    category: "frontend",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    category: "frontend",
  },
  {
    name: "Vue.js",
    icon: SiVuedotjs,
    color: "#4FC08D",
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    category: "frontend",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    category: "frontend",
  },
  {
    name: "HTML & CSS",
    icon: SiHtml5,
    color: "#E34F26",
    category: "frontend",
  },
  {
    name: "Bootstrap",
    icon: SiBootstrap,
    color: "#7952B3",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    category: "frontend",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
    category: "backend",
  },
  {
    name: "Nest.js",
    icon: SiNestjs,
    color: "#E0234E",
    category: "backend",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "#000000",
    category: "backend",
  },
  {
    name: "Java",
    icon: SiJava,
    color: "#007396",
    category: "backend",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    category: "database",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    category: "database",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "#4479A1",
    category: "database",
  },
  {
    name: "Git & GitHub",
    icon: SiGit,
    color: "#F05032",
    category: "tools",
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    category: "tools",
  },
  {
    name: "AWS",
    icon: SiAmazonaws,
    color: "#FF9900",
    category: "tools",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#000000",
    category: "tools",
  },
  {
    name: "Netlify",
    icon: SiNetlify,
    color: "#00C7B7",
    category: "tools",
  },
  {
    name: "Postman",
    icon: SiPostman,
    color: "#FF6C37",
    category: "tools",
  },
  {
    name: "Burp Suite",
    icon: TbBug,
    color: "#FF4444",
    category: "tools",
  },
];

const About: React.FC = () => {
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<
    Skill["category"] | "all"
  >("all");

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        // Replace 'yourusername' with your actual GitHub username
        const response = await axios.get(
          "https://api.github.com/users/Priyanshuraj21030"
        );
        setGithubStats({
          publicRepos: response.data.public_repos,
          followers: response.data.followers,
          following: response.data.following,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        // Fallback data in case of API error
        setGithubStats({
          publicRepos: 15,
          followers: 42,
          following: 38,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  const stats = [
    { icon: <Calendar size={20} />, value: "2+", label: "Years Experience" },
    {
      icon: <Briefcase size={20} />,
      value: "20+",
      label: "Projects Completed",
    },
    { icon: <Award size={20} />, value: "10+", label: "Certifications" },
    { icon: <Clock size={20} />, value: "500+", label: "Hours of Learning" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">About Me</h1>
        <div className="w-20 h-1 bg-neon-blue mb-8"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass rounded-xl p-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden neon-border">
                <img
                  src="./image.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Priyanshu Raj</h2>
                <p className="text-neon-blue font-mono">Software Developer</p>
                <p className="text-gray-400 mt-2">
                  Based in Bhopal (M.P), INDIA
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Passionate web developer with 2+ years of experience in building
              interactive, scalable web applications. Specializing in React.js,
              TypeScript, and modern UI libraries, with strong backend expertise
              in Node.js, Nest.js, and SQL/NoSQL databases. Focused on
              performance, usability, and clean architecture to deliver
              high-quality digital experiences.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-neon-blue">{stat.icon}</div>
                  <div>
                    <div className="font-bold text-xl">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="/RESUME.pdf"
                download="Priyanshu_Raj_Resume.pdf"
                className="bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue px-4 py-2 rounded-full text-sm font-medium transition-colors neon-border flex items-center gap-2"
                onClick={(e) => {
                  const link = e.currentTarget;
                  // Check if file exists
                  fetch(link.href)
                    .then((response) => {
                      if (response.status === 404) {
                        e.preventDefault();
                        alert(
                          "Resume file is currently being updated. Please try again later."
                        );
                      }
                    })
                    .catch(() => {
                      e.preventDefault();
                      alert(
                        "There was an error downloading the resume. Please try again later."
                      );
                    });
                }}
              >
                <ArrowRight size={16} />
                Download Resume
              </a>
              <a
                href="mailto:priyanshuraj21030@gmail.com"
                className="bg-dark-card hover:bg-dark-accent px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-700 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>

        {/* GitHub Stats & Skills */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-8"
        >
          {/* GitHub Stats */}
          <div className="glass rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-neon-purple" />
              GitHub Stats
            </h3>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple"></div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {githubStats &&
                  [
                    { label: "Repositories", value: githubStats.publicRepos },
                    { label: "Followers", value: githubStats.followers },
                    { label: "Following", value: githubStats.following },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-dark-accent rounded-lg"
                    >
                      <div className="text-2xl font-bold text-neon-purple">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Education */}
          <div className="glass rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-neon-pink" />
              Education
            </h3>

            <div className="space-y-6">
              {[
                {
                  degree: "Bachelor of Computer Science",
                  school: "Vellore Institute of Technology Bhopal",
                  year: "2021 - 2025",
                },
              ].map((edu, index) => (
                <div
                  key={index}
                  className="border-l-2 border-neon-pink/30 pl-4"
                >
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-gray-300">{edu.school}</p>
                  <p className="text-gray-400 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack Power Levels Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-neon-blue">⚡</span>
          Tech Stack
        </h2>

        {/* Category Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["all", "frontend", "backend", "database", "tools"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-neon-blue text-dark-bg"
                    : "bg-dark-accent text-white hover:bg-dark-accent/70"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              className="glass rounded-lg p-4 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <skill.icon
                  className="w-6 h-6"
                  style={{ color: skill.color }}
                />
                <h3 className="font-medium text-sm">{skill.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold mb-8">Work Experience</h2>

        <div className="space-y-8">
          {[
            {
              position: "Testing Intern",
              company: "PlyPicker",
              period: "2022 - 2024",
              description:
                "Contributed to data validation and quality assurance processes. Assisted in identifying and reporting bugs to improve platform stability. Ensured accurate data handling and compliance with project requirements.",
            },
            {
              position: "Core Team Member",
              company: "GeeksforGeeks - VIT Bhopal",
              period: "2023 - 2024",
              description:
                "Led and managed multiple technical events, workshops, and hackathons to enhance coding culture. Organized and promoted coding competitions, webinars, and community engagement activities. Collaborated with teams to ensure effective event execution and maximum participation. Played a key role in strategic planning and outreach to grow the GeeksforGeeks community on campus.",
            },
          ].map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{job.position}</h3>
                  <p className="text-neon-blue">{job.company}</p>
                </div>
                <div className="mt-2 md:mt-0 bg-dark-accent px-4 py-1 rounded-full text-sm">
                  {job.period}
                </div>
              </div>
              <p className="text-gray-300">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
