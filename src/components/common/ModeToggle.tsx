import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../../context/ModeContext';

const ModeToggle: React.FC = () => {
  const { isHackerMode } = useMode();
  const navigate = useNavigate();

  const handleExit = () => {
    if (isHackerMode) {
      // When exiting hacker mode, go to landing page
      localStorage.setItem('exitDestination', '/');
      localStorage.removeItem('uiMode');
      navigate('/');
    } else {
      navigate('/');  // Return to landing page in normal mode
    }
  };

  return (
    <motion.button
      onClick={handleExit}
      style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }}
      className={`px-3 py-1.5 rounded-md font-mono text-sm
        border border-opacity-50 shadow-sm flex items-center justify-center min-w-[60px]
        ${isHackerMode 
          ? 'bg-terminal-green text-black hover:bg-terminal-green/90 border-black' 
          : 'bg-gray-800 text-white hover:bg-gray-700 border-white/20'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Exit
    </motion.button>
  );
};

export default ModeToggle;
