import type { NavigateFunction } from 'react-router-dom';

export interface CommandResult {
  type: 'success' | 'error' | 'info';
  message: string;
}

const AVAILABLE_COMMANDS = {
  help: 'Show available commands',
  about: 'View information about me',
  skills: 'List my technical skills',
  projects: 'View my cybersecurity projects',
  contact: 'Get my contact information',
  clear: 'Clear the terminal screen',
  github: 'Visit my GitHub profile',
  linkedin: 'Visit my LinkedIn profile',
  social: 'Display all social links',
  resume: 'Download my resume',
  exit: 'Exit terminal mode'
};

export const parseCommand = (input: string, navigate: NavigateFunction): CommandResult => {
  const command = input.trim().toLowerCase();

  switch (command) {
    case 'help':
      return {
        type: 'info',
        message: Object.entries(AVAILABLE_COMMANDS)
          .map(([cmd, desc]) => `  ${cmd.padEnd(15)} ${desc}`)
          .join('\n')
      };

    case 'about':
      return { 
        type: 'info',
        message: `
[*] SAKTHIMURUGAN S
[*] Cybersecurity Enthusiast & Developer

A passionate cybersecurity enthusiast and developer with hands-on experience 
in building real-world projects using Python, Machine Learning, and modern 
web technologies. I enjoy solving security challenges, developing useful tools, 
and continuously improving my skills to stay ahead in the tech landscape.

Location: Coimbatore, Tamil Nadu, India
Contact: +91 97917 47058
Email: sakthimurugan102003@gmail.com
`.trim()
      };

    case 'skills':
      return {
        type: 'info',
        message: `
[*] Technical Skills

[+] Languages
    • Python
    • HTML
    • CSS
    • JavaScript

[+] Frontend Development
    • React.js
    • Tailwind CSS
    • ShadCN UI
    • Chart.js

[+] Backend & Machine Learning
    • Flask
    • GitHub API
    • Machine Learning (Python)

[+] Tools & Operating Systems
    • Git & GitHub
    • Firebase
    • Visual Studio Code
    • Ubuntu
    • Kali Linux
    • CentOS`
      };

    case 'projects':
      return {
        type: 'info',
        message: `
[*] Projects

[1] PhishShield - Phishing Website Detector
    • ML-based web app for real-time phishing detection
    • Features: URL validation, threat analysis
    • Clean UI with user-friendly reporting
    Type 'project 1' for more details

[2] GitHub User Insights Finder
    • React-based GitHub analytics tool
    • Track: repo count, tech stacks, usage stats
    • Features: account pricing, user comparison
    Type 'project 2' for more details

[3] File Integrity Checker
    • Python-based CLI and GUI tool
    • Cryptographic hash generation (MD5/SHA256)
    • JSON logging and email alerts
    Type 'project 3' for more details`
      };

    case 'contact':
      return {
        type: 'info',
        message: `
[*] Contact Information

[+] Direct Contact
    • Phone: +91 97917 47058
    • Email: sakthimurugan102003@gmail.com
    • Location: Coimbatore, Tamil Nadu, India

[+] Professional Profiles
    • GitHub: https://github.com/Sakthi102003
    • LinkedIn: https://linkedin.com/in/sakthimurugan-s

Use 'github' or 'linkedin' commands to open profiles directly.`
      };

    case 'social':
      return {
        type: 'info',
        message: `
[*] Social Links

[+] GitHub: https://github.com/Sakthi102003
[+] LinkedIn: https://linkedin.com/in/sakthimurugan-s
[+] Email: sakthimurugan102003@gmail.com`
      };

    case 'github':
      window.open('https://github.com/Sakthi102003', '_blank');
      return {
        type: 'success',
        message: 'Opening GitHub profile...'
      };

    case 'linkedin':
      window.open('https://linkedin.com/in/sakthimurugan-s', '_blank');
      return {
        type: 'success',
        message: 'Opening LinkedIn profile...'
      };

    case 'clear':
      return {
        type: 'success',
        message: ''
      };

    case 'mode':
      navigate('/portfolio');
      return {
        type: 'success',
        message: 'Switching to normal mode...'
      };

    case 'exit':
      // Set flags to control navigation behavior
      localStorage.setItem('exitDestination', '/');
      localStorage.removeItem('uiMode');
      
      // Update UI mode state first, then let the context effect handle navigation
      document.body.classList.remove('hacker-mode');
      
      return {
        type: 'success',
        message: 'Exiting terminal mode...'
      };

    case 'resume':
      // Trigger resume download
      const link = document.createElement('a');
      link.href = process.env.NODE_ENV === 'production' ? '/Resume.pdf' : '/public/Resume.pdf';
      link.download = 'Sakthimurugan_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return {
        type: 'success',
        message: 'Downloading resume...'
      };

    default:
      return {
        type: 'error',
        message: `Command not found: ${command}\nType 'help' for available commands.`
      };
  }
};
