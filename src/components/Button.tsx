import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'cli';

// Button sizes
export type ButtonSize = 'small' | 'medium' | 'large';

// Button props interface
export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  fullWidth?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  style?: CSSProperties;
}

// Styled component for the button
const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $hasIcon: boolean;
  $iconPosition: 'left' | 'right';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  outline: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  flex-direction: ${({ $iconPosition }) => 
    $iconPosition === 'right' ? 'row-reverse' : 'row'};

  /* Size styles */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'small':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: 1.125rem;
        `;
      default: // medium
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: 1rem;
        `;
    }
  }}

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.text.primary};
          border: none;
          &:hover {
            background: ${theme.colors.secondary}dd;
            transform: translateY(-1px);
          }
          &:active {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          &:hover {
            background: ${theme.colors.primary}20;
            transform: translateY(-1px);
          }
          &:active {
            transform: translateY(0);
          }
        `;
      case 'text':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: none;
          padding-left: 0;
          padding-right: 0;
          &:hover {
            color: ${theme.colors.text.accent};
            transform: translateY(-1px);
          }
          &:active {
            transform: translateY(0);
          }
        `;
      case 'cli':
        return `
          color: ${theme.colors.text.primary};
          background: ${theme.colors.surface};
          border: 1px solid ${theme.colors.primary}40;
          font-family: ${theme.fonts.secondary};
          box-shadow: ${theme.shadows.glow};
          &:hover {
            background: ${theme.colors.primary}20;
            border-color: ${theme.colors.primary};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.glowStrong};
          }
          &:active {
            transform: translateY(0);
          }
        `;
      default: // primary
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.background};
          border: none;
          &:hover {
            background: ${theme.colors.primary}dd;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.glow};
          }
          &:active {
            transform: translateY(0);
            box-shadow: none;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/**
 * Button Component
 * 
 * A reusable button component with various styles and configurations
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  type = 'button',
  title,
  fullWidth = false,
  className,
  icon,
  iconPosition = 'left',
  style,
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={className}
      style={style}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $hasIcon={!!icon}
      $iconPosition={iconPosition}
      whileHover={{ y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {icon && icon}
      {children && children}
    </StyledButton>
  );
};

export default Button;