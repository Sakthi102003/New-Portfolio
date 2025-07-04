import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import TerminalHeader from './hacker/TerminalHeader';

interface CLIProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLIContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 800px;
  max-width: calc(100vw - 2rem);
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  border-radius: 8px;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.secondary};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  backdrop-filter: blur(10px);
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 1rem;
    right: 1rem;
    width: calc(100vw - 2rem);
  }
`;

const CLIContent = styled.div`
  background: ${({ theme }) => theme.colors.background}CC;
`;

const CLIHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

const CLIControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CLIButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const CLIClose = styled(CLIButton)`
  background: ${({ theme }) => theme.colors.cyber.danger};
`;

const CLIMinimize = styled(CLIButton)`
  background: ${({ theme }) => theme.colors.cyber.warning};
`;

const CLIMaximize = styled(CLIButton)`
  background: ${({ theme }) => theme.colors.cyber.success};
`;

const CLITitle = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '$';
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CLIContentInner = styled.div`
  padding: 1rem;
  height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary}20;
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary}40;
    }
  }
`;

const CLIInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  
  &:focus {
    outline: none;
  }
`;

const OutputLine = styled.div<{ $isCommand?: boolean }>`
  margin-bottom: 0.5rem;
  color: ${({ theme, $isCommand }) => 
    $isCommand ? theme.colors.text.secondary : theme.colors.text.primary};
  white-space: pre-wrap;
`;

export const CLI: React.FC<CLIProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output', content: string }>>([
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);

  const commands: Record<string, () => string> = {
    help: () => 
      'Available commands:\n' +
      '• about - Learn about me\n' +
      '• skills - View my technical skills\n' +
      '• projects - Browse my projects\n' +
      '• contact - Get in touch\n' +
      '• clear - Clear the terminal\n' +
      '• exit - Close the CLI',
    about: () => 
      'I\'m a recent B.Sc. Computer Science graduate specializing in Cloud Technology and Information Security.\n' +
      'Passionate about cybersecurity and secure software development.',
    skills: () => 
      'Technical Skills:\n\n' +
      '• Languages: Python, HTML, CSS, JavaScript\n' +
      '• Frontend: React.js, Tailwind CSS, ShadCN UI, Chart.js\n' +
      '• Backend/ML: Flask, GitHub API, Machine Learning (Python)\n' +
      '• Tools: Git, GitHub, Firebase, VS Code\n' +
      '• OS: Ubuntu, Kali Linux, CentOS\n\n' +
      'Type "projects" to see these skills in action!',
    projects: () => 
      'Recent Projects:\n' +
      '1. File Integrity Checker - Python GUI tool for file monitoring\n' +
      '2. Reposcope - GitHub profile analyzer\n' +
      '3. PhishShield - ML-powered anti-phishing solution\n' +
      '4. Steganography - Image steganography tool',
    contact: () => 
      'Let\'s connect!\n' +
      '• Email: sakthimurugan102003@gmail.com\n' +
      '• GitHub: @Sakthi102003\n' +
      '• LinkedIn: sakthimurugan-s',
    clear: () => {
      setTimeout(() => setHistory([]), 0);
      return 'Clearing terminal...';
    },
    exit: () => {
      onClose();
      return '';
    }
  };

  const handleCommand = (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();
    const newHistory = [...history, { type: 'command' as const, content: `$ ${cmd}` }];
    
    if (normalizedCmd in commands) {
      const output = commands[normalizedCmd]();
      if (output) {
        newHistory.push({ type: 'output', content: output });
      }
    } else {
      newHistory.push({ type: 'output', content: `Command not found: ${cmd}` });
    }
    
    setHistory(newHistory);
    setInput('');
  };

  return isOpen ? (
    <AnimatePresence>
      <CLIContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <TerminalHeader />
        <CLIHeader>
          <CLIControls>
            <CLIClose onClick={onClose} />
            <CLIMinimize />
            <CLIMaximize />
          </CLIControls>
          <CLITitle>Terminal</CLITitle>
        </CLIHeader>
        <CLIContent>
          <CLIContentInner>
            {history.map((line, index) => (
              <OutputLine key={index} $isCommand={line.type === 'command'}>
                {line.content}
              </OutputLine>
            ))}
            <CLIInput>
              <Prompt>$</Prompt>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    handleCommand(input);
                  }
                }}
                autoFocus
              />
            </CLIInput>
          </CLIContentInner>
        </CLIContent>
      </CLIContainer>
    </AnimatePresence>
  ) : null;
};
