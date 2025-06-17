import { motion } from 'framer-motion';
import { FaBriefcase, FaCode, FaShieldAlt } from 'react-icons/fa';
import styled from 'styled-components';
import EnhancedGithubStats from '../components/EnhancedGithubStats';

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled(motion.div)`
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: 400;
    letter-spacing: 0.3px;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.1);
    
    &:first-of-type {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const InterestCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  transition: ${({ theme }) => theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
  }

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.6;
    letter-spacing: 0.2px;
  }
`;

const HireButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: #000;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  margin-top: ${({ theme }) => theme.spacing.lg};
  border: 2px solid transparent;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: transparent;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const About = () => {
  const interests = [
    {
      icon: <FaShieldAlt />,
      title: 'Security Focus',
      description: 'Passionate about cybersecurity and implementing secure coding practices.',
    },
    {
      icon: <FaCode />,
      title: 'Full Stack Development',
      description: 'Building modern web apps with Python backend and React frontend.',
    },
  ];

  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </SectionTitle>
        <AboutContent>
          <TextContent
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              👋 Hello! I'm a Computer Science graduate from Rathinam College of Arts and Science, specializing in Cloud Technology and Information Security.
            </p>
            <p>
              💻 I focus on building secure, scalable applications using modern technologies. My expertise includes both offensive security testing and secure application development.
            </p>
            <p>
              🎯 I'm passionate about creating robust solutions that prioritize both functionality and security, always staying current with the latest security practices and development trends.
            </p>
            <HireButton
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBriefcase /> Available for Hire
            </HireButton>
          </TextContent>
          <InterestsGrid>
            {interests.map((interest, index) => (
              <InterestCard
                key={interest.title}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    duration: 0.8,
                    delay: index * 0.2
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {interest.icon}
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </InterestCard>
            ))}
          </InterestsGrid>
        </AboutContent>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EnhancedGithubStats username="Sakthi102003" />
        </motion.div>
      </Container>
    </AboutSection>
  );
};

export default About;