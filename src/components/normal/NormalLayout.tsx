import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import AvailabilityStatus from '../AvailabilityStatus';
import ThemeToggle from '../ThemeToggle';

interface NormalLayoutProps {
  children: React.ReactNode;
}

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  padding-top: 80px; // Space for fixed navbar
`;

const ContentContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const StatusContainer = styled.div`
  position: fixed;
  top: 20px;
  right: calc((100% - 1200px) / 2 + ${({ theme }) => theme.spacing.xl});
  z-index: ${({ theme }) => theme.zIndex.navbar};
  @media (max-width: 1200px) {
    right: ${({ theme }) => theme.spacing.xl};
  }
`;

const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StatusContainer>
        <AvailabilityStatus />
      </StatusContainer>
      <ContentContainer>{children}</ContentContainer>
      <ThemeToggle />
    </PageContainer>
  );
};

export default NormalLayout;
