const baseTheme = {
  fonts: {
    primary: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "'JetBrains Mono', monospace", // Professional coding font
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
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  zIndex: {
    background: -1,
    default: 1,
    navbar: 100,
    modal: 1000,
    tooltip: 2000,
  },
  colors: {
    primary: '#4CAF50', // Professional green
    secondary: '#2196F3', // Professional blue
    background: '#1a1a1a', // Soft dark background
    surface: '#242424', // Slightly lighter surface
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0', // Brighter secondary text
      accent: '#66bb6a', // Softer green for accents
    },
    error: '#f44336', // Material design red
    success: '#4CAF50', // Matching primary green
    warning: '#ff9800', // Professional orange
  },
  shadows: {
    glow: '0 0 10px rgba(76, 175, 80, 0.3)', // Subtle green glow
    glowStrong: '0 0 20px rgba(76, 175, 80, 0.5)', // Stronger but still professional
    card: '0 4px 6px rgba(0, 0, 0, 0.2)',
  }
} as const;

export const theme = baseTheme;
export type Theme = typeof theme;