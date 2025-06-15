import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { DefaultTheme } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';

type ModeContextType = {
  isHackerMode: boolean;
  isDarkMode: boolean;
  toggleMode: () => void;
  toggleTheme: () => void;
  theme: DefaultTheme;
  setUIMode: (mode: 'normal' | 'hacker') => void;
};

export const ModeContext = createContext<ModeContextType | undefined>(undefined);

const getInitialDarkMode = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHackerMode, setIsHackerMode] = useState(false); // Always start in normal mode
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode());

  const theme = useMemo(() => {
    if (isHackerMode) {
      return darkTheme;
    }
    return isDarkMode ? darkTheme : lightTheme;
  }, [isHackerMode, isDarkMode]);

  const setUIMode = (mode: 'normal' | 'hacker') => {
    if (mode === 'hacker' && !isHackerMode) {
      // Only allow switching TO hacker mode if we're not already in it
      setIsHackerMode(true);
      navigate('/terminal');
    } else if (mode === 'normal' && !isHackerMode) {
      // Only allow switching to normal if we're not in hacker mode
      setIsHackerMode(false);
      navigate('/portfolio');
    }
  };

  // Initialize and cleanup body class and theme
  useEffect(() => {
    document.body.classList.toggle('hacker-mode', isHackerMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    return () => {
      document.body.classList.remove('hacker-mode');
    };
  }, [isHackerMode, isDarkMode]);

  // Clear hacker mode on mount and prevent URL-based switching
  useEffect(() => {
    localStorage.removeItem('uiMode');
    if (isHackerMode && location.pathname !== '/terminal') {
      navigate('/terminal');
    }
  }, [isHackerMode, location.pathname, navigate]);

  const toggleMode = () => {
    const newMode = !isHackerMode;
    setIsHackerMode(newMode);
    navigate(newMode ? '/terminal' : '/portfolio');
  };

  const toggleTheme = () => {
    if (!isHackerMode) {
      setIsDarkMode(prev => {
        const newMode = !prev;
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        return newMode;
      });
    }
  };

  return (
    <ModeContext.Provider value={{ isHackerMode, isDarkMode, toggleMode, toggleTheme, theme, setUIMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
