import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { FaCode, FaCodeBranch, FaGithub, FaStar } from 'react-icons/fa';
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
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
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
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

interface GithubContributionsProps {
  username: string;
}

const GithubContributions = ({ username }: GithubContributionsProps) => {
  const [stats, setStats] = useState({
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
        <GitHubCalendar username={username} blockSize={15} blockMargin={5} fontSize={14} />
      </IframeContainer>
    </ContributionsContainer>
  );
};

export default GithubContributions;
