'use client';
import type { ReactNode } from 'react';
import React, { createContext, useCallback, useContext, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';

interface ThemeContextType {
  theme: DefaultTheme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext as default, ThemeProvider, useTheme };
export type { ThemeContextType };

