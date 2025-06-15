import { motion } from 'framer-motion';
import React, { useState, type KeyboardEvent } from 'react';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  commandHistory: string[];
  historyIndex: number;
  prompt?: string;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ 
  onCommand, 
  onKeyDown,
  commandHistory,
  historyIndex,
  prompt = 'cyberx@terminal:~$' 
}) => {
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blink cursor effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Update input when navigating through history
  React.useEffect(() => {
    if (historyIndex >= 0 && historyIndex < commandHistory.length) {
      setInput(commandHistory[commandHistory.length - 1 - historyIndex]);
    } else if (historyIndex === -1) {
      setInput('');
    }
  }, [historyIndex, commandHistory]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommand(input);
      setInput('');
    } else {
      onKeyDown(e);
    }
  };

  return (
    <motion.div 
      className="flex items-center font-mono text-terminal-red"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-terminal-red mr-2">{prompt}</span>
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full bg-transparent outline-none text-terminal-red font-mono"
          autoFocus
          spellCheck={false}
        />
        <span 
          className={`absolute top-0 ml-[2px] h-full w-2 bg-terminal-red ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: `${input.length}ch` }}
        />
      </div>
    </motion.div>
  );
};

export default TerminalInput;
