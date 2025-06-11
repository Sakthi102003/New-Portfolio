import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ProjectDetailsContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 50;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const DetailContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProjectSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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
  margin-top: ${({ theme }) => theme.spacing.xl};
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
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

interface ProjectDetailsProps {
  projects: {
    title: string;
    description: string;
    category: string;
    techStack: string[];
    githubLink: string;
    demoLink?: string;
    image: string;
    iconType: string;
    role?: string;
    detailedDescription?: string;
    images?: string[];
  }[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.title === decodeURIComponent(id || ''));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <ProjectDetailsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <DetailContent>
        <BackButton
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Projects
        </BackButton>

        <ProjectTitle>{project.title}</ProjectTitle>

        <ProjectSection>
          <SectionTitle>Overview</SectionTitle>
          <ProjectDescription>
            {project.detailedDescription || project.description}
          </ProjectDescription>
        </ProjectSection>

        {project.role && (
          <ProjectSection>
            <SectionTitle>My Role</SectionTitle>
            <ProjectDescription>{project.role}</ProjectDescription>
          </ProjectSection>
        )}

        <ProjectSection>
          <SectionTitle>Technologies Used</SectionTitle>
          <TechStack>
            {project.techStack.map(tech => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </TechStack>
        </ProjectSection>

        <ProjectSection>
          <SectionTitle>Project Images</SectionTitle>
          <ImagesGrid>
            {(project.images || [project.image]).map((img, index) => (
              <ProjectImage
                key={index}
                src={img}
                alt={`${project.title} screenshot ${index + 1}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            ))}
          </ImagesGrid>
        </ProjectSection>

        <ProjectLinks>
          <ProjectLink
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub /> View on GitHub
          </ProjectLink>
          {project.demoLink && (
            <ProjectLink
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
            >
              <FaExternalLinkAlt /> Live Demo
            </ProjectLink>
          )}
        </ProjectLinks>
      </DetailContent>
    </ProjectDetailsContainer>
  );
};

export default ProjectDetails;
