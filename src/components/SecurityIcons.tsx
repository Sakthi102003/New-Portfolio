import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div<{ size?: number; color?: string }>`
  width: ${({ size = 24 }) => size}px;
  height: ${({ size = 24 }) => size}px;
  color: ${({ color, theme }) => color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

interface SecurityIconProps {
  size?: number;
  color?: string;
  type: 'lock' | 'shield' | 'code' | 'network' | 'bug' | 'encryption';
}

export const SecurityIcon: React.FC<SecurityIconProps> = ({ type, size, color }) => {
  const icons = {
    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    network: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
      </svg>
    ),
    bug: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2l1.88 1.88"></path>
        <path d="M14.12 3.88L16 2"></path>
        <path d="M9 7.13v-1a3.003 3.003 0 116 0v1"></path>
        <path d="M12 20v-6"></path>
        <path d="M18 9.13h4"></path>
        <path d="M2 9.13h4"></path>
        <path d="M10 17l-2 2"></path>
        <path d="M14 17l2 2"></path>
        <path d="M16 13h3"></path>
        <path d="M5 13h3"></path>
        <path d="M12 20a8 8 0 008-8H4a8 8 0 008 8z"></path>
      </svg>
    ),
    encryption: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
      </svg>
    )
  };

  return (
    <IconWrapper size={size} color={color}>
      {icons[type]}
    </IconWrapper>
  );
};

export default SecurityIcon;
