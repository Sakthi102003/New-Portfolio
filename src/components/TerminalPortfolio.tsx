import { motion } from 'framer-motion';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ModeContext } from '../context/ModeContext';
import { ASCII_BANNER } from '../utils/ascii';

interface TerminalLine {
  id: number;
  content: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success' | 'loading';
  timestamp?: Date;
}

// Utility function to generate unique line IDs
const generateUniqueId = (() => {
  let counter = Date.now();
  return () => counter++;
})();

const Scanlines = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 2;
  pointer-events: none;
  opacity: 0.3;
`;

const TerminalContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: #00ff00;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  touch-action: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TerminalContent = styled.div`
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  font-family: 'Fira Code', monospace;
  letter-spacing: 0;
  white-space: pre;
  tab-size: 4;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
`;

const TerminalLine = styled(motion.div)<{ $type: string }>`
  margin: 0;
  padding: 0;
  white-space: pre !important;
  display: block;
  font-family: 'Fira Code', monospace;
  line-height: 1;
  letter-spacing: 0;
  tab-size: 4;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  -webkit-font-feature-settings: "liga" 0, "calt" 0;
  text-rendering: geometricPrecision;
  color: ${props => {
    switch (props.$type) {
      case 'error':
        return '#ff0000';
      case 'success':
        return '#00ff00';
      case 'system':
        return '#00ff00';
      case 'loading':
        return '#ffff00';
      default:
        return 'inherit';
    }
  }};
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  padding: 0;
  font-family: inherit;
  white-space: pre;
  letter-spacing: 0;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: calc(100% - 20px);
  margin: 0;
  padding: 0;
  letter-spacing: 0;
  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`;

const Cursor = styled.span`
  background: #00ff00;
  width: 8px;
  height: 16px;
  display: inline-block;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #00ff00;
  opacity: 0.9;
`;

const Title = styled.h1`
  color: #00ff41;
  font-size: 24px;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const Subtitle = styled.p`
  color: #00ffff;
  margin: 5px 0 0 0;
  font-size: 16px;
  opacity: 0.8;
`;

const TERMINAL_VERSION = `
   ⚡ Security Research & Development Terminal v2.0 ⚡`;

const WELCOME_MESSAGE = `
Welcome to the CyberX Security Research & Development Terminal.

Type "help" to see available commands.
`;

const TerminalPortfolio: React.FC = () => {
  const modeContext = useContext(ModeContext);
  if (!modeContext) throw new Error('ModeContext not found');
  
  const { setUIMode } = modeContext;
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const preventEvent = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Prevent all unwanted events
  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    const events = [
      'touchstart', 'touchmove', 'touchend',
      'click', 'dblclick', 'contextmenu',
      'mousedown', 'mouseup', 'mousemove'
    ];

    events.forEach(eventType => {
      terminal.addEventListener(eventType, preventEvent, { passive: false });
    });

    // Keep focus on input
    const focusInput = () => {
      if (inputRef.current && showInput) {
        inputRef.current.focus();
      }
    };

    terminal.addEventListener('click', focusInput);
    focusInput(); // Initial focus

    return () => {
      events.forEach(eventType => {
        terminal.removeEventListener(eventType, preventEvent);
      });
      terminal.removeEventListener('click', focusInput);
    };
  }, [preventEvent, showInput]);

  const addLine = (content: string, type: TerminalLine['type']) => {
    setLines(prev => [...prev, { id: generateUniqueId(), content, type, timestamp: new Date() }]);
  };

  const typewriterEffect = async (text: string, type: TerminalLine['type'], speedMultiplier: number = 1) => {
    if (text.includes('█') || text.includes('╔') || text.includes('═')) {
      addLine(text, type);
      return;
    }

    let currentText = '';
    for (const char of text) {
      currentText += char;
      addLine(currentText, type);
      await new Promise(r => setTimeout(r, 30 / speedMultiplier));
    }
  };

  const bootSequence = async () => {
    setShowInput(false);
    await new Promise(r => setTimeout(r, 1000));
    await typewriterEffect('Initializing system...', 'system');
    await new Promise(r => setTimeout(r, 500));
    await typewriterEffect('Loading secure environment...', 'system');
    await new Promise(r => setTimeout(r, 500));
    await typewriterEffect('Starting terminal...', 'system');
    await new Promise(r => setTimeout(r, 1000));
    
    // Add the ASCII art without typewriter effect
    addLine(ASCII_BANNER, 'system');
    await new Promise(r => setTimeout(r, 500));
    
    // Add the version line with typewriter effect
    await typewriterEffect(TERMINAL_VERSION, 'system', 1);
    await new Promise(r => setTimeout(r, 500));
    
    await typewriterEffect(WELCOME_MESSAGE, 'system');
    await new Promise(r => setTimeout(r, 300));
    setShowInput(true);
  };

  const confirmModeSwitch = () => {
    return window.confirm('Are you sure you want to exit terminal mode?');
  };

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    addLine(`$ ${command}`, 'input');

    const cmd = command.toLowerCase().trim();
    
    if (cmd === 'exit') {
      await typewriterEffect('Exiting terminal mode...', 'system');
      await new Promise(r => setTimeout(r, 1000));
      setUIMode('normal');
      navigate('/portfolio');
      return;
    }

    // Add your command handling logic here
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // If click is outside the terminal container and user confirms
      if (terminalRef.current && !terminalRef.current.contains(e.target as Node)) {
        if (confirmModeSwitch()) {
          setUIMode('normal');
          navigate('/portfolio');
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [navigate, setUIMode]);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  useEffect(() => {
    bootSequence();
  }, []);

  return (
    <TerminalContainer className="terminal-container">
      <Header>
        <Title>CyberX Terminal</Title>
        <Subtitle>Security Research & Development</Subtitle>
      </Header>
      <TerminalContent ref={terminalRef}>
        {lines.map(line => (
          <TerminalLine key={line.id} $type={line.type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {line.content}
          </TerminalLine>
        ))}
        {showInput && (
          <InputLine>
            <Input
              ref={inputRef}
              value={currentInput}
              onChange={e => setCurrentInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type 'help' for available commands..."
              autoFocus
            />
            <Cursor />
          </InputLine>
        )}
      </TerminalContent>
      <Scanlines />
    </TerminalContainer>
  );
};

export default TerminalPortfolio;