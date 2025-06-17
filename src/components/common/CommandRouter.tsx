import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Command {
  command: string;
  description: string;
  action: () => void;
}

export const useCommandRouter = () => {
  const navigate = useNavigate();

  const showHelp = useCallback((commands: Command[]) => {
    console.log('Available commands:');
    commands.forEach(cmd => {
      console.log(`${cmd.command}\t- ${cmd.description}`);
    });
  }, []);

  const clearTerminal = useCallback(() => {
    // Implementation will be added later
  }, []);

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
      action: () => showHelp(commands)
    },
    {
      command: 'clear',
      description: 'Clear the terminal',
      action: clearTerminal
    }
  ];

  const executeCommand = useCallback((input: string) => {
    const cmd = commands.find(c => c.command === input.toLowerCase().trim());
    if (cmd) {
      cmd.action();
    } else {
      console.log(`Command not found: ${input}`);
    }
  }, [commands]);

  return {
    commands,
    executeCommand,
    showHelp,
    clearTerminal
  };
};
