import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import styled from 'styled-components';

const ResumeSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
`;

const DownloadButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  font-size: 1.1rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Resume = () => {
  return (
    <ResumeSection id="resume">
      <Container>
        <DownloadButton
          href="/Resume.pdf"
          download="Sakthimurugan_Resume.pdf"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaDownload /> Download Resume
        </DownloadButton>
      </Container>
    </ResumeSection>
  );
};

export default Resume;