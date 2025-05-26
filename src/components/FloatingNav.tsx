import { motion } from 'framer-motion';
import { FaCode, FaEnvelope, FaHome, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

const NavContainer = styled(motion.div)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavButton = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const FloatingNav = () => {
  const navItems = [
    { icon: <FaHome />, href: '#hero', label: 'Home' },
    { icon: <FaUser />, href: '#about', label: 'About' },
    { icon: <FaCode />, href: '#projects', label: 'Projects' },
    { icon: <FaEnvelope />, href: '#contact', label: 'Contact' },
  ];

  return (
    <NavContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {navItems.map((item, index) => (
        <NavButton
          key={item.label}
          href={item.href}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={item.label}
        >
          {item.icon}
        </NavButton>
      ))}
    </NavContainer>
  );
};

export default FloatingNav; 