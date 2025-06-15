/**
 * Utility functions to filter out browser extension errors
 * and focus on actual application errors
 */

export const isExtensionError = (error: any): boolean => {
  if (!error) return false;
  
  const errorString = error.toString?.() || '';
  const stack = error.stack || '';
  const message = error.message || '';
  
  // Common patterns for extension errors
  const extensionPatterns = [
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',
    'The message port closed before a response was received',
    'runtime.lastError',
    'Extension context invalidated',
    'Could not establish connection',
    'Receiving end does not exist'
  ];
  
  return extensionPatterns.some(pattern => 
    errorString.includes(pattern) || 
    stack.includes(pattern) || 
    message.includes(pattern)
  );
};

export const isNetworkError = (error: any): boolean => {
  if (!error) return false;
  
  const errorString = error.toString?.() || '';
  const message = error.message || '';
  
  const networkPatterns = [
    'Failed to fetch',
    'Network request failed',
    'ERR_NETWORK',
    'ERR_INTERNET_DISCONNECTED',
    'ERR_CONNECTION_REFUSED'
  ];
  
  return networkPatterns.some(pattern => 
    errorString.includes(pattern) || 
    message.includes(pattern)
  );
};

export const logApplicationError = (error: any, context?: string) => {
  if (isExtensionError(error)) {
    // Silently ignore extension errors
    return;
  }
  
  if (isNetworkError(error)) {
    console.warn(`Network error${context ? ` in ${context}` : ''}:`, error);
    return;
  }
  
  // Log actual application errors
  console.error(`Application error${context ? ` in ${context}` : ''}:`, error);
};

export const createErrorHandler = (context: string) => {
  return (error: any) => {
    logApplicationError(error, context);
  };
};