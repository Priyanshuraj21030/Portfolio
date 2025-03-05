import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

interface HiddenTerminalProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const HiddenTerminal: React.FC<HiddenTerminalProps> = ({ active, setActive }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to the terminal. Type "help" for available commands.']);
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    const command = input.trim().toLowerCase();
    let response = '';

    switch (command) {
      case 'help':
        response = `
Available commands:
- help: Show this help message
- about: Navigate to about page
- projects: Navigate to projects page
- contact: Navigate to contact page
- home: Navigate to home page
- clear: Clear the terminal
- exit: Close the terminal
- github: Open GitHub profile
- skills: List skills
- whoami: Display info about me
        `;
        break;
      case 'about':
        navigate('/about');
        response = 'Navigating to About page...';
        break;
      case 'projects':
        navigate('/projects');
        response = 'Navigating to Projects page...';
        break;
      case 'contact':
        navigate('/contact');
        response = 'Navigating to Contact page...';
        break;
      case 'home':
        navigate('/');
        response = 'Navigating to Home page...';
        break;
      case 'clear':
        setOutput([]);
        setInput('');
        return;
      case 'exit':
        setActive(false);
        return;
      case 'github':
        window.open('https://github.com/yourusername', '_blank');
        response = 'Opening GitHub profile...';
        break;
      case 'skills':
        response = `
Skills:
- Frontend: React, TypeScript, Next.js
- Backend: Node.js, Express
- Database: MongoDB, PostgreSQL
- Other: Git, Docker, AWS
        `;
        break;
      case 'whoami':
        response = 'You are a web developer with a passion for creating interactive and engaging web experiences.';
        break;
      case '':
        response = '';
        break;
      default:
        response = `Command not found: ${command}. Type "help" for available commands.`;
    }

    setOutput([...output, `> ${input}`, response]);
    setInput('');
  };

  if (!active) return null;

  return (
    <motion.div 
      className={`hidden-terminal ${active ? 'active' : ''} ${minimized ? 'h-12 overflow-hidden' : ''}`}
      initial={{ y: 400 }}
      animate={{ y: 0 }}
      exit={{ y: 400 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <div className="flex-1 text-center text-sm text-gray-400">Terminal</div>
        <button 
          onClick={() => setMinimized(!minimized)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
        </button>
        <button 
          onClick={() => setActive(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      
      {!minimized && (
        <>
          <div className="mt-2 mb-4 h-[200px] overflow-y-auto">
            {output.map((line, index) => (
              <div key={index} className={line.startsWith('>') ? 'terminal-line' : 'mt-1 text-gray-300 whitespace-pre-line'}>
                {line.startsWith('>') && <span className="terminal-prompt">$</span>}
                <span>{line.startsWith('>') ? line.substring(2) : line}</span>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="terminal-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="terminal-input"
              autoFocus
            />
          </form>
        </>
      )}
    </motion.div>
  );
};

export default HiddenTerminal;