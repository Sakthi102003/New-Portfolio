import { useEffect, useState } from 'react';

export const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div style={{
      fontFamily: 'monospace',
      fontSize: '1rem',
      color: '#fff',
      marginTop: '0.5rem'
    }}>
      {formatTime(time)}
    </div>
  );
};