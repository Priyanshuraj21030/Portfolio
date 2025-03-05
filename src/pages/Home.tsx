import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Code, Cpu, Database } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const developerRoles = [
    "Web Developer",
    "Frontend Developer",
    "Fullstack Developer",
    "Python Developer",
    "Software Developer",
    // Add more roles here
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Initialize galaxy parallax effect
  useEffect(() => {
    if (galaxyRef.current && isLoaded) {
      const stars = document.querySelectorAll(".star");
      const nebula = document.querySelectorAll(".nebula");

      gsap.to(stars, {
        y: -100,
        scale: 1.2,
        opacity: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: galaxyRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(nebula, {
        y: -50,
        scale: 1.1,
        opacity: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: galaxyRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 2,
        },
      });

      setIsLoaded(true);
    }
  }, [isLoaded]);

  // Role rotation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % developerRoles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Galaxy Background */}
      <div ref={galaxyRef} className="fixed inset-0 z-0">
        {/* Particles.js Stars */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#0a0a0a",
              },
            },
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: ["#ffffff", "#87ceeb", "#f0f8ff"],
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.8,
                random: true,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 0.3,
                  sync: false,
                },
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "out",
                },
              },
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 0.5,
                  },
                },
              },
            },
          }}
        />

        {/* Nebula Effects */}
        <div className="absolute inset-0 z-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="nebula absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                background: `radial-gradient(circle at center, 
                  rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
                  Math.random() * 255
                }, 0.2) 0%,
                  transparent 70%)`,
                filter: "blur(30px)",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        {/* Additional Star Layers */}
        <div className="absolute inset-0 z-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <div ref={heroRef} className="max-w-4xl mx-auto">
              <motion.div
                className="gsap-hero-element mb-4 cyber-glitch-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-neon-blue font-mono relative">
                  Hello, I'm
                </span>
              </motion.div>

              <h1 className="gsap-hero-element text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <motion.span
                  className="block cyber-glitch-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Priyanshu Raj
                </motion.span>
                <motion.span
                  key={currentRoleIndex}
                  className="role-text cyber-glitch-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  data-text={developerRoles[currentRoleIndex]}
                >
                  {developerRoles[currentRoleIndex]}
                </motion.span>
              </h1>

              <p className="gsap-hero-element text-gray-300 text-lg md:text-xl mb-8 max-w-2xl cyber-text">
                I craft visually stunning and highly interactive web experiences
                using modern technologies. Specializing in React, TypeScript,
                and dynamic animations, I blend creativity with performance to
                build seamless, engaging user interfaces. 🚀
              </p>

              <div className="gsap-hero-element flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/projects"
                    className="flex items-center gap-2 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue px-6 py-3 rounded-full font-medium transition-colors neon-border"
                  >
                    View Projects
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="https://github.com/Priyanshuraj21030"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-dark-card hover:bg-dark-accent px-6 py-3 rounded-full font-medium transition-colors border border-gray-700"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                </motion.div>
              </div>

              {/* Enhanced scroll indicator */}
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
                <motion.div
                  className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center p-1"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 bg-neon-blue rounded-full"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Skills Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="neon-text-purple">Featured</span> Skills
              </motion.h2>
              <motion.p
                className="text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Hover over each skill to see more details about my experience
                and proficiency.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Code size={40} />,
                  title: "Frontend Development",
                  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
                  color: "neon-blue",
                },
                {
                  icon: <Cpu size={40} />,
                  title: "Backend Development",
                  skills: [
                    "Node.js",
                    "Express",
                    "API Design",
                    "Authentication",
                  ],
                  color: "neon-purple",
                },
                {
                  icon: <Database size={40} />,
                  title: "Database & DevOps",
                  skills: ["MongoDB", "PostgreSQL", "Docker", "AWS"],
                  color: "neon-pink",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    boxShadow: `0 0 20px rgba(${
                      category.color === "neon-blue"
                        ? "0, 238, 255"
                        : category.color === "neon-purple"
                        ? "157, 78, 221"
                        : "255, 0, 255"
                    }, 0.3)`,
                  }}
                  className="glass p-8 rounded-xl"
                >
                  <motion.div
                    className={`text-${category.color} mb-6`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {category.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        className={`skill-badge bg-${category.color}/10 text-${category.color}`}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: `rgba(${
                            category.color === "neon-blue"
                              ? "0, 238, 255"
                              : category.color === "neon-purple"
                              ? "157, 78, 221"
                              : "255, 0, 255"
                          }, 0.2)`,
                        }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 opacity-30"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to work together?
              </motion.h2>

              <motion.p
                className="text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                I'm currently available for freelance work and exciting
                projects. Let's create something amazing together!
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/contact"
                  className="bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple px-8 py-4 rounded-full font-medium transition-colors border border-neon-purple/50"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Add these styles to your global CSS or create them inline */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }

          .nebula {
            mix-blend-mode: screen;
            pointer-events: none;
          }

          .star {
            box-shadow: 0 0 10px #fff;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
