import { motion } from 'framer-motion';
import React from 'react';
import { DiCss3, DiHtml5, DiJavascript, DiPython, DiReact } from 'react-icons/di';
import { FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { SiChartdotjs, SiFirebase, SiFlask, SiKalilinux, SiLinux, SiTailwindcss, SiUbuntu, SiVisualstudiocode } from 'react-icons/si';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  }
`;

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  opacity: 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  .basic-info {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .other-links {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 6px;
  transition: all ${({ theme }) => theme.transitions.default};
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}15;
    transform: translateY(-1px);
  }

  svg {
    font-size: 1.1em;
  }
`;

const Objective = styled(motion.p)`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const SkillCategory = styled(motion.div)`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.colors.surface}, ${theme.colors.surface}cc)`};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary}15;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}08;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}15;
    border-color: ${({ theme }) => theme.colors.primary}30;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 24px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 2px;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.8;
    font-size: 1.05rem;
  }
`;

const SkillIcon = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  svg {
    font-size: 1.5em;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }
  
  svg {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.9;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.colors.surface}, ${theme.colors.surface}cc)`};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary}15;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}08;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primary}50)`};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}15;
    border-color: ${({ theme }) => theme.colors.primary}30;

    &::before {
      transform: scaleX(1);
    }
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.8;
    font-size: 1.05rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary}10;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    transform: translateY(-2px);
  }

  svg {
    font-size: 0.9em;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  letter-spacing: -0.5px;
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${({ theme }) => `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primary}50)`};
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Portfolio: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SAKTHIMURUGAN S
        </Title>
        <ContactInfo>
          <motion.div 
            className="basic-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ContactLink href="tel:+919791747058">
              <FaEnvelope /> +91 97917 47058
            </ContactLink>
            <ContactLink>
              <FaMapMarkerAlt /> Coimbatore, Tamil Nadu, India
            </ContactLink>
          </motion.div>
          <motion.div 
            className="other-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ContactLink href="mailto:sakthimurugan102003@gmail.com">
              <FaEnvelope /> sakthimurugan102003@gmail.com
            </ContactLink>
            <ContactLink href="https://linkedin.com/in/sakthimurugan-s" target="_blank">
              <FaLinkedin /> LinkedIn
            </ContactLink>
            <ContactLink href="https://github.com/Sakthi102003" target="_blank">
              <FaGithub /> GitHub
            </ContactLink>
          </motion.div>
        </ContactInfo>
        <Objective
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          A passionate cybersecurity enthusiast and developer with hands-on experience in building real-world projects using
          Python, Machine Learning, and modern web technologies. I enjoy solving security challenges, developing useful tools,
          and continuously improving my skills to stay ahead in the tech landscape.
        </Objective>
      </Header>

      <Section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <SectionTitle variants={itemVariants}>Technical Skills</SectionTitle>
        <SkillsGrid>
          <SkillCategory variants={itemVariants}>
            <h3>
              <SkillIcon>
                <DiPython />
                Languages
              </SkillIcon>
            </h3>
            <SkillsList>
              <SkillItem>
                <DiPython /> Python
              </SkillItem>
              <SkillItem>
                <DiHtml5 /> HTML
              </SkillItem>
              <SkillItem>
                <DiCss3 /> CSS
              </SkillItem>
              <SkillItem>
                <DiJavascript /> JavaScript
              </SkillItem>
            </SkillsList>
          </SkillCategory>

          <SkillCategory variants={itemVariants}>
            <h3>
              <SkillIcon>
                <DiReact />
                Frontend
              </SkillIcon>
            </h3>
            <SkillsList>
              <SkillItem>
                <DiReact /> React.js
              </SkillItem>
              <SkillItem>
                <SiTailwindcss /> Tailwind CSS
              </SkillItem>
              <SkillItem>
                <SiChartdotjs /> Chart.js
              </SkillItem>
            </SkillsList>
          </SkillCategory>

          <SkillCategory variants={itemVariants}>
            <h3>
              <SkillIcon>
                <SiFlask />
                Backend/ML
              </SkillIcon>
            </h3>
            <SkillsList>
              <SkillItem>
                <SiFlask /> Flask
              </SkillItem>
              <SkillItem>
                <FaGithub /> GitHub API
              </SkillItem>
              <SkillItem>
                <DiPython /> Machine Learning
              </SkillItem>
            </SkillsList>
          </SkillCategory>

          <SkillCategory variants={itemVariants}>
            <h3>
              <SkillIcon>
                <SiVisualstudiocode />
                Tools & OS
              </SkillIcon>
            </h3>
            <SkillsList>
              <SkillItem>
                <FaGithub /> Git/GitHub
              </SkillItem>
              <SkillItem>
                <SiFirebase /> Firebase
              </SkillItem>
              <SkillItem>
                <SiVisualstudiocode /> VS Code
              </SkillItem>
              <SkillItem>
                <SiUbuntu /> Ubuntu
              </SkillItem>
              <SkillItem>
                <SiKalilinux /> Kali Linux
              </SkillItem>
              <SkillItem>
                <SiLinux /> CentOS
              </SkillItem>
            </SkillsList>
          </SkillCategory>
        </SkillsGrid>
      </Section>

      <Section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <SectionTitle variants={itemVariants}>Projects</SectionTitle>
        <ProjectsGrid>
          <ProjectCard
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            variants={itemVariants}
          >
            <h3>
              PhishShield - Phishing Website Detector 
              <FaExternalLinkAlt size={16} />
            </h3>
            <p>
              An advanced ML-based web app that detects phishing websites in real-time.
              Features include URL validation, threat analysis, and user-friendly reporting with a clean UI.
            </p>
            <ProjectLinks>
              <ProjectLink href="https://github.com/Sakthi102003/PhisShield" target="_blank">
                <FaGithub /> View Code
              </ProjectLink>
              <ProjectLink href="https://phisshield.onrender.com/" target="_blank">
                <FaExternalLinkAlt /> Live Demo
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>

          <ProjectCard
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            variants={itemVariants}
          >
            <h3>
              GitHub User Insights Finder
              <FaExternalLinkAlt size={16} />
            </h3>
            <p>
              A React-based tool to analyze GitHub user activity, including repo count, tech stacks used,
              usage statistics, account pricing, and downloadable reports with user comparison features.
            </p>
            <ProjectLinks>
              <ProjectLink href="https://github.com/Sakthi102003/Reposcope" target="_blank">
                <FaGithub /> View Code
              </ProjectLink>
              <ProjectLink href="https://reposcope-2003.web.app/" target="_blank">
                <FaExternalLinkAlt /> Live Demo
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>

          <ProjectCard
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            variants={itemVariants}
          >
            <h3>
              Tech IQ - Tech Stack Recommender
              <FaExternalLinkAlt size={16} />
            </h3>
            <p>
             A modern tech stack recommendation platform powered by AI, helping developers make informed technology choices for their projects.
            </p>
            <ProjectLinks>
              <ProjectLink href="https://github.com/Sakthi102003/Tech-IQ" target="_blank">
                <FaGithub /> View Code
              </ProjectLink>
              <ProjectLink href="https://tech-iq.onrender.com/" target="_blank">
                <FaExternalLinkAlt /> Live Demo
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>

          <ProjectCard
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            variants={itemVariants}
          >
            <h3>
              File Integrity Checker
              <FaExternalLinkAlt size={16} />
            </h3>
            <p>
              Developed a Python-based CLI and GUI tool that generates and verifies cryptographic hashes (MD5/SHA256)
              of files to detect tampering. Supports JSON log generation and optional email alerts.
            </p>
            <ProjectLinks>
              <ProjectLink href="https://github.com/Sakthi102003/File-Integrity-Checker" target="_blank">
                <FaGithub /> View Code
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        </ProjectsGrid>
      </Section>
    </Container>
  );
};

export default Portfolio;