import styled from 'styled-components';

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 1rem;
  transition: all var(--transition-default);

  svg {
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition-default);

    &:hover {
      color: var(--primary-color);
    }
  }
`;

export default ContactItem;
