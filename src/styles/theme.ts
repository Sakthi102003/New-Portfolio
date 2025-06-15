import type { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#007bff',
    secondary: '#6c757d',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      accent: '#adb5bd',
      highlight: '#007bff',
    },
    cyber: {
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#17a2b8',
    },
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
  },
  shadows: {
    glow: '0 0 10px rgba(0,0,0,0.1)',
    glowStrong: '0 0 20px rgba(0,0,0,0.2)',
    card: '0 4px 6px rgba(0,0,0,0.1)',
  },
  zIndex: {
    background: -1,
    default: 1,
    navbar: 1000,
    modal: 2000,
    tooltip: 3000,
  },
  fonts: {
    primary: "'Source Code Pro', monospace",
    secondary: "'Inter', sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    wide: '1200px'
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease'
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      accent: '#808080',
      highlight: '#6c757d',
    },
  },
};
