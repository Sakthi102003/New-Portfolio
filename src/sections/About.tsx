import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCloud, FaCode, FaShieldAlt } from 'react-icons/fa';
import styled from 'styled-components';
import Loading from '../components/LoadingSpinner';

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
  }
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const InterestCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
    margin: 0;
  }
`;

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AboutSection id="about">
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </SectionTitle>
          <Loading text="Loading About..." />
        </Container>
      </AboutSection>
    );
  }

  const interests = [
    {
      icon: <FaShieldAlt />,
      title: 'Information Security',
      description: 'Passionate about protecting digital assets and implementing robust security measures.',
    },
    {
      icon: <FaCloud />,
      title: 'Cloud Security',
      description: 'Interested in securing cloud infrastructure and implementing best practices for cloud environments.',
    },
    {
      icon: <FaCode />,
      title: 'Python & Frontend',
      description: 'Skilled in Python development and creating modern, responsive web applications.',
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p>
            I'm a recent B.Sc. Computer Science graduate specializing in Cloud Technology and Information Security from Rathinam College of Arts and Science, Coimbatore. Driven by a passion for cybersecurity, I've built a strong foundation in network security, secure software development, and system protection. I'm also proficient in Python and frontend development, creating responsive web applications. I'm now seeking opportunities to apply my skills, contribute to secure application development, and grow with evolving cybersecurity challenges.
            </p>
          </TextContent>
          <InterestsGrid>
            {interests.map((interest, index) => (
              <InterestCard
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {interest.icon}
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </InterestCard>
            ))}
          </InterestsGrid>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About; 