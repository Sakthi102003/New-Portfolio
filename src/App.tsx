import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { CLI } from './components/CLI';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import { ThemeContextProvider, useTheme } from './context/ThemeContext';
import { projects } from './data/projects';
import { GlobalStyles } from './styles/GlobalStyles';

// Lazy load components
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

function AppContent() {
  const [isCLIOpen, setIsCLIOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  // Add keyboard shortcut to toggle CLI
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
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
          }}
        >
          Skip to content
        </a>
        <Navbar onCLIToggle={() => setIsCLIOpen(prev => !prev)} />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Hero />
                      <About />
                      <Skills />
                      <Projects />
                      <Contact />
                    </Suspense>
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProjectDetails projects={projects} />
                  </Suspense>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        {isCLIOpen && <CLI isOpen={isCLIOpen} onClose={() => setIsCLIOpen(false)} />}
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeContextProvider>
        <AppContent />
      </ThemeContextProvider>
    </Router>
  );
}

export default App;
