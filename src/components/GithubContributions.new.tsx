import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaCode, FaStar, FaCodeBranch, FaUsers } from 'react-icons/fa';

const ContributionsContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: ${({ theme }) => theme.shadows.default};
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
  border: 1px solid ${({ theme }) => theme.colors.border};

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

const ReposContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const RepoCard = styled.a`
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-2px);
  }
`;

const RepoName = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const RepoDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const RepoStats = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 170px;
  overflow: hidden;
  border-radius: 6px;
  margin: 2rem 0;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  iframe {
    width: 100%;
    height: 200px;
    border: none;
    transform: scale(1);
    transform-origin: 0 0;
  }
`;

interface GithubContributionsProps {
  username: string;
}

const GithubContributions = ({ username }: GithubContributionsProps) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    publicRepos: 0,
    totalContributions: 0
  });
  const [topRepos, setTopRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=4`);
        const reposData = await reposResponse.json();
        
        setStats({
          followers: userData.followers,
          following: userData.following,
          publicRepos: userData.public_repos,
          totalContributions: 0 // This requires GraphQL API access
        });
        
        setTopRepos(reposData);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  return (
    <ContributionsContainer>
      <Title>
        <FaGithub /> GitHub Activity
      </Title>
      
      <StatsContainer>
        <StatCard>
          <FaCodeBranch />
          <StatLabel>Repositories</StatLabel>
          <StatValue>{stats.publicRepos}</StatValue>
        </StatCard>
        <StatCard>
          <FaCode />
          <StatLabel>Contributions</StatLabel>
          <StatValue>{stats.totalContributions}+</StatValue>
        </StatCard>
        <StatCard>
          <FaUsers />
          <StatLabel>Followers</StatLabel>
          <StatValue>{stats.followers}</StatValue>
        </StatCard>
        <StatCard>
          <FaUsers />
          <StatLabel>Following</StatLabel>
          <StatValue>{stats.following}</StatValue>
        </StatCard>
      </StatsContainer>

      {!loading && (
        <IframeContainer>
          <iframe
            src={`https://github-contributions.vercel.app/${username}`}
            title="GitHub Contributions"
            loading="lazy"
          />
        </IframeContainer>
      )}

      {!loading && topRepos.length > 0 && (
        <>
          <Title>
            <FaStar /> Top Repositories
          </Title>
          <ReposContainer>
            {topRepos.map((repo) => (
              <RepoCard key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <RepoName>{repo.name}</RepoName>
                <RepoDescription>
                  {repo.description || 'No description available'}
                </RepoDescription>
                <RepoStats>
                  <span>
                    <FaStar />
                    {repo.stargazers_count}
                  </span>
                  <span>
                    <FaCodeBranch />
                    {repo.forks_count}
                  </span>
                </RepoStats>
              </RepoCard>
            ))}
          </ReposContainer>
        </>
      )}
    </ContributionsContainer>
  );
};

export default GithubContributions;
