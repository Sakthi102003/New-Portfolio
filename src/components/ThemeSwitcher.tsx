import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const SwitcherIcon = styled.span`
  font-size: 1.4rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThemeSwitcher: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button 
      variant="cli"
      size="small"
      onClick={toggleTheme}
      icon={
        <SwitcherIcon>
          {isDarkMode ? '☀️' : '🌙'}
        </SwitcherIcon>
      }
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    />
  );
};

export default ThemeSwitcher;