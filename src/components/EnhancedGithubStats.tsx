import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import {
  FaCode,
  FaGithub,
  FaProjectDiagram,
  FaStar
} from 'react-icons/fa';
import { VscRepoForked } from 'react-icons/vsc';
import styled, { useTheme } from 'styled-components';
import type { Theme } from '../types/theme';

interface GithubStats {
  publicRepos: number;
  followers: number;
  totalContributions: number;
  pullRequests: number;
  stars: number;
  forks: number;
}

interface StyledProps {
  theme: Theme;
}

const ContributionsContainer = styled.div<StyledProps>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
  }

  span {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.25rem;
    font-weight: 600;
  }

  small {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`;

const StatsCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatsCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }

  h4 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 1rem 0;
    font-size: 1.1rem;
  }
`;

const CalendarContainer = styled.div`
  margin: 2.5rem 0;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const LoadingSkeleton = styled.div`
  background: ${({ theme }) => `${theme.colors.primary}10`};
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.8; }
    100% { opacity: 0.6; }
  }
`;

const StatCardSkeleton = styled(LoadingSkeleton)`
  height: 90px;
  width: 100%;
`;

const CalendarSkeleton = styled(LoadingSkeleton)`
  height: 200px;
  width: 100%;
  margin: 2rem 0;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const EnhancedGithubStats = ({ username }: { username: string }) => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const fetchGithubStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [userResponse, eventsResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/events/public`)
      ]);

      const userData = await userResponse.json();
      const events = await eventsResponse.json();

      // Calculate total contributions from push events in the last year
      const pushEvents = events.filter((event: any) => event.type === 'PushEvent');
      const totalCommits = pushEvents.reduce((total: number, event: any) => 
        total + (event.payload.commits?.length || 0), 0);

      // Calculate total stars and forks across all repos
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await reposResponse.json();
      const totalStars = repos.reduce((total: number, repo: any) => 
        total + repo.stargazers_count, 0);
      const totalForks = repos.reduce((total: number, repo: any) => 
        total + repo.forks_count, 0);

      setStats({
        publicRepos: userData.public_repos,
        followers: userData.followers,
        totalContributions: totalCommits,
        pullRequests: userData.public_gists, // Using gists as a proxy
        stars: totalStars,
        forks: totalForks
      });
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      setError('Failed to load GitHub stats. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubStats();
  }, [username]);

  // No need for data transformation

  if (isLoading) {
    return (
      <ContributionsContainer>
        <Title><FaGithub /> GitHub Activity</Title>
        <StatsContainer>
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </StatsContainer>
        <CalendarSkeleton />
        <StatsCardsContainer>
          <StatCardSkeleton />
          <StatCardSkeleton />
        </StatsCardsContainer>
      </ContributionsContainer>
    );
  }

  if (error) {
    return (
      <ContributionsContainer>
        <Title><FaGithub /> GitHub Activity</Title>
        <ErrorContainer>
          <p>{error}</p>
          <RetryButton onClick={fetchGithubStats}>
            Retry
          </RetryButton>
        </ErrorContainer>
      </ContributionsContainer>
    );
  }

  return (
    <ContributionsContainer>
      <Title>
        <FaGithub /> GitHub Activity
      </Title>
      
      <StatsContainer>
        <StatCard>
          <FaProjectDiagram />
          <span>{stats?.publicRepos || 0}</span>
          <small>Repositories</small>
        </StatCard>
        <StatCard>
          <FaCode />
          <span>{stats?.totalContributions || '0'}</span>
          <small>Contributions</small>
        </StatCard>
        <StatCard>
          <FaStar />
          <span>{stats?.stars || '0'}</span>
          <small>Total Stars</small>
        </StatCard>
        <StatCard>
          <VscRepoForked />
          <span>{stats?.forks || '0'}</span>
          <small>Total Forks</small>
        </StatCard>
      </StatsContainer>

      <CalendarContainer>
        <GitHubCalendar
          username={username}
          blockSize={15}
          blockRadius={2}
          blockMargin={5}
          fontSize={16}
          theme={{
            dark: ['#1e1e26', '#15803d', '#16a34a', '#22c55e', '#4ade80']
          }}
          style={{ width: '100%' }}
          year="last"
          labels={{
            totalCount: '{{count}} contributions in the last year'
          }}
        />
      </CalendarContainer>

      <StatsCardsContainer>
        <StatsCard>
          <h4>Most Used Languages</h4>
          <img 
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=${theme.colors.background.replace('#', '')}&title_color=${theme.colors.primary.replace('#', '')}&text_color=${theme.colors.text.primary.replace('#', '')}`}
            alt="Most Used Languages"
          />
        </StatsCard>
        <StatsCard>
          <h4>GitHub Stats</h4>
          <img 
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=${theme.colors.background.replace('#', '')}&title_color=${theme.colors.primary.replace('#', '')}&text_color=${theme.colors.text.primary.replace('#', '')}&icon_color=${theme.colors.primary.replace('#', '')}`}
            alt="GitHub Stats"
          />
        </StatsCard>
      </StatsCardsContainer>
    </ContributionsContainer>
  );
};

export default EnhancedGithubStats;
