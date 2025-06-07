import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { CLI } from './components/CLI';
import Footer from './components/Footer';
import MusicPlayer from './components/Music';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import { GlobalStyles } from './styles/GlobalStyles';
import theme from './styles/theme';

// Lazy load heavy components
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));

/**
 * Main App Component
 * Renders the complete portfolio website with all sections
 * including Hero, About, Projects, Contact, and Footer
 */
function App() {
  const [isCLIOpen, setIsCLIOpen] = useState(false);

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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ScrollProgress />
      <Navbar onCLIToggle={() => setIsCLIOpen(prev => !prev)} />
      <main>
        <Hero />
        <Suspense fallback={<div />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <CLI isOpen={isCLIOpen} onClose={() => setIsCLIOpen(false)} />
      <MusicPlayer />
    </ThemeProvider>
  );
}

export default App;
