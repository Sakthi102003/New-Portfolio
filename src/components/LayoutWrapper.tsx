import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useMode } from '../context/ModeContext';
import ModeToggle from './common/ModeToggle';
import HackerLayout from './hacker/HackerLayout';
import NormalLayout from './normal/NormalLayout';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { isHackerMode } = useMode();

  return (
    <>
      <ModeToggle />
      <AnimatePresence mode="wait">
        {isHackerMode ? (
          <HackerLayout key="hacker">
            {children}
          </HackerLayout>
        ) : (
          <NormalLayout key="normal">
            {children}
          </NormalLayout>
        )}
      </AnimatePresence>
    </>
  );
};

export default LayoutWrapper;
