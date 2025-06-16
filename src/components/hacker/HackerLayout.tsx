import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { parseCommand } from '../../utils/commands';

import ModeToggle from '../common/ModeToggle';
import TerminalHeader from './TerminalHeader';
import TerminalInput from './TerminalInput';

const TerminalContainer = styled(motion.div)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  padding: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const CommandOutput = styled.div`
  white-space: pre-wrap;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &.command {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &.error {
    color: ${({ theme }) => theme.colors.error};
  }
  
  &.system {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const InputContainer = styled.div`
  position: relative;
  z-index: 100;
  pointer-events: auto;
  margin-top: 1rem;
`;

interface OutputLine {
  id: number;
  content: string;
  type: 'command' | 'output' | 'error' | 'system';
}

interface HackerLayoutProps {
  children?: React.ReactNode;
}

const HackerLayout: React.FC<HackerLayoutProps> = () => {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const idCounterRef = useRef(0);

  useEffect(() => {
    if (!initialized) {
      // Initialize immediately without boot sequence
      setInitialized(true);
    }
  }, [initialized]);

  // Auto-focus the terminal input
  useEffect(() => {
    if (initialized) {
      // Small delay to ensure component is fully rendered
      setTimeout(() => {
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }, 100);
    }
  }, [initialized]);

  const addOutput = (content: string, type: OutputLine['type'] = 'output') => {
    const id = ++idCounterRef.current;
    setOutputLines(prev => [...prev, { id, content, type }]);
  };

  const handleCommand = (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
    // Show the command in output
    addOutput(`$ ${command}`, 'command');

    if (command.toLowerCase() === 'clear') {
      setOutputLines([]);
      return;
    }

    if (command.trim().toLowerCase() === 'exit') {
      addOutput('Exiting terminal mode...', 'system');
      setTimeout(() => {
        localStorage.removeItem('uiMode'); // Clear the mode completely
        localStorage.setItem('lastPage', '/'); // Remember we want to go to landing
        window.location.href = '/'; // Direct navigation to landing page
      }, 500);
      return;
    }

    // Parse and execute command
    const result = parseCommand(command, navigate);
    addOutput(result.message, result.type === 'error' ? 'error' : 'output');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(prev => prev + 1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        setHistoryIndex(prev => prev - 1);
      }
    }
  };

  return (
    <>
      <ModeToggle />
      <TerminalContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TerminalHeader />
        <div style={{ flex: 1, overflow: 'auto', padding: '1rem', minHeight: 0 }}>
          {outputLines.map(line => (
            <CommandOutput key={line.id} className={line.type}>
              {line.content}
            </CommandOutput>
          ))}
          {initialized && (
            <InputContainer>
              <TerminalInput
                onCommand={handleCommand}
                onKeyDown={handleKeyDown}
                commandHistory={commandHistory}
                historyIndex={historyIndex}
              />
            </InputContainer>
          )}
        </div>
      </TerminalContainer>
    </>
  );
};

export default HackerLayout;
