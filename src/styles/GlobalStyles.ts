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
    background: ${({ theme }) => theme.colors.background};
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

  /* Professional text highlight effect */
  .highlight {
    position: relative;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`; 