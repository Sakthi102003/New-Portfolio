import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import HackerLayout from './components/hacker/HackerLayout';
import LandingPage from './components/LandingPage';
import LayoutWrapper from './components/LayoutWrapper';
import LoadingSystem from './components/LoadingSystem';
import Portfolio from './components/Portfolio';
import SecurityBackground from './components/SecurityBackground';
import { ModeProvider, useMode } from './context/ModeContext';
import { GlobalStyles } from './styles/GlobalStyles';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useMode();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SecurityBackground />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSystem key="loading" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          children
        )}
      </AnimatePresence>
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