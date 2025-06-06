import { motion } from 'framer-motion';
import {
    FaCode,
    FaGithub,
    FaLinkedin,
    FaMedium,
    FaShieldAlt
} from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  font-size: 0.9rem;
`;

const socialLinks = [
  {
    icon: <FaShieldAlt />,
    url: 'https://tryhackme.com/p/cyberX2003',
    label: 'TryHackMe',
  },
  {
    icon: <FaGithub />,
    url: 'https://github.com/Sakthi102003',
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin />,
    url: 'https://linkedin.com/in/sakthimurugan-s',
    label: 'LinkedIn',
  },
  {
    icon: <FaMedium />,
    url: 'https://medium.com/@sakthimurugan102003',
    label: 'Medium',
  },
  {
    icon: <FaCode />,
    url: 'https://leetcode.com/u/Sakthi_2003/',
    label: 'LeetCode',
  },
];

const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        <SocialLinks>
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </SocialLink>
          ))}
        </SocialLinks>
        <Copyright>
          © {new Date().getFullYear()} SAKTHIMURUGAN S. All rights reserved.
        </Copyright>
      </Content>
    </FooterContainer>
  );
};

export default Footer; 