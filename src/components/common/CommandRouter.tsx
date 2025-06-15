import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Command {
  command: string;
  description: string;
  action: () => void;
}

export const CommandRouter: React.FC = () => {
  const navigate = useNavigate();

  const commands: Command[] = [
    {
      command: 'about',
      description: 'Display information about me',
      action: () => navigate('/about')
    },
    {
      command: 'projects',
      description: 'View my projects',
      action: () => navigate('/projects')
    },
    {
      command: 'skills',
      description: 'List my technical skills',
      action: () => navigate('/skills')
    },
    {
      command: 'contact',
      description: 'Get my contact information',
      action: () => navigate('/contact')
    },
    {
      command: 'help',
      description: 'Show available commands',
      action: () => showHelp()
    },
    {
      command: 'clear',
      description: 'Clear the terminal',
      action: () => clearTerminal()
    }
  ];

  const showHelp = () => {
    console.log('Available commands:');
    commands.forEach(cmd => {
      console.log(`${cmd.command}\t- ${cmd.description}`);
    });
  };

  const clearTerminal = () => {
    // Implementation will be added later
  };

  const executeCommand = (input: string) => {
    const cmd = commands.find(c => c.command === input.toLowerCase().trim());
    if (cmd) {
      cmd.action();
    } else {
      console.log(`Command not found: ${input}`);
    }
  };

  return null; // This is just a logic component
};

export default CommandRouter;
