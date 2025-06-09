import { lazy, Suspense, useEffect, useState } from 'react';
import { CLI } from './components/CLI';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import { ThemeContextProvider, useTheme } from './context/ThemeContext';

import Hero from './sections/Hero';
import { GlobalStyles } from './styles/GlobalStyles';

// Lazy load heavy components
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));

/**
 * App Content Component
 * Contains the main content of the app, uses the theme context
 */
function AppContent() {
  const [isCLIOpen, setIsCLIOpen] = useState(false);
  const { theme } = useTheme();
  
  // Add keyboard shortcut to toggle CLI
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault(); // Prevent default F1 help behavior
        setIsCLIOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ErrorBoundary>
        <ScrollProgress />
        <a 
          href="#hero" 
          className="skip-to-content"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '1rem',
            background: theme.colors.primary,
            color: theme.colors.background,
            padding: '0.5rem 1rem',
            zIndex: theme.zIndex.modal + 1,
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease-out'
          }}
          onFocus={(e) => {
            e.currentTarget.style.left = '1rem';
          }}
          onBlur={(e) => {
            e.currentTarget.style.left = '-9999px';
          }}
        >
          Skip to content
        </a>
        <Navbar onCLIToggle={() => setIsCLIOpen(prev => !prev)} />
        <main id="main-content">
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          <Suspense fallback={<div />}>
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </Suspense>
        </main>
        <Footer />
        <CLI isOpen={isCLIOpen} onClose={() => setIsCLIOpen(false)} />
      </ErrorBoundary>
    </>
  );
}

/**
 * Main App Component
 * Renders the complete portfolio website with all sections
 * including Hero, About, Projects, Contact, and Footer
 * Wrapped with the ThemeContextProvider
 */
function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;
