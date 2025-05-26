export const theme = {
  colors: {
    primary: '#00ff00', // Neon green
    secondary: '#0066ff', // Dark blue
    background: '#000000', // Black
    surface: '#0a0a0a', // Slightly lighter black
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      accent: '#00ff00',
    },
    error: '#ff3333',
    success: '#00ff00',
    warning: '#ffcc00',
  },
  fonts: {
    primary: "'Share Tech Mono', monospace",
    secondary: "'Orbitron', sans-serif",
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
  shadows: {
    glow: '0 0 10px rgba(0, 255, 0, 0.5)',
    glowStrong: '0 0 20px rgba(0, 255, 0, 0.7)',
    card: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  zIndex: {
    background: -1,
    default: 1,
    navbar: 100,
    modal: 1000,
    tooltip: 2000,
  },
} as const;

export type Theme = typeof theme; 