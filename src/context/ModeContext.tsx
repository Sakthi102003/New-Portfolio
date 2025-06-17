import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { DefaultTheme } from 'styled-components';
import { createTheme, darkTheme, lightTheme } from '../styles/theme';

type ModeContextType = {
  isHackerMode: boolean;
  isDarkMode: boolean;
  toggleMode: () => void;
  toggleTheme: () => void;
  theme: DefaultTheme;
  setUIMode: (mode: 'normal' | 'hacker') => void;
  updateCustomTheme: (themeColors: any) => void;
};

// Using const for consistency with HMR
const ModeContext = createContext<ModeContextType | undefined>(undefined);
export { ModeContext };

const getInitialHackerMode = (): boolean => {
  const savedMode = localStorage.getItem('uiMode');
  return savedMode === 'hacker';
};

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
  const [isHackerMode, setIsHackerMode] = useState(getInitialHackerMode());
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode());

  const [customTheme, setCustomTheme] = useState(() => {
    const saved = localStorage.getItem('customTheme');
    return saved ? JSON.parse(saved) : null;
  });

  const theme = useMemo(() => {
    if (isHackerMode) {
      return darkTheme;
    }
    if (!isHackerMode && customTheme) {
      return createTheme(customTheme);
    }
    return isDarkMode ? darkTheme : lightTheme;
  }, [isHackerMode, isDarkMode, customTheme]);

  const setUIMode = (mode: 'normal' | 'hacker') => {
    if (mode === 'hacker') {
      setIsHackerMode(true);
      localStorage.setItem('uiMode', 'hacker');
      navigate('/terminal');
    } else if (mode === 'normal') {
      setIsHackerMode(false);
      const lastPage = localStorage.getItem('lastPage');
      if (lastPage === '/') {
        navigate('/');
        localStorage.removeItem('lastPage');
      } else {
        navigate('/portfolio');
      }
      localStorage.removeItem('uiMode');
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

  // Handle navigation based on mode persistence
  useEffect(() => {
    // Check if we just exited hacker mode and have a specific destination
    const exitDestination = localStorage.getItem('exitDestination');
    if (exitDestination) {
      // Clear the destination flag
      localStorage.removeItem('exitDestination');
      
      // Update the mode state
      setIsHackerMode(false);
      
      // Navigate to destination
      navigate(exitDestination);
      return;
    }

    // Normal mode handling
    if (isHackerMode && location.pathname !== '/terminal') {
      navigate('/terminal');
    } else if (!isHackerMode && location.pathname === '/terminal' && !localStorage.getItem('lastPage')) {
      navigate('/portfolio');
    }
  }, [isHackerMode, location.pathname, navigate]);

  const toggleMode = () => {
    const newMode = !isHackerMode;
    setIsHackerMode(newMode);
    if (newMode) {
      localStorage.setItem('uiMode', 'hacker');
      navigate('/terminal');
    } else {
      const lastPage = localStorage.getItem('lastPage');
      if (lastPage === '/') {
        navigate('/');
        localStorage.removeItem('lastPage');
      } else {
        navigate('/portfolio');
      }
      localStorage.removeItem('uiMode');
    }
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

  const updateCustomTheme = (themeColors: any) => {
    setCustomTheme(themeColors);
    localStorage.setItem('customTheme', JSON.stringify(themeColors));
  };

  return (
    <ModeContext.Provider value={{ 
      isHackerMode, 
      isDarkMode, 
      toggleMode, 
      toggleTheme, 
      theme, 
      setUIMode,
      updateCustomTheme
    }}>
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
