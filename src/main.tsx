import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { logApplicationError } from './utils/errorFilter';

// Add global error handlers for better debugging
window.addEventListener('error', (event) => {
  logApplicationError(event.error, 'Global error handler');
});

window.addEventListener('unhandledrejection', (event) => {
  logApplicationError(event.reason, 'Unhandled promise rejection');
});

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

console.log('Root element found:', rootElement);
console.log('Starting React app...');

const root = createRoot(rootElement)

root.render(<App />)

console.log('React app rendered');