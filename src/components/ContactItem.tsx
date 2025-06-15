import styled from 'styled-components';

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.default};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default ContactItem;
