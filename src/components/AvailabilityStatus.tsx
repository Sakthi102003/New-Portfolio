import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: rgba(0, 200, 0, 0.1);
  border-radius: 20px;
  font-size: 0.85rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 200, 0, 0.15);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(1px);
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #00ff00;
  animation: ${blink} 2s ease-in-out infinite;
`;

const Text = styled.span`
  color: #00ff00;
  font-weight: 500;
`;

const AvailabilityStatus = () => {
  return (
    <Container>
      <StatusDot />
      <Text>Available for Hire</Text>
    </Container>
  );
};

export default AvailabilityStatus;
