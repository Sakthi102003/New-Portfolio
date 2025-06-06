import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import styled from 'styled-components';

const ToggleButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    transition: ${({ theme }) => theme.transitions.default};
  }
`;

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle = ({ isDark, toggleTheme }: ThemeToggleProps) => {
  return (
    <ToggleButton
      onClick={toggleTheme}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};
