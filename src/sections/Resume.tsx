import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const ResumeSection = styled.section`
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

const ResumeContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DownloadButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};

  &:hover {
    opacity: 0.8;
  }
`;

const PreviewButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.glow};

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    li {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      color: ${({ theme }) => theme.colors.text.secondary};
      padding-left: ${({ theme }) => theme.spacing.md};
      position: relative;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ResumeSection id="resume">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Resume
        </SectionTitle>
        <ResumeContent
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ButtonGroup>
            <DownloadButton
              href="https://drive.google.com/file/d/1vcuqI3tt35dDf5j-KfpzRYbDLabroBiS/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download Resume
            </DownloadButton>
            <PreviewButton
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Preview Resume
            </PreviewButton>
          </ButtonGroup>
        </ResumeContent>
      </Container>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </CloseButton>
              <h3>Education</h3>
              <ul>
                <li>
                  <strong>B.Sc. Computer Science - Cloud Technology and Information Security</strong>
                  <br />
                  Rathinam College of Arts and Science, Coimbatore
                  <br />
                  2022 - 2025 (Pursuing) | CGPA: 7.67
                </li>
                <li>
                  <strong>Higher Secondary Certificate (HSC)</strong>
                  <br />
                  Erode Hindu Kalvi Nilayam, Erode
                  <br />
                  2020 | Percentage: 81%
                </li>
                <li>
                  <strong>Secondary School Leaving Certificate (SSLC)</strong>
                  <br />
                  The AVS Matriculation School, Erode
                  <br />
                  2018 | Percentage: 92%
                </li>
              </ul>

              <h3>Technical Skills</h3>
              <ul>
                <li><strong>Programming:</strong> Python, React.js, HTML, CSS</li>
                <li><strong>Tools:</strong> Microsoft Office, Git/GitHub, Dockers</li>
                <li><strong>Operating Systems:</strong> Ubuntu, Kali Linux, CentOS</li>
                <li><strong>Networking:</strong> FTP, DHCP, NFS</li>
              </ul>

              <h3>Certifications</h3>
              <ul>
                <li>Oracle Cloud Infrastructure Foundations Associate</li>
                <li>Python on Multiple Languages</li>
                <li>Ethical Hacking Tools Essentials</li>
                <li>Azure Fundamentals</li>
                <li>CCNA 200-301 Network Fundamentals</li>
                <li>Google Cybersecurity</li>
              </ul>

              <h3>Internship Experience</h3>
              <ul>
                <li>
                  <strong>Web Development Intern</strong>
                  <br />
                  Nxtlogic, Coimbatore (2023)
                  <br />
                  - Built webpages with user authentication and secure data storage using SQL Server
                </li>
                <li>
                  <strong>Cybersecurity Intern</strong>
                  <br />
                  Techno Hacks (Virtual, 2023)
                  <br />
                  - Conducted social engineering and network scans using Kali Linux and GitHub
                </li>
              </ul>

              <h3>Projects</h3>
              <ul>
                <li>
                  <strong>GitHub Profile Analyzer:</strong> Developed a tool that analyzes GitHub profiles for security insights and coding patterns using Python and GitHub API
                </li>
                <li>
                  <strong>Phishing Website Detector:</strong> Created a machine learning model to identify potential phishing websites with high accuracy
                </li>
                <li>
                  <strong>Steganography Tool:</strong> Built a secure information hiding tool using advanced steganography techniques and image processing
                </li>
              </ul>

              <h3>Soft Skills</h3>
              <ul>
                <li>Team Organizing</li>
                <li>Time Management</li>
                <li>Problem Solving</li>
                <li>Leadership</li>
                <li>Adaptability</li>
              </ul>

              <h3>Languages Known</h3>
              <ul>
                <li><strong>Tamil:</strong> Speak, Read, Write</li>
                <li><strong>English:</strong> Speak, Read, Write</li>
              </ul>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ResumeSection>
  );
};

export default Resume; 