import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
    FaExclamationTriangle,
    FaLock,
    FaNetworkWired,
    FaServer,
    FaShieldAlt
} from 'react-icons/fa';
import styled from 'styled-components';

const DashboardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  margin: 2rem 0;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StatusIndicator = styled.div<{ $status: 'secure' | 'warning' | 'critical' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  background: ${({ theme, $status }) => {
    switch ($status) {
      case 'secure': return `${theme.colors.cyber.success}33`;
      case 'warning': return `${theme.colors.cyber.warning}33`;
      case 'critical': return `${theme.colors.cyber.danger}33`;
      default: return theme.colors.surface;
    }
  }};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'secure': return theme.colors.cyber.success;
      case 'warning': return theme.colors.cyber.warning;
      case 'critical': return theme.colors.cyber.danger;
      default: return theme.colors.text.primary;
    }
  }};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ActivityLog = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}22;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

interface SecurityMetrics {
  threats: number;
  vulnerabilities: number;
  secureEndpoints: number;
  networkStatus: 'secure' | 'warning' | 'critical';
}

interface Activity {
  time: string;
  message: string;
}

const SecurityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    threats: 0,
    vulnerabilities: 0,
    secureEndpoints: 0,
    networkStatus: 'secure'
  });

  const [activities, setActivities] = useState<Activity[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random metrics
      setMetrics({
        threats: Math.floor(Math.random() * 5),
        vulnerabilities: Math.floor(Math.random() * 10),
        secureEndpoints: 15 + Math.floor(Math.random() * 5),
        networkStatus: Math.random() > 0.8 ? 'warning' : 'secure'
      });

      // Add new activity
      const newActivity = {
        time: new Date().toLocaleTimeString(),
        message: `Port scan detected from ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      };

      setActivities(prevActivities => [newActivity, ...prevActivities].slice(0, 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardHeader>
        <DashboardTitle>
          <FaShieldAlt /> Security Dashboard
        </DashboardTitle>
        <StatusIndicator $status={metrics.networkStatus}>
          <FaNetworkWired />
          Network Status: {metrics.networkStatus.toUpperCase()}
        </StatusIndicator>
      </DashboardHeader>

      <MetricsGrid>
        <MetricCard>
          <MetricValue>{metrics.threats}</MetricValue>
          <MetricLabel>
            <FaExclamationTriangle /> Active Threats
          </MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.vulnerabilities}</MetricValue>
          <MetricLabel>
            <FaLock /> Vulnerabilities
          </MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.secureEndpoints}</MetricValue>
          <MetricLabel>
            <FaServer /> Secure Endpoints
          </MetricLabel>
        </MetricCard>
      </MetricsGrid>

      <h4 style={{ marginBottom: '1rem', color: 'inherit' }}>Recent Activity</h4>
      <ActivityLog>
        {activities.map((activity, index) => (
          <ActivityItem key={index}>
            <span>{activity.message}</span>
            <span>{activity.time}</span>
          </ActivityItem>
        ))}
      </ActivityLog>
    </DashboardContainer>
  );
};

export default SecurityDashboard;
