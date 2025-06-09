# My Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Computer Science graduate and aspiring developer. Built with React.js and TypeScript, featuring an interactive CLI interface and smooth animations.

🌐 **Live Demo:** [sakthi-s-portfolio.web.app](https://sakthi-s-portfolio.web.app/)

## ✨ Key Features

- 🎯 Clean, minimalist design focusing on content
- 💻 Interactive CLI interface (Press F1 to access)
- 🚀 Responsive layout for all devices
- ✨ Smooth animations & transitions
- 🛠️ Detailed skills showcase with tooltips and adaptive theming
- 📱 Mobile-first approach
- 🌐 Social media integration
- 🌓 Dark/Light mode toggle with minimal UI
- ⏰ Live time display with clock icon
- ⚡ Fast loading & optimized performance

## 🚀 Technologies Used

### Frontend
- React.js with TypeScript
- Styled Components for styling
- Framer Motion for animations
- React Icons for UI elements

### Development Tools
- Vite for fast development
- ESLint for code quality
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

## 💻 CLI Features

Access the CLI by:
- Clicking the terminal icon in the navigation
- Pressing the F1 key

Available commands:
- `help` - Show all commands
- `about` - View my background
- `skills` - List technical skills
- `projects` - View my projects
- `contact` - Get contact info
- `clear` - Clear terminal
- `exit` - Close CLI

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── CLI/       # Interactive terminal
│   ├── ThemeSwitcher.tsx  # Dark/Light mode toggle
│   ├── TimeDisplay.tsx    # Clock with live time
│   └── ...        # Other components
├── sections/      # Main page sections
│   ├── Skills.tsx # Skills section with theme adaptation
│   └── ...        # Other sections
├── context/       # React context providers
│   ├── ThemeContext.tsx  # Theme management
│   └── ...        # Other contexts
├── styles/        # Theme & styling
├── hooks/         # Custom React hooks
└── types/         # TypeScript types
```

## 🎨 UI Improvements

- **Minimal Theme Switcher**: Simplified to show only sun/moon icon instead of text
- **Skills Display**: Improved contrast in both dark and light modes
- **Time Display**: Enhanced with clock icon while maintaining time text
- **Responsive Components**: All UI elements adapt to the current theme

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
