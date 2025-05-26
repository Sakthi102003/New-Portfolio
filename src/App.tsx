import { ThemeProvider } from 'styled-components';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import About from './sections/About';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

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
      <FloatingNav />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
