import { motion } from 'framer-motion';
import styled from 'styled-components';
import LiveTerminal from '../components/LiveTerminal';
import SecurityBlog from '../components/SecurityBlog';
import SecurityDashboard from '../components/SecurityDashboard';
import { blogPosts } from '../data/blogPosts';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SecuritySection = () => {
  const commands = [
    'sudo nmap -sS -sV 192.168.1.0/24',
    'python3 vulnerability_scanner.py --target example.com',
    'hashcat -m 0 -a 0 hashes.txt wordlist.txt'
  ];

  const outputs = [
    'Starting Nmap 7.94 ( https://nmap.org )\nScanning 256 IP addresses...\nHost is up (0.0024s latency)\nPorts: 22/open/tcp//ssh, 80/open/tcp//http, 443/open/tcp//https',
    'Scanning target: example.com\nChecking for common vulnerabilities...\nFound: 2 potential SQL injection points\nFound: 1 XSS vulnerability\nScan complete. Full report saved to report.txt',
    'Session started...\nHashes loaded: 5\nDictionary loaded\nPassword1 -> 5f4dcc3b5aa765d61d8327deb882cf99\nPassword cracking complete'
  ];

  return (
    <SectionContainer>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Security Analytics
      </SectionTitle>

      <ContentWrapper>
        <SecurityDashboard />
        
        <div>
          <h3>Live Security Tools</h3>
          <LiveTerminal 
            commands={commands}
            outputs={outputs}
            autoPlay={true}
            loop={true}
          />
        </div>

        <SecurityBlog posts={blogPosts} />
      </ContentWrapper>
    </SectionContainer>
  );
};

export default SecuritySection;
