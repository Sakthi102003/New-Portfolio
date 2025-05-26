import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import styled from 'styled-components';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import Loading from '../components/LoadingSpinner';

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  z-index: 1;
  text-align: center;
`;

const TextContent = styled(motion.div)`
  h1 {
    font-size: 3.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
  }
`;

// Particles Configuration
const particlesConfig = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#00ff00',
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none' as const,
      random: true,
      straight: false,
      outModes: {
        default: 'out' as const,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: '#00ff00',
      opacity: 0.4,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  background: {
    color: 'transparent',
  },
};

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  if (isLoading) {
    return (
      <HeroSection id="hero">
        <HeroContent>
          <Loading text="Loading..." />
        </HeroContent>
      </HeroSection>
    );
  }

  return (
    <HeroSection id="hero">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <HeroContent>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="glitch" data-text="SAKTHIMURUGAN S">
            SAKTHIMURUGAN S
          </h1>
          <ContactInfo
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>+91 97917 47058 ⋄ Coimbatore, Tamil Nadu, India</p>
            <p>sakthimurugan102003@gmail.com</p>
            <p>
              <a href="https://linkedin.com/in/sakthimurugan-s" target="_blank" rel="noopener noreferrer">linkedin.com/in/sakthimurugan-s</a>
              {' '}⋄{' '}
              <a href="https://github.com/Sakthi102003" target="_blank" rel="noopener noreferrer">github.com/Sakthi102003</a>
            </p>
            <p>
              <a href="https://medium.com/@sakthimurugan102003" target="_blank" rel="noopener noreferrer">medium.com/@sakthimurugan102003</a>
            </p>
          </ContactInfo>
          <ButtonGroup>
            <Button
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope /> Get in Touch
            </Button>
            <SecondaryButton
              href="https://drive.google.com/file/d/1vcuqI3tt35dDf5j-KfpzRYbDLabroBiS/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Resume
            </SecondaryButton>
          </ButtonGroup>
        </TextContent>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 