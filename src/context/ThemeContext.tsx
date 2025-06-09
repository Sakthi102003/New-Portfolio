import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';
import type { Theme } from '../types/theme';

type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check local storage for saved theme preference or use system preference
  const getInitialTheme = (): boolean => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);
  const [theme, setTheme] = useState<Theme>(isDarkMode ? darkTheme : lightTheme);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Effect to update theme when isDarkMode changes
  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null) {
        setIsDarkMode(e.matches);
      }
    };

    // Some browsers don't support addEventListener on mediaQuery yet
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};