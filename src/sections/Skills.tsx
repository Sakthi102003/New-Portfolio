import { motion } from 'framer-motion';
import {
  FaCode,
  FaFireAlt,
  FaGitAlt, FaGithub,
  FaHtml5,
  FaJs,
  FaLinux,
  FaNetworkWired,
  FaPython, FaReact, FaServer
} from 'react-icons/fa';
import { HiCommandLine } from 'react-icons/hi2';
import { SiCentos, SiFlask, SiKalilinux, SiTailwindcss, SiUbuntu } from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import styled from 'styled-components';

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const SkillCategory = styled(motion.div)`
  background: rgba(32, 32, 32, 0.95);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  aspect-ratio: 1;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SkillName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SkillIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${SkillCategory}:hover & {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const skillCategories = [
  {
    title: 'Languages',
    icon: <FaCode />,
    skills: [
      { name: 'Python', icon: <FaPython /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'HTML/CSS', icon: <FaHtml5 /> },
    ],
  },
  {
    title: 'Frontend',
    icon: <FaReact />,
    skills: [
      { name: 'React.js', icon: <FaReact /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> },
      { name: 'ShadCN UI', icon: <HiCommandLine /> },
    ],
  },
  {
    title: 'Backend & ML',
    icon: <FaServer />,
    skills: [
      { name: 'Flask', icon: <SiFlask /> },
      { name: 'GitHub API', icon: <FaGithub /> },
      { name: 'ML/AI', icon: <FaNetworkWired /> },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: <FaGitAlt />,
    skills: [
      { name: 'Git/GitHub', icon: <FaGithub /> },
      { name: 'Firebase', icon: <FaFireAlt /> },
      { name: 'VS Code', icon: <TbBrandVscode /> },
    ],
  },
  {
    title: 'Operating Systems',
    icon: <FaLinux />,
    skills: [
      { name: 'Ubuntu', icon: <SiUbuntu /> },
      { name: 'Kali Linux', icon: <SiKalilinux /> },
      { name: 'CentOS', icon: <SiCentos /> },
    ],
  },
];

const Skills = () => {
  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </SectionTitle>
        <SkillsGrid>
          {skillCategories.flatMap(category => 
            category.skills.map((skill, index) => (
              <SkillCategory
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SkillIcon>
                  {skill.icon}
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
              </SkillCategory>
            ))
          )}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;