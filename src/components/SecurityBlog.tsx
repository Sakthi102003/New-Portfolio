import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

// Blog post data type
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'CTF' | 'Research' | 'Tutorial' | 'Analysis';
  readTime: string;
  tags: string[];
  url: string;
}

const BlogSection = styled.section`
  padding: 4rem 0;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled(motion.a)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  display: block;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
    border-color: ${({ theme }) => theme.colors.primary}66;
  }
`;

const Category = styled.span<{ $type: BlogPost['category'] }>`
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'CTF': return `${theme.colors.cyber.success}33`;
      case 'Research': return `${theme.colors.cyber.info}33`;
      case 'Tutorial': return `${theme.colors.cyber.warning}33`;
      case 'Analysis': return `${theme.colors.cyber.danger}33`;
      default: return theme.colors.surface;
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'CTF': return theme.colors.cyber.success;
      case 'Research': return theme.colors.cyber.info;
      case 'Tutorial': return theme.colors.cyber.warning;
      case 'Analysis': return theme.colors.cyber.danger;
      default: return theme.colors.text.primary;
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 1rem 0;
  font-size: 1.25rem;
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.accent};
  font-size: 0.875rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary}1a;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;

interface SecurityBlogProps {
  posts: BlogPost[];
}

const SecurityBlog: React.FC<SecurityBlogProps> = ({ posts }) => {
  return (
    <BlogSection>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: 'inherit' }}
      >
        Security Research & Write-ups
      </motion.h2>
      <BlogGrid>
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Category $type={post.category}>{post.category}</Category>
            <Title>{post.title}</Title>
            <Excerpt>{post.excerpt}</Excerpt>
            <Meta>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </Meta>
            <Tags>
              {post.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogSection>
  );
};

export default SecurityBlog;
