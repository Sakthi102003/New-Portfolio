import { motion } from 'framer-motion';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMedium, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Particles from 'react-tsparticles';
import { TypeAnimation } from 'react-type-animation';
import type { DefaultTheme } from 'styled-components';
import styled, { ThemeContext } from 'styled-components';
import { loadFull } from 'tsparticles';
import type { Engine, MoveDirection } from 'tsparticles-engine';
import ContactItem from '../styles/ContactItem';

// Interfaces
interface StyledComponentProps {
  theme?: DefaultTheme;
  $isDarkMode?: boolean;
  className?: string;
}

interface ContactItemProps {
  theme?: DefaultTheme;
}

// Styled Components
const StyledContactItem = styled.div<ContactItemProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: theme?.colors?.text?.secondary,
  fontSize: '1rem',
  transition: `all ${theme?.transitions?.default}`,
  'svg': {
    color: theme?.colors?.primary,
    fontSize: '1.2rem'
  },
  'a': {
    color: 'inherit',
    textDecoration: 'none',
    transition: `color ${theme?.transitions?.default}`,
    '&:hover': {
      color: theme?.colors?.primary
    }
  }
}));

const HeroSection = styled.section<StyledComponentProps>(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: `${theme?.spacing?.xl || '2rem'} ${theme?.spacing?.xl || '2rem'} ${theme?.spacing?.sm || '1rem'}`
}));

const HeroContent = styled.div<StyledComponentProps>(({ theme }) => ({
  maxWidth: '1000px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme?.spacing?.xl,
  zIndex: 1,
  textAlign: 'center',
  padding: `${theme?.spacing?.xxl || '2rem'} 0`
}));

const TextContent = styled(motion.div)<StyledComponentProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme?.spacing?.md,
  '.contact-details': {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    margin: '0.5rem 0',
    [StyledContactItem as any]: {
      background: 'transparent',
      color: theme?.colors?.text?.secondary,
      fontSize: '0.9rem',
      padding: '0.25rem 0.5rem',
      '&:hover': {
        background: 'transparent',
        transform: 'none'
      },
      'svg': {
        fontSize: '1rem'
      }
    }
  },
  '@media (max-width: 640px)': {
    '.contact-details': {
      flexDirection: 'column',
      gap: '0.5rem',
      margin: '0.75rem 0'
    }
  },
  'h1': {
    fontSize: '4rem',
    fontWeight: 700,
    margin: 0,
    color: theme?.colors?.primary,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '1px',
    lineHeight: 1.2,
    position: 'relative',
    'span': {
      color: theme?.colors?.text?.primary,
      opacity: 0.95,
      position: 'relative',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        textShadow: `0 3px 6px ${theme?.colors?.primary}40`
      }
    }
  },
  'h2': {
    fontSize: '2rem',
    fontWeight: 400,
    margin: 0,
    color: theme?.colors?.text?.primary,
    fontFamily: theme?.fonts?.secondary,
    letterSpacing: '3px',
    opacity: 0.95
  }
}));

const ContactInfo = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  width: 100%;
  max-width: 800px;

  a {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};
    text-overflow: ellipsis;
    overflow: hidden;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .email-section {
    grid-column: 1 / -1;
    text-align: center;
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  .social-links {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    .social-links {
      grid-template-columns: 1fr;
    }
  }

  .contact-details {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    
    ${ContactItem} {
      color: ${({ theme }) => theme.colors.text.secondary};
      font-size: 0.9rem;
    }
  }

  @media (max-width: 640px) {
    .contact-details {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  border-radius: 30px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.secondary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: all ${({ theme }) => theme.transitions.default};
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
    background: ${({ theme }) => theme.colors.text.accent};
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

const AnimatedSubtitle = styled.h2<StyledComponentProps>`
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme?.colors?.text?.primary};
  font-family: ${({ theme }) => theme?.fonts?.secondary};
  letter-spacing: 3px;
  opacity: 0.95;
`;

// Initialize particles system

interface HeroProps {
  disableParticles?: boolean;
}

// Hero Component
const Hero: React.FC<HeroProps> = ({ disableParticles = false }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showParticles, setShowParticles] = useState(!disableParticles);
  const theme = useContext(ThemeContext);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Check for user preference (reduced motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowParticles(false);
    }
  }, []);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  
  const isDarkMode = theme?.colors?.background !== '#F8FAFC';

  const particleConfig = useCallback((isMobile: boolean) => ({
    fpsLimit: 30,
    particles: {
      number: {
        value: isMobile ? 15 : 30,
        density: {
          enable: true,
          value_area: 1200
        }
      },
      color: {
        value: isDarkMode 
          ? ["#4B5563", "#6B7280", "#9CA3AF"]  // Subtle gray tones for dark mode
          : ["#94A3B8", "#CBD5E1", "#E2E8F0"] // Light gray tones for light mode
      },
      shape: {
        type: "circle",
        options: {
          polygon: {
            sides: 6
          }
        }
      },
      opacity: {
        value: isDarkMode ? 0.2 : 0.1,
        random: false,
        anim: {
          enable: true,
          speed: 0.2,
          opacity_min: isDarkMode ? 0.1 : 0.05,
          sync: false
        }
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: true,
          speed: 0.2,
          size_min: 0.5,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 200,
        color: isDarkMode ? "#4B5563" : "#94A3B8",
        opacity: isDarkMode ? 0.15 : 0.1,
        width: 1,
        triangles: {
          enable: false
        }
      },
      move: {
        enable: true,
        speed: isMobile ? 0.3 : 0.5,
        direction: "none" as MoveDirection,
        random: false,
        straight: false,
        out_mode: "bounce" as "bounce",
        attract: {
          enable: true,
          rotateX: 300,
          rotateY: 600
        }
      }
    },
    interactivity: {
      detectOn: "canvas",
      events: {
        onHover: {
          enable: !isMobile,
          mode: "connect"
        },
        onClick: {
          enable: false,
          mode: "push"
        },
        resize: true
      },
      modes: {
        connect: {
          distance: 200,
          links: {
            opacity: isDarkMode ? 0.15 : 0.1
          },
          radius: 120
        }
      }
    },
    retina_detect: true,
    fullScreen: false,
    background: {
      color: "transparent"
    }
  }), [isDarkMode]);

  return (
    <HeroSection>
      {showParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleConfig(isMobile)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <HeroContent>
        <TextContent
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            <span>SAKTHIMURUGAN S</span>
          </h1>
          <div className="contact-details">
            <ContactItem>
              <FaPhone />
              <span>+91 97917 47058</span>
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Coimbatore, Tamil Nadu, India</span>
            </ContactItem>
          </div>
          <AnimatedSubtitle $isDarkMode={isDarkMode} className={isDarkMode ? 'dark-mode' : 'light-mode'}>
            <TypeAnimation
              sequence={[
                'Cybersecurity Enthusiast',
                1000,
                'Developer',
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
            />
          </AnimatedSubtitle>
        </TextContent>

        <ContactInfo
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="email-section">
            <ContactItem>
              <MdEmail />
              <a href="mailto:sakthimurugan102003@gmail.com" title="Click to send email">
                sakthimurugan102003@gmail.com
              </a>
            </ContactItem>
          </div>

          <div className="social-links">
            <ContactItem>
              <FaGithub />
              <a href="https://github.com/Sakthi102003" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </ContactItem>
            <ContactItem>
              <FaLinkedin />
              <a href="https://linkedin.com/in/sakthimurugan-s" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </ContactItem>
            <ContactItem>
              <FaMedium />
              <a href="https://medium.com/@sakthimurugan102003" target="_blank" rel="noopener noreferrer">
                Medium
              </a>
            </ContactItem>
          </div>
        </ContactInfo>

        <ButtonGroup>
          <Button
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> Get in Touch
          </Button>
          <SecondaryButton
            href="https://drive.google.com/file/d/1Ea-Jh7ImCFsIQoBDQ3wSYrN5g4W2B4cv/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Resume
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;