import type { DefaultTheme } from 'styled-components';

export const colorThemes = {
  cyberNeon: {
    background: '#0a1929',
    surface: '#0d2137',
    primary: '#00ff9d',
    text: {
      primary: '#e0e0e0',
      secondary: '#00ff9d',
      accent: '#4a9eff',
      highlight: '#ff3e3e',
    }
  },
  matrix: {
    background: '#0c1714',
    surface: '#0f2318',
    primary: '#00ff41',
    text: {
      primary: '#00ff41',
      secondary: '#00bd31',
      accent: '#007121',
      highlight: '#00ff9d',
    }
  },
  redAlert: {
    background: '#1a0f0f',
    surface: '#251515',
    primary: '#ff3333',
    text: {
      primary: '#ffffff',
      secondary: '#ff3333',
      accent: '#ff8080',
      highlight: '#ff0000',
    }
  },
  quantum: {
    background: '#16161e',
    surface: '#1a1b26',
    primary: '#7aa2f7',
    text: {
      primary: '#c0caf5',
      secondary: '#7aa2f7',
      accent: '#bb9af7',
      highlight: '#f7768e',
    }
  }
};

const baseTheme = {
  shadows: {
    glow: '0 0 20px rgba(0, 255, 157, 0.2)',
    glowStrong: '0 0 30px rgba(0, 255, 157, 0.4)',
    card: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  zIndex: {
    background: -1,
    default: 1,
    navbar: 1000,
    modal: 2000,
    tooltip: 3000,
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    secondary: "'Fira Code', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    mono: "'Fira Code', 'Consolas', 'Monaco', 'Liberation Mono', 'Courier New', monospace"
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

export const createTheme = (colorTheme?: any): DefaultTheme => ({
  ...baseTheme,
  colors: {
    background: colorTheme?.background || '#ffffff',
    surface: colorTheme?.surface || '#f8f9fa',
    primary: colorTheme?.primary || '#007bff',
    secondary: '#6c757d',
    text: {
      primary: colorTheme?.text?.primary || '#212529',
      secondary: colorTheme?.text?.secondary || '#6c757d',
      accent: colorTheme?.text?.accent || '#adb5bd',
      highlight: colorTheme?.text?.highlight || '#007bff',
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
  }
});

export const lightTheme = createTheme();

export const darkTheme: DefaultTheme = createTheme({
  background: '#0a0f16',
  surface: '#1a1f26',
  primary: '#00ff9d',
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
});
