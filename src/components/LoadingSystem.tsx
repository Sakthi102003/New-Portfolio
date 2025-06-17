import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMode } from '../context/ModeContext';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const LogoText = styled(motion.div)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code', monospace;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}66;
`;

const LoadingText = styled(motion.div)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
  font-family: 'Fira Code', monospace;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingDots = styled(motion.span)`
  display: inline-block;
  width: 20px;
  &::after {
    content: '.';
    animation: dots 2s steps(5, end) infinite;
  }

  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80%, 100% { content: ''; }
  }
`;

const ProgressBar = styled(motion.div)`
  width: 300px;
  height: 2px;
  background: ${({ theme }) => `${theme.colors.primary}33`};
  margin-top: 2rem;
  border-radius: 1px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}66;
`;

interface LoadingSystemProps {
  onLoadingComplete: () => void;
}

const LoadingSystem: React.FC<LoadingSystemProps> = ({ onLoadingComplete }) => {
  const { isHackerMode } = useMode();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LogoText
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isHackerMode ? '> INIT_SYSTEM' : 'SYSTEM INITIALIZATION'}
      </LogoText>
      
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isHackerMode ? '> ' : ''}Loading system<LoadingDots />
      </LoadingText>
      
      <ProgressBar>
        <ProgressFill
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: 'easeInOut' }}
        />
      </ProgressBar>
    </LoadingContainer>
  );
};

export default LoadingSystem;
