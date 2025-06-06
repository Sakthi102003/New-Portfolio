import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: {
        primary: string;
        secondary: string;
        accent: string;
      };
      success: string;
      error: string;
      warning: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
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
    transitions: {
      default: string;
      fast: string;
      slow: string;
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
  }
}