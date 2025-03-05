import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com/Priyanshuraj21030', label: 'GitHub' },
    { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/priyanshu-raj-280ba8220/', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: <Mail size={20} />, url: 'mailto:priyanshuraj21030@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="glass py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ y: -3, color: '#00eeff' }}
                className="text-gray-400 hover:text-neon-blue transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Built with React, TypeScript, and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;