import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMedium, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Particles from 'react-tsparticles';
import styled from 'styled-components';
import { loadFull } from 'tsparticles';
import type { Engine, MoveDirection, OutMode } from 'tsparticles-engine';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.sm};
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
    font-size: 4.5rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.secondary};
    letter-spacing: 2px;
    line-height: 1.1;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 400;
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.fonts.secondary};
    letter-spacing: 3px;
    opacity: 0.9;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h1 {
      font-size: 3rem;
    }
    h2 {
      font-size: 1.4rem;
    }
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

// Particles Configuration
const particlesConfig = {
  fpsLimit: 30, // Reduced from 60
  particles: {
    number: {
      value: 40, // Reduced from 80
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#00ff00", "#00cc00", "#009900"]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.2,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        size_min: 0.1,
        sync: false
      }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#00ff00",
      opacity: 0.2,
      width: 1,
      triangles: {
        enable: false
      }
    },
    move: {
      enable: true,
      speed: 1, // Reduced from 1.5
      direction: "none" as MoveDirection,
      random: false,
      straight: false,
      outModes: "bounce" as OutMode,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detectOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      },
      onClick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.4
        }
      },
      push: {
        quantity: 4
      }
    }
  },
  retina_detect: true,
  fullScreen: false,
  background: {
    color: "transparent"
  }
};

const Hero = () => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

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
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="glitch" data-text="SAKTHIMURUGAN S">
            SAKTHIMURUGAN S
          </h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Cybersecurity Specialist & Full Stack Developer
          </motion.h2>
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
            href="https://drive.google.com/file/d/1vcuqI3tt35dDf5j-KfpzRYbDLabroBiS/view?usp=drive_link"
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