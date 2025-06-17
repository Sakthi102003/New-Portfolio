import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TerminalWindow = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 1rem 0;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const TerminalButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const TerminalContent = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1em;
  background: ${({ theme }) => theme.colors.primary};
  margin-left: 4px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

interface LiveTerminalProps {
  commands: string[];
  outputs: string[];
  autoPlay?: boolean;
  loop?: boolean;
}

const LiveTerminal: React.FC<LiveTerminalProps> = ({ 
  commands, 
  outputs, 
  autoPlay = true,
  loop = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    let timeout: NodeJS.Timeout;
    
    if (isTyping && currentIndex < commands.length) {
      if (displayedCommand.length < commands[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedCommand(commands[currentIndex].slice(0, displayedCommand.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
          setDisplayedOutput(outputs[currentIndex]);
        }, 500);
      }
    } else if (!isTyping) {
      timeout = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= commands.length) {
          if (loop) {
            setCurrentIndex(0);
            setDisplayedCommand('');
            setDisplayedOutput('');
          }
        } else {
          setCurrentIndex(nextIndex);
          setDisplayedCommand('');
          setDisplayedOutput('');
        }
        setIsTyping(true);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, displayedCommand, isTyping, commands, outputs, autoPlay, loop]);

  return (
    <TerminalWindow
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TerminalHeader>
        <TerminalButton color="#ff5f56" />
        <TerminalButton color="#ffbd2e" />
        <TerminalButton color="#27c93f" />
      </TerminalHeader>
      <TerminalContent>
        <div>
          <span style={{ color: '#27c93f' }}>➜</span>{' '}
          <span style={{ color: '#7aa2f7' }}>~/project</span>{' '}
          {displayedCommand}
          {isTyping && <Cursor />}
        </div>
        {displayedOutput && (
          <pre style={{ margin: '0.5rem 0', whiteSpace: 'pre-wrap' }}>
            {displayedOutput}
          </pre>
        )}
      </TerminalContent>
    </TerminalWindow>
  );
};

export default LiveTerminal;
