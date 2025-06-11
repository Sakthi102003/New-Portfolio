export interface Project {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  githubLink: string;
  demoLink?: string;
  image: string;
  iconType: 'lock' | 'shield' | 'code' | 'network' | 'bug' | 'encryption';
  role?: string;
  detailedDescription?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    title: "File Integrity Checker",
    description: "A Python-based GUI tool for monitoring and verifying file integrity using cryptographic hashing.",
    detailedDescription: "A comprehensive file integrity monitoring solution that provides real-time alerts and detailed audit logs. Features include support for multiple hashing algorithms (MD5, SHA-256), automated scheduled scans, and a user-friendly GUI interface for easy monitoring and configuration.",
    category: "Information Security",
    techStack: ["Python", "Tkinter", "Cryptography", "File System"],
    githubLink: "https://github.com/Sakthi102003/File-Integrity-Checker",
    image: "/projects/network-monitor.svg",
    iconType: "shield",
    role: "Developed the entire application from concept to completion, implementing secure cryptographic functions and creating an intuitive user interface.",
    images: ["/projects/network-monitor.svg"]
  },
  {
    title: "Steganography",
    description: "A Python-based steganography tool that allows you to hide messages within images.",
    detailedDescription: "An advanced steganography tool that implements both LSB (Least Significant Bit) and PVD (Pixel Value Differencing) techniques for secure message hiding in images. The tool provides a robust solution for data hiding with minimal visual impact on the carrier images.",
    category: "Information Security",
    techStack: ["Python", "Cryptography", "CLI"],
    githubLink: "https://github.com/Sakthi102003/Steganography",
    image: "/projects/network-monitor.svg",
    iconType: "encryption",
    role: "Designed and implemented multiple steganography algorithms, created a command-line interface, and ensured the security of the hidden data.",
    images: ["/projects/network-monitor.svg"]
  },
  {
    title: "Reposcope",
    description: "A powerful web application that provides deep insights into GitHub profiles.",
    detailedDescription: "A comprehensive GitHub profile analyzer that helps users understand their coding journey and improve their development practices. Features include detailed repository analysis, technology usage statistics, contribution patterns, and AI-powered recommendations for profile improvement.",
    category: "Security Analytics",
    techStack: ["React", "TypeScript", "Tailwind CSS", "GitHub API"],
    githubLink: "https://github.com/Sakthi102003/Reposcope",
    demoLink: "https://reposcope-2003.web.app",
    image: "/projects/security-dashboard.svg",
    iconType: "code",
    role: "Led the frontend development, implemented the GitHub API integration, and created the analytics dashboard using React and Tailwind CSS.",
    images: ["/projects/security-dashboard.svg"]
  },
  {
    title: "PhishShield",
    description: "An advanced anti-phishing solution that combines machine learning and real-time threat detection.",
    detailedDescription: "A comprehensive anti-phishing platform that uses machine learning algorithms to detect and prevent phishing attacks in real-time. The solution includes URL analysis, email scanning capabilities, and seamless browser integration for maximum protection.",
    category: "Cybersecurity",
    techStack: ["React", "TypeScript", "Machine Learning", "Node.js", "Security APIs"],
    githubLink: "https://github.com/Sakthi102003/PhisShield",
    demoLink: "https://phisshield.onrender.com/",
    image: "/projects/vulnerability-scanner.svg",
    iconType: "shield",
    role: "Developed the machine learning models for phishing detection, created the React frontend, and implemented the security API integrations.",
    images: ["/projects/vulnerability-scanner.svg"]
  }
];
