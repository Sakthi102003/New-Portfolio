import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import HackerLayout from './components/hacker/HackerLayout';
import LandingPage from './components/LandingPage';
import LayoutWrapper from './components/LayoutWrapper';
import Portfolio from './components/Portfolio';
import { ModeProvider, useMode } from './context/ModeContext';
import { GlobalStyles } from './styles/GlobalStyles';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useMode();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ModeProvider>
          <ThemeWrapper>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/portfolio" element={
                  <LayoutWrapper>
                    <Portfolio />
                  </LayoutWrapper>
                } />
                <Route path="/terminal" element={<HackerLayout />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AnimatePresence>
          </ThemeWrapper>
        </ModeProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;