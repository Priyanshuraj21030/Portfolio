"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const fullText = "Hi, I'm a Web Developer";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Enhanced typing effect with cursor
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        currentIndex = fullText.length;
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(typingInterval);
    };
  }, []);

  // Tech grid effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Matrix rain effect characters
  const chars =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newChar = chars[Math.floor(Math.random() * chars.length)];
      setMatrixChars((prev) => [...prev, newChar].slice(-50));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <ThemeToggle />
      <AnimatePresence>
        {loading && (
          <motion.div
            ref={containerRef}
            className="fixed inset-0 bg-dark-bg z-50 flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={
              {
                "--mouse-x": `${mousePosition.x}%`,
                "--mouse-y": `${mousePosition.y}%`,
              } as React.CSSProperties
            }
          >
            {/* Tech Grid Background */}
            <div className="absolute inset-0 cyber-grid opacity-20" />

            {/* Matrix rain effect */}
            <div className="absolute inset-0 overflow-hidden opacity-15">
              {matrixChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="absolute text-neon-blue font-matrix"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{
                    opacity: [1, 0],
                    y: ["0vh", "100vh"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    fontSize: "1.2rem",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Main loading content */}
            <div className="relative z-10 text-center">
              <motion.div
                className="text-4xl md:text-6xl font-bold mb-8 tech-circle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="preloader-text-glitch inline-block">
                  {text}
                  <motion.span
                    className="inline-block w-[3px] h-[1em] bg-neon-blue ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </span>
              </motion.div>

              {/* Enhanced progress bar */}
              <div className="relative w-64 h-2 bg-dark-accent rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full loading-progress"
                  style={{
                    background: `linear-gradient(90deg, #00ff88 ${progress}%, #00eeff)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Loading text with tech decoration */}
              <motion.div
                className="text-neon-blue text-sm font-matrix"
                animate={{ opacity: [0.7, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <span className="mr-2">SYSTEM LOADING</span>
                <span className="inline-block min-w-[3ch]">{progress}%</span>
              </motion.div>

              {/* Tech decorations */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    border: "1px solid rgba(0, 255, 136, 0.2)",
                    borderRadius: "50%",
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-[20px]"
                  style={{
                    border: "1px solid rgba(0, 238, 255, 0.2)",
                    borderRadius: "50%",
                  }}
                  animate={{
                    rotate: -360,
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-[40px]"
                  style={{
                    border: "1px solid rgba(0, 255, 136, 0.1)",
                    borderRadius: "50%",
                  }}
                  animate={{
                    rotate: 180,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>

            {/* Corner decorations */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map(
              (position) => (
                <div
                  key={position}
                  className={`absolute ${position.replace(
                    "-",
                    "-0 "
                  )} w-16 h-16 ${position}`}
                  style={{
                    background: `linear-gradient(${
                      position.includes("top") ? "45deg" : "225deg"
                    }, transparent, rgba(0, 255, 136, 0.1))`,
                  }}
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Preloader;
