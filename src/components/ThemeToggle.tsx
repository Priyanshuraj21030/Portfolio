import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FiSun,
  FiMoon,
  FiZap,
  FiDroplet,
  FiMinimize2,
  FiClock,
} from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme, isAutoMode, toggleAutoMode } = useTheme();

  const themes = [
    { id: "dark", icon: FiMoon, label: "Dark" },
    { id: "cyberpunk", icon: FiZap, label: "Cyberpunk" },
    { id: "glassmorphism", icon: FiDroplet, label: "Glass" },
    { id: "minimal", icon: FiMinimize2, label: "Minimal" },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2">
        {/* Auto mode toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAutoMode}
          className={`p-2 rounded-full ${
            isAutoMode
              ? "bg-neon-blue text-dark-bg"
              : "bg-dark-accent text-white"
          }`}
          title={isAutoMode ? "Disable auto mode" : "Enable auto mode"}
        >
          <FiClock className="w-5 h-5" />
        </motion.button>

        {/* Theme selector */}
        <div className="flex gap-2 bg-dark-bg/80 backdrop-blur-lg p-2 rounded-full">
          {themes.map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !isAutoMode && setTheme(id as any)}
              className={`p-2 rounded-full transition-colors ${
                theme === id
                  ? "bg-neon-blue text-dark-bg"
                  : "text-white hover:bg-dark-accent"
              } ${isAutoMode ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isAutoMode}
              title={`${label} theme${
                isAutoMode ? " (Auto mode enabled)" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Current theme indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute right-0 mt-2 text-right"
      >
        <span className="text-sm text-white/70">
          {isAutoMode
            ? "Auto Mode"
            : `${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
        </span>
      </motion.div>
    </div>
  );
};

export default ThemeToggle;
