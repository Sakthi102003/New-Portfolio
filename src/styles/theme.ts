import type { Theme } from '../types/theme';

// Common theme values shared between light and dark themes
const commonTheme = {
  fonts: {
    primary: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'Share Tech Mono', 'Fira Code', monospace",
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  transitions: {
    default: '0.2s ease-out',
    fast: '0.1s ease-out',
    slow: '0.3s ease-in-out',
  },
  zIndex: {
    background: -1,
    default: 1,
    navbar: 100,
    modal: 1000,
    tooltip: 2000,
  },
};

// Dark Theme
export const darkTheme: Theme = {
  ...commonTheme,
  colors: {
    // Core colors
    primary: '#6EE7B7', // Soft mint green
    secondary: '#3B82F6', // Bright blue
    accent: '#F43F5E', // Vibrant red
    
    // Background and surfaces
    background: '#020617', // Deep space blue
    surface: '#0F172A', // Navy blue surface
    glass: 'rgba(15, 23, 42, 0.9)', // Professional glass effect
    
    // Development theme colors
    dev: {
      syntax: '#A5B4FC', // Soft indigo
      function: '#60A5FA', // Royal blue
      string: '#34D399', // Emerald
      keyword: '#F472B6', // Pink
    },
    
    // Cybersecurity theme colors
    cyber: {
      success: '#34D399', // Professional green
      warning: '#FBBF24', // Amber alert
      danger: '#F43F5E', // Error red
      info: '#60A5FA', // Info blue
    },
    
    // Text colors
    text: {
      primary: '#F8FAFC', // Crisp white
      secondary: '#B8C4D9', // Lighter steel gray
      accent: '#6EE7B7', // Mint accent
      code: '#E2E8F0', // Light gray for code
      highlight: '#6EE7B7', // Mint highlight
    },
    
    // System colors
    error: '#F43F5E',
    success: '#34D399',
    warning: '#FBBF24',
    info: '#60A5FA',
  },
  shadows: {
    glow: '0 0 20px rgba(110, 231, 183, 0.15)', // Mint glow
    glowStrong: '0 0 30px rgba(110, 231, 183, 0.3)', // Strong mint glow
    card: '0 4px 20px rgba(2, 6, 23, 0.2)', // Subtle card shadow
  }
};

// Light Theme
export const lightTheme: Theme = {
  ...commonTheme,
  colors: {
    // Core colors
    primary: '#059669', // Darker green for better contrast on light background
    secondary: '#2563EB', // Darker blue for better contrast
    accent: '#E11D48', // Darker red for better contrast
    
    // Background and surfaces
    background: '#F8FAFC', // Light background
    surface: '#FFFFFF', // White surface
    glass: 'rgba(255, 255, 255, 0.9)', // Light glass effect
    
    // Development theme colors
    dev: {
      syntax: '#6366F1', // Darker indigo
      function: '#3B82F6', // Royal blue
      string: '#10B981', // Emerald
      keyword: '#EC4899', // Pink
    },
    
    // Cybersecurity theme colors
    cyber: {
      success: '#10B981', // Darker green
      warning: '#F59E0B', // Darker amber
      danger: '#EF4444', // Darker red
      info: '#3B82F6', // Darker blue
    },
    
    // Text colors
    text: {
      primary: '#0F172A', // Dark navy for text
      secondary: '#475569', // Medium gray for secondary text
      accent: '#059669', // Green accent
      code: '#1E293B', // Dark gray for code
      highlight: '#059669', // Green highlight
    },
    
    // System colors
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  shadows: {
    glow: '0 0 20px rgba(5, 150, 105, 0.1)', // Green glow for light theme
    glowStrong: '0 0 30px rgba(5, 150, 105, 0.2)', // Strong green glow
    card: '0 4px 20px rgba(15, 23, 42, 0.1)', // Light card shadow
  }
};

export default darkTheme;