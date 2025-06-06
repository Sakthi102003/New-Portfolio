import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    FaEnvelope,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaMedium,
    FaPaperPlane,
    FaUser
} from 'react-icons/fa';
import styled from 'styled-components';

// Initialize EmailJS with error handling
try {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
} catch (error) {
  console.error('Failed to initialize EmailJS:', error);
}

const ContactSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled(motion.div)`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled(motion.span)`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.error : `${theme.colors.primary}40`};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.error : `${theme.colors.primary}40`};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text.primary};
  min-height: 150px;
  resize: vertical;
  transition: all ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const Label = styled.label`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
  pointer-events: none;
  transition: all ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  ${Input}:focus ~ &,
  ${Input}:not(:placeholder-shown) ~ &,
  ${Textarea}:focus ~ &,
  ${Textarea}:not(:placeholder-shown) ~ & {
    top: 0;
    transform: translateY(-100%);
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Alert = styled(motion.div)<{ $type: 'success' | 'error' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, $type }) =>
    $type === 'success'
      ? `${theme.colors.success}20`
      : `${theme.colors.error}20`};
  color: ${({ theme, $type }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error};
  border: 1px solid
    ${({ theme, $type }) =>
      $type === 'success' ? theme.colors.success : theme.colors.error};
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const SocialCard = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialInfo = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const socialLinks = [
  {
    icon: <FaGithub />,
    name: 'GitHub',
    username: '@Sakthi102003',
    description: 'Check out my open source projects',
    url: 'https://github.com/Sakthi102003'
  },
  {
    icon: <FaLinkedin />,
    name: 'LinkedIn',
    username: 'Sakthimurugan S',
    description: 'Connect with me professionally',
    url: 'https://linkedin.com/in/sakthimurugan-s'
  },
  {
    icon: <FaMedium />,
    name: 'Medium',
    username: '@sakthimurugan102003',
    description: 'Read my technical articles',
    url: 'https://medium.com/@sakthimurugan102003'
  },
  {
    icon: <FaInstagram />,
    name: 'Instagram',
    username: '@sakthimurugans._',
    description: 'Follow my cybersecurity journey',
    url: 'https://www.instagram.com/sakthimurugans._'
  }
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateForm = (values: FormState): FormErrors => {
  const errors: FormErrors = {};
  
  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
};

interface IContactProps {
  // Add any props if needed
}

const Contact: React.FC<IContactProps> = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formState);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        }
      );
      
      setAlert({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.'
      });
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setAlert(null), 5000); // Clear alert after 5 seconds
    }
  };

  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </SectionTitle>

        <AnimatePresence>
          {alert && (
            <Alert
              $type={alert.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {alert.message}
            </Alert>
          )}
        </AnimatePresence>

        <SocialGrid>
          {socialLinks.map((link) => (
            <SocialCard
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.icon}
              <SocialInfo>
                <h4>{link.name}</h4>
                <p>{link.username}</p>
                <p>{link.description}</p>
              </SocialInfo>
            </SocialCard>
          ))}
        </SocialGrid>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormGroup>
            <Input
              type="text"
              name="name"
              placeholder=" "
              value={formState.name}
              onChange={handleChange}
              required
              $hasError={!!errors.name}
            />
            <Label><FaUser /> Name</Label>
            {errors.name && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.name}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder=" "
              value={formState.email}
              onChange={handleChange}
              required
              $hasError={!!errors.email}
            />
            <Label><FaEnvelope /> Email</Label>
            {errors.email && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.email}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Textarea
              name="message"
              placeholder=" "
              value={formState.message}
              onChange={handleChange}
              required
              $hasError={!!errors.message}
            />
            <Label><FaPaperPlane /> Message</Label>
            {errors.message && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.message}
              </ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'} <FaPaperPlane />
          </SubmitButton>
        </Form>
      </Container>
    </ContactSection>
  );
};

export default Contact;