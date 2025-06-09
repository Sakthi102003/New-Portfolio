import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt, FaFilter, FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
// Remove unused import
// import { SecurityIcon } from '../components/SecurityIcons';

const ProjectsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
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
  font-weight: bold;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}20`};
  cursor: pointer;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.background : theme.colors.primary)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: linear-gradient(
    135deg, 
    ${({ theme }) => `${theme.colors.primary}10`} 0%, 
    ${({ theme }) => `${theme.colors.primary}20`} 100%
  );
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => `${theme.colors.background}CC`};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.5rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.5;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TechTag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 12px;
  font-size: 0.9rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}40`};
  border-radius: 8px;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

interface Project {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  githubLink: string;
  demoLink?: string;
  image: string;
  iconType: 'lock' | 'shield' | 'code' | 'network' | 'bug' | 'encryption';
}

const projects: Project[] = [
  {
    title: "File Integrity Checker",
    description: "A Python-based GUI tool for monitoring and verifying file integrity using cryptographic hashing. Features real-time monitoring, multiple hash algorithms (MD5, SHA-256), and alerts for unauthorized modifications.",
    category: "Information Security",
    techStack: ["Python", "Tkinter", "Cryptography", "File System"],
    githubLink: "https://github.com/Sakthi102003/File-Integrity-Checker",
    image: "/projects/network-monitor.svg",
    iconType: "shield"
  },
  {
    title: "Stegnogrpahy",
    description: "A Python-based steganography tool that allows you to hide messages within images. It supports both LSB and PVD steganography techniques.",
    category: "Information Security",
    techStack: ["Python", "Cryptography", "CLI"],
    githubLink: "https://github.com/Sakthi102003/Steganography",
    image: "/projects/network-monitor.svg",
    iconType: "encryption"
  },
  {
    title: "Reposcope",
    description: "A powerful web application that provides deep insights into GitHub profiles, helping users understand their coding journey and potential areas for improvement. Features include account value estimation, repository overview, tech stack analysis, activity timeline, and AI-powered recommendations.",
    category: "Security Analytics",
    techStack: ["React", "TypeScript", "Tailwind CSS", "GitHub API"],
    githubLink: "https://github.com/Sakthi102003/Reposcope",
    demoLink: "https://reposcope-2003.web.app",
    image: "/projects/security-dashboard.svg",
    iconType: "code"
  },
  {
    title: "PhishShield",
    description: "An advanced anti-phishing solution that combines machine learning and real-time threat detection to protect users from phishing attacks. Features include URL analysis, email scanning, and browser extension integration.",
    category: "Cybersecurity",
    techStack: ["React", "TypeScript", "Machine Learning", "Node.js", "Security APIs"],
    githubLink: "https://github.com/Sakthi102003/PhisShield",
    demoLink: "https://phisshield.onrender.com/",
    image: "/projects/vulnerability-scanner.svg",
    iconType: "shield"
  }
];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  const categories = ["All", ...new Set(projects.map(project => project.category))];

  useEffect(() => {
    setFilteredProjects(
      selectedCategory === "All"
        ? projects
        : projects.filter(project => project.category === selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </SectionTitle>

        <FilterContainer>
          {categories.map(category => (
            <FilterButton
              key={category}
              $active={category === selectedCategory}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter style={{ marginRight: '8px' }} /> {category}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProjectsGrid>
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.03, boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} />
                <CategoryBadge>{project.category}</CategoryBadge>
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.techStack.map(tech => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  <ProjectLink
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaGithub /> GitHub
                  </ProjectLink>
                  {project.demoLink && (
                    <ProjectLink
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaExternalLinkAlt /> Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;