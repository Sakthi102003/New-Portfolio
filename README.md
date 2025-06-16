# CyberX Portfolio

A cybersecurity-focused portfolio website featuring a unique terminal-based interface and modern design. Built with React.js and TypeScript, this portfolio combines a traditional UI with an interactive CLI experience, perfect for showcasing security and development expertise.

🌐 **Live Demo:** [sakthi-s-portfolio.web.app](https://sakthi-s-portfolio.web.app/)

## ✨ Key Features

- 🔒 Cybersecurity-focused design and interface
- 💻 Dual Interface: Traditional UI and Terminal Mode
- 🎯 Interactive CLI with realistic terminal experience
- 🚀 Responsive layout optimized for all devices
- ✨ Smooth transitions and hacker-style animations
- 🛠️ Comprehensive skills showcase with security focus
- 📱 Mobile-first responsive design
- 🌐 Integrated GitHub activity and contributions
- 🌓 Dark mode optimized for terminal aesthetics
- ⚡ Optimized performance and fast loading
- 🔐 Security-themed project showcases

## 🚀 Technologies Used

### Frontend
- React.js with TypeScript
- Tailwind CSS for utility-first styling
- Three.js and React Three Fiber for 3D graphics
- Styled Components for component styling
- Framer Motion for animations
- React Icons for UI elements
- React Type Animation for typing effects
- TSParticles for particle effects
- EmailJS for contact form functionality

### Development Tools
- Vite for fast development
- ESLint for code quality
- PostCSS for CSS processing
- Tailwind Typography plugin
- TypeScript for type safety
- Git for version control
- VS Code as IDE

### Deployment
- Firebase Hosting
- GitHub Actions for CI/CD
- Environment management

## 🛠️ Setup & Development

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```cmd
git clone https://github.com/Sakthi102003/portfolio.git
cd portfolio
```

2. Install dependencies:
```cmd
npm install
```

3. Start development server:
```cmd
npm run dev
```

4. Build for production:
```cmd
npm run build
```

## 💻 Terminal Interface Features

The terminal interface can be accessed by:
- Clicking the terminal icon in the navigation bar
- Using the keyboard shortcut F1
- Switching modes in the theme toggle

Terminal Commands:
- `help` - Display available commands
- `about` - View professional background
- `skills` - List cybersecurity and technical skills
- `projects` - Browse security projects
- `contact` - Display contact information
- `clear` - Clear the terminal screen
- `exit` - Return to traditional UI
- `github` - View GitHub activity
- `matrix` - Toggle Matrix animation
- `theme` - Switch between light/dark modes

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── hacker/       # Terminal-based UI components
│   │   ├── HackerLayout.tsx
│   │   ├── TerminalHeader.tsx
│   │   └── TerminalInput.tsx
│   ├── normal/       # Traditional UI components
│   │   └── NormalLayout.tsx
│   └── common/       # Shared components
├── context/          # React Context providers
├── data/            # Static data and content
├── hooks/           # Custom React hooks
├── sections/        # Main page sections
├── styles/          # Styling and theme files
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🎨 UI Improvements

- **Minimal Theme Switcher**: Simplified to show only sun/moon icon instead of text
- **Skills Display**: Improved contrast in both dark and light modes
- **Time Display**: Enhanced with clock icon while maintaining time text
- **Responsive Components**: All UI elements adapt to the current theme

## 🔒 Security Features

- Matrix-style background animations
- Terminal-based interaction
- Security project showcases
- GitHub activity integration
- Cybersecurity skill visualization
- Responsive security icons
- Interactive command system

## 🎨 Design Philosophy

The portfolio features two distinct interfaces:

### Traditional Mode
- Clean, professional design
- Easy navigation
- Project cards with live demos
- Skills visualization
- Contact form

### Terminal Mode
- Authentic terminal experience
- Command-line interface
- Matrix background effects
- Security-focused interactions
- Real-time command processing

## 🤝 Connect With Me

- 📧 [sakthimurugan102003@gmail.com](mailto:sakthimurugan102003@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/sakthimurugan-s)
- 🐱 [GitHub](https://github.com/Sakthi102003)
- ✍️ [Medium](https://medium.com/@sakthimurugan102003)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔄 Recent Updates

- **2024-07-XX**: Improved theme handling in Skills section for better visibility in light mode
- **2024-07-XX**: Simplified theme switcher to show only icon for cleaner UI
- **2024-07-XX**: Enhanced TimeDisplay component with clock icon alongside the time text

```ascii
 ██████╗██╗   ██╗██████╗ ███████╗██████╗    ██╗  ██╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗   ╚██╗██╔╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝    ╚███╔╝ 
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗    ██╔██╗ 
╚██████╗   ██║   ██████╔╝███████╗██║  ██║   ██╔╝ ██╗
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝  ╚═╝
```
