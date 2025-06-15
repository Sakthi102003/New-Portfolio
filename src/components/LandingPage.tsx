import { motion } from 'framer-motion';
import React from 'react';
import { useMode } from '../context/ModeContext';
import MatrixBackground from './MatrixBackground';

const LandingPage: React.FC = () => {
  const { setUIMode } = useMode();

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-30">
        <MatrixBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#ff4444] text-6xl md:text-7xl font-mono mb-4 text-center px-4"
          style={{ textShadow: '0 0 10px rgba(255, 68, 68, 0.7)' }}
        >
          SEC.DEVELOP
          <br />
          DEFEND.CODE
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-terminal-green text-xl md:text-2xl font-mono mb-12 text-center"
        >
          SELECT INTERFACE MODE
        </motion.h2>

        {/* Mode Selection Buttons */}
        <div className="flex flex-row items-center justify-center gap-64 px-4 mx-20">
          {/* Normal Mode Button */}
          <motion.button
            onClick={() => setUIMode('normal')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-16 py-12 bg-transparent text-terminal-green
              transition-all duration-300 rounded-2xl font-mono
              border border-terminal-green min-w-[400px]"
          >
            <div className="flex flex-col items-center gap-8">
              <span className="text-6xl mb-4">🖥</span>
              <span className="text-2xl tracking-[0.2em]">NORMAL MODE</span>
            </div>
          </motion.button>

          {/* Hacker Mode Button */}
          <motion.button
            onClick={() => setUIMode('hacker')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-16 py-12 bg-transparent text-terminal-green
              transition-all duration-300 rounded-2xl font-mono
              border border-terminal-green min-w-[400px]"
          >
            <div className="flex flex-col items-center gap-8">
              <span className="text-6xl mb-4">{'>'}_</span>
              <span className="text-2xl tracking-[0.2em]">HACKER MODE</span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;