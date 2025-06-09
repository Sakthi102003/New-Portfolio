import { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import styled from 'styled-components';

const TimeWrapper = styled.div`
  font-family: monospace;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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
    <TimeWrapper>
      <FaClock />
      {formatTime(time)}
    </TimeWrapper>
  );
};