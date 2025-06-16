export const WELCOME_ASCII = `
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗  ██╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗╚██╗██╔╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝ ╚███╔╝ 
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗ ██╔██╗ 
╚██████╗   ██║   ██████╔╝███████╗██║  ██║██╔╝ ██╗
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

export const HACKER_SKULL = `
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░
    ░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
    ░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░
    ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░
    ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░
    ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░
    ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓░
    ▓▓▓▓▓▓░░                ░░▓▓▓▓▓▓▓▓▓▓▓
    ▓▓▓▓░░    ████    ████    ░░▓▓▓▓▓▓▓▓▓
    ▓▓▓░░     ████    ████     ░░▓▓▓▓▓▓▓▓
    ▓▓░░                        ░░▓▓▓▓▓▓
    ▓▓░░          ████          ░░▓▓▓▓▓▓
    ▓▓░░          ████          ░░▓▓▓▓▓▓
    ▓▓░░                        ░░▓▓▓▓▓▓
    ▓▓▓░░     ████████████     ░░▓▓▓▓▓▓▓
    ▓▓▓▓░░                    ░░▓▓▓▓▓▓▓▓
    ▓▓▓▓▓▓░░                ░░▓▓▓▓▓▓▓▓▓▓
    ░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓░
    ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
    ░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░
    ░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░
    ░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
    ░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
`;

export const MATRIX_LINES = [
  '01001000 01100001 01100011 01101011 01100101 01110010',
  '01010000 01101111 01110010 01110100 01100110 01101111 01101100 01101001 01101111',
  '01000011 01111001 01100010 01100101 01110010 01110011 01100101 01100011 01110101 01110010 01101001 01110100 01111001',
  '01010111 01100101 01101100 01100011 01101111 01101101 01100101',
];

export const TERMINAL_PROMPT = '[root@cybersec-portfolio ~]$ ';

export const LOADING_SPINNER = ['|', '/', '-', '\\'];

// Function to create a box around text
export function createBox(text: string, width?: number): string {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const maxLength = Math.max(...lines.map(line => line.length));
  const boxWidth = width || maxLength + 4;
  
  const topBorder = '╔' + '═'.repeat(boxWidth - 2) + '╗';
  const bottomBorder = '╚' + '═'.repeat(boxWidth - 2) + '╝';
  
  const boxedLines = [topBorder];
  lines.forEach(line => {
    const padding = boxWidth - line.length - 2;
    const leftPad = Math.floor(padding / 2);
    const rightPad = padding - leftPad;
    boxedLines.push('║' + ' '.repeat(leftPad) + line + ' '.repeat(rightPad) + '║');
  });
  boxedLines.push(bottomBorder);
  
  return boxedLines.join('\n');
}

// Function to add color codes for terminal display
export function colorizeText(text: string, color: 'green' | 'red' | 'cyan' | 'yellow' | 'white' | 'blue'): string {
  const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    white: '\x1b[37m',
    blue: '\x1b[34m'
  };
  return `${colors[color]}${text}\x1b[0m`;
}

// Function to center text
export function centerText(text: string, width: number): string {
  const lines = text.split('\n');
  return lines.map(line => {
    const padding = Math.max(0, width - line.length);
    const leftPad = Math.floor(padding / 2);
    return ' '.repeat(leftPad) + line;
  }).join('\n');
}

export const CYBERX_ASCII = `
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗  ██╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗╚██╗██╔╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝ ╚███╔╝ 
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗ ██╔██╗ 
╚██████╗   ██║   ██████╔╝███████╗██║  ██║██╔╝ ██╗
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝

[*] Initializing secure shell...
[*] Access granted...
[*] Type 'help' for available commands
`;
