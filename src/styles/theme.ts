interface ThemeType {
  fonts: {
    primary: string;
    secondary: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  transitions: {
    default: string;
    fast: string;
    slow: string;
  };
  zIndex: {
    background: number;
    default: number;
    navbar: number;
    modal: number;
    tooltip: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    glass: string;
    dev: {
      syntax: string;
      function: string;
      string: string;
      keyword: string;
    };
    cyber: {
      success: string;
      warning: string;
      danger: string;
      info: string;
    };
    text: {
      primary: string;
      secondary: string;
      accent: string;
      code?: string;
      highlight?: string;
    };
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  shadows: {
    glow: string;
    glowStrong: string;
    card: string;
  };
}

const baseTheme: ThemeType = {
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
  colors: {
    // Core colors - Modern tech-focused palette
    primary: '#6EE7B7', // Soft mint green
    secondary: '#3B82F6', // Bright blue
    accent: '#F43F5E', // Vibrant red
    
    // Background and surfaces
    background: '#020617', // Deep space blue
    surface: '#0F172A', // Navy blue surface
    glass: 'rgba(15, 23, 42, 0.9)', // Professional glass effect
    
    // Development theme colors - Modern IDE inspired
    dev: {
      syntax: '#A5B4FC', // Soft indigo
      function: '#60A5FA', // Royal blue
      string: '#34D399', // Emerald
      keyword: '#F472B6', // Pink
    },
    
    // Cybersecurity theme colors - Professional security tools inspired
    cyber: {
      success: '#34D399', // Professional green
      warning: '#FBBF24', // Amber alert
      danger: '#F43F5E', // Error red
      info: '#60A5FA', // Info blue
    },
    
    // Text colors - Clear hierarchy with modern feel
    text: {
      primary: '#F8FAFC', // Crisp white
      secondary: '#94A3B8', // Steel gray
      accent: '#6EE7B7', // Mint accent
      code: '#E2E8F0', // Light gray for code
      highlight: '#6EE7B7', // Mint highlight
    },
    
    // System colors - Clear signaling
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
} as const;

export default baseTheme;