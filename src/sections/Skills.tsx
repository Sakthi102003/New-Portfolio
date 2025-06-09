import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaCode,
  FaFireAlt,
  FaGitAlt, FaGithub,
  FaHtml5,
  FaJs,
  FaLinux,
  FaPython, FaReact, FaServer
} from 'react-icons/fa';
import { HiCommandLine } from 'react-icons/hi2';
import { SiCentos, SiFlask, SiKalilinux, SiTailwindcss, SiUbuntu } from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

// Define a type for Skill
interface Skill {
  name: string;
  icon: React.ReactNode;
  description: string;
  level?: number;
}

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

const SkillCategory = styled(motion.div)<{ $isDark?: boolean }>`
  background: ${({ $isDark = false }) => 
    $isDark 
      ? 'rgba(32, 32, 32, 0.95)' 
      : 'rgba(240, 240, 240, 0.95)'
  };
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 16px;
  box-shadow: ${({ $isDark = false }) => 
    $isDark
      ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
      : '0 8px 32px rgba(0, 0, 0, 0.1)'
  };
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
    box-shadow: ${({ $isDark = false }) => 
      $isDark
        ? '0 12px 40px rgba(0, 0, 0, 0.4)' 
        : '0 12px 40px rgba(0, 0, 0, 0.15)'
    };
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SkillName = styled.span<{ $isDark?: boolean }>`
  color: ${({ theme, $isDark = false }) => 
    $isDark 
      ? theme.colors.text.primary 
      : '#000000'};
  font-size: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SkillIcon = styled.div<{ $isDark?: boolean }>`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${SkillCategory}:hover & {
    transform: scale(1.1);
    color: ${({ theme, $isDark = false }) => 
      $isDark 
        ? theme.colors.text.primary
        : theme.colors.text.primary};
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  min-width: 200px;
  max-width: 300px;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  pointer-events: none;
  z-index: 100;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${({ theme }) => theme.colors.surface};
  }
`;

const SkillWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;



const skillCategories: {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}[] = [
  {
    title: 'Languages',
    icon: <FaCode />,
    skills: [
      { 
        name: 'Python',
        icon: <FaPython />, 
        description: 'Building backend services and automation scripts. Experience with Django, Flask, and data analysis.',
        level: 90
      },
      { 
        name: 'JavaScript',
        icon: <FaJs />, 
        description: 'Modern ES6+ features, async programming, and frontend development.',
        level: 80
      },
      { 
        name: 'HTML/CSS',
        icon: <FaHtml5 />, 
        description: 'Semantic HTML5, modern CSS3 features, responsive design, and animations.',
        level: 85
      },
    ],
  },
  {
    title: 'Frontend',
    icon: <FaReact />,
    skills: [
      { 
        name: 'React.js',
        icon: <FaReact />,
        description: 'Building modern SPAs with hooks, context, and state management.',
        level: 85
      },
      { 
        name: 'TailwindCSS',
        icon: <SiTailwindcss />,
        description: 'Utility-first CSS framework for rapid UI development.',
        level: 80
      },
      { 
        name: 'ShadCN UI',
        icon: <HiCommandLine />,
        description: 'Component library built on Radix UI for accessible web applications.',
        level: 70
      },
    ],
  },
  {
    title: 'Backend & ML',
    icon: <FaServer />,
    skills: [
      { 
        name: 'Flask',
        icon: <SiFlask />,
        description: 'Python micro web framework for building APIs and web apps.',
        level: 75
      },
      { 
        name: 'Machine Learning',
        icon: <FaFireAlt />,
        description: 'Experience with ML algorithms, scikit-learn, and data pipelines.',
        level: 70
      },
      { 
        name: 'GitHub API',
        icon: <FaGithub />,
        description: 'Integrating GitHub data and automating workflows.',
        level: 65
      },
    ],
  },
  {
    title: 'Tools & OS',
    icon: <FaLinux />,
    skills: [
      { 
        name: 'Git',
        icon: <FaGitAlt />,
        description: 'Version control, branching, and collaboration.',
        level: 85
      },
      { 
        name: 'VS Code',
        icon: <TbBrandVscode />,
        description: 'Primary code editor with extensive customization.',
        level: 90
      },
      { 
        name: 'Linux',
        icon: <FaLinux />,
        description: 'Ubuntu, Kali Linux, CentOS for development and security.',
        level: 80
      },
      { 
        name: 'Firebase',
        icon: <FaServer />,
        description: 'Backend-as-a-Service for hosting and authentication.',
        level: 70
      },
      { 
        name: 'Ubuntu',
        icon: <SiUbuntu />,
        description: 'Daily driver OS for development.',
        level: 80
      },
      { 
        name: 'Kali Linux',
        icon: <SiKalilinux />,
        description: 'Penetration testing and security research.',
        level: 65
      },
      { 
        name: 'CentOS',
        icon: <SiCentos />,
        description: 'Server management and deployment.',
        level: 60
      },
    ],
  },
];

const Skills = () => {
  // Add state for tooltip
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

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
          {skillCategories.flatMap((category: { title: string; icon: React.ReactNode; skills: Skill[] }) => 
            category.skills.map((skill: Skill, index: number) => (
              <SkillCategory
                key={skill.name}
                $isDark={isDarkMode}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveTooltip(skill.name)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <SkillWrapper>
                  <SkillIcon $isDark={isDarkMode}>
                    {skill.icon}
                  </SkillIcon>
                  <SkillName $isDark={isDarkMode}>{skill.name}</SkillName>
                  <AnimatePresence>
                    {activeTooltip === skill.name && (
                      <Tooltip
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill.description}
                      </Tooltip>
                    )}
                  </AnimatePresence>
                </SkillWrapper>
              </SkillCategory>
            ))
          )}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;