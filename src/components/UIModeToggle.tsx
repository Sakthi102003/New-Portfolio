import { motion } from 'framer-motion';
import React from 'react';
import { FaDesktop, FaTerminal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMode } from '../context/ModeContext';

const ToggleContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
`;

const ToggleButton = styled(motion.button)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 16px;
  background: ${({ theme, $active }) => 
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.background : theme.colors.text.primary};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme, $active }) => 
      $active ? theme.colors.primary : `${theme.colors.primary}20`};
  }

  svg {
    font-size: 1rem;
  }
`;

const UIModeToggle: React.FC = () => {
  const { isHackerMode, setUIMode } = useMode();
  const navigate = useNavigate();

  const handleModeChange = (mode: 'normal' | 'hacker') => {
    setUIMode(mode);
    if (mode === 'normal') {
      navigate('/');
    } else {
      navigate('/terminal');
    }
  };

  return (
    <ToggleContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <ToggleButton
        $active={!isHackerMode}
        onClick={() => handleModeChange('normal')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Normal Mode"
      >
        <FaDesktop />
        <span>Normal</span>
      </ToggleButton>
      
      <ToggleButton
        $active={isHackerMode}
        onClick={() => handleModeChange('hacker')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Hacker Mode"
      >
        <FaTerminal />
        <span>Hacker</span>
      </ToggleButton>
    </ToggleContainer>
  );
};

export default UIModeToggle;