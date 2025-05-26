import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Share Tech Mono', monospace;
    background-color: #000000;
    color: #ffffff;
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  a {
    color: #00ff00;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #0066ff;
    }
  }

  button {
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
  }

  ::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0066ff;
  }

  /* Selection style */
  ::selection {
    background: #00ff00;
    color: #000000;
  }

  /* Glitch effect for text */
  .glitch {
    position: relative;
    
    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &::before {
      left: 2px;
      text-shadow: -2px 0 #00ff00;
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }

    &::after {
      left: -2px;
      text-shadow: 2px 0 #0066ff;
      animation: glitch-anim-2 3s infinite linear alternate-reverse;
    }
  }

  @keyframes glitch-anim-1 {
    0% {
      clip-path: inset(20% 0 30% 0);
    }
    20% {
      clip-path: inset(60% 0 10% 0);
    }
    40% {
      clip-path: inset(40% 0 50% 0);
    }
    60% {
      clip-path: inset(80% 0 5% 0);
    }
    80% {
      clip-path: inset(10% 0 70% 0);
    }
    100% {
      clip-path: inset(30% 0 20% 0);
    }
  }

  @keyframes glitch-anim-2 {
    0% {
      clip-path: inset(15% 0 35% 0);
    }
    20% {
      clip-path: inset(55% 0 15% 0);
    }
    40% {
      clip-path: inset(45% 0 45% 0);
    }
    60% {
      clip-path: inset(75% 0 10% 0);
    }
    80% {
      clip-path: inset(15% 0 65% 0);
    }
    100% {
      clip-path: inset(25% 0 25% 0);
    }
  }
`; 