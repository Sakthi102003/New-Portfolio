export const ASCII_BANNER = `
█▀▀▀▀▀█ █ █ █▀▀▀▀█ █▀▀▀▀█ █▀▀▀█ █ █ █
█ ▀▀▀▄▄ ▀█ █▄ █ ▄█ █ ▄▄▄▀ █ ▄▄█ ▀█ █▄
█ ████  ▀██▄ █▀▀▀█ █████ █████  ▀█▄ 
█ ▄▄▄▄  ▄█ █ █ ▄█▀ █▄▄▄▄ █▄▄▄█ █ ▀█ 
█▄▄▄▄▄█  █  █▄▄▄▄█ █▄▄▄▄█ █  ▀█ █  █
▀ ▀ ▀ ▀  ▀  ▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀  ▀▀ ▀  ▀`;

export const WELCOME_MESSAGE = `
Welcome to the CyberX Security Research & Development Terminal.

Type "help" to see available commands.
`;

export const formatTerminalOutput = (text: string): string => {
  return text.split('\n').map(line => `> ${line}`).join('\n');
};
