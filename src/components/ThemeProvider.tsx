import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'cyberpunk' | 'glassmorphism' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isAutoMode: boolean;
  toggleAutoMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isAutoMode, setIsAutoMode] = useState(true);

  const toggleAutoMode = () => setIsAutoMode(!isAutoMode);

  // Auto theme switching based on time
  useEffect(() => {
    if (!isAutoMode) return;

    const updateThemeBasedOnTime = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        // Morning (5 AM - 12 PM): Minimal
        setTheme('minimal');
      } else if (hour >= 12 && hour < 17) {
        // Afternoon (12 PM - 5 PM): Glassmorphism
        setTheme('glassmorphism');
      } else if (hour >= 17 && hour < 20) {
        // Evening (5 PM - 8 PM): Cyberpunk
        setTheme('cyberpunk');
      } else {
        // Night (8 PM - 5 AM): Dark
        setTheme('dark');
      }
    };

    // Update theme immediately and then every minute
    updateThemeBasedOnTime();
    const interval = setInterval(updateThemeBasedOnTime, 60000);

    return () => clearInterval(interval);
  }, [isAutoMode]);

  // Apply theme classes to body
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isAutoMode, toggleAutoMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 