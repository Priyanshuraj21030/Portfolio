import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HiddenTerminal from './components/HiddenTerminal';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [terminalActive, setTerminalActive] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Set up keyboard shortcut for terminal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'p') {
        setTerminalActive(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Get current time to determine theme
  const getCurrentHour = () => {
    return new Date().getHours();
  };

  const isNightTime = getCurrentHour() >= 18 || getCurrentHour() < 6;

  return (
    <div className={`min-h-screen ${isNightTime ? 'bg-dark-bg' : 'bg-dark-accent'}`}>
      <div className="bg-overlay" />
      
      {loading ? (
        <Preloader />
      ) : (
        <>
          <CustomCursor />
          <Navbar />
          <main className="pt-20 pb-16 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <HiddenTerminal active={terminalActive} setActive={setTerminalActive} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;