import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseDown = () => setCursorVariant('click');
    const mouseUp = () => setCursorVariant('default');
    
    const handleLinkHover = () => setCursorVariant('hover');
    const handleLinkLeave = () => setCursorVariant('default');

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: 'rgba(0, 238, 255, 0.3)',
      height: 24,
      width: 24,
      borderRadius: '50%',
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: 'rgba(0, 238, 255, 0.5)',
      height: 40,
      width: 40,
      borderRadius: '50%',
    },
    click: {
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: 'rgba(0, 238, 255, 0.8)',
      height: 16,
      width: 16,
      borderRadius: '50%',
    }
  };

  return (
    <motion.div
      className="custom-cursor hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};

export default CustomCursor;