import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import styled from 'styled-components';
import { isExtensionError, logApplicationError } from '../utils/errorFilter';
import Button from './Button';

// Interface for Error Boundary props
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Interface for Error Boundary state
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => (theme?.spacing?.xl ?? '2rem')};
  margin: ${({ theme }) => (theme?.spacing?.lg ?? '1.5rem')} 0;
  background-color: ${({ theme }) => (theme?.colors?.surface ?? '#1a1a1a')};
  border: 1px solid ${({ theme }) => (theme?.colors?.error ? `${theme.colors.error}40` : '#ff000040')};
  border-radius: 8px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme?.colors?.error || '#ff0000'};
  margin-bottom: ${({ theme }) => theme?.spacing?.md || '1rem'};
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme?.colors?.error || '#ff0000'};
  margin-bottom: ${({ theme }) => theme?.spacing?.md || '1rem'};
`;

const ErrorMessage = styled.p`
  margin-bottom: ${({ theme }) => theme?.spacing?.lg || '1.5rem'};
  color: ${({ theme }) => theme?.colors?.text?.primary || '#ffffff'};
`;

const ErrorDetail = styled.details`
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 100%;
  
  summary {
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  pre {
    background-color: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: 4px;
    overflow-x: auto;
    text-align: left;
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: 0.8rem;
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error: error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Filter out extension-related errors
    if (isExtensionError(error)) {
      // Reset the error boundary for extension errors
      this.resetErrorBoundary();
      return;
    }
    
    // Log the error using our error filter
    logApplicationError(error, 'ErrorBoundary');
    console.error('ErrorBoundary component stack:', errorInfo.componentStack);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, display the default error UI
      return (
        <ErrorContainer>
          <ErrorIcon>
            <FaExclamationTriangle />
          </ErrorIcon>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            An unexpected error occurred. The issue has been logged.
          </ErrorMessage>
          
          <ErrorDetail>
            <summary>Technical Details</summary>
            <pre>{this.state.error?.toString()}</pre>
            {this.state.errorInfo && (
              <pre>{this.state.errorInfo.componentStack}</pre>
            )}
          </ErrorDetail>
          
          <ButtonContainer>
            <Button 
              onClick={this.resetErrorBoundary}
              icon={<FaRedo />}
              variant="primary"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Reload Page
            </Button>
          </ButtonContainer>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;