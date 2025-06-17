import React, { createContext, useContext, useState } from 'react';

interface ColorTheme {
  primary: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
  };
}

interface ColorThemeContextType {
  currentTheme: ColorTheme;
  updateTheme: (colors: Partial<ColorTheme>) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>({
    primary: '#007bff',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      accent: '#adb5bd',
      highlight: '#007bff',
    },
  });

  const updateTheme = (colors: Partial<ColorTheme>) => {
    setCurrentTheme(prev => ({
      ...prev,
      ...colors,
      text: {
        ...prev.text,
        ...(colors.text || {}),
      },
    }));
  };

  return (
    <ColorThemeContext.Provider value={{ currentTheme, updateTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
};
