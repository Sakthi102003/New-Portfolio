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
    font-family: ${({ theme }) => theme.fonts.secondary};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: background-color 0.3s ease, color 0.3s ease;

    &.hacker-mode {
      background: #000000;
      color: #00ff00;
      font-family: 'Fira Code', monospace;
      letter-spacing: 0;
      white-space: pre;
      font-variant-ligatures: none;
      font-feature-settings: "liga" 0, "calt" 0;
      
      * {
        font-variant-ligatures: none;
        font-feature-settings: "liga" 0, "calt" 0;
      }

      /* CRT scanlines effect */
      &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: linear-gradient(
          transparent 50%,
          rgba(0, 255, 0, 0.03) 50%
        );
        background-size: 100% 4px;
        animation: scanlines 0.1s linear infinite;
        z-index: 1000;
      }

      /* Custom scrollbar */
      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: #000000;
      }

      &::-webkit-scrollbar-thumb {
        background: #00ff00;
        border-radius: 4px;

        &:hover {
          background: #00ff41;
        }
      }
    }
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${() => {
      const isHackerMode = document.body.classList.contains('hacker-mode');
      return isHackerMode ? "'Share Tech Mono', monospace" : "'Orbitron', sans-serif";
    }};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.text.accent};
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
    
    &[href^="#"] {
      text-decoration: none !important;
      
      &:hover {
        text-decoration: none !important;
      }
    }
  }

  button {
    font-family: ${() => {
      const isHackerMode = document.body.classList.contains('hacker-mode');
      return isHackerMode ? "'Share Tech Mono', monospace" : "'Orbitron', sans-serif";
    }};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  /* Matrix text effect */
  @keyframes matrix-rain {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }

  /* Scanlines animation */
  @keyframes scanlines {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(4px);
    }
  }

  /* Terminal cursor blink */
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  /* Selection style */
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  .hacker-mode ::selection {
    background: #00ff00;
    color: #000000;
  }
`;