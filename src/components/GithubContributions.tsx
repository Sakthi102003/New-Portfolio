import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import {
    FaCode,
    FaCodeBranch,
    FaGithub,
    FaStar
} from 'react-icons/fa';
import styled from 'styled-components';

const ContributionsContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: ${({ theme }) => theme.shadows.card};
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
    gap: 1rem;
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
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;
  font-weight: bold;
`;

const IframeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  margin: 1.5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
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

interface GithubContributionsProps {
  username: string;
}

const GithubContributions = ({ username }: GithubContributionsProps) => {
  const [stats, setStats] = useState<{
    publicRepos: number;
    totalContributions: number;
    followers: number;
    stars: number;
  }>({
    publicRepos: 0,
    totalContributions: 0,
    followers: 0,
    stars: 0
  });

  useEffect(() => {
    const fetchGithubStats = async () => {
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

        // Calculate total stars across all repos
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposResponse.json();
        const totalStars = repos.reduce((total: number, repo: any) => 
          total + repo.stargazers_count, 0);

        setStats({
          publicRepos: userData.public_repos,
          totalContributions: totalCommits,
          followers: userData.followers,
          stars: totalStars
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGithubStats();
  }, [username]);

  return (
    <ContributionsContainer>
      <Title><FaGithub /> GitHub Activity</Title>
      
      <StatsContainer>
        <StatCard>
          <FaCode />
          <StatLabel>Repositories</StatLabel>
          <StatValue>{stats.publicRepos}</StatValue>
        </StatCard>
        <StatCard>
          <FaCodeBranch />
          <StatLabel>Contributions</StatLabel>
          <StatValue>{stats.totalContributions}</StatValue>
        </StatCard>
        <StatCard>
          <FaStar />
          <StatLabel>Total Stars</StatLabel>
          <StatValue>{stats.stars}</StatValue>
        </StatCard>
        <StatCard>
          <FaGithub />
          <StatLabel>Followers</StatLabel>
          <StatValue>{stats.followers}</StatValue>
        </StatCard>
      </StatsContainer>

      <IframeContainer>
        <GitHubCalendar
          username={username}
          blockSize={12}
          blockRadius={2}
          blockMargin={4}
          fontSize={14}
          theme={{
            dark: ['#1e1e26', '#15803d', '#16a34a', '#22c55e', '#4ade80']
          }}
          style={{ width: '100%' }}
          year="last"
        />
      </IframeContainer>

      <StatsCardsContainer>
        {/* Additional stats cards can be added here */}
        <StatsCard>
          <h4>Top Languages</h4>
          {/* Content for top languages */}
        </StatsCard>
        <StatsCard>
          <h4>Most Active Repositories</h4>
          {/* Content for active repositories */}
        </StatsCard>
      </StatsCardsContainer>
    </ContributionsContainer>
  );
};

export default GithubContributions;
