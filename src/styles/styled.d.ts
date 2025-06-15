import 'styled-components';

declare module 'styled-components' {
    interface BaseColors {
    primary: string;
    secondary: string;
    accent: string;
    highlight?: string;
  }

  interface CyberColors {
    success: string;
    warning: string;
    danger: string;
    info: string;
  }

  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      text: BaseColors;
      primary: string;
      secondary: string;
      cyber: CyberColors;
      success: string;
      error: string;
      warning: string;
    };
    shadows: {
      glow: string;
      glowStrong: string;
      card: string;
    };
    zIndex: {
      background: number;
      default: number;
      navbar: number;
      modal: number;
      tooltip: number;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
  }
}
