import React from 'react';
import styled from 'styled-components';
import { CYBERX_ASCII } from '../../utils/ascii';

const HeaderContainer = styled.div`
  font-family: 'Courier New', 'Lucida Console', 'Monaco', monospace;
  white-space: pre;
  color: #FF0000;
  padding: 1rem;
  line-height: 1.2;
  letter-spacing: 0;
  background: transparent;
  text-align: left;
  width: 100%;
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  text-rendering: optimizeLegibility;
  min-height: auto;
  position: relative;
  z-index: 1;
  pointer-events: none;
  margin-bottom: 2rem;
`;

const TerminalHeader: React.FC = () => {
  return (
    <HeaderContainer>
      {CYBERX_ASCII}
    </HeaderContainer>
  );
};

export default TerminalHeader;
