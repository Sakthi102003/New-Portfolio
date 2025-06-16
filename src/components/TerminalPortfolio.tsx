import { motion } from 'framer-motion';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ModeContext } from '../context/ModeContext';
import { WELCOME_ASCII } from '../utils/ascii';

interface TerminalLine {
  id: number;
  content: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success' | 'loading' | 'ascii';
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
  color: #ff0000;
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
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Liberation Mono', 'Courier New', monospace;
  letter-spacing: 0;
  white-space: pre;
  tab-size: 4;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  -webkit-font-feature-settings: "liga" 0, "calt" 0;
  text-rendering: geometricPrecision;
  font-size: 16px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 15px;
  }
`;

const TerminalLine = styled(motion.div)<{ $type: string }>`
  margin: 0;
  padding: 0;
  white-space: pre !important;
  display: block;
  font-family: ${props => props.$type === 'ascii' 
    ? "'Courier New', 'Lucida Console', 'Monaco', monospace" 
    : "'Fira Code', 'Consolas', 'Monaco', 'Liberation Mono', monospace"};
  line-height: ${props => props.$type === 'ascii' ? '1.0' : '1.2'};
  letter-spacing: ${props => props.$type === 'ascii' ? '0' : '0'};
  tab-size: 4;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  -webkit-font-feature-settings: "liga" 0, "calt" 0;
  text-rendering: ${props => props.$type === 'ascii' ? 'optimizeSpeed' : 'geometricPrecision'};
  word-spacing: normal;
  word-break: keep-all;
  overflow-x: visible;
  font-size: ${props => props.$type === 'ascii' ? '14px' : '16px'};
  font-weight: ${props => props.$type === 'ascii' ? 'normal' : 'normal'};
  min-height: ${props => props.$type === 'ascii' ? '14px' : 'auto'};
  color: ${props => {
    switch (props.$type) {
      case 'error':
        return '#ff0000';
      case 'success':
        return '#00ff00';
      case 'system':
        return '#00ff00';
      case 'ascii':
        return '#00ff41';
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
   ⚡ Terminal Portfolio v2.0 ⚡`;

const WELCOME_MESSAGE = `
Welcome to Sakthimurugan's Portfolio Terminal.

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

  const typewriterEffect = async (text: string, type: TerminalLine['type'], _speedMultiplier: number = 1) => {
    // Force ASCII type for certain content
    if (text.includes('█') || text.includes('╔') || text.includes('═') || 
        text.includes('╗') || text.includes('╚') || text.includes('╝') || text.includes('║')) {
      type = 'ascii';
    }

    // Special handling for ASCII art
    if (type === 'ascii') {
      console.log('Processing ASCII art:', text.substring(0, 50) + '...');
      
      // Add the ASCII art line by line to ensure proper alignment
      const lines = text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        console.log(`Adding ASCII line ${i}: "${line}"`);
        // Always add the line, even if it's empty (for proper spacing)
        addLine(line, 'ascii');
        await new Promise(r => setTimeout(r, 100));
      }
      return;
    }

    // Regular typewriter effect for non-ASCII content
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.trim() === '') {
        addLine('', type);
        continue;
      }
      
      // For non-ASCII, add the complete line at once for better performance
      addLine(line, type);
      await new Promise(r => setTimeout(r, 50));
    }
  };

  const bootSequence = async () => {
    setShowInput(false);
    setLines([]); // Clear any existing lines
    await new Promise(r => setTimeout(r, 1000));
    await typewriterEffect('Initializing system...', 'system');
    await new Promise(r => setTimeout(r, 500));
    await typewriterEffect('Loading secure environment...', 'system');
    await new Promise(r => setTimeout(r, 500));
    await typewriterEffect('Starting terminal...', 'system');
    await new Promise(r => setTimeout(r, 1000));
    
    // Add the version line
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

    if (cmd === 'ascii' || cmd === 'logo') {
      await typewriterEffect('Displaying ASCII art...', 'system');
      await new Promise(r => setTimeout(r, 500));
      await typewriterEffect(WELCOME_ASCII, 'ascii', 1);
      return;
    }

    if (cmd === 'help') {
      await typewriterEffect('Available commands:', 'system');
      await typewriterEffect('  help     - Show this help message', 'output');
      await typewriterEffect('  ascii    - Display ASCII logo', 'output');
      await typewriterEffect('  logo     - Display ASCII logo', 'output');
      await typewriterEffect('  clear    - Clear the terminal', 'output');
      await typewriterEffect('  exit     - Exit terminal mode', 'output');
      return;
    }

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    // Unknown command
    await typewriterEffect(`Command not found: ${command}`, 'error');
    await typewriterEffect('Type "help" for available commands.', 'system');
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
        <Title>Portfolio Terminal</Title>
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