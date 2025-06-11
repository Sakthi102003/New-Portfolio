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

// Styled Components
interface StyledComponentProps {
  theme?: DefaultTheme;
  $isDarkMode?: boolean;  // Make this optional
  className?: string;
}

const HeroSection = styled.section`  // Remove the generic type here
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme?.spacing?.xl || '2rem'} ${({ theme }) => theme?.spacing?.xl || '2rem'} ${({ theme }) => theme?.spacing?.sm || '1rem'};
`;

const HeroContent = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  z-index: 1;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  h1 {
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

    span {
      color: ${({ theme }) => theme.colors.text.primary};
      opacity: 0.95;
      position: relative;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        text-shadow: 0 3px 6px ${({ theme }) => theme.colors.primary}40;
      }
    }
  }

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

  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    letter-spacing: 3px;
    opacity: 0.95;

    &.light-mode {
      animation: lightModeSubtitle 2s ease-in-out infinite alternate;
    }

    &.dark-mode {
      animation: darkModeSubtitle 2s ease-in-out infinite alternate;
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
  }    @keyframes darkModeSubtitle {
    0% {
      transform: translateY(0);
      text-shadow: 0 0 10px ${({ theme }) => (theme?.colors?.primary || '#000') + '40'};
    }
    100% {
      transform: translateY(-3px);
      text-shadow: 0 0 20px ${({ theme }) => (theme?.colors?.primary || '#000') + '80'};
    }
  }
  position: relative;

  h1 {
    font-size: 4rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
    line-height: 1.2;
    position: relative;
    animation: ${({ theme }) => 
      theme.colors.background === '#F8FAFC' ? 'lightIntro' : 'darkIntro'
    } 0.8s ease-out;
    
    span {
      color: ${({ theme }) => theme.colors.text.primary};
      opacity: 0.95;
      position: relative;
    }

    @keyframes darkFadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
        text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}00;
      }
      to {
        opacity: 1;
        transform: translateY(0);
        text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}40;
      }
    }

    @keyframes lightFadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      }
      to {
        opacity: 1;
        transform: translateY(0);
        text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }

  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.fonts.secondary};
    letter-spacing: 3px;
    opacity: 0.95;

    @keyframes darkGlow {
      from {
        text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}20;
      }
      to {
        text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}60;
      }
    }

    @keyframes lightGlow {
      from {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        transform: translateY(0);
      }
      to {
        text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    h1 { font-size: 3.5rem; }
  }
    
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h1 { 
      font-size: 3rem;
      letter-spacing: 2px;
    }
    h2 { font-size: 1.8rem; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h1 { 
      font-size: 2.2rem;
      letter-spacing: 1px;
    }
    h2 { font-size: 1.5rem; }
  }
`;

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
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => `${theme.colors.primary}08`};
  border-radius: 8px;
  transition: all ${({ theme }) => theme.transitions.default};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
  }

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
    transform: translateY(-2px);
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

  &.light-mode {
    animation: lightModeSubtitle 2s ease-in-out infinite alternate;
  }

  &.dark-mode {
    animation: darkModeSubtitle 2s ease-in-out infinite alternate;
  }

  @keyframes darkModeSubtitle {
    0% {
      transform: translateY(0);
      text-shadow: 0 0 10px ${({ theme }) => (theme?.colors?.primary || '#000') + '40'};
    }
    100% {
      transform: translateY(-3px);
      text-shadow: 0 0 20px ${({ theme }) => (theme?.colors?.primary || '#000') + '80'};
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

// Initialize particles system

interface HeroProps {
  disableParticles?: boolean;
}

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
  }, []);    const isDarkMode = theme?.colors?.background !== '#F8FAFC';

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
          <ContactItem>
            <FaPhone />
            <span>+91 97917 47058</span>
          </ContactItem>
          <ContactItem>
            <FaMapMarkerAlt />
            <span>Coimbatore, Tamil Nadu, India</span>
          </ContactItem>
          
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