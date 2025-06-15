import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { parseCommand } from '../../utils/commands';

import TerminalInput from './TerminalInput';

const ASCII_TITLE = `
 ██████╗██╗   ██╗██████╗ ███████╗██████╗     ██╗  ██╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗    ╚██╗██╔╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝     ╚███╔╝ 
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗     ██╔██╗ 
╚██████╗   ██║   ██████╔╝███████╗██║  ██║    ██╔╝ ██╗
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝
`;

const TerminalContainer = styled(motion.div)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  padding: 1rem;
  position: relative;
  z-index: 1;
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
    let mounted = true;
    
    if (!initialized) {
      const bootSequence = async () => {
        if (!mounted) return;
        
        addOutput('System initializing...', 'system');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        if (!mounted) return;
        addOutput('Loading cybersecurity portfolio...', 'system');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!mounted) return;
        addOutput(ASCII_TITLE, 'system');
        addOutput('\nType "help" for available commands.\n', 'system');
        setInitialized(true);
      };

      bootSequence();
    }

    return () => {
      mounted = false;
    };
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
      <TerminalContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{ height: '100vh', overflow: 'auto', padding: '1rem' }}>
          {outputLines.map(line => (
            <CommandOutput key={line.id} className={line.type}>
              {line.content}
            </CommandOutput>
          ))}
          {initialized && (
            <TerminalInput
              onCommand={handleCommand}
              onKeyDown={handleKeyDown}
              commandHistory={commandHistory}
              historyIndex={historyIndex}
            />
          )}
        </div>
      </TerminalContainer>
    </>
  );
};

export default HackerLayout;
