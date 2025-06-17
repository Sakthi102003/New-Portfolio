import { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import styled from 'styled-components';

const TimeWrapper = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.surface}dd;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  z-index: ${({ theme }) => theme.zIndex.navbar - 1};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}66;
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
  }
`;

const Time = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1rem;
  }
`;

const DateDisplay = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const TimeDisplay = () => {
  const [dateTime, setDateTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeWrapper>
      <Time>
        <FaClock />
        {formatTime(dateTime)}
      </Time>
      <DateDisplay>{formatDate(dateTime)}</DateDisplay>
    </TimeWrapper>
  );
};