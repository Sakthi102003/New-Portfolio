import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AnimatedTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  line-height: 1.2;
  position: relative;
  
  animation: ${({ theme }) => 
    theme.colors.background === '#F8FAFC' 
      ? 'lightModeTitle' 
      : 'darkModeTitle'
  } 1s ease-out;

  @keyframes lightModeTitle {
    0% {
      opacity: 0;
      transform: translateY(-20px);
      filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
    }
  }

  @keyframes darkModeTitle {
    0% {
      opacity: 0;
      transform: translateY(-20px);
      text-shadow: 0 0 0 rgba(110, 231, 183, 0);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      text-shadow: 0 0 30px rgba(110, 231, 183, 0.3);
    }
  }

  span {
    display: inline-block;
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: 0.95;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      text-shadow: 0 3px 6px ${({ theme }) => theme.colors.primary}40;
    }
  }
`;

export const AnimatedSubtitle = styled(motion.h2)<{ $isDark?: boolean }>`
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  letter-spacing: 3px;
  opacity: 0.95;
  animation: ${({ $isDark }) => 
    $isDark ? 'darkModeSubtitle' : 'lightModeSubtitle'
  } 2s ease-in-out infinite alternate;

  @keyframes darkModeSubtitle {
    0% {
      transform: translateY(0);
      text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}40;
    }
    100% {
      transform: translateY(-3px);
      text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}80;
    }
  }

  @keyframes lightModeSubtitle {
    0% {
      transform: translateY(0);
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
    100% {
      transform: translateY(-3px);
      text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;
