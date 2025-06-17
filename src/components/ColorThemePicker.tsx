import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModeContext } from '../context/ModeContext';

const ColorPickerContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ColorSection = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const ColorInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.text.accent};
  border-radius: 4px;
  background: transparent;
`;

const ColorThemePicker: React.FC = () => {
  const { theme, updateCustomTheme, isHackerMode } = useContext(ModeContext)!;

  if (isHackerMode) return null;

  const handleColorChange = (key: string, value: string) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (parent === 'text') {
        updateCustomTheme({
          text: {
            ...theme.colors.text,
            [child]: value,
          },
        });
      }
    } else {
      updateCustomTheme({ [key]: value });
    }
  };

  return (
    <ColorPickerContainer>
      <ColorSection>
        <Label>Primary Color</Label>
        <ColorInput
          type="color"
          value={theme.colors.primary}
          onChange={(e) => handleColorChange('primary', e.target.value)}
        />
      </ColorSection>
      <ColorSection>
        <Label>Background Color</Label>
        <ColorInput
          type="color"
          value={theme.colors.background}
          onChange={(e) => handleColorChange('background', e.target.value)}
        />
      </ColorSection>
      <ColorSection>
        <Label>Text Color</Label>
        <ColorInput
          type="color"
          value={theme.colors.text.primary}
          onChange={(e) => handleColorChange('text.primary', e.target.value)}
        />
      </ColorSection>
      <ColorSection>
        <Label>Accent Color</Label>
        <ColorInput
          type="color"
          value={theme.colors.text.accent}
          onChange={(e) => handleColorChange('text.accent', e.target.value)}
        />
      </ColorSection>
    </ColorPickerContainer>
  );
};

export default ColorThemePicker;
