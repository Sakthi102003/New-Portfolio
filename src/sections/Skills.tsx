import { motion } from 'framer-motion';
import { FaGitAlt, FaLinux, FaNetworkWired, FaPython } from 'react-icons/fa';
import styled from 'styled-components';

const SkillsSection = styled.section`
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
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SkillCategory = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};

  svg {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SkillName = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled(motion.div)<{ $level: number }>`
  width: ${({ $level }) => $level}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

const skillCategories = [
  {
    title: 'Programming',
    icon: <FaPython />,
    skills: [
      { name: 'Python', level: 85 },
      { name: 'HTML', level: 80 },
      { name: 'CSS', level: 75 },
    ],
  },
  {
    title: 'Tools',
    icon: <FaGitAlt />,
    skills: [
      { name: 'Microsoft Office', level: 90 },
      { name: 'Git/GitHub', level: 85 },
      { name: 'Dockers', level: 70 },
    ],
  },
  {
    title: 'Operating Systems',
    icon: <FaLinux />,
    skills: [
      { name: 'Ubuntu', level: 85 },
      { name: 'Kali Linux', level: 80 },
      { name: 'CentOS', level: 75 },
    ],
  },
  {
    title: 'Networking',
    icon: <FaNetworkWired />,
    skills: [
      { name: 'FTP', level: 85 },
      { name: 'DHCP', level: 80 },
      { name: 'NFS', level: 75 },
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
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryHeader>
                {category.icon}
                <h3>{category.title}</h3>
              </CategoryHeader>
              <SkillList>
                {category.skills.map((skill) => (
                  <SkillItem key={skill.name}>
                    <SkillName>{skill.name}</SkillName>
                    <ProgressBar>
                      <Progress
                        $level={skill.level}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </ProgressBar>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 