export interface Theme {
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
  shadows: {
    card: string;
    glow: string;
    glowStrong: string;
  };
  transitions: {
    default: string;
    slow: string;
    fast: string;
  };
  zIndex: {
    background: number;
    default: number;
    navbar: number;
    modal: number;
    tooltip: number;
  };
}