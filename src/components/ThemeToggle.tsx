import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModeContext } from '../context/ModeContext';
import { colorThemes } from '../styles/theme';

const ToggleContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${({ theme }) => theme.colors.surface}dd;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  backdrop-filter: blur(10px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  gap: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
    border-color: ${({ theme }) => theme.colors.primary}66;
  }
`;

const ThemeButton = styled.button<{ $color: string; $isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${props => props.$isActive ? props.theme.colors.primary : 'transparent'};
  background-color: ${props => props.$color};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px ${props => props.$color}66;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px ${props => props.$color}99;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1));
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ThemeToggle: React.FC = () => {
  const { theme, updateCustomTheme, isHackerMode } = useContext(ModeContext)!;

  if (isHackerMode) return null;

  const currentTheme = theme.colors.primary;

  return (
    <ToggleContainer>
      {Object.entries(colorThemes).map(([name, colors]) => (
        <ThemeButton
          key={name}
          $color={colors.primary}
          $isActive={currentTheme === colors.primary}
          onClick={() => updateCustomTheme(colors)}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
        />
      ))}
    </ToggleContainer>
  );
};

export default ThemeToggle;
