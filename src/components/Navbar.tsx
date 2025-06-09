import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBars, FaTerminal, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useScrollSpy } from '../hooks/useScrollSpy';
import Button from './Button';
import ThemeSwitcher from './ThemeSwitcher';
import { TimeDisplay } from './TimeDisplay';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  padding: ${({ theme }) => theme.spacing.md};
  background: transparent;
  backdrop-filter: blur(5px);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  
  span.portfolio {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)<{ $active?: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text.primary)};
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  outline: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
    border-radius: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.default};
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => `${theme.colors.background}f5`};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndex.modal};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;



interface NavLink {
  href: string;
  text: string;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { href: '#hero', text: 'Home' },
  { href: '#about', text: 'About' },
  { href: '#skills', text: 'Skills' },
  { href: '#projects', text: 'Projects' },
  { href: '#contact', text: 'Contact' },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
  if (isExternal) {
    return; // Let the default link behavior handle external URLs
  }
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offset = 80; // Height of fixed navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

interface NavbarProps {
  onCLIToggle: () => void;
}

const Navbar = ({ onCLIToggle }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(navLinks.map(link => link.href.slice(1)));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { theme } = useTheme();
  
  return (
    <Nav
      style={{
        background: scrolled ? `${theme.colors.background}99` : 'transparent',
      }}
    >
      <NavContainer>
        <Logo
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{ marginRight: '0.5rem' }}>SAKTHI'S</span><span className="portfolio">PORTFOLIO</span>
          <TimeDisplay />
        </Logo>

        <NavLinks>
          {navLinks.map(({ href, text, isExternal }) => (
            <NavLink
              key={href}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              $active={!isExternal && activeSection === href.slice(1)}
              onClick={(e) => scrollToSection(e, href, isExternal)}
            >
              {text}
            </NavLink>
          ))}
          <ThemeSwitcher />
          <Button
            onClick={onCLIToggle}
            variant="cli"
            size="medium"
            title="Open CLI (F1)"
            icon={<FaTerminal />}
          >
            Terminal
          </Button>
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </MobileMenuButton>
      </NavContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {navLinks.map(({ href, text, isExternal }) => (
              <NavLink
                key={href}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                $active={!isExternal && activeSection === href.slice(1)}
                onClick={(e) => {
                  scrollToSection(e, href, isExternal);
                  setIsOpen(false);
                }}
                style={{
                  fontSize: '1.5rem',
                  margin: '0.5rem 0',
                  padding: '0.5rem'
                }}
              >
                {text}
              </NavLink>
            ))}
            <ThemeSwitcher />
            
            <Button
              onClick={() => {
                onCLIToggle();
                setIsOpen(false);
              }}
              variant="cli"
              size="large"
              title="Open CLI (F1)"
              icon={<FaTerminal />}
              style={{
                marginTop: '1.5rem',
                width: '200px'
              }}
            >
              Terminal
            </Button>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;