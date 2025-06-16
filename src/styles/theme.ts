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
    background: '#0a0f16',
    surface: '#1a1f26',
    primary: '#00ff9d',
    secondary: '#ff3e3e',
    text: {
      primary: '#e0e0e0',
      secondary: '#00ff9d',
      accent: '#4a9eff',
      highlight: '#ff3e3e',
    },
    cyber: {
      success: '#00ff9d',
      warning: '#ffb800',
      danger: '#ff3e3e',
      info: '#4a9eff',
    },
    success: '#00ff9d',
    error: '#ff3e3e',
    warning: '#ffb800',
  },
  shadows: {
    glow: '0 0 10px rgba(0, 255, 157, 0.3)',
    glowStrong: '0 0 20px rgba(0, 255, 157, 0.5)',
    card: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
};
