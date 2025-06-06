import { lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ScrollProgress />
      <Navbar />
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
    </ThemeProvider>
  );
}

export default App;
